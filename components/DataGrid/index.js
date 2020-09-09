import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

import Grid from './Grid';

function DataGrid({ indicatorsLoaded, selectedLayers }) {
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		setTabIndex(_.indexOf(_.keys(indicatorsLoaded), _.keys(selectedLayers)[0]));
	}, [selectedLayers]);

	const handleTabsChange = (index) => {
		setTabIndex(index);
	};

	const DataTab = React.forwardRef((props, ref) => {
		// `isSelected` is passed to all children of `TabList`.
		return (
			<Tab ref={ref} isSelected={props.isSelected} {...props}>
				<Box>
					<Text fontSize="11px">{props.children}</Text>
				</Box>
			</Tab>
		);
	});
	return (
		<Tabs variant="enclosed" index={tabIndex} onChange={handleTabsChange} size="sm" mt="10px" mr="15px">
			<TabList>
				{_.map(indicatorsLoaded, (indicator, key) => (
					<DataTab key={key}>{`${indicator.indicatorName} (${indicator.source})`}</DataTab>
				))}
			</TabList>

			<TabPanels>
				{_.map(indicatorsLoaded, (indicator, key) => (
					<TabPanel key={`${key}_${uuidv4()}`}>
						<Grid IndicatorData={indicator} />
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}
export default DataGrid;
