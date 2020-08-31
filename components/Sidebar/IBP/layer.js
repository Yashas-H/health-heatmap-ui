import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { Box, Button, Image, Stack, Text, Badge, Tooltip } from '@chakra-ui/core';
import Highlight from 'react-highlighter';

import { FALLBACK_THUMB } from '../../Icons';

function Layer({ layer, q, onAddToMap, selectedLayers, layersLoading }) {
	const [selected, setSelected] = useState(false);
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
				<Box p={3}>
					<Tooltip label={layer.layerDescription}>
						<div>
							<Text mb={1}>
								<Highlight search={q}>{layer.layerName}</Highlight>
							</Text>
							<Box fontSize="sm" color="gray.600" className="ibp-layer-description">
								{layer.layerDescription}
							</Box>
						</div>
					</Tooltip>
				</Box>
			</Stack>
			<Box display="flex" alignItems="center" justifyContent="space-between" mx={1}>
				<Box fontSize="xs">
					<Badge variant="outline" variantColor="green" fontSize={10} mr={1}>
						{layer.license}
					</Badge>
				</Box>
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
