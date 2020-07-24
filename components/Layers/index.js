import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Box, Stack, Text } from '@chakra-ui/core';

import { LayerContext } from '../../context/Layer';
import Layer from './Layer';
function Layers() {
	const [active, setActive] = useState(true);
	const { selectedLayers, setSelectedLayers } = useContext(LayerContext);

	useEffect(() => {}, []);

	return (
		<Box className="layer-container" fontSize="12px" fontWeight="300">
			{active ? (
				<Box>
					<Box className="layer-close" onClick={(e) => setActive(false)}>
						<ArrowDown size="18px" />
					</Box>
					<Stack marginTop="-28px" className="layer-stack">
						{_.map(selectedLayers, (layer) => <Layer key={layer.indicator.id} layer={layer} />).reverse()}
					</Stack>
				</Box>
			) : (
				<Box>
					<Stack
						spacing={2}
						className="header-title"
						isInline
						cursor="pointer"
						padding="10px"
						onClick={(e) => setActive(true)}
					>
						<ArrowUp size="18px" />
						<Box ml="5px">INDICATORS</Box>
					</Stack>
				</Box>
			)}
		</Box>
	);
}

export default Layers;
