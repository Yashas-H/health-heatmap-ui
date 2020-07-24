import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import AccordionContent from './AccordionContent';
import { Box, Text, Stack } from '@chakra-ui/core';

function Accordion({ group, openAll, setOpenAll, q }) {
	const [active, setActive] = useState(false);
	const chevron = active ? <ChevronDown /> : <ChevronRight />;

	useEffect(() => {
		if (openAll !== 'tralse') setActive(openAll);
	}, [openAll]);

	return (
		<Box>
			<ul className="accordion-container">
				<div
					className="accordion-header"
					onClick={() => {
						setOpenAll('tralse');
						setActive(!active);
					}}
				>
					<Stack isInline spacing={2} mt="5px" justifyContent="space-between">
						<Stack isInline>
							<span className="sub-group-chevy">{chevron}</span>
							<Text>{group.name} </Text>
						</Stack>
						<Text className="count-badge">{group.count}</Text>
					</Stack>
				</div>
				<Box display={active || q ? 'block' : 'none'}>
					{_.map(group.subs, (sub, key) => (
						<Box key={key} className="sub-group-accordion">
							<AccordionContent
								subgroup={sub}
								name={key}
								key={key}
								q={q}
								openAll={openAll}
								setOpenAll={setOpenAll}
							/>
						</Box>
					))}
				</Box>
			</ul>
		</Box>
	);
}

export default Accordion;
