import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import _ from 'underscore';

import AccordionContent from './AccordionContent';
import { Box, Text } from '@chakra-ui/core';

function Accordion({ group, openAll, setOpenAll, q, showMetadata }) {
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
					<Text>
						<span>{chevron}</span>
						{group.name}{' '}
						<Text as="sup" fontWeight="300">
							{group.count}
						</Text>
					</Text>
				</div>
				<Box display={active || q ? 'block' : 'none'}>
					{_.map(group.subs, (sub, key) => (
						<Box key={key} className="sub-group-accordion">
							<AccordionContent
								subgroup={sub}
								name={key}
								key={key}
								q={q}
								showMetadata={showMetadata}
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
