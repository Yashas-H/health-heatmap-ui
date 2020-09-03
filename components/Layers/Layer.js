import React, { useState, useContext, useEffect, useRef } from 'react';
import { Eye, EyeOff, Info, X, Layers } from 'react-feather';
import _ from 'underscore';
import { Box, Stack, Text, Flex, Icon } from '@chakra-ui/core';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip } from '@chakra-ui/core';

import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from '@chakra-ui/core';
import { List, ListItem, ListIcon } from '@chakra-ui/core';

import formatMapData from '../../helper/formatMapData';
import { LayerContext } from '../../context/Layer';
import { IconFilter } from '../Icons';
import Filters from '../Filters';

function Layer({ layer, layerIndex, dragHandleProps, onDuplicateLayer }) {
	const { setSelectedLayers, selectedLayers, setShowMetadata } = useContext(LayerContext);
	const [opacity, setOpacity] = useState(100);
	const [layers, setLayers] = useState(false);
	const [isFilters, showFilters] = useState(false);
	const [selectedLayer, setSelectedLayer] = useState(false);
	const initRef = useRef();

	let delayTimer;

	useEffect(() => {
		if (!layer.indicator) return;
		if (!_.isEmpty(layer.indicator.data.state) && !_.isEmpty(layer.indicator.data.district)) {
			setLayers(['State', 'District']);
			setSelectedLayer('State');
		}
	}, []);

	useEffect(() => {
		const l = { ...selectedLayers };
		const lid = layer.isIbp ? layer.id : layer.indicator.id;
		if (!l[lid].styles) return;

		l[lid].styles.colors.paint['fill-opacity'] = opacity / 100;
		setSelectedLayers(l);
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
		const layersData = JSON.parse(JSON.stringify(selectedLayers));
		layersData[layer.indicator.id] = {
			...layersData[layer.indicator.id],
			...formatMapData(layer.indicator.data, value.toUpperCase(), opacity),
		};
		setSelectedLayers(JSON.parse(JSON.stringify(layersData)));
	};

	const handleDuplicateLayer = (l) => {
		const sl = { ...selectedLayers };
		let layerOrder = _.keys(selectedLayers);
		sl[`${l.__id}-DUPE`] = {
			...l,
			id: `${l.__id}-DUPE`,
			__id: `${l.__id}-DUPE`,
			indicator: { ...l.indicator, id: `${l.__id}-DUPE` },
			styles: {
				...l.styles,
				__id: `${l.__id}-DUPE`,
				colors: { ...l.styles.colors, id: `${l.__id}-DUPE`, source: `${l.__id}-DUPE` },
			},
		};
		layerOrder.splice(_.indexOf(layerOrder, l.id), 0, `${l.__id}-DUPE`);
		let newItems = {};
		_.each(layerOrder, (lo) => (newItems[lo] = sl[lo]));
		setSelectedLayers(JSON.parse(JSON.stringify(newItems)));
	};

	const handleShowMetadata = (e) => {
		const metdataInfo = layer.isIbp
			? { ...layer }
			: { ...layer.indicator, ['indicator.id']: layer.indicator.indicatorName };
		setShowMetadata(metdataInfo);
	};
	return (
		<Box className="layer-item" padding="10px">
			<Stack isInline>
				<Stack isInline {...dragHandleProps} width="100%">
					<Icon name="drag-handle" size="16px" color="#7f7e7e" mt="6px" />
					<Box>
						<Text fontWeight="bold" fontSize="13px">
							{layer.indicator ? layer.indicator.indicatorName : layer.layerName}
						</Text>
						<Text fontWeight="300" fontSize="12px">
							Source: {layer.indicator ? layer.indicator['source.id'] : layer.createdBy}
						</Text>
					</Box>
				</Stack>
				<Stack>
					{/* <Tooltip label="Duplicate Layer">
						<Icon
							name="copy"
							cursor="pointer"
							size="16px"
							color="#707070"
							onClick={(e) => handleDuplicateLayer(layer)}
						/>
					</Tooltip> */}
				</Stack>
			</Stack>

			<Flex align="center">
				<Flex size="70%" align="left" justify="center" mx="14px">
					<Slider defaultValue={opacity} onChange={onSliderChange}>
						<SliderTrack />
						<SliderFilledTrack />
						<SliderThumb>
							<Tooltip label="Layer Opacity">
								<Box
									backgroundColor="blue.500"
									borderWidth="4px"
									rounded="6px"
									borderColor="blue.500"
								/>
							</Tooltip>
						</SliderThumb>
					</Slider>
				</Flex>
				<Box>
					<Stack isInline spacing={3} shouldWrapChildren={true} color="#717171">
						<Flex align="flex-end">
							<Tooltip label="Show/Hide Layer">
								<Stack isInline>
									{opacity ? (
										<Eye size={'20px'} cursor="pointer" onClick={(e) => setOpacity(0)} />
									) : (
										<EyeOff size={'20px'} cursor="pointer" onClick={(e) => setOpacity(100)} />
									)}
								</Stack>
							</Tooltip>
						</Flex>
						{layers ? (
							<Popover initialFocusRef={initRef}>
								{({ isOpen, onClose }) => (
									<>
										<PopoverTrigger>
											{/* <Tooltip label="Switch Layer Data"> */}
											<Layers size={'20px'} cursor="pointer" />
											{/* </Tooltip> */}
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
						) : (
							<Layers size={'20px'} cursor="not-allowed" color="#dcdcdc" />
						)}
						<Tooltip label="Filters">
							<Box
								cursor="pointer"
								className={`${isFilters ? 'filter-btn-active' : ''}`}
								onClick={(e) => showFilters(!isFilters)}
							>
								<IconFilter />
							</Box>
						</Tooltip>
						<Tooltip label="Layer Information" zIndex="9">
							<Info size={'20px'} cursor="pointer" onClick={handleShowMetadata} />
						</Tooltip>
						<Tooltip label="Remove Layer" zIndex="9">
							<Icon
								name="delete"
								size="16px"
								color="#7f7e7e"
								mt="6px"
								onClick={(e) => removeIndicator(layer.indicator ? layer.indicator.id : layer.id)}
								cursor="pointer"
							/>
						</Tooltip>
					</Stack>
				</Box>
			</Flex>

			{/* Fiters Area */}
			{isFilters && (
				<Box>
					<Filters />
				</Box>
			)}

			<Box>
				{layer.indicator && layer.indicator.legends && (
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
