import React, { useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';
import { Box, Skeleton, Stack } from '@chakra-ui/core';

import AppConstant from '../../constant/AppConstant';
import Accordion from './Accordion';
import Search from './Search';
import MetadataPopUp from './MetadataPopUp';

const filterIndicators = (groups, q) => {
	return _.filter(groups, (group) => {
		return _.filter(group.subs, (sub, key) => {
			if (key.toLowerCase().includes(q.toLowerCase())) return true;
			const indicators = _.filter(sub, (i) => {
				return i.indicator_universal_name.toLowerCase().includes(q.toLowerCase());
			});
			group.subs[key] = [...indicators];
			return indicators.length;
		}).length;
	});
};

function Sidebar() {
	const [indicators, setIndicators] = useState(false);
	const [filteredIndicators, setFilteredIndicators] = useState(false);
	const [metadata, setMetadata] = useState(false);
	const [q, setQ] = useState('');
	const [openAll, setOpenAll] = useState(false);

	useEffect(() => {
		setFilteredIndicators(q ? filterIndicators(JSON.parse(JSON.stringify(indicators)), q) : indicators);
	}, [q, indicators]);

	useEffect(() => {
		// Get Indicators
		request
			.post(`${AppConstant.config.appBaseUrl}/dimensions`)
			.send({
				fields: [
					'indicator_universal_name',
					'indicator_category',
					'indicator_subcategory',
					'indicator_positive_negative',
					'source',
				],
			})
			.then((res) => {
				const groups = _.groupBy(
					_.filter(
						res.body,
						(item) =>
							item.indicator_universal_name != '' && item.indicator_category && item.indicator_subcategory
					),
					'indicator_category'
				);
				const groupsWithSubs = [];
				_.each(groups, (group, key) => {
					// Remove duplicate indicators and group by source
					let dupes = _.groupBy(group, 'indicator_universal_name');
					dupes = _.map(dupes, (dupe) => {
						if (dupe.length > 1)
							return {
								...dupe[0],
								sources: _.map(dupe, (i) => ({
									name: i.source,
								})),
							};
						return dupe[0];
					});
					groupsWithSubs.push({
						name: key,
						count: dupes.length,
						subs: _.groupBy(dupes, 'indicator_subcategory'),
					});
				});
				setIndicators(groupsWithSubs);
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	}, []);

	const LoadingSkeleton = () => {
		return _.map(_.range(5), (i) => {
			return (
				<Box mx="20px" py="10px" width="70%" key={i}>
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="16px" mb="5px" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="12px" mb="5px" mr="10%" />
					<Skeleton colorStart="#a9a9a9" colorEnd="#bfbfbf" height="12px" mb="20px" mr="30%" />
				</Box>
			);
		});
	};

	const showMetadata = (ind) => {
		setMetadata(ind);
	};

	return (
		<div>
			<Box className="sidebar-container" pb="50px">
				<Box className="sidebar-header">
					<div className="searchbox">
						<Search onChange={setQ} disabled={!indicators} />
					</div>
					<Stack isInline spacing={8} align="right" className="expand-all-stack">
						<a className="expand-collapse-btn" onClick={(e) => setOpenAll(true)}>
							EXPAND ALL
						</a>
						<a className="expand-collapse-btn">|</a>
						<a className="expand-collapse-btn" onClick={(e) => setOpenAll(false)}>
							COLLAPSE ALL
						</a>
					</Stack>
				</Box>
				{indicators ? (
					<Box mt="10px" className="inidicator-list">
						<Box mx="7px">
							{_.map(filteredIndicators, (group, index) => (
								<Accordion
									key={index}
									group={group}
									index={index}
									q={q}
									showMetadata={showMetadata}
									openAll={openAll}
									setOpenAll={setOpenAll}
								/>
							))}
						</Box>
					</Box>
				) : (
					<LoadingSkeleton />
				)}
				<MetadataPopUp indicator={metadata} showMetadata={showMetadata} setMetadataOnClose={setMetadata} />
			</Box>
		</div>
	);
}

export default Sidebar;
