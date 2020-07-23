import React, { useState } from 'react';
import { Box, Stack, Text, Icon } from '@chakra-ui/core';
import { Eye, EyeOff, Info, X } from 'react-feather';
import { IconOpacity } from '../Icons';

function Layer({ layer }) {
	return (
		<Box className="layer-item">
			<Text fontWeight="bold" fontSize="12px">
				{layer.indicator.indicatorName}
			</Text>
			<Stack isInline spacing={3} shouldWrapChildren={true} color="#3182ce">
				<IconOpacity size={0.2} />
				<Eye size={'20px'} />
				<Info size={'20px'} />
				<X size={'20px'} />
			</Stack>
		</Box>
	);
}

export default Layer;
