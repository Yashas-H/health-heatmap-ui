import React, { useState, useContext, useEffect, useRef } from 'react';
import { Eye, EyeOff, Info, X, Layers } from 'react-feather';
import _ from 'underscore';
import { Box, Stack, Text, Flex, Icon } from '@chakra-ui/core';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/core';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/core';
import { List, ListItem, ListIcon } from '@chakra-ui/core';

import formatMapData from '../../helper/formatMapData';
import { LayerContext } from '../../context/Layer';

function Layer({ layer, dragHandleProps }) {
	const { setSelectedLayers, selectedLayers, setShowMetadata } = useContext(LayerContext);
	const [opacity, setOpacity] = useState(100);
	const [layers, setLayers] = useState(false);
	const [selectedLayer, setSelectedLayer] = useState(false);
	const initRef = useRef();

	let delayTimer;

	useEffect(() => {
		if (!_.isEmpty(layer.indicator.data.state) && !_.isEmpty(layer.indicator.data.district)) {
			setLayers(['State', 'District']);
			setSelectedLayer('State');
		}
	}, []);

	useEffect(() => {
		const layers = { ...selectedLayers };
		layers[layer.indicator.id].styles.colors.paint['fill-opacity'] = opacity / 100;
		setSelectedLayers(layers);
	}, [opacity]);

	const removeIndicator = (indicatorId) => {
		const filtredLayers = _.omit(selectedLayers, indicatorId);
		setSelectedLayers({ ...filtredLayers });
	};

	const onSliderChange = (value) => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			setOpacity(value);
		}, 500);
	};

	const onLayerChange = (value) => {
		setSelectedLayer(value);
		const layersData = { ...selectedLayers };
		layersData[layer.indicator.id] = {
			...layersData[layer.indicator.id],
			...formatMapData(layer.indicator.data, value.toUpperCase(), opacity),
		};
		setSelectedLayers(layersData);
	};

	return (
		<Box className="layer-item" padding="10px">
			<Stack isInline {...dragHandleProps}>
				<Icon name="drag-handle" size="16px" color="#7f7e7e" mt="6px"/>
				<Box>
					<Text fontWeight="bold" fontSize="13px">
						{layer.indicator.indicatorName}
					</Text>
					<Text fontWeight="300" fontSize="12px">
						Source: {layer.indicator.source}
					</Text>
				</Box>
			</Stack>

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
						<SliderThumb>
							<Box backgroundColor="blue.500" borderWidth="4px" rounded="6px" borderColor="blue.500" />
						</SliderThumb>
					</Slider>
				</Flex>
				<Box>
					<Stack isInline spacing={3} shouldWrapChildren={true} color="#717171">
						{layers && (
							<Popover initialFocusRef={initRef}>
								{({ isOpen, onClose }) => (
									<>
										<PopoverTrigger>
											<Layers size={'20px'} cursor="pointer" />
										</PopoverTrigger>
										<PopoverContent zIndex={4} width="150px">
											<PopoverArrow />
											{/* <PopoverCloseButton /> */}
											{/* <PopoverHeader>Layers</PopoverHeader> */}
											<PopoverBody fontSize="14px">
												<List spacing={1}>
													{_.map(layers, (l) => {
														return (
															<ListItem
																cursor="pointer"
																onClick={(e) => {
																	onClose();
																	onLayerChange(l);
																}}
																ref={initRef}
															>
																<ListIcon
																	icon="check-circle"
																	color={
																		selectedLayer === l ? 'green.500' : '#ffffff00'
																	}
																/>
																{l}
															</ListItem>
														);
													})}
												</List>
											</PopoverBody>
										</PopoverContent>
									</>
								)}
							</Popover>
						)}
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
