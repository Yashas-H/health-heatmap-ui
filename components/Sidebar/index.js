import React, { useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';

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

function Sidebar({ onSelectIndicator }) {
	const [indicators, setIndicators] = useState(false);
	const [filteredIndicators, setFilteredIndicators] = useState(false);
	const [metadata, setMetadata] = useState(false);
	const [q, setQ] = useState();

	useEffect(() => {
		console.log('indicators', indicators);
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
					groupsWithSubs.push({
						name: key,
						subs: _.groupBy(group, 'indicator_subcategory'),
					});
				});
				setIndicators(groupsWithSubs);
			})
			.catch((err) => {
				console.log('Error loading Data', err);
			});
	}, []);

	const showMetadata = (ind) => {
		setMetadata(ind);
	};

	return (
		<div>
			<div className="sidebar-container">
				{/* <div className="sidebar-header">
        <p>Indicators</p>
      </div> */}
				<div className="searchbox">
					<Search onChange={setQ} />
				</div>
				{_.map(filteredIndicators, (group, index) => (
					<Accordion
						key={index}
						group={group}
						index={index}
						q={q}
						onSelectIndicator={onSelectIndicator}
						q={q}
						showMetadata={showMetadata}
					/>
				))}
			</div>
			<MetadataPopUp indicator={metadata} />
		</div>
	);
}

export default Sidebar;
