import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { Box, Text } from '@chakra-ui/core';
import Draggable from 'react-draggable';

function Layers() {

	useEffect(() => {}, []);

	return (
		<Draggable handle=".handle" position={null}>
			<Box>Layers</Box>
		</Draggable>
	);
}

export default Layers;
