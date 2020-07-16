import React, { useEffect, useState } from 'react';
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

function MetadatPopUp({ indicator }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [metadata, setMetadata] = useState();

	useEffect(() => {
		if (indicator) {
			onOpen();
			setMetadata(false);
			// Get Indicator metadata
			request
				.get(`${AppConstant.config.appBaseUrl}/indicators/${encodeURI(indicator.indicator_universal_name)}`)
				.then((res) => {
					setMetadata(res.body);
				})
				.catch((err) => {
					console.log('Error loading Data', err);
				});
		}
	}, [indicator]);

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
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
							{indicator.indicator_universal_name}
						</Text>
					</Text>
					{metadata ? (
						<div style={{ overflowY: 'scroll', height: '100vh' }}>
							<Stack spacing={5}>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Category
									</Text>
									<Text>{metadata.indicator_category}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Sub Category
									</Text>
									<Text>{metadata.indicator_subcategory}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Type
									</Text>
									<Text>{metadata.indicator_type || 'N/A'}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										Definition
									</Text>
									<Text>{metadata.indicator_definition || 'N/A'}</Text>
								</Text>
								<Text fontSize={14}>
									<Text fontWeight="bold" color="gray.500">
										+ve/-ve
									</Text>
									<Text>{metadata.indicator_positive_negative}</Text>
								</Text>
							</Stack>
							{metadata.source_specific && (
								<Box my="20px">
									<Text fontWeight="bold" color="gray.500">
										Source Specific Info
									</Text>
									<Accordion allowToggle allowMultiple defaultIndex={[]}>
										{_.map(metadata.source_specific, (source, name) => (
											<AccordionItem key={source}>
												<AccordionHeader>
													<Box flex="1" textAlign="left">
														{name}
													</Box>
													<AccordionIcon />
												</AccordionHeader>
												<AccordionPanel pb={4}>
													{_.map(source, (data, key) => (
														<Text fontSize={14}>
															<Text fontWeight="bold" color="gray.500">
																{key}
															</Text>
															<Text>{data[key] || "N/A"}</Text>
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
