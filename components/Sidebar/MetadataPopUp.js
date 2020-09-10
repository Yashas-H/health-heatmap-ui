import React, { useEffect, useState, useContext } from 'react';
import _ from 'underscore';
import request from 'superagent';
import {
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Stack,
	Box,
	Skeleton,
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/core';

import AppConstant from '../../constant/AppConstant';
import { LayerContext } from '../../context/Layer';
import { getSecondPartOrSame } from 'helper/stringUtils';

function MetadatPopUp() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [metadata, setMetadata] = useState();
	const { showMetadata, setShowMetadata } = useContext(LayerContext);

	useEffect(() => {
		if (showMetadata && !showMetadata.isIbp) {
			onOpen();
			setMetadata(false);
			// Get Indicator metadata
			request
				.get(`${AppConstant.config.appBaseUrl}/indicators/${encodeURI(showMetadata['indicator.id'])}`)
				.then((res) => {
					setMetadata(res.body);
				})
				.catch((err) => {
					console.log('Error loading Data', err);
				});
		}
	}, [showMetadata]);

	const LoadingSkeleton = () => {
		return _.map(_.range(5), (i) => {
			return (
				<Box key={i}>
					<Skeleton colorStart="#a9a9a9" colorEnd="#c7c7c7" height="16px" mb="5px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#c7c7c7" height="22px" mb="40px" width="50%" />
				</Box>
			);
		});
	};

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={(e) => {
				setShowMetadata(false);
				onClose();
			}}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>
					<Text isTruncated>Indicator Details</Text>
				</DrawerHeader>

				<DrawerBody overflowY="scroll">
					<Text fontSize={14} mb="14px">
						<Text fontWeight="bold" color="gray.500">
							Indicator Name
						</Text>
						<Text fontSize={14} fontWeight="bold">
							{showMetadata['indicator.id']}
						</Text>
					</Text>
					{metadata ? (
						<div style={{ overflowY: 'scroll', height: '100vh' }}>
							<Stack spacing={5}>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Category
									</Text>
									<Text>{metadata["indicator.Category"]}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Sub Category
									</Text>
									<Text>{metadata["indicator.Sub-Category"]}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Definition
									</Text>
									<Text>{metadata["indicator.Definition"] || 'N/A'}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										+ve/-ve
									</Text>
									<Text>{metadata["indicator.Positive/Negative"]}</Text>
								</Text>
							</Stack>
							{metadata.source_specific && (
								<Box my="20px">
									<Text fontWeight="bold" color="gray.500">
										Source Specific Info
									</Text>
									<Accordion allowToggle allowMultiple defaultIndex={[]}>
										{_.pairs(metadata.source_specific).map(([key, val]) => (
											<AccordionItem key={key}>
												<AccordionHeader>
													<Box flex="1" textAlign="left">
														{key}
													</Box>
													<AccordionIcon />
												</AccordionHeader>
												<AccordionPanel pb={4}>
													{_.pairs(val).map(([prop, value]) => (
														<Text fontSize={14}>
															<Text fontWeight="bold" color="gray.500">
																{getSecondPartOrSame(prop)}
															</Text>
															<Text>{value || 'N/A'}</Text>
														</Text>
													))}
												</AccordionPanel>
											</AccordionItem>
										))}
									</Accordion>
								</Box>
							)}
						</div>
					) : (
						<LoadingSkeleton />
					)}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
export default MetadatPopUp;
