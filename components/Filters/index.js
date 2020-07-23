import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { Box, IconButton, Stack, CloseButton } from '@chakra-ui/core';

import { IconFilter } from '../Icons';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';

const settlement = ['Rural', 'Urban', 'Any'];
const caste = ['SC', 'ST', 'OBC', 'General', 'Others'];
const gender = ['Male', 'Female', 'Other'];

function Filters() {
	const [active, setActive] = useState(false);

	useEffect(() => {}, []);

	return (
		<Box className="filter-container">
			{active ? (
				<Box className="active">
					<Stack
						spacing={8}
						className="header-title"
						isInline
						justifyContent="space-between"
						alignItems="center"
					>
						<Stack isInline>
							<IconFilter display="inline" />
							<Box ml="10px">Filters</Box>
						</Stack>
						<CloseButton onClick={(e) => setActive(false)} />
					</Stack>
					<Box>
						<MultiSelect title="Settlement" filters={settlement} />
						<MultiSelect title="Caste" filters={caste} />
						<MultiSelect title="Gender" filters={gender} />
					</Box>
				</Box>
			) : (
				<IconButton
					className="icon"
					icon={IconFilter}
					size="sm"
					color="#2a69ac"
					background="#fff"
					onClick={(e) => setActive(true)}
				/>
			)}
		</Box>
	);
}

export default Filters;
