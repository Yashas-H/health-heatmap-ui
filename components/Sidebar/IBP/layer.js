import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import { Box, Button, Image, Stack, Text, Badge, Tooltip } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import { Info } from 'react-feather';

import { FALLBACK_THUMB } from '../../Icons';
import { LayerContext } from '../../../context/Layer';

function Layer({ layer, q, onAddToMap, selectedLayers, layersLoading }) {
	const [selected, setSelected] = useState(false);
	const { setShowMetadata } = useContext(LayerContext);

	useEffect(() => {
		setSelected(
			_.indexOf(_.keys(selectedLayers), layer.id) >= 0 || _.findWhere(layersLoading, { id: layer.id })
				? true
				: false
		);
	}, [selectedLayers, layersLoading]);

	return (
		<Stack key={layer.id} spacing="1" borderBottom="1px" borderColor="gray.200" p={0} padding="6px">
			<Stack isInline={true} spacing="2" p={0}>
				<Image
					objectFit="contain"
					flexShrink={0}
					size="5rem"
					src={layer.thumbnail}
					fallbackSrc={FALLBACK_THUMB}
				/>
				<Box p={1}>
					<Stack
						isInline
						spacing={1}
						cursor="pointer"
						onClick={(e) => setShowMetadata({ ...layer, isIbp: true })}
					>
						<Box mt="2px">
							<Info size={'16px'} color="#717171" />
						</Box>
						<Text mb={1} fontSize="15px" fontWeight="bold">
							<Highlight search={q}>{layer.layerName}</Highlight>
						</Text>
					</Stack>

					<Tooltip label={layer.layerDescription}>
						<Box fontSize="sm" color="gray.600" className="ibp-layer-description">
							{layer.layerDescription}
						</Box>
					</Tooltip>
				</Box>
			</Stack>
			<Box display="flex" alignItems="center" justifyContent="space-between" mx={1} p={1}>
				<Box fontSize="xs">
					<Badge variant="outline" variantColor="green" fontSize={10} mr={1}>
						{layer.license}
					</Badge>
				</Box>
				<Text fontSize="12px">Source: IBP</Text>
				<Button
					size="xs"
					minW="5rem"
					variantColor="blue"
					variant={selected ? 'solid' : 'outline'}
					onClick={(e) => onAddToMap(layer, selected)}
					isLoading={_.findWhere(layersLoading, { id: layer.id })}
				>
					{selected ? 'Remove from Map' : 'Add to Map'}
				</Button>
			</Box>
		</Stack>
	);
}

export default Layer;
