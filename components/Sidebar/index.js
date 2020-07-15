import React, { useState, useEffect } from 'react';
import request from 'superagent';
import _ from 'underscore';

import AppConstant from '../../constant/AppConstant';
import Accordion from './Accordion';
import Search from './Search';

function Sidebar({ onSelectIndicator }) {
  const [active, setActive] = useState(false);
  const [indicators, setIndicators] = useState(false);

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
      .then(res => {
        const groups = _.groupBy(
          _.filter(
            res.body,
            item =>
              item.indicator_universal_name != '' &&
              item.indicator_category &&
              item.indicator_subcategory,
          ),
          'indicator_category',
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
      .catch(err => {
        console.log('Error loading Data', err);
      });
  }, []);

  return (
    <div className="sidebar-container">
      {/* <div className="sidebar-header">
        <p>Indicators</p>
      </div> */}
      <div className="searchbox">
        <Search/>
      </div>
      {_.map(indicators, (group, index) => (
        <Accordion
          key={index}
          group={group}
          index={index}
          onSelectIndicator={onSelectIndicator}
        />
      ))}
    </div>
  );
}

export default Sidebar;
