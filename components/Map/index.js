import React, { Component } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';
import request from 'superagent';
import chroma from 'chroma-js';

import _ from 'underscore';
import Naksha from 'naksha-component-react-restructured';

import stateMap from './state.json';
import distMap from './district.json';

const DISTRICT = 'DISTRICT';
const STATE = 'STATE';

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
      legends: null,
      showPopup: false,
      layerType: STATE,
      layerData: [],
    };
  }

  componentDidMount() {
    // const { data } = this.props;
    // if (
    //   !_.isEmpty(data) ||
    //   !_.isEmpty(data.state) ||
    //   !_.isEmpty(data.district)
    // ) {
    //   map.on('load', () => {
    //     this.updateMap(data);
    //   });
    // }
  }

  componentWillReceiveProps(next) {
    if (
      _.isEmpty(next.data) &&
      _.isEmpty(next.data.state) &&
      _.isEmpty(next.data.district)
    ) {
      this.clearMap();
      return;
    }
    if(next.data.indicatorId != this.props.data.indicatorId) this.updateMap(next.data);
  }

  clearMap = () => {
    // this.setState({ layers: [] });
  };

  addLayer = layer => {
    this.setState({
      layers: [
        {
          ...layerData.layers[0],
          source: layerData.sources,
        },
      ],
    });
  };

  updateMap = (data, layerType) => {
    let type = layerType ? layerType : DISTRICT;
    const chromaScale = data.legendType === 'POSITIVE' ? 'YlGn':'OrRd'
    if (!data) return;

    if (!layerType && !_.isEmpty(data.state)) {
      type = STATE;
      this.setState({ layerType: STATE });
    } else if (!layerType) {
      this.setState({ layerType: DISTRICT });
    }

    // Parse data
    const apiData = type === DISTRICT ? data.district : data.state;
    let layer = type === DISTRICT ? distMap : stateMap;

    const colors = chroma.scale(chromaScale).colors(Object.keys(apiData).length);
    let max = Math.max.apply(
      Math,
      _.map(apiData, o =>
        isNaN(parseFloat(o[0].value)) ? 0 : parseFloat(o[0].value),
      ),
    );

    let min = Math.min.apply(
      Math,
      _.map(apiData, o =>
        isNaN(parseFloat(o[0].value)) ? 0 : parseFloat(o[0].value),
      ),
    );

    // Calculate color for each entity based on the value
    layer.styles.colors.paint['fill-color'].stops = [];
    _.each(apiData, (entity, name) => {
      layer.styles.colors.paint['fill-color'].stops.push([
        name,
        colors[
          Math.floor(
            (Object.keys(apiData).length * parseFloat(entity[0].value)) / max,
          )
        ] || colors[0],
      ]);
    });

    const step=(max-min)/9
    const legendColors = chroma.scale(chromaScale).colors(10);
    const legends = _.map(legendColors, (color, i) => {
      return {
        color:color,
        value: parseInt(min + Math.ceil(i*step)),
      }
    })
    // Send to Naksha
    this.setState({ layerData: [layer] });
    this.setState({ legends:legends.reverse() });
  };

  // Handle pop-up on hover over layer
  // _onMapHover = event => {
  //   const feature = event.features.find(f => f.layer.id === 'geography-layer');
  //   if (feature) {
  //     this.setState({
  //       showPopup: {
  //         lngLat: event.lngLat,
  //         properties: feature.properties,
  //       },
  //     });
  //   } else {
  //     this.setState({ showPopup: false });
  //   }
  // };

  handleLayerChange = e => {
    if (e.target.checked) {
      const layerType = e.target.id === STATE ? STATE : DISTRICT;
      this.setState({ layerType: layerType });
      this.updateMap(this.props.data, layerType);
    }
  };

  render() {
    const { viewport, legends, showPopup, layerType, layerData } = this.state;
    const { data } = this.props;
    const showLayers =
      !_.isEmpty(data) && !_.isEmpty(data.state) && !_.isEmpty(data.district);
    return (
      <div className="map-area">
        {/* Map */}
        <Naksha
          viewPort={{
            latitude: 21.17182424768975,
            longitude: 91.52421299825329,
            zoom: 3.4494111278786177,
            bearing: 0,
            pitch: 0,
          }}
          loadToC={true}
          showToC={false}
          mapboxApiAccessToken="pk.eyJ1IjoiZGVlcGt0IiwiYSI6ImNrYWRuZHdkdjBiOHYydG1iY3RyaW52ancifQ.7jlcNtPLOyIBA1GdOzLbfg"
          nakshaApiEndpoint="http://49.206.244.232/naksha-api/api"
          geoserver={{
            endpoint: 'http://49.206.244.232/naksha-api/api/geoserver',
            store: 'ibp',
            workspace: 'biodiv',
          }}
          externalLayers={layerData}
        />
        ;{/* Layers */}
        {showLayers && (
          <div className="layer-selector">
            <h4>Layers</h4>
            <div className="layer-selector-content">
              <div className="inputGroup">
                <input
                  id="STATE"
                  name="radio"
                  type="radio"
                  checked={layerType === STATE}
                  onChange={this.handleLayerChange}
                />
                <label for="STATE">State</label>
              </div>
              <div className="inputGroup">
                <input
                  id="DISTRICT"
                  name="radio"
                  type="radio"
                  checked={layerType === DISTRICT}
                  onChange={this.handleLayerChange}
                />
                <label for="DISTRICT">District</label>
              </div>
            </div>
          </div>
        )}
        {/* Legend */}
        {legends && (
          <div className="legend">
            {_.map(legends, (d, index) => {
              return (
                <div key={index}>
                  <span
                    style={
                      {
                        backgroundColor: d.color,
                      }
                    }
                  />
                  {d.value}
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
