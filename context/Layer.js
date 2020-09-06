import React, { createContext, useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';

import AppConstant from '../constant/AppConstant';

export const LayerContext = createContext();
const LayerContextProvider = (props) => {
	const [selectedLayers, setSelectedLayers] = useState({});
	const [currentIndicatorData, setCurrentIndicatorData] = useState({});
	const [loadedData, setLoadedData] = useState({});
	const [showMetadata, setShowMetadata] = useState(false);
	const [layersLoading, setLayersLoading] = useState([]);
	const [filtersAvailable, setfiltersAvailable] = useState({});

	const loadIndicatorData = (indicator) => {
		// Get DATA
		setLayersLoading([...layersLoading, indicator]);
		request
			.post(`${AppConstant.config.appBaseUrl}/data`)
			.send({
				terms: {
					['indicator.id']: [indicator['indicator.id']],
					['source.id']: [indicator['source.id']],
				},
			})
			.then((res) => {
				let stateData = _.filter(res.body.data, (item) => item['entity.type'] === 'STATE');
				let districtData = _.filter(res.body.data, (item) => item['entity.type'] === 'DISTRICT');

				stateData = _.groupBy(stateData, (item) => item['entity.Name']);
				districtData = _.groupBy(districtData, (item) => item['entity.Name']);
				setCurrentIndicatorData({
					district: districtData,
					state: stateData,
					indicatorName: indicator['indicator.id'],
					legendType: indicator['indicator.Positive/Negative'],
					source: indicator['source.id'],
					id: indicator.id,
				});
				setLoadedData({
					...loadedData,
					[indicator.id]: {
						district: districtData,
						state: stateData,
						indicatorName: indicator['indicator.id'],
						legendType: indicator['indicator.Positive/Negative'],
						id: indicator.id,
					},
				});
				setLayersLoading(JSON.parse(JSON.stringify(_.filter(layersLoading, (l) => indicator.id !== l.id))));
			})
			.catch((err) => {
				setLayersLoading(JSON.parse(JSON.stringify(_.filter(layersLoading, (l) => indicator.id !== l.id))));
				console.log('Error loading Data', err);
			});
	};

	const getFilterInfoForIndicator = (indicator) => {
		// Get filter info for indicatore
		request
			.post(`${AppConstant.config.appBaseUrl}/filters`)
			.send({
				terms: {
					['indicator.id']: [indicator.indicatorName],
					['source.id']: [indicator.source],
				},
			})
			.then((res) => {
				setfiltersAvailable({
					...filtersAvailable,
					[indicator.id]: res.body,
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
				layersLoading: layersLoading,
				setLayersLoading: setLayersLoading,
				loadedData: loadedData,
				filtersAvailable: filtersAvailable,
				getFilterInfoForIndicator: getFilterInfoForIndicator,
			}}
		>
			{props.children}
		</LayerContext.Provider>
	);
};

export default LayerContextProvider;
