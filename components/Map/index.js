import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import Naksha from 'naksha-component-react-restructured';

import { LayerContext } from '../../context/Layer';
import Filters from '../Filters';
import Layers from '../Layers';

import formatMapData from '../../helper/formatMapData';
import AppConstant from '../../constant/AppConstant';

const Map = () => {
	const [externalLayers, setExternalLayers] = useState([]);
	const { setSelectedLayers, selectedLayers, currentIndicatorData, layersLoading } = useContext(LayerContext);

	useEffect(() => {
		if (!_.isEmpty(currentIndicatorData)) updateMap();
	}, [currentIndicatorData]);

	useEffect(() => {
		updateExternalLayers();
	}, [selectedLayers]);

	const updateExternalLayers = _.debounce((e) => {
		const selected = _.map(selectedLayers, (l, key) => ({ ..._.omit(selectedLayers[key], 'indicator') }));
		setExternalLayers(selected.reverse());
	}, 500);

	const updateMap = () => {
		let data = currentIndicatorData;
		let type = _.isEmpty(data.state) ? 'DISTRICT' : 'STATE';
		const layer = formatMapData(data, type);

		let newlayerData = [...externalLayers];
		newlayerData.unshift({ ...layer });
		setSelectedLayers(JSON.parse(JSON.stringify({ [data.id]: layer, ...selectedLayers })));
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
				nakshaApiEndpoint={AppConstant.config.nakshaApi}
				geoserver={{
					endpoint: `${AppConstant.config.nakshaApi}/geoserver`,
					store: 'ibp',
					workspace: 'biodiv',
				}}
				// hiddenLayers={[{ id: 254 }, { id: 255 }]}
				externalLayers={externalLayers}
			/>

			{/* Layers */}
			{(!_.isEmpty(selectedLayers) || !_.isEmpty(layersLoading)) && <Layers />}

			{/* Filters */}
			{/* {!_.isEmpty(selectedLayers) && <Filters />} */}
		</div>
	);
};

export default Map;
