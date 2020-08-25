import React from 'react';
import _ from 'underscore';
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import Grid from './Grid';

function DataGrid({ indicatorsLoaded }) {
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
		<Tabs variant="enclosed" size="sm" mt="10px" mr="15px">
			<TabList>
				{_.map(indicatorsLoaded, (indicator, key) => (
					<DataTab key={key}>{indicator.indicatorName}</DataTab>
				))}
			</TabList>

			<TabPanels>
				{_.map(indicatorsLoaded, (indicator, key) => (
					<TabPanel key={key}>
						<Grid IndicatorData={indicator} />
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}
export default DataGrid;
