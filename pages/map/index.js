import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'underscore';
import { Grid, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import DataGrid from '../../components/DataGrid';
import Filters from '../../components/Filters';

import Layout from '../../components/Layout';
import { LayerContext } from '../../context/Layer';

export function HomePage({ username, loading, error, repos, onSubmitForm, onChangeUsername }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const { currentIndicatorData } = useContext(LayerContext);

	return (
		<Layout>
			<article className="main-container">
				<Helmet>
					<title>Home Page</title>
					<meta name="description" content="Health Heat Map" />
				</Helmet>
				<div>
					<Grid gridTemplateColumns={'33% 1fr'} gap={0}>
						<Box>
							<Sidebar />
						</Box>

						<Box className="vis-right-column">
							{selectedTabIndex === 0 && <Filters />}
							<div className="visualization-area">
								{/* Visualization Area */}
								<Tabs>
									<TabList>
										<Tab>Map</Tab>
										{!_.isEmpty(currentIndicatorData) && <Tab>Table</Tab>}
									</TabList>

									<TabPanels>
										<TabPanel>
											{/* Map Component */}
											<Map />
										</TabPanel>
										<TabPanel>
											{!_.isEmpty(currentIndicatorData) && (
												<DataGrid IndicatorData={currentIndicatorData} />
											)}
										</TabPanel>
									</TabPanels>
								</Tabs>
							</div>
						</Box>
					</Grid>
				</div>
			</article>
		</Layout>
	);
}

export default HomePage;
