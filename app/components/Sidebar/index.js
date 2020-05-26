import React, { useState, useEffect } from 'react';
import { Search } from 'react-feather';
import request from 'superagent';
import _ from 'underscore';

import './style.scss';
// import indicators from 'data/indicators.json';
import AppConstant from "constant/AppConstant";
import Accordion from './Accordion';

function Sidebar({onSelectIndicator}) {
  const [active, setActive] = useState(false);
  const [indicators, setIndicators] = useState(false);

  useEffect(() => {
    // Get Indicators
    request
      .get(AppConstant.config.appBaseUrl + '/indicators')
      .then(res => {
        // res.body, res.headers, res.status
        const groups = _.groupBy(res.body, 'group');
        const groupsWithSubs = [];
        _.each(groups, (group, key) => {
          groupsWithSubs.push({
            name: key,
            subs: _.groupBy(group, 'subGroup'),
          });
        });
        setIndicators(groupsWithSubs)
      })
      .catch(err => {
        console.log('Error loading Covid Data', err)
      });
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <p>Indicators</p>
      </div>
      <div className="searchbox">
        <input type="text" id="search-bar" placeholder="Search" />
        <a className="search-icon" href="#">
          <Search />
        </a>
      </div>
      {_.map(indicators, (group, index) => (
        <Accordion key={index} group={group} index={index} onSelectIndicator={onSelectIndicator}/>
      ))}
    </div>
  );
}

export default Sidebar;
