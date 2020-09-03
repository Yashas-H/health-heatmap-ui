import React, { useState } from 'react';
import _ from 'underscore';
import { Checkbox, Box, Stack } from '@chakra-ui/core';

function MultiSelect({ filters, title }) {
	return (
		<Box className="filter-block-container">
			<h2 className="filter-type-title">{title}</h2>
			<Stack isInline spacing={1}>
				{_.map(filters, (filter, index) => {
					return (
						<Checkbox key={index} size="sm" variantColor="blue" defaultIsChecked>
							{filter}
						</Checkbox>
					);
				})}
			</Stack>
		</Box>
	);
}

export default MultiSelect;
