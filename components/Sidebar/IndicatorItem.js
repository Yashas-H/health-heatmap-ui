import React, { useState } from 'react';
import { Checkbox, Text, Icon, Stack, Link } from '@chakra-ui/core';
import Highlight from 'react-highlighter';
import _ from 'underscore';

function IndicatorItem({ indicator, index, onSelectIndicator, showMetadata, q }) {
	return (
		<Stack isInline spacing={1} align="center">
			{indicator.sources ? (
				<Icon name="info" size="18px" color="grey" />
			) : (
				<Icon name="info" size="18px" color="grey" cursor="pointer" onClick={(e) => showMetadata(indicator)} />
			)}
			<Checkbox
				variantColor="blue"
				fontSize="sm"
				onChange={(e) => onSelectIndicator(indicator, event.target.checked)}
				py={1}
			>
				<Text fontSize="sm">
					<Highlight search={q}>{indicator.indicator_universal_name}</Highlight>
				</Text>
				<Text fontSize="sm">
					Source:
					{indicator.sources &&
						_.map(indicator.sources, (source) => {
							return (
								<Link
									fontSize={12}
									color="white"
									bg="grey"
									mx="5px"
									my="8px"
									padding="3px"
									borderRadius="2px"
									onClick={(e) => showMetadata({ ...indicator, source: source })}
								>
									{source}
								</Link>
							);
						})}
				</Text>
			</Checkbox>
		</Stack>
	);
}

export default IndicatorItem;
