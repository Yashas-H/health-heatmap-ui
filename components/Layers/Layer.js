import React, { useState } from 'react';
import { Eye, EyeOff, Info, X } from 'react-feather';

import { Box, Stack, Text, Flex } from '@chakra-ui/core';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/core';

function Layer({ layer }) {
	return (
		<Box className="layer-item" mb="10px" borderBottom="1px solid #dedede" padding="12px 16px">
			<Text fontWeight="bold" fontSize="13px">
				{layer.indicator.indicatorName}
			</Text>

			<Flex align="center">
				<Flex align="flex-end">
					<Stack isInline>
						<Eye size={'20px'} />
					</Stack>
				</Flex>
				<Flex size="70%" align="left" justify="center" mx="14px">
					<Slider defaultValue={30}>
						<SliderTrack />
						<SliderFilledTrack />
						<SliderThumb />
					</Slider>
				</Flex>
				<Box>
					<Stack isInline spacing={3} shouldWrapChildren={true} color="#717171">
						<Info size={'20px'} />
						<X size={'20px'} />
					</Stack>
				</Box>
			</Flex>
		</Box>
	);
}

export default Layer;
