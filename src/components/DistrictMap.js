import React, { useState, useEffect, useRef } from 'react';

import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Fill, Stroke, Style} from 'ol/style.js';
import Select from 'ol/interaction/Select.js';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition.js';

import 'ol/ol.css';
import '../styles/components/district-map.css'

import houseDistricts from '../data/house-districts.json'

const styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'black',
      width: 1.5,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.1)',
    }),
  }),
};

const selectStyle = (feature) => {
  return new Style({
    fill: new Fill({
      color: '#000000',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2,
    }),
  })
}

const osmLayer = new TileLayer({
  preload: Infinity,
  source: new OSM(),
})

const houseVectorSource = new VectorSource({
features: new GeoJSON().readFeatures(houseDistricts),
});

const houseDistrictsLayer = new VectorLayer({
source: houseVectorSource,
  style: (feature) => {
    return styles[feature.getGeometry().getType()];
  }
})

const selectDistrict = new Select({
  condition: click,
  style: selectStyle,
});

const DistrictMap = (props) => {

    useEffect(() => {     
        const map = new Map({
            target: "map",
            layers: [osmLayer, houseDistrictsLayer],
            view: new View({
                center: [-11971873.22771757, 5311971.846945472],
                zoom: 6.5,
              }),
          });
          map.addInteraction(selectDistrict)
      return () => map.setTarget(null)
    }, []);

    return (
      <div style={{height:'400px',width:'70%'}} id="map" className="map-container" />
    );
}

export default DistrictMap;