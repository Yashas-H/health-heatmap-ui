import React, { useState } from 'react';
import { Checkbox, Text } from '@chakra-ui/core';

function IndicatorItem({ indicator, index, onSelectIndicator }) {
	return (
		<Checkbox
			variantColor="blue"
			fontSize="sm"
			onChange={(e) => onSelectIndicator(indicator, event.target.checked)}
			py={1}
		>
			<Text fontSize="sm">{indicator.indicator_universal_name}</Text>
		</Checkbox>
	);
}

export default IndicatorItem;
