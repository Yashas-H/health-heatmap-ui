import React, { useState, useEffect, useContext } from 'react';
import request from 'superagent';
import _ from 'underscore';
import { Box, Stack } from '@chakra-ui/core';

import AppConstant from '../../../constant/AppConstant';
import Search from '../Search';
import Layer from './layer';
import { LayerContext } from '../../../context/Layer';

const filterLayers = (layers, q) => {
	return _.filter(layers, (layer) => {
		return (
			layer.layerName.toLowerCase().includes(q.toLowerCase()) ||
			layer.layerDescription.toLowerCase().includes(q.toLowerCase())
		);
	});
};

function IBPLayers() {
	const [q, setQ] = useState(false);
	const [layers, setLayers] = useState([]);
	const [filteredLayers, setFilteredLayers] = useState(false);
	const { selectedLayers, setSelectedLayers, layersLoading, setLayersLoading } = useContext(LayerContext);

	useEffect(() => {
		// Get IBP Layers
		request
			.get(`${AppConstant.config.nakshaApi}/layer/all`)
			.then((res) => {
				setLayers(
					_.map(res.body, (l) => ({
						...l,
						id: `IBP-Layer-${l.id}`,
						__id: `IBP-Layer-${l.id}`,
						isAdded: false,
					}))
				);
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	}, []);

	useEffect(() => {
		setFilteredLayers(q ? filterLayers(JSON.parse(JSON.stringify(layers)), q) : layers);
	}, [q, layers]);

	useEffect(() => {
		console.log('selectedLayers', selectedLayers);
	}, [selectedLayers]);

	const handleToggleLayer = (layer) => {
		const __layers = [...layers];
		const index = _.findIndex(layers, (l) => l.id === layer.id);
		__layers[index].isAdded = !__layers[index].isAdded;
		if (__layers[index].isAdded) {
			// Add IBP Layer
			// setSelectedLayers(JSON.parse(JSON.stringify({ [layer.id]: { ...layer, isIbp: true }, ...selectedLayers })));
			setLayersLoading([...layersLoading, { ...layer, isIbp: true }]);
			getLayerStyles(__layers[index]);
		} else {
			// Remove IBP Layer
			const filtredLayers = _.omit(selectedLayers, layer.id);
			setSelectedLayers({ ...filtredLayers });
		}
		setLayers(__layers);
	};

	const removeThisLayerFromLoadingStack = (layer) => {
		setLayersLoading(JSON.parse(JSON.stringify(_.filter(layersLoading, (l) => layer.id !== l.id))));
	};

	const getLayerStyles = async (layer) => {
		// Get IBP Layer Styles
		let stylesProps = {};
		let styles = {};
		try {
			stylesProps = await request.get(
				`${AppConstant.config.nakshaApi}/geoserver/layers/${layer.layerTableName}/styles`
			);
		} catch (err) {
			removeThisLayerFromLoadingStack(layer);
			console.log('Error loading Styleprops', err);
		}
		try {
			styles = await request.get(
				`${AppConstant.config.nakshaApi}/geoserver/styles/${
					layer.layerTableName
				}/${layer.colorBy.toLowerCase()}`
			);
		} catch (err) {
			removeThisLayerFromLoadingStack(layer);
			console.log('Error loading Styles', err);
		}
		removeThisLayerFromLoadingStack(layer);
		stylesProps = stylesProps.body[0];
		styles = styles.body;
		setSelectedLayers(
			JSON.parse(
				JSON.stringify({
					[layer.id]: {
						...layer,
						id: layer.id,
						isIbp: true,
						styles: {
							...styles.layers[0],
							...stylesProps,
							id: layer.id,
							colors: { ...styles.layers[0], ...stylesProps, id: layer.id, source: layer.id },
						},
					},
					...selectedLayers,
				})
			)
		);
	};

	return (
		<div>
			<Box className="sidebar-container" pb="50px">
				<Box className="sidebar-header">
					<div className="searchbox">
						<Search onChange={setQ} disabled={!layers} placeholder="Filter layers by name" />
					</div>
				</Box>

				<Box mt="10px" className="inidicator-list">
					<Stack>
						{_.map(filteredLayers, (layer) => (
							<Layer key={layer.id} layer={layer} q={q} onAddToMap={handleToggleLayer} />
						))}
					</Stack>
				</Box>
			</Box>
		</div>
	);
}

export default IBPLayers;
