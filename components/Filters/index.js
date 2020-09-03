import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { Box, Stack, CloseButton } from '@chakra-ui/core';

import { IconFilter } from '../Icons';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';

const settlement = ['Rural', 'Urban', 'Any'];
const caste = ['SC', 'ST', 'OBC', 'General', 'Others'];
const gender = ['Male', 'Female', 'Other'];

function Filters() {
	return (
		<Box className="filter-container">
			<Box className="active">
				<Box>
					<MultiSelect title="Settlement" filters={settlement} />
					<MultiSelect title="Caste" filters={caste} />
					<MultiSelect title="Gender" filters={gender} />
				</Box>
			</Box>
		</Box>
	);
}

export default Filters;
