import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';
import { Stack } from '@chakra-ui/core';
import _ from 'underscore';

import IndicatorItem from './IndicatorItem';

function AccordionContent({ subgroup, name, index, onSelectIndicator, q, showMetadata }) {
	const [active, setActive] = useState(false);
	const chevron = active ? <ChevronDown /> : <ChevronRight />;
	return (
		<div>
			{subgroup.length ? (
				<li className="sub-group has-border">
					<div onClick={() => setActive(!active)} className="sub-group-header">
						{chevron} {name}
					</div>
					<Stack className={`indicators-list`} spacing={10}>
						{(active || q) &&
							_.map(subgroup, (indicator, index) => (
								<IndicatorItem
									indicator={indicator}
									index={index}
									key={index}
									onSelectIndicator={onSelectIndicator}
									q={q}
									showMetadata={showMetadata}
								/>
							))}
					</Stack>
				</li>
			) : null}
		</div>
	);
}

export default AccordionContent;
