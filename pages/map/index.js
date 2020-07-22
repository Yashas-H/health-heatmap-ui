import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'underscore';
import { Grid, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import DataGrid from '../../components/DataGrid';
import Filters from '../../components/Filters';

import Layout from '../../components/Layout';

export function HomePage({ username, loading, error, repos, onSubmitForm, onChangeUsername }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
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
										<Tab>Table</Tab>
									</TabList>

									<TabPanels>
										<TabPanel>
											{/* Map Component */}
											<Map/>
										</TabPanel>
										<TabPanel>
											<DataGrid IndicatorData={[]} />
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
