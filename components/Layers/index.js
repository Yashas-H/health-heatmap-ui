import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Box, Stack, Text, Skeleton } from '@chakra-ui/core';

import { LayerContext } from '../../context/Layer';
import LayerStack from './Stack';

function Layers() {
	const [active, setActive] = useState(true);
	const { selectedLayers, setSelectedLayers, layersLoading } = useContext(LayerContext);

	const LoadingSkeleton = () => {
		return (
			<Box width="100%">
				<Stack isInline spacing="6px" height="20px">
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" width="30px" height="100%" mb="6px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" width="100%" height="100%" mb="6px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" width="30px" height="100%" mb="6px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" width="30px" height="100%" mb="6px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" width="30px" height="100%" mb="6px" />
				</Stack>

				<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="10px" mt="10px" />
				<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="10px" mt="6px" />
			</Box>
		);
	};

	const onLayerOrderChange = (newOrder) => {
		let newList = {};
		_.each(newOrder, (item) => {
			newList[item.__id] = item;
		});
		setSelectedLayers({ ...newList });
	};

	return (
		<Box className="layer-container" fontSize="12px" fontWeight="300" width={active ? '400px' : '140px'}>
			{active ? (
				<Box>
					<Box className="layer-close" onClick={(e) => setActive(false)}>
						<ArrowDown size="18px" />
					</Box>
					<Stack className="layer-stack" marginTop="-28px">
						<Stack className="layer-loading-stack">
							{_.map(layersLoading, (layer) => (
								<Stack
									key={layer.id}
									spacing="5px"
									padding="10px 10px"
									fontSize="13px"
									fontWeight="bold"
									className="layer-item"
								>
									<Text>{layer.isIbp ? layer.layerName : layer.indicator_universal_name}</Text>
									<Text fontWeight="300" fontSize="12px">
										Source: {layer.isIbp ? layer.createdBy : layer.source}
									</Text>
									<LoadingSkeleton />
								</Stack>
							)).reverse()}
						</Stack>
						<LayerStack layers={selectedLayers} updateLayerOrder={onLayerOrderChange} />
					</Stack>
				</Box>
			) : (
				<Box>
					<Box
						spacing={2}
						className="header-title"
						isInline
						cursor="pointer"
						padding="6px"
						onClick={(e) => setActive(true)}
					>
						<Stack isInline spacing={2} mt="5px" justifyContent="space-between">
							<Stack isInline>
								<ArrowUp size="18px" />
								<Text ml="6px">INDICATORS</Text>
							</Stack>
							<Text className="count-badge">{_.keys(selectedLayers).length}</Text>
						</Stack>
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default Layers;
