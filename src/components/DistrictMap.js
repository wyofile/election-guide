import React, { useState, useEffect } from 'react';

import { Map, MapBrowserEvent, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Stroke, Style, Text} from 'ol/style.js';
import Select from 'ol/interaction/Select.js';
import {click, noModifierKeys} from 'ol/events/condition.js';
import {Control, defaults as defaultControls} from 'ol/control.js';

import 'ol/ol.css';
import '../styles/components/district-map.css'

const MAP_CENTER = [-11971873.22771757, 5311971.846945472]

const calcZoom = map => {
  const width = document.getElementById(map.getTarget()).offsetWidth
  return width*width*-0.00000579 + width*0.00864669 + 3.66904
}

class ResetControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'Reset Map';

    const element = document.createElement('div');
    element.className = 'reset-map ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleReset.bind(this), false);
  }

  handleReset() {
    const map = this.getMap()
    const mapView = map.getView()
    const newZoom = calcZoom(this.getMap())
    mapView.setCenter(MAP_CENTER)
    mapView.setMinZoom(newZoom)
    mapView.setZoom(newZoom);
  }
}

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
      controls: defaultControls().extend([new ResetControl()]),
      layers: [osmLayer, districtsLayer],
      view: new View({
          center: MAP_CENTER,
        }),
    });

    const defaultMinZoom = calcZoom(map)

    map.getView().setZoom(defaultMinZoom)
    map.getView().setMinZoom(defaultMinZoom)

    map.addInteraction(selectDistrict)

    selectDistrict.on('select', (e) => {
      if(e.selected[0]){
        setActiveDistrict(`${districtPrefix}${e.selected[0].get(districtNumberIdentifier).substring(1)}`)
      } else {
        setActiveDistrict(null)
      }
    })

    return () => map.setTarget(null)
  }, []);

  return (
    <>
      <div id={`${chamber}-map`} className="map-container" />
    </>
  );
}

export default DistrictMap;