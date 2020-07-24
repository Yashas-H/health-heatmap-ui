import React, { createContext, useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';

import AppConstant from '../constant/AppConstant';

export const LayerContext = createContext();
const LayerContextProvider = (props) => {
	const [selectedLayers, setSelectedLayers] = useState({});
	const [currentIndicatorData, setCurrentIndicatorData] = useState({});
	const [loadedData, setLoadedData] = useState({});
	const [showMetadata, setShowMetadata] = useState({});

	useEffect(() => {
		// console.log('selectedLayers', selectedLayers);
	}, [selectedLayers]);

	const loadIndicatorData = (indicator) => {
		// Get DATA
		request
			.post(`${AppConstant.config.appBaseUrl}/data`)
			.send({
				terms: {
					indicator_universal_name: [indicator.indicator_universal_name],
					source: [indicator.source],
				},
			})
			.then((res) => {
				let stateData = _.filter(res.body.data, (item) => item['entity.type'] === 'STATE');
				let districtData = _.filter(res.body.data, (item) => item['entity.type'] === 'DISTRICT');

				stateData = _.groupBy(stateData, (item) => item['entity.state']);
				districtData = _.groupBy(districtData, (item) => item['entity.district_map']);

				setCurrentIndicatorData({
					district: districtData,
					state: stateData,
					indicatorName: indicator.indicator_universal_name,
					legendType: indicator.indicator_positive_negative,
					id: indicator.id,
				});
				setLoadedData({
					...loadedData,
					[indicator.id]: {
						district: districtData,
						state: stateData,
						indicatorName: indicator.indicator_universal_name,
						legendType: indicator.indicator_positive_negative,
						id: indicator.id,
					},
				});
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	};

	return (
		<LayerContext.Provider
			value={{
				selectedLayers: selectedLayers,
				setSelectedLayers: setSelectedLayers,
				loadIndicatorData: loadIndicatorData,
				currentIndicatorData: currentIndicatorData,
				showMetadata: showMetadata,
				setShowMetadata: setShowMetadata,
			}}
		>
			{props.children}
		</LayerContext.Provider>
	);
};

export default LayerContextProvider;
