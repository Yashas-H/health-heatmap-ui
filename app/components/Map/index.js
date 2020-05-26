import React, { Component } from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';
import request from 'superagent';
import _ from 'underscore';

import 'mapbox-gl/dist/mapbox-gl.css';
// import karnataka from 'data/maps/india_states.json';
import districts from 'data/districts.json';
import states from 'data/india_states.json';
import './style.scss';

const DISTRICT = 'DISTRICT';
const STATE = 'STATE';

const colors = [
  '#F2F12D',
  '#d8ca27',
  '#EED322',
  '#E6B71E',
  '#DA9C20',
  '#CA8323',
  '#B86B25',
  '#A25626',
  '#8B4225',
  '#723122',
];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '66vw',
        // height:"100vh",
        height: 500,
        latitude: 22.960447815852717,
        longitude: 76.3195108744048,
        zoom: 3.4,
      },
      domain: null,
      showPopup: false,
      layerType: STATE,
    };
  }

  componentDidMount() {
    const {data} = this.props;
    const map = this.reactMap.getMap();
    if (!_.isEmpty(data) ||!_.isEmpty(data.state) || !_.isEmpty(data.district)) {
      map.on('load',() => {
        this.updateMap(data);
      });
    }
  }
  

  componentWillReceiveProps(next) {
    if (_.isEmpty(next.data) && _.isEmpty(next.data.state) && _.isEmpty(next.data.district)) {
      this.clearMap();
      return;
    }
    this.updateMap(next.data);
  }

  clearMap = () => {
    const map = this.reactMap.getMap();
    if (map.getSource('geo-source')) {
      map.removeLayer('geography-layer');
      map.removeSource('geo-source');
    }
  };

  updateMap = (data, layerType) => {
    const map = this.reactMap.getMap();
    let type = layerType ? layerType : DISTRICT;

    if (!data) return;

    if(!layerType && !_.isEmpty(data.state)) {
      type = STATE;
      this.setState({layerType: STATE});
    } else if(!layerType) {
      this.setState({layerType: DISTRICT});
    }

    // Parse data
    const geoLayerData = type === DISTRICT ? districts:states;
    const apiData = type === DISTRICT ? data.district:data.state;
    const nameKey = type === DISTRICT ? 'NAME_2':'NAME_1';
    
    let max = 0;
    let min = 0;
    const layerNames = [];
    _.each(geoLayerData.features, (layer, index) => {
      layerNames.push(
        geoLayerData.features[index].properties[nameKey],
      );
      let layerValue = apiData[
        geoLayerData.features[index].properties[nameKey]
      ]
        ? apiData[geoLayerData.features[index].properties[nameKey]].value
        : 0;
      if (isNaN(layerValue)) layerValue = 0;
      layerValue = parseInt(layerValue);
      if (layerValue > max) max = layerValue;
      if (layerValue < min) min = layerValue;
      geoLayerData.features[index].properties.value = layerValue;
    });

    const steps = Math.min(10, max);
    const domainMin = Math.max(2, Math.floor(max / steps));
    const domain = Array.from(
      { length: steps },
      (e, i) => domainMin + i * Math.floor(max / steps),
    );
    this.setState({
      domain,
    });

    let layerColors = [];
    _.each(domain, (val, index) => {
      layerColors.push(val);
      layerColors.push(colors[index]);
    })
    
    // Find the index of the first symbol layer in the map style
    // This is to make district layer show up below the name/road layers
    const { layers } = map.getStyle();
    let firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
      }
    }

    // Remove source if exists
    if (map.getSource('geo-source')) {
      map.removeLayer('geography-layer');
      map.removeSource('geo-source');
    }
    // add the GeoJSON layer here
    map.addSource('geo-source', {
      type: 'geojson',
      data: geoLayerData,
      buffer: 512,
    });

    // Add Source
    map.addLayer(
      {
        id: 'geography-layer',
        type: 'fill',
        source: 'geo-source',
        layout: {},
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'value'],
            ...layerColors,
          ],
          'fill-opacity': 0.8,
        },
      },
      firstSymbolId,
    );
  };

  // Handle pop-up on hover over layer
  _onMapHover = event => {
    const feature = event.features.find(f => f.layer.id === 'geography-layer');
    if(feature){
      this.setState({showPopup:{
        lngLat:event.lngLat,
        properties: feature.properties
      }})
    } else {
      this.setState({showPopup:false})
    }
  }

  handleLayerChange = e => {
    if(e.target.checked){
      const layerType = e.target.id === STATE ? STATE:DISTRICT;
      this.setState({layerType: layerType});
      this.updateMap(this.props.data, layerType)
    }
  }

  render() {
    const { viewport, domain, showPopup, layerType } = this.state;
    const {data} = this.props;
    const showLayers = !_.isEmpty(data) && !_.isEmpty(data.state) && !_.isEmpty(data.district);

    return (
      <div className="map-area">
        {/* Map */}
        <ReactMapGL
          {...viewport}
          ref={reactMap => (this.reactMap = reactMap)}
          onViewportChange={e => this.setState({ viewport: e })}
          onHover={this._onMapHover}
          // mapStyle="mapbox://styles/mapbox/dark-v10"
          mapStyle="mapbox://styles/mapbox/light-v10?optimize=true"
          mapboxApiAccessToken="pk.eyJ1IjoiZGVlcGt0IiwiYSI6ImNrYWRuZHdkdjBiOHYydG1iY3RyaW52ancifQ.7jlcNtPLOyIBA1GdOzLbfg"
        >
        {showPopup && <Popup
          longitude={showPopup.lngLat[0]}
          latitude={showPopup.lngLat[1]}
          closeButton={false}
          closeOnClick={false}
          anchor="top" >
          <div>
            <h4>
              {layerType === STATE ? showPopup.properties.NAME_1 : showPopup.properties.NAME_2}:
            <span> {showPopup.properties.value}</span></h4>
            {layerType === DISTRICT &&
            <p>{showPopup.properties.NAME_1}</p>}
          </div>
        </Popup>}
        </ReactMapGL>

        {/* Layers */}
        {showLayers && (
          <div className="layer-selector">
            <h4>Layers</h4>
            <div className="layer-selector-content">
              <div className="inputGroup">
                <input id="STATE" name="radio" type="radio"
                       checked={layerType === STATE}
                       onChange={this.handleLayerChange}/>
                <label for="STATE">State</label>
              </div>
              <div className="inputGroup">
                <input id="DISTRICT" name="radio" type="radio"
                       checked={layerType === DISTRICT}
                       onChange={this.handleLayerChange}/>
                <label for="DISTRICT">District</label>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        {domain && (
          <div className="legend">
            {_.map(domain, (d, index) => {
              return (
                <div key={index}>
                  <span
                    style={{
                      backgroundColor: colors[colors.length - 1 - index],
                    }}
                  ></span>
                    {domain[(domain.length -1) - index]}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Map;
