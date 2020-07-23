import React, { useState, useEffect, useContext } from 'react';
import chroma from 'chroma-js';
import _ from 'underscore';
import Naksha from 'naksha-component-react-restructured';

import Filters from '../Filters';
import { LayerContext } from '../../context/Layer';
import stateMap from './state.json';
import distMap from './district.json';

const DISTRICT = 'DISTRICT';
const STATE = 'STATE';

const Map = () => {
	const [legends, setLegends] = useState(false);
	const [layerType, setLayerType] = useState(false);
	const [externalLayers, setExternalLayers] = useState([]);
	const [showLayerSwitch, setShowLayerSwitch] = useState(false);
	const { setSelectedLayers, selectedLayers, currentIndicatorData } = useContext(LayerContext);

	useEffect(() => {
		if (!_.isEmpty(currentIndicatorData)) updateMap();
	}, [currentIndicatorData]);

	useEffect(() => {
	}, [externalLayers]);

	useEffect(() => {
		const selected = _.map(selectedLayers, (l, key) => ({ ...selectedLayers[key] }));
		setExternalLayers(selected);
	}, [selectedLayers]);

	const updateMap = (forceType) => {
		let data = currentIndicatorData;
		let type = forceType ? forceType : DISTRICT;
		const chromaScale = data.legendType === 'POSITIVE' ? 'YlGn' : 'OrRd';

		if (!forceType && !_.isEmpty(data.state)) {
			type = STATE;
		}
		setLayerType(type);
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
		layer.id = data.id;
		layer.styles.colors.id = data.id;
		layer.styles.colors.source = data.id;
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

		layer.indicator = {
			id: data.id,
			indicatorName: data.indicatorName,
			legendType: data.legendType,
			legends: l.reverse(),
		};

		let newlayerData = [...externalLayers];
		newlayerData.push({ ...layer });
		// setExternalLayers(newlayerData);
		setSelectedLayers(JSON.parse(JSON.stringify({ ...selectedLayers, [data.id]: layer })));
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
			const type = e.target.id === STATE ? STATE : DISTRICT;
			setLayerType(type);
			updateMap(type);
		}
	};

	return (
		<div className="map-area">
			{/* Map */}
			<Naksha
				viewPort={{
					latitude: 23.17182424768975,
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
				externalLayers={externalLayers}
			/>
			{/* Layers Switch */}
			{showLayerSwitch && (
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
			{/* Filters */}
			{!_.isEmpty(selectedLayers) && <Filters />}
		</div>
	);
};

export default Map;
