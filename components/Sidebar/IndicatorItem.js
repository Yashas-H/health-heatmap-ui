import React, { useContext } from 'react';
import { Checkbox, Text, Icon, Stack, Box } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import _ from 'underscore';

import { LayerContext } from '../../context/Layer';

function IndicatorItem({ indicator, showMetadata, q }) {
	const { selectedLayers, layerLoading, loadIndicatorData, setLayerLoading } = useContext(LayerContext);

	const InfoIcon = () => {
		return (
			<Icon
				name="info"
				size="18px"
				color="grey"
				cursor="pointer"
				mr="8px"
				onClick={(e) => showMetadata(indicator)}
				alignContent="top"
			/>
		);
	};

	const selectIndicator = (i) => {
		setLayerLoading(i.id);
		const timer = setTimeout(() => {
			loadIndicatorData(i);
		}, 600);
		return () => clearTimeout(timer);
	};

	return (
		<Stack className="indicator-item">
			{!indicator.sources ? (
				<Stack isInline spacing="12px" align="center" my="3px">
					<InfoIcon />
					<Checkbox
						variantColor="blue"
						fontSize="sm"
						isChecked={
							_.find(selectedLayers, (l) => indicator.id === l.id) !== undefined ||
							layerLoading === indicator.id
						}
						onChange={(e) => {
							if (event.target.checked) selectIndicator(indicator);
						}}
						py={1}
					>
						<Text fontSize="sm">
							<Highlight search={q}>{indicator.indicator_universal_name}</Highlight>
						</Text>
					</Checkbox>
				</Stack>
			) : (
				<Box>
					<Stack isInline spacing={1} align="center" my="3px">
						<InfoIcon showMetadata={showMetadata} />
						<Text fontSize="sm">
							<Highlight search={q}>{indicator.indicator_universal_name}</Highlight>
						</Text>
					</Stack>
					{_.map(indicator.sources, (source, i) => {
						return (
							<Stack ml="24px" key={i}>
								<Checkbox
									variantColor="blue"
									fontSize="sm"
									isChecked={
										_.find(selectedLayers, (l) => source.id === l.id) !== undefined ||
										layerLoading === source.id
									}
									onChange={(e) => {
										if (event.target.checked)
											selectIndicator({ ...indicator, id: source.id, source: source.name });
									}}
									py={1}
								>
									<Text fontSize="sm">Source: {source.name}</Text>
								</Checkbox>
							</Stack>
						);
					})}
				</Box>
			)}
		</Stack>
	);
}

export default IndicatorItem;
