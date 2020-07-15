import React, { useState } from 'react';
import { Checkbox, Text, Icon, Stack } from '@chakra-ui/core';
import Highlight from 'react-highlighter';

function IndicatorItem({ indicator, index, onSelectIndicator, showMetadata, q }) {
	return (
		<Stack isInline spacing={1} align="center">
			<Icon name="info" size="18px" color="grey" cursor="pointer" onClick={e => showMetadata(indicator)} />
			<Checkbox
				variantColor="blue"
				fontSize="sm"
				onChange={(e) => onSelectIndicator(indicator, event.target.checked)}
				py={1}
			>
				<Text fontSize="sm">
					<Highlight search={q}>{indicator.indicator_universal_name}</Highlight>
				</Text>
			</Checkbox>
		</Stack>
	);
}

export default IndicatorItem;
