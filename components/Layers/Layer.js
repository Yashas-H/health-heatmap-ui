import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, Info, X } from 'react-feather';
import _ from 'underscore';
import { Box, Stack, Text, Flex } from '@chakra-ui/core';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/core';

import { LayerContext } from '../../context/Layer';

function Layer({ layer }) {
	const { setSelectedLayers, selectedLayers, setShowMetadata } = useContext(LayerContext);
	const [opacity, setOpacity] = useState(100);

	const removeIndicator = (indicatorId) => {
		const filtredLayers = _.omit(selectedLayers, indicatorId);
		setSelectedLayers({ ...filtredLayers });
	};

	let delayTimer;

	useEffect(() => {
		const layers = { ...selectedLayers };
		layers[layer.indicator.id].styles.colors.paint['fill-opacity'] = opacity / 100;
		setSelectedLayers(layers);
	}, [opacity]);

	const onSliderChange = (value) => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			setOpacity(value);
		}, 500);
	};
	
	return (
		<Box className="layer-item" mb="12px" padding="10px">
			<Text fontWeight="bold" fontSize="13px">
				{layer.indicator.indicatorName}
			</Text>
			<Text fontWeight="300" fontSize="12px">
				Source: {layer.indicator.source}
			</Text>

			<Flex align="center">
				<Flex align="flex-end">
					<Stack isInline>
						{opacity ? (
							<Eye size={'20px'} cursor="pointer" onClick={(e) => setOpacity(0)} />
						) : (
							<EyeOff size={'20px'} cursor="pointer" onClick={(e) => setOpacity(100)} />
						)}
					</Stack>
				</Flex>
				<Flex size="70%" align="left" justify="center" mx="14px">
					<Slider defaultValue={opacity} onChange={onSliderChange}>
						<SliderTrack />
						<SliderFilledTrack />
						<SliderThumb />
					</Slider>
				</Flex>
				<Box>
					<Stack isInline spacing={3} shouldWrapChildren={true} color="#717171">
						<Info
							size={'20px'}
							cursor="pointer"
							onClick={(e) =>
								setShowMetadata({
									...layer.indicator,
									['indicator_universal_name']: layer.indicator.indicatorName,
								})
							}
						/>
						<X size={'20px'} onClick={(e) => removeIndicator(layer.indicator.id)} cursor="pointer" />
					</Stack>
				</Box>
			</Flex>
			<Box>
				{layer.indicator.legends && (
					<Flex isInline spacing={0} className="legend">
						{_.map(layer.indicator.legends, (d, index) => {
							return (
								<Box key={index} width={`${100 / 6}%`}>
									<Box
										className="palette"
										style={{
											backgroundColor: d.color,
										}}
									></Box>
									<Box textAlign="center">{d.value}</Box>
								</Box>
							);
						})}
					</Flex>
				)}
			</Box>
		</Box>
	);
}

export default Layer;
