import chroma from 'chroma-js';
import _ from 'underscore';

import stateMap from '../data/state.json';
import distMap from '../data/district.json';

const DISTRICT = 'DISTRICT';
const STATE = 'STATE';

export default function formatMapData(data, type, opacity) {
	const layerId = data.id;
	const chromaScale = data.legendType === 'POSITIVE' ? 'YlGn' : 'OrRd';
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
	layer.__id = layerId;
	layer.properties = apiData;
	layer.id = `${layerId}-${type}`;
	layer.styles.colors.id = `${layerId}-${type}`;
	layer.styles.colors.source = `${layerId}-${type}`;
	layer.styles.colors.paint['fill-opacity'] = opacity ? opacity / 100 : 1;
	layer.styles.colors.paint['fill-color'].stops = [];
	_.each(apiData, (entity, name) => {
		const color = isNaN(entity[0].value)
			? '#a5a5a5'
			: colors[Math.floor((Object.keys(apiData).length * parseFloat(entity[0].value)) / max) - 1] || colors[0];
		layer.styles.colors.paint['fill-color'].stops.push([name, color]);
	});

	const step = (max - min) / 5;
	const legendColors = chroma.scale(chromaScale).colors(6);
	const l = _.map(legendColors, (color, i) => {
		return {
			color: color,
			value: parseInt(min + Math.ceil(i * step)),
		};
	});

	layer.indicator = {
		id: layerId,
		indicatorName: data.indicatorName,
		legendType: data.legendType,
		source: data.source,
		data: data,
		legends: l.reverse(),
	};
	return layer;
}
