import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'underscore';
import Select from 'react-select';
import { Grid, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import DataGrid from '../../components/DataGrid';
import Filters from '../../components/Filters';
import request from 'superagent';

import AppConstant from '../../constant/AppConstant';
import Layout from '../../components/Layout';
const key = 'home';

const indicatorSelectStyles = {
	control: (base) => ({
		...base,
		height: 30,
		minHeight: 30,
	}),
};

export function HomePage({ username, loading, error, repos, onSubmitForm, onChangeUsername }) {
	// States
	const [loadedData, setLoadedData] = useState({}); // TODO: Move to Redux
	const [data, setData] = useState({});
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const loadData = (indicator, checked) => {
		// If Unchecked show the first indicator data if exists
		const indicatorId = indicator.indicator_universal_name + indicator.source;
		if (!checked) {
			const loadedDataWithoutUnchecked = _.omit(loadedData, indicatorId);
			if (!_.isEmpty(loadedDataWithoutUnchecked)) {
				setData(loadedDataWithoutUnchecked[_.keys(loadedDataWithoutUnchecked)[0]]);
				setLoadedData({ ...loadedDataWithoutUnchecked });
				return;
			}
			setLoadedData({ ...loadedDataWithoutUnchecked });
			setData({});
			return;
		}

		// Load data from memory if already loaded for selected indicator
		if (loadedData[indicatorId] && !_.isEmpty(loadedData[indicatorId])) {
			setData(loadedData[indicatorId]);
			return;
		}

		// Get DATA
		request
			.post(`${AppConstant.config.appBaseUrl}/data`)
			.send({
				terms: {
					indicator_universal_name: [indicator.indicator_universal_name],
					source: [indicator.source],
				},
			})
			.then((res) => {
				// let geoTypeData = _.groupBy(res.body.data, item => {
				//   return item.geography.type;
				// });
				let stateData = _.filter(res.body.data, (item) => item['entity.type'] === 'STATE');
				let districtData = _.filter(res.body.data, (item) => item['entity.type'] === 'DISTRICT');

				stateData = _.groupBy(stateData, (item) => item['entity.state']);
				districtData = _.groupBy(districtData, (item) => item['entity.district_map']);

				setData({
					district: districtData,
					state: stateData,
					indicatorName: indicator.indicator_universal_name,
					legendType: indicator.indicator_positive_negative,
					indicatorId,
				});
				setLoadedData({
					...loadedData,
					[indicatorId]: {
						district: districtData,
						state: stateData,
						indicatorName: indicator.indicator_universal_name,
						legendType: indicator.indicator_positive_negative,
						indicatorId,
					},
				});
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	};

	// Get indicator drop down selector
	const indicatorList = _.map(loadedData, (item, key) => ({
		label: item.indicatorName,
		value: key,
	}));

	const handleChangeIndicator = (selectedOption) => {
		setData({ ...loadedData[selectedOption.value] });
	};

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
							<Sidebar onSelectIndicator={loadData} />
						</Box>

						<Box className="vis-right-column">
							{selectedTabIndex === 0 && <Filters />}
							<div className="visualization-area">
								{/* Visualization Area */}
								{/* Map Dropdown/Title */}
								{data.indicatorName && (
									<div className="indicator-selector">
										<Select
											className="indicator-dropdown"
											classNamePrefix="select"
											name="indicatorSelect"
											options={indicatorList}
											defaultValue={{
												value: data.indicatorId,
												label: data.indicatorName,
											}}
											value={{
												value: data.indicatorId,
												label: data.indicatorName,
											}}
											selected={{
												value: data.indicatorId,
												label: data.indicatorName,
											}}
											onChange={handleChangeIndicator}
											isClearable={false}
											isSearchable
											styles={indicatorSelectStyles}
										/>
									</div>
								)}

								<Tabs>
									<TabList>
										<Tab>Map</Tab>
										<Tab>Data</Tab>
									</TabList>

									<TabPanels>
										<TabPanel>
											{/* Map Component */}
											<Map data={data} />
										</TabPanel>
										<TabPanel>
											{/* Data Grid Component */}
											<DataGrid IndicatorData={data} />
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
