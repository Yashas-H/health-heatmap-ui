import React, { createContext, useState, useEffect } from "react";
import request from "superagent";
import _ from "underscore";

import AppConstant from "../constant/AppConstant";

export const LayerContext = createContext();
const LayerContextProvider = (props) => {
  const [selectedLayers, setSelectedLayers] = useState({});
  const [currentIndicatorData, setCurrentIndicatorData] = useState({});
  const [loadedData, setLoadedData] = useState({});
  const [showMetadata, setShowMetadata] = useState(false);
  const [layersLoading, setLayersLoading] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState([]);
  const [filtersAvailable, setfiltersAvailable] = useState({});
  const [layerEntity, setLayerEntity] = useState({});

  const loadIndicatorData = (indicator, filters) => {
    // Get DATA
    if (!filters) {
      setLayersLoading([...layersLoading, indicator]);
    } else {
      setFiltersLoading([...filtersLoading, indicator]);
    }
    let terms = {
      ["indicator.id"]: [indicator["indicator.id"]],
      ["source.id"]: [indicator["source.id"]],
    };
    if (filters && !_.isEmpty(filters)) terms = { ...terms, ...filters };
    request
      .post(`${AppConstant.config.appBaseUrl}/data/autoFiltered`)
      .send({
        terms: terms,
      })
      .then((res) => {
        let stateData = _.filter(
          res.body.data,
          (item) => item["entity.type"] === "STATE"
        );
        let districtData = _.filter(
          res.body.data,
          (item) => item["entity.type"] === "DISTRICT"
        );

        stateData = _.groupBy(stateData, (item) => item["entity.Name"]);
        districtData = _.groupBy(districtData, (item) => item["entity.Name"]);
        setCurrentIndicatorData({
          district: districtData,
          state: stateData,
          indicatorName: indicator["indicator.id"],
          legendType:
            indicator["indicator.Positive/Negative"] || indicator.legendType,
          source: indicator["source.id"],
          id: indicator.id,
          filteredData: filters ? true : false,
        });
        setLoadedData({
          ...loadedData,
          [indicator.id]: {
            district: districtData,
            state: stateData,
            indicatorName: indicator["indicator.id"],
            legendType: indicator["indicator.Positive/Negative"],
            source: indicator["source.id"],
            id: indicator.id,
          },
        });
        setLayersLoading(
          JSON.parse(
            JSON.stringify(
              _.filter(layersLoading, (l) => indicator.id !== l.id)
            )
          )
        );
        setFiltersLoading(
          JSON.parse(
            JSON.stringify(
              _.filter(filtersLoading, (l) => indicator.id !== l.id)
            )
          )
        );
      })
      .catch((err) => {
        setLayersLoading(
          JSON.parse(
            JSON.stringify(
              _.filter(layersLoading, (l) => indicator.id !== l.id)
            )
          )
        );
        setFiltersLoading(
          JSON.parse(
            JSON.stringify(
              _.filter(filtersLoading, (l) => indicator.id !== l.id)
            )
          )
        );
        console.log("Error loading Data", err);
      });
  };

  const getFilterInfoForIndicator = (indicator) => {
    // Get filter info for indicatore
    request
      .post(`${AppConstant.config.appBaseUrl}/filters`)
      .send({
        terms: {
          ["indicator.id"]: [indicator.indicatorName],
          ["source.id"]: [indicator.source],
        },
      })
      .then((res) => {
        setfiltersAvailable({
          ...filtersAvailable,
          [indicator.id]: res.body,
        });
      })
      .catch((err) => {
        console.log("Error loading Data", err);
      });
  };

  return (
    <LayerContext.Provider
      value={{
        selectedLayers: selectedLayers,
        setSelectedLayers: setSelectedLayers,
        loadIndicatorData: loadIndicatorData,
        currentIndicatorData: currentIndicatorData,
        showMetadata: showMetadata,
        setShowMetadata: setShowMetadata,
        layersLoading: layersLoading,
        setLayersLoading: setLayersLoading,
        loadedData: loadedData,
        setLoadedData: setLoadedData,
        filtersAvailable: filtersAvailable,
        getFilterInfoForIndicator: getFilterInfoForIndicator,
        filtersLoading: filtersLoading,
        layerEntity: layerEntity,
        setLayerEntity: setLayerEntity,
      }}
    >
      {props.children}
    </LayerContext.Provider>
  );
};

export default LayerContextProvider;
