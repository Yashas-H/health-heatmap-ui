import React, { useState, useContext } from 'react';
import _ from 'underscore';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import { LayerContext } from '../../context/Layer';
import Map from '../../components/Map';
import DataGrid from '../../components/DataGrid';

function MapTabs() {
	const { loadedData, selectedLayers } = useContext(LayerContext);

	return (
		<Tabs>
			<TabList>
				<Tab>Map</Tab>
				{!_.isEmpty(loadedData) && <Tab>Table</Tab>}
			</TabList>

			<TabPanels>
				<TabPanel>
					{/* Map Component */}
					<Map />
				</TabPanel>
				<TabPanel>
					{!_.isEmpty(loadedData) && (
						<DataGrid indicatorsLoaded={loadedData} selectedLayers={selectedLayers} />
					)}
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
export default MapTabs;
