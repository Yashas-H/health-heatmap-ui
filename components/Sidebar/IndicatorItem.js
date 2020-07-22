import React, { useContext } from 'react';
import { Checkbox, Text, Icon, Stack, Box } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import _ from 'underscore';

import { LayerContext } from '../../context/Layer';

function IndicatorItem({ indicator, showMetadata, q }) {
	const { selectedLayers, layerLoading, loadIndicatorData } = useContext(LayerContext);
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
	return (
		<Stack className="indicator-item">
			{!indicator.sources ? (
				<Stack isInline spacing="12px" align="center" my="3px">
					<InfoIcon />
					<Checkbox
						variantColor="blue"
						fontSize="sm"
						isChecked={
							_.find(
								selectedLayers,
								(l) => indicator.indicator_universal_name + indicator.source === l.id
							) !== undefined || layerLoading === indicator.indicator_universal_name + indicator.source
						}
						onChange={(e) => {
							// indicator.checked = event.target.checked;
							if (event.target.checked) loadIndicatorData(indicator);
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
										_.find(
											selectedLayers,
											(l) => indicator.indicator_universal_name + source.name === l.id
										) !== undefined ||
										layerLoading === indicator.indicator_universal_name + source.name
									}
									onChange={(e) => {
										// indicator.sources[i].checked = event.target.checked;
										if (event.target.checked) loadIndicatorData({...indicator, source:source.name});
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
