import React, { useContext } from 'react';
import { Checkbox, Text, Icon, Stack, Box } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import { Info } from 'react-feather';
import _ from 'underscore';

import { LayerContext } from '../../context/Layer';

function IndicatorItem({ indicator, q }) {
	const { selectedLayers, setSelectedLayers, loadIndicatorData, setShowMetadata } = useContext(LayerContext);

	const selectIndicator = (i) => {
		console.log('i', i);
		const timer = setTimeout(() => {
			loadIndicatorData(i);
		}, 600);
		return () => clearTimeout(timer);
	};

	const deSelectIndicator = (indicatorId) => {
		const filtredLayers = _.omit(selectedLayers, indicatorId);
		setSelectedLayers({ ...filtredLayers });
	};

	return (
		<Stack className="indicator-item">
			{!indicator.sources ? (
				<Stack isInline spacing="3px" align="center" my="3px">
					<Box>
						<Info
							size={'18px'}
							cursor="pointer"
							onClick={(e) => setShowMetadata(indicator)}
							color="#717171"
						/>
					</Box>
					<Checkbox
						variantColor="blue"
						fontSize="sm"
						isChecked={selectedLayers[indicator.id]}
						onChange={(e) => {
							if (event.target.checked) selectIndicator(indicator);
							else deSelectIndicator(indicator.id);
						}}
						py={1}
					>
						<Text fontSize="sm">
							<Highlight
								search={q}
							>{`${indicator['indicator.id']} (${indicator['source.id']})`}</Highlight>
						</Text>
					</Checkbox>
				</Stack>
			) : (
				<Box>
					<Stack isInline spacing="3px" align="center" my="3px">
						<Box>
							<Info
								size={'18px'}
								cursor="pointer"
								onClick={(e) => setShowMetadata(indicator)}
								color="#717171"
							/>
						</Box>
						<Text fontSize="sm">
							<Highlight search={q}>{indicator['indicator.id']}</Highlight>
						</Text>
					</Stack>
					{_.map(indicator.sources, (source, i) => {
						return (
							<Stack ml="22px" key={i}>
								<Checkbox
									variantColor="blue"
									fontSize="sm"
									isChecked={selectedLayers[source.id]}
									onChange={(e) => {
										if (event.target.checked)
											selectIndicator({ ...indicator, id: source.id, ['source.id']: source.name });
										else deSelectIndicator(source.id);
									}}
									py={1}
								>
									<Text fontSize="sm">
										<Highlight search={q}>Source: {source.name}</Highlight>
									</Text>
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
