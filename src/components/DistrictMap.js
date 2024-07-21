import React, { useEffect, useState } from 'react';

import { Map, MapBrowserEvent, View } from 'ol';
import TopoJSON from 'ol/format/TopoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Stroke, Style, Text} from 'ol/style.js';
import Select from 'ol/interaction/Select.js';
import {click, noModifierKeys} from 'ol/events/condition.js';
import {Control, defaults as defaultControls} from 'ol/control.js';

import 'ol/ol.css';
import '../styles/components/district-map.css'

const MAP_CENTER = [-11971873.22771757, 5311971.846945472]
const CONSTRAINTS = [-12417689.197989667, 4975536.361069247, -11527133.271643478, 5660965.110251664]

class ResetControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'Reset Zoom';

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
    mapView.setCenter(MAP_CENTER)
    mapView.setZoom(0);
  }
}

const DistrictMap = ({chamber, geoData, setActiveDistrict}) => {

  useEffect(() => {   
    let districtNumberIdentifier = null
    let districtPrefix = null
    let layerObjectName = null

    if (chamber === 'house') {
      districtNumberIdentifier = 'SLDLST'
      layerObjectName = 'tl_2023_56_sldl-tl_2023_56_sldl'
      districtPrefix = 'H'
    }
    if (chamber === 'senate') {
      districtNumberIdentifier = 'SLDUST'
      layerObjectName = 'tl_2023_56_sldu-tl_2023_56_sldu'
      districtPrefix = 'S'
    }

    const districtsVectorSource = new VectorSource({
      features: new TopoJSON().readFeatures(geoData),
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
      // preload: Infinity,
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
          extent: CONSTRAINTS,
          zoom: 0
        }),
    });

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
      <p className="map-note">Note: Some smaller districts may require you to zoom in.</p><br />
    </>
  );
}

export default DistrictMap;