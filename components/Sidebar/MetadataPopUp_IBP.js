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
	Tag,
	Link,
} from '@chakra-ui/core';

import AppConstant from '../../constant/AppConstant';
import { LayerContext } from '../../context/Layer';
import CollapsibleText from '../CollapsibleText';

function MetadatPopUpIBP() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [metadata, setMetadata] = useState();
	const { showMetadata, setShowMetadata } = useContext(LayerContext);

	useEffect(() => {
		if (showMetadata && showMetadata.isIbp) {
			onOpen();
			setMetadata(showMetadata);
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
					<Text isTruncated>IBP Layer Details</Text>
				</DrawerHeader>

				<DrawerBody overflowY="scroll">
					{metadata ? (
						<Box style={{ overflowY: 'scroll', height: '100vh' }} fontSize={14}>
							<Stack spacing={5}>
								<Stack spacing={0}>
									<Text fontSize="md" fontWeight="bold">
										{metadata.layerName}
									</Text>
								</Stack>
								<CollapsibleText fontSize="xs">{metadata.layerDescription}</CollapsibleText>
								<Stack spacing={0} mt="30px">
									<Text fontSize="xs">Layer Type</Text>
									<Text fontSize="sm">{metadata.layerType}</Text>
								</Stack>
								<Stack spacing={0}>
									<Text fontSize="xs">Created By</Text>
									<Text fontSize="sm">{metadata.createdBy}</Text>
								</Stack>
								<Stack spacing={0}>
									<Text fontSize="xs">Licence</Text>
									<Text fontSize="sm">{metadata.license}</Text>
								</Stack>
								<Stack spacing={0}>
									<Text fontSize="xs">Attribution</Text>
									<CollapsibleText fontSize="sm">{metadata.attribution}</CollapsibleText>
								</Stack>
								{metadata.tags && (
									<Stack spacing={0}>
										<Text fontSize="xs">Tags</Text>
										<Box>
											{_.map(metadata.tags.split(','), (tag, index) => (
												<Tag key={index} variant="subtle" size="sm" mr="3px" mb="3px">
													{tag}
												</Tag>
											))}
										</Box>
									</Stack>
								)}
								{/* {metadata.pdfLink && (
									<Stack spacing={0}>
										<Text fontSize="xs">PDF Link</Text>
										<Link fontSize="xs" color="teal.500" target="_blank" href={metadata.pdfLink}>
											View Document
										</Link>
									</Stack>
								)}
								<Stack spacing={0}>
									<Link fontSize="xs" color="teal.500" href="#">
										Download Layer
									</Link>
								</Stack> */}
							</Stack>
						</Box>
					) : (
						<LoadingSkeleton />
					)}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
export default MetadatPopUpIBP;
