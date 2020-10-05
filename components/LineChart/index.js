import React from "react";
import { Line, defaults } from "react-chartjs-2";
import moment from "moment";

const stateCodes = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CT: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UT: "Uttarakhand",
  UP: "Uttar Pradesh",
  WB: "West Bengal",
  AN: "Andaman and Nicobar Islands",
  CH: "Chandigarh",
  DN: "Dadra and Nagar Haveli",
  DD: "Daman and Diu",
  DL: "Delhi",
  JK: "Jammu and Kashmir",
  LA: "Ladakh",
  LD: "Lakshadweep",
  PY: "Puducherry",
};
function getStateName(key) {
  return stateCodes[key.toUpperCase()];
}

function LineChart(props) {
  const dates = [];

  defaults.global.elements.line.fill = false;

  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "average";
  defaults.global.tooltips.backgroundColor = "rgba(255, 255, 255, 0.6)";
  defaults.global.tooltips.displayColors = false;
  defaults.global.tooltips.borderColor = "#c62828";
  defaults.global.tooltips.borderWidth = 1;
  defaults.global.tooltips.titleFontColor = "#000";
  defaults.global.tooltips.bodyFontColor = "#000";
  defaults.global.tooltips.caretPadding = 4;
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "nearest";

  defaults.global.legend.display = true;
  defaults.global.legend.position = "bottom";

  defaults.global.hover.intersect = false;

  if (!props.data || props.data.length === 0) {
    return <div />;
  }

  const statesData = new Map();

  props.data.forEach((data, index) => {
    if (data.status !== "Confirmed") {
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "date") {
        dates.push(moment(data.date.trim(), "DD MMM"));
      }

      if (key === "status" || key === "date") {
        return;
      }

      if (!statesData.has(key)) {
        statesData.set(key, []);
      }
      const previousValue =
        statesData.get(key).length > 0
          ? parseInt(statesData.get(key)[statesData.get(key).length - 1])
          : 0;
      const currentValue = data[key] !== "" ? parseInt(data[key]) : 0;
      statesData.get(key).push(previousValue + currentValue);
    });
  });

  const sortedMap = new Map(
    [...statesData.entries()].sort((a, b) => {
      return a[1][a[1].length - 1] < b[1][b[1].length - 1] ? 1 : -1;
    })
  );

  const colors = [
    "#ff073a",
    "#28a745",
    "#342ead",
    "#7D5BA6",
    "#DD7596",
    "#16c8f0",
    "#f67575",
    "#2b580c",
    "#9D44B5",
    "#91132d",
    "#6D9DC5",
    "#2b580c",
    "#6c757d",
    "#f67575",
    "#d4f8e8",
  ];

  let index = 0;
  const datasets = [];
  sortedMap.forEach((data, key) => {
    if (key === "tt") {
      return;
    }

    if (index >= 10) {
      return;
    }

    datasets.push({
      borderWidth: 1.5,
      data: statesData.get(key),
      borderCapStyle: "round",
      pointBackgroundColor: colors[index],
      label: getStateName(key),
      borderColor: colors[index],
      pointHoverRadius: 0.5,
    });

    index++;
  });

  const dataset = {
    labels: dates,
    datasets,
  };

  const options = {
    responsive: true,
    events: ["click", "mousemove", "mouseout", "touchstart", "touchmove"],
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
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
          type: "linear",
          ticks: {
            beginAtZero: true,
            max: undefined,
            precision: 0,
          },
          scaleLabel: {
            display: false,
            labelString: "Total Cases",
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM DD",
            stepSize: 7,
            displayFormats: {
              millisecond: "MMM DD",
              second: "MMM DD",
              minute: "MMM DD",
              hour: "MMM DD",
              day: "MMM DD",
              week: "MMM DD",
              month: "MMM DD",
              quarter: "MMM DD",
              year: "MMM DD",
            },
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };

  return (
    <div className="charts-header">
      <div className="chart-title">{props.title}</div>
      <div className="chart-content">
        <Line data={dataset} options={options} height={500} />
      </div>
    </div>
  );
}

export default LineChart;
