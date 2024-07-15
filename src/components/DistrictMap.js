import React, { useState, useEffect } from 'react';

import { Map, MapBrowserEvent, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Stroke, Style, Text} from 'ol/style.js';
import Select from 'ol/interaction/Select.js';
import {click, noModifierKeys} from 'ol/events/condition.js';

import 'ol/ol.css';
import '../styles/components/district-map.css'

const DistrictMap = ({chamber, geoData, setActiveDistrict}) => {

  useEffect(() => {   
    let districtNumberIdentifier = null
    let districtPrefix = null

    if (chamber === 'house') {
      districtNumberIdentifier = 'SLDLST'
      districtPrefix = 'H'
    }
    if (chamber === 'senate') {
      districtNumberIdentifier = 'SLDUST'
      districtPrefix = 'S'
    }

    const districtsVectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoData),
    });
  
    const districtsLayer = new VectorLayer({
      source: districtsVectorSource,
      style: (feature) => {
        return new Style({
          stroke: new Stroke({
            color: 'black',
            width: 1.5,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 0, 0.1)',
          }),
          text: new Text({
            text: districtPrefix + feature.get(districtNumberIdentifier).substring(1),
            fill: new Fill({color: '#000'})
          }),
        })
      }
    })
  
    const selectStyle = (feature) => {
      const selectedStyle = new Style({
        fill: new Fill({
          color: 'rgba(137,166,160,0.8)',
        }),
        stroke: new Stroke({
          color: 'rgba(81,126,100,0.8)',
          width: 2,
        }),
        text: new Text({
          text: districtPrefix + feature.get(districtNumberIdentifier).substring(1),
          fill: new Fill({color: '#000'})
        }),
      })
      return selectedStyle
    }
    
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    })
    
    const selectDistrict = new Select({
      condition: (mapBrowserEvent) => {
        return click(mapBrowserEvent) && noModifierKeys(mapBrowserEvent)
      },
      style: selectStyle,
    });
    
    const map = new Map({
      target: `${chamber}-map`,
      layers: [osmLayer, districtsLayer],
      view: new View({
          center: [-11971873.22771757, 5311971.846945472],
          minZoom: 6.5,
          zoom: 6.5,
        }),
    });
    map.addInteraction(selectDistrict)
    selectDistrict.on('select', (e) => {
      if(e.selected[0]) setActiveDistrict(districtPrefix + e.selected[0].get(districtNumberIdentifier).substring(1))
    })
    return () => map.setTarget(null)
  }, [chamber]);

  return (
    <>
      <div id={`${chamber}-map`} className="map-container" />
    </>
  );
}

export default DistrictMap;