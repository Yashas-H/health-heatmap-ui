import React, { useState } from 'react';
import _ from 'underscore';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/core';

function MultiSelect({ filters, title }) {
	return (
		<div className="filter-block-container">
			<h2 className="filter-type-title">{title}</h2>
			<Stack spacing={1}>
				{_.map(filters, (filter, index) => {
					return (
						<Checkbox key={index} size="md" variantColor="blue" defaultIsChecked>
							{filter}
						</Checkbox>
					);
				})}
			</Stack>
		</div>
	);
}

export default MultiSelect;
