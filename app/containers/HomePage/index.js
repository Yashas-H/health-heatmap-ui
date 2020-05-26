/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'underscore';
import Select from 'react-select';

import 'react-tabs/style/react-tabs.css';
import './style.scss';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import Sidebar from 'components/Sidebar';
import Map from 'components/Map';
import DateRangeSelector from 'components/DateRangeSelector';
import Filters from 'components/Filters';
import LineChart from 'components/LineChart';
import BarChart from 'components/BarChart';
import request from 'superagent';

import AppConstant from 'constant/AppConstant';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

const indicatorSelectStyles = {
  control: base => ({
    ...base,
    height: 30,
    minHeight: 30,
  }),
};

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // States
  const [districts, setDistricts] = useState({});
  const [loadedData, setLoadedData] = useState({}); // TODO: Move to Redux
  const [data, setData] = useState({});
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if (username && username.trim().length > 0) onSubmitForm();
    // Get district list from API
    request
      .get(`${AppConstant.config.appBaseUrl}/geography?type=DISTRICT`)
      .set('Content-Type', 'application/json')
      .then(res => {
        setDistricts(res.body);
      })
      .catch(err => {
        console.log('Error loading districts data', err);
      });
  }, []);

  const parseData = groupedData => {
    let geoData = _.groupBy(
      groupedData,
      item => item.geography.canonicalName,
    );
    geoData = _.mapObject(geoData, (arr, index) => {
      for (let i = 0; i < arr.length; i++) {
        // TODO: Make it Switch case
        if(!arr[i].settlement) return arr[0]; break;
        if (arr[i].settlement.settlement === 'ANY') {
          return arr[i];
          break;
        }
        if (arr[i].settlement.settlement === 'RURAL') {
          return arr[i];
          break;
        }
        if (arr[i].settlement.settlement === 'URBAN') {
          return arr[i];
          break;
        }
      }
      return arr[0];
    });
    return geoData;
  };

  const loadData = (indicator, checked) => {
    // If Unchecked show the first indicator data if exists
    if (!checked) {
      const loadedDataWithoutUnchecked = _.omit(loadedData, indicator.id);
      if (!_.isEmpty(loadedDataWithoutUnchecked)) {
        setData(
          loadedDataWithoutUnchecked[_.keys(loadedDataWithoutUnchecked)[0]],
        );
        setLoadedData({ ...loadedDataWithoutUnchecked });
        return;
      }
      setLoadedData({ ...loadedDataWithoutUnchecked });
      setData({});
      return;
    }

    // Load data from memory if already loaded for selected indicator
    if (loadedData[indicator.id] && !_.isEmpty(loadedData[indicator.id])) {
      setData(loadedData[indicator.id]);
      return;
    }

    const allId = _.map(districts, district => district.id);

    // Get DATA
    request
      .get(`${AppConstant.config.appBaseUrl}/data`)
      .set('Content-Type', 'application/json')
      .query({ indicator: indicator.id })
      // .query({ geography: allId.join(',') })
      // .query({ source: 1 })
      .then(res => {
        let geoTypeData = _.groupBy(res.body.data, item => {
          return item.geography.type;
        });
        
        // Parse Data
        const districtData = parseData(geoTypeData.DISTRICT);
        const stateData = parseData(geoTypeData.STATE);
        setData({
          district:districtData,
          state:stateData,
          indicatorName: indicator.canonicalName,
          indicatorId: indicator.id,
        });
        setLoadedData({
          ...loadedData,
          [indicator.id]: {
            district:districtData,
            state:stateData,
            indicatorName: indicator.canonicalName,
            indicatorId: indicator.id,
          },
        });
      })
      .catch(err => {
        console.log('Error loading Data', err);
      });
  };

  // Get indicator drop down selector
  const indicatorList = _.map(loadedData, (item, key) => {
    return{
      label:item.indicatorName,
      value:key,
    }
  });

  const handleChangeIndicator = selectedOption => {
    setData({...loadedData[selectedOption.value]});
  };

  const handleSelectTab = (index, lastIndex, e) => {
    setSelectedTabIndex(index);
  };

  return (
    <article className="main-container">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Health Heat Map" />
      </Helmet>
      <div>
        <div className="row">
          <div className="column column-33">
            <Sidebar onSelectIndicator={loadData} />
          </div>

          <div className="column column-67 vis-right-column">
            {selectedTabIndex === 0 && <Filters />}
            <div className="visualization-area">
              {/* Visualization Area */}
              <Tabs onSelect={handleSelectTab}>
                <div className="row">
                  <div className="column column-33">
                    <TabList>
                      <Tab>Map</Tab>
                      <Tab>Bar</Tab>
                      {/* <Tab>Line</Tab> */}
                    </TabList>
                  </div>
                  <div className="column column-77 pull-right">
                    <div className="vis-menu-area">
                      <DateRangeSelector />
                    </div>
                  </div>
                </div>

                <TabPanel>
                  {/* Map Dropdown/Title */}
                  {data.indicatorName && (
                    <div className="indicator-selector">
                      <Select
                        className="indicator-dropdown"
                        classNamePrefix="select"
                        name="indicatorSelect"
                        options={indicatorList}
                        defaultValue={{value:data.indicatorId, label:data.indicatorName}}
                        value={{value:data.indicatorId, label:data.indicatorName}}
                        selected={{value:data.indicatorId, label:data.indicatorName}}
                        onChange={handleChangeIndicator}
                        isClearable={false}
                        isSearchable={true}
                        styles={indicatorSelectStyles}
                      />
                    </div>
                  )}
                  {/* Map Component */}
                  <Map data={data}/>
                </TabPanel>
                <TabPanel>
                  <BarChart
                    data={data.district}
                    availableIndicators={loadedData}
                  />
                </TabPanel>
                {/* <TabPanel>
                  <LineChart data={statesData.states_daily}/>
                </TabPanel> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
