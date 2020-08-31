import React, { useState, useContext } from 'react';
import _ from 'underscore';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/core';

import { LayerContext } from '../../context/Layer';
import Map from '../../components/Map';
import DataGrid from '../../components/DataGrid';

function MapTabs() {
	const { loadedData, selectedLayers } = useContext(LayerContext);

	return (
		<Tabs>
			<TabList>
				<Tab>
					<Text fontWeight="bold" mt="8px">
						Map
					</Text>
				</Tab>
				{!_.isEmpty(loadedData) && (
					<Tab>
						<Text fontWeight="bold" mt="8px">
							Table
						</Text>
					</Tab>
				)}
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
