import React, { useState } from 'react';
import { Checkbox, Text, Icon, Stack, Box } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import _ from 'underscore';

function IndicatorItem({ indicator, index, onSelectIndicator, showMetadata, q }) {
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
		<Stack>
			{!indicator.sources ? (
				<Stack isInline spacing="12px" align="center" my="3px">
					<InfoIcon />
					<Checkbox
						variantColor="blue"
						fontSize="sm"
						defaultIsChecked={indicator.checked}
						onChange={(e) => {
							indicator.checked = event.target.checked;
							onSelectIndicator(indicator, event.target.checked);
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
									defaultIsChecked={indicator.sources[i].checked}
									onChange={(e) => {
										indicator.sources[i].checked = event.target.checked;
										onSelectIndicator({ ...indicator, source: source.name }, event.target.checked);
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
