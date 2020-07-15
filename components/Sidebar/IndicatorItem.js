import React, { useState } from 'react';
import { Checkbox, Text } from '@chakra-ui/core';
import Highlight from "react-highlighter";

function IndicatorItem({ indicator, index, onSelectIndicator, q }) {
	return (
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
	);
}

export default IndicatorItem;
