import React, { useState } from 'react';
import {Bar, defaults} from 'react-chartjs-2';
import moment from 'moment';
import _ from 'underscore';
import Select from 'react-select';

import './style.scss';
// import districts from 'data/allDistrictNames.json'

const SelectorStyles = {
  control: base => ({
    ...base,
    // height: 35,
    minHeight: 35,
    maxHeight: 120,
    overflowY: 'scroll'
  }),
};

function BarChart({data, availableIndicators}) {
  defaults.global.elements.line.fill = false;

  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = 'nearest';
  defaults.global.tooltips.position = 'average';
  defaults.global.tooltips.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  defaults.global.tooltips.displayColors = false;
  defaults.global.tooltips.borderColor = '#c62828';
  defaults.global.tooltips.borderWidth = 1;
  defaults.global.tooltips.titleFontColor = '#000';
  defaults.global.tooltips.bodyFontColor = '#000';
  defaults.global.tooltips.caretPadding = 4;
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = 'nearest';
  defaults.global.tooltips.position = 'nearest';

  defaults.global.legend.display = true;
  defaults.global.legend.position = 'bottom';

  defaults.global.hover.intersect = false;

  const [graphData, setGraphData] = useState({});
  const [axis, setAxis] = useState({});

  if (!data || data.length === 0) {
    return <div></div>;
  }


  const colors = [
    '#ff073a',
    '#28a745',
    '#342ead',
    '#7D5BA6',
    '#DD7596',
    '#16c8f0',
    '#f67575',
    '#2b580c',
    '#9D44B5',
    '#91132d',
    '#6D9DC5',
    '#2b580c',
    '#6c757d',
    '#f67575',
    '#d4f8e8',
  ];

  const updateGraph = () => {
    const {entities, groups} = axis;
    const datasetTemplate = {
      label: 'Data Set Default Label',
      backgroundColor: 'rgba(255,99,132,0.2)',
      // borderColor: 'rgba(255,99,132,1)',
      // borderWidth: 1,
      // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      // hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }

    /**Create Labels */
    const labels = _.map(entities, entity => {
      return entity.label
    });

    /**Create Datasets */
    const datasets = _.map(groups, (group, index) => {
      return {
        ...datasetTemplate,
        label:group.label,
        backgroundColor: colors[index],
        data:_.map(entities, entity =>{
          // availableIndicators[group.value]
          return availableIndicators[entity.value].district[group.value] ?
                 parseFloat(availableIndicators[entity.value].district[group.value].value ): 0
        })
      }
    });

    setGraphData({
      labels: labels,
      datasets: datasets,
    })
  }

  const options = {
    responsive: true,
    events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 20,
      },
    },
    scales: {
      yAxes: [
        {
          type: 'linear',
          ticks: {
            beginAtZero: true,
            max: undefined,
            precision: 0,
          },
          scaleLabel: {
            display: false,
            labelString: 'Total Cases',
          },
        },
      ],
      xAxes: [
        {
          // type: 'time',
          // time: {
          //   unit: 'day',
          //   tooltipFormat: 'MMM DD',
          //   stepSize: 7,
          //   displayFormats: {
          //     millisecond: 'MMM DD',
          //     second: 'MMM DD',
          //     minute: 'MMM DD',
          //     hour: 'MMM DD',
          //     day: 'MMM DD',
          //     week: 'MMM DD',
          //     month: 'MMM DD',
          //     quarter: 'MMM DD',
          //     year: 'MMM DD',
          //   },
          // },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
    },
  };

  const indicatorList = _.map(availableIndicators, (item, key) => {
    return{
      label:item.indicatorName,
      value:key,
    }
  });

  const districtsList = _.map(districts, (item) => {
    return{
      label:item,
      value:item,
    }
  });

  const handleChangeIndicator = selectedOption => {
    setAxis({...axis, entities:selectedOption});
  };

  const handleChangeGeo = selectedOption => {
    setAxis({...axis, groups:selectedOption});
  };

  const handlePlot = () => {
    updateGraph();
  };

  return (
    <div className="bar-chart-container">
      <div className="select-title">Select X Axis Data</div>
      <div className="selector-area">
        <div className="row">
          {/* Select Indicator */}
          <div className="column column-45">
            <h4 className='selector-name'>Indicators</h4>
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="indicator-list"
              options={indicatorList}
              onChange={handleChangeIndicator}
              className="indicator-multi-select"
              classNamePrefix="select"
              styles={SelectorStyles}
            />
          </div>
          <div className="column column-45">
            <h4 className='selector-name'>Districts/State</h4>
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="geo-selection-list"
              options={districtsList}
              onChange={handleChangeGeo}
              className="indicator-multi-select"
              classNamePrefix="select"
              styles={SelectorStyles}
            />
          </div>
          <div className="column-10">
            <a className="button plot-btn" onClick={handlePlot}>Plot</a>
          </div>
        </div>
      </div>
      
      <div className="chart-content">
        <Bar data={graphData}
             options={options}
             height={500}/>
      </div>
    </div>
  );
}

export default BarChart;