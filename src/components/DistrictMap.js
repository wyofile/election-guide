import React, { useEffect, useRef, useState } from 'react'

import { Collection, Map, MapBrowserEvent, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {OSM, Vector as VectorSource} from 'ol/source.js'
import {Fill, Stroke, Style, Text} from 'ol/style.js'
import Select from 'ol/interaction/Select.js'
import {click, noModifierKeys} from 'ol/events/condition.js'
import {Control, defaults as defaultControls} from 'ol/control.js'
import { usePath } from '@/lib/utils'

const MAP_CENTER = [-11971873.22771757, 5311971.846945472]
const CONSTRAINTS = [-12417689.197989667, 4975536.361069247, -11527133.271643478, 5660965.110251664]

class ResetControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {}

    const button = document.createElement('button')
    button.innerHTML = 'Reset Zoom'

    const element = document.createElement('div')
    element.className = 'reset-map ol-unselectable ol-control'
    element.appendChild(button)

    super({
      element: element,
      target: options.target,
    })

    button.addEventListener('click', this.handleReset.bind(this), false)
  }

  handleReset() {
    const map = this.getMap()
    const mapView = map.getView()
    mapView.setCenter(MAP_CENTER)
    mapView.setZoom(0)
  }
}

const DistrictMap = ({chamber, activeDistrict, setActiveDistrict}) => {

  let districtNumberIdentifier
  let districtPrefix
  let labelPrefix

  if (chamber === 'house') {
    districtNumberIdentifier = 'SLDLST'
    districtPrefix = 'HD '
    labelPrefix = 'House District '
  }
  if (chamber === 'senate') {
    districtNumberIdentifier = 'SLDUST'
    districtPrefix = 'SD '
    labelPrefix = 'Senate District '
  }

  const selectedFeatures = useRef(new Collection())
  
  const districtsVectorSource = useRef(new VectorSource({ format: new GeoJSON(), url: usePath(`/wyo-${chamber}-districts.json`) }))

  const [districtOptions, setDistrictOptions] = useState([])
  const [isLoadingFeatures, setIsLoadingFeatures] = useState(true)

  const mapView = useRef(new View({
    center: MAP_CENTER,
    extent: CONSTRAINTS,
    zoom: 0
  }),)

  useEffect(() => {   

    districtsVectorSource.current.on('featuresloadend', (e) => {
      setDistrictOptions(e.features.map(feat => {
        return feat.getProperties()[districtNumberIdentifier]
      }).sort())
      setIsLoadingFeatures(false)
    })
  
    const districtsLayer = new VectorLayer({
      source: districtsVectorSource.current,
      style: (feature) => {
        return new Style({
          stroke: new Stroke({
            color: 'black',
            width: 1.5,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 0, 0.05)',
          }),
          text: new Text({
            text: districtPrefix + parseInt(feature.get(districtNumberIdentifier)),
            fill: new Fill({color: '#000'}),
            font: '0.75rem sans-serif',
            backgroundFill: new Fill({color:'rgba(255,255,255,0.8)'}),
            padding: [3, 0, 0, 3],
            overflow: true,
          }),
        })
      },
    })
  
    const selectStyle = (feature) => {
      const selectedStyle = new Style({
        fill: new Fill({
          color: 'rgba(137,166,160,0.5)',
        }),
        stroke: new Stroke({
          color: 'rgba(81,126,100,0.8)',
          width: 2,
        }),
        text: new Text({
          text: districtPrefix + parseInt(feature.get(districtNumberIdentifier)),
          backgroundFill: new Fill({color:'rgba(137,166,160,0.9)'}),
          fill: new Fill({color: '#000'}),
          font: 'bold 0.75rem sans-serif',
          padding: [3, 0, 0, 3],
          overflow:true
        }),
        zIndex: 100
      })
      return selectedStyle
    }
    
    const osmLayer = new TileLayer({
      source: new OSM(),
    })
    
    const selectDistrict = new Select({
      condition: (mapBrowserEvent) => {
        return click(mapBrowserEvent) && noModifierKeys(mapBrowserEvent)
      },
      style: selectStyle,
      features: selectedFeatures.current
    })

    const map = new Map({
      target: `${chamber}-map`,
      controls: defaultControls().extend([new ResetControl()]),
      layers: [osmLayer, districtsLayer],
      view: mapView.current
    })

    map.addInteraction(selectDistrict)

    selectDistrict.on('select', (e) => {
      if(e.selected[0]){
        setActiveDistrict(e.selected[0].get(districtNumberIdentifier))

      } else {
        setActiveDistrict('')
      }
    })

    return () => map.setTarget(null)
  }, [])

  const handleManualDistrict = (districtToSet) => {

    selectedFeatures.current.clear()
    if (districtToSet != '') {
      const mapFeature = districtsVectorSource.current.getFeatures().find(feat => {
        return feat.getProperties()[districtNumberIdentifier] === districtToSet
      })
      const polygon = mapFeature.getGeometry()
      mapView.current.fit(polygon, {padding: [40,40,30,30]})
      selectedFeatures.current.push(mapFeature)
    } else {
      mapView.current.setCenter(MAP_CENTER)
      mapView.current.setZoom(0)
    }
    setActiveDistrict(districtToSet)
  }

  const handleDropDown = (e) => {
    handleManualDistrict(e.target.value)
  }

  const handlePrevDistrict = () => {
    const optionsCount = districtOptions.length
    let newDistrict
    if (activeDistrict == '') {
      newDistrict = districtOptions[optionsCount - 1]
    } else {
      newDistrict = ((parseInt(activeDistrict) - 1 + (-1 % optionsCount) + optionsCount) % optionsCount + 1)
    }
    console.log(newDistrict)
    handleManualDistrict(String(newDistrict).padStart(3, '0'))
  }

  const handleNextDistrict = () => {
    const optionsCount = districtOptions.length
    let newDistrict
    if (activeDistrict == '') {
      newDistrict = districtOptions[0]
    } else {
      newDistrict = ((parseInt(activeDistrict) - 1 + (1 % optionsCount) + optionsCount) % optionsCount + 1)
    }
    handleManualDistrict(String(newDistrict).padStart(3, '0'))
  }

  return (
    <>
      <div id={`${chamber}-map`} className="map-container" />
      <p className="map-note">Note: Some smaller districts may require you to zoom in.</p>
      <div className="district-selectors">
        { isLoadingFeatures ? 
          <div>Loading Districts...</div>
          :
          <>
            <button className='district-scroll' onClick={handlePrevDistrict}>{'«'}</button>
            <select className="district-dropdown" onChange={handleDropDown} value={activeDistrict ? activeDistrict : ''}>
              <option value='' className="none-option">{chamber} Districts</option>
              { districtOptions.map(d => <option key={d} value={d}>{labelPrefix + parseInt(d.substring(1))}</option>)}
            </select>
            <button className='district-scroll' onClick={handleNextDistrict}>{'»'}</button>
          </>
        }

      </div>
    </>
  )
}

export default DistrictMap