import React, { useState, useEffect } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';
import request from 'superagent';
import chroma from 'chroma-js';

import _ from 'underscore';
import Naksha from 'naksha-component-react-restructured';

import stateMap from './state.json';
import distMap from './district.json';

const DISTRICT = 'DISTRICT';
const STATE = 'STATE';

const Map = ({ data }) => {
	const [legends, setLegends] = useState(false);
	const [layerType, setLayerType] = useState(false);
	const [layerData, setLayerData] = useState([]);
	const [prevData, setPrevData] = useState({});

	const showLayers = !_.isEmpty(data) && !_.isEmpty(data.state) && !_.isEmpty(data.district);

	useEffect(() => {
		if (_.isEmpty(data) && _.isEmpty(data.state) && _.isEmpty(data.district)) {
			return;
		}
		if (data.indicatorId != prevData.indicatorId) updateMap();
		setPrevData(data);
	}, [data]);

	const updateMap = () => {
		let type = layerType ? layerType : DISTRICT;
		const chromaScale = data.legendType === 'POSITIVE' ? 'YlGn' : 'OrRd';
		if (!data) return;

		if (!layerType && !_.isEmpty(data.state)) {
			type = STATE;
			setLayerType(STATE);
		} else if (!layerType) {
			setLayerType(DISTRICT);
		}

		// Parse data
		const apiData = type === DISTRICT ? data.district : data.state;
		let layer = type === DISTRICT ? distMap : stateMap;

		const colors = chroma.scale(chromaScale).colors(Object.keys(apiData).length);
		let max = Math.max.apply(
			Math,
			_.map(apiData, (o) => (isNaN(parseFloat(o[0].value)) ? 0 : parseFloat(o[0].value)))
		);

		let min = Math.min.apply(
			Math,
			_.map(apiData, (o) => (isNaN(parseFloat(o[0].value)) ? 0 : parseFloat(o[0].value)))
		);

		// Calculate color for each entity based on the value
		layer.id = data.indicatorId;
		layer.styles.colors.id = data.indicatorId;
		layer.styles.colors.source = data.indicatorId;
		layer.styles.colors.paint['fill-color'].stops = [];
		_.each(apiData, (entity, name) => {
			layer.styles.colors.paint['fill-color'].stops.push([
				name,
				colors[Math.floor((Object.keys(apiData).length * parseFloat(entity[0].value)) / max)] || colors[0],
			]);
		});

		const step = (max - min) / 9;
		const legendColors = chroma.scale(chromaScale).colors(10);
		const l = _.map(legendColors, (color, i) => {
			return {
				color: color,
				value: parseInt(min + Math.ceil(i * step)),
			};
		});
		// Send to Naksha
		let preLayerData = layerData;
		preLayerData.push({...layer});
		setLayerData(preLayerData);
		setLegends(l.reverse());
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

	const handleLayerChange = (e) => {
		if (e.target.checked) {
			const layerType = e.target.id === STATE ? STATE : DISTRICT;
			this.setState({ layerType: layerType });
			this.updateMap(this.props.data, layerType);
		}
	};

	return (
		<div className="map-area">
			{/* Map */}
			<Naksha
				viewPort={{
					latitude: 23.17182424768975,
					longitude: 81.52421299825329,
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
			{/* Layers */}
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
								onChange={handleLayerChange}
							/>
							<label for="STATE">State</label>
						</div>
						<div className="inputGroup">
							<input
								id="DISTRICT"
								name="radio"
								type="radio"
								checked={layerType === DISTRICT}
								onChange={handleLayerChange}
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
									style={{
										backgroundColor: d.color,
									}}
								/>
								{d.value}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Map;
