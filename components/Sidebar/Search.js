import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/core';

function Search() {
	return (
		<InputGroup size="sm">
			<InputLeftElement children={<Icon name="search" color="gray.300"/>} />
			<Input type="text" placeholder="Search" size="sm"/>
		</InputGroup>
	);
}
export default Search;
