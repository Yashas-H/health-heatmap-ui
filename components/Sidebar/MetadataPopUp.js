import React, { useEffect } from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Stack,
	Link,
} from '@chakra-ui/core';
function MetadatPopUp({ indicator }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if(indicator) onOpen();
	}, [indicator]);

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				{/* <DrawerHeader>{indicator.indicator_universal_name}</DrawerHeader> */}

				<DrawerBody>
					<div style={{ overflowY: 'scroll', height: '100vh' }}>
						<Stack spacing={5}></Stack>
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
export default MetadatPopUp;
