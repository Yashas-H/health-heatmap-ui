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
					<Stack>
						{_.map(selectedLayers, (layer) => (
							<Layer layer={layer} />
						))}
					</Stack>
				</Box>
			) : (
				<Stack
					spacing={2}
					className="header-title"
					isInline
					justifyContent="space-between"
					cursor="pointer"
					onClick={(e) => setActive(true)}
				>
					<Stack isInline>
						<Box ml="10px">LAYERS</Box>
					</Stack>
					<ArrowUp size="18px" />
				</Stack>
			)}
		</Box>
	);
}

export default Layers;
