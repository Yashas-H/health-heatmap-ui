import React, { useState, useEffect, useContext } from "react";
import _ from "underscore";
import Naksha from "naksha-component-react-restructured";

import { LayerContext } from "../../context/Layer";
import Filters from "../Filters";
import Layers from "../Layers";

import formatMapData from "../../helper/formatMapData";
import AppConstant from "../../constant/AppConstant";

const Map2 = () => {
  const [externalLayers, setExternalLayers] = useState([]);
  const {
    setSelectedLayers,
    selectedLayers,
    currentIndicatorData,
    layersLoading,
    setLayerEntity,
    layerEntity,
  } = useContext(LayerContext);

  useEffect(() => {
    if (!_.isEmpty(currentIndicatorData)) updateMap2();
  }, [currentIndicatorData]);

  useEffect(() => {
    updateExternalLayers();
  }, [selectedLayers]);

  const updateExternalLayers = _.debounce((e) => {
    const selected = _.map(selectedLayers, (l, key) => ({
      ..._.omit(selectedLayers[key], "indicator"),
    }));
    setExternalLayers(selected.reverse());
  }, 500);

  const updateMap2 = () => {
    const data = currentIndicatorData;
    const type = layerEntity[data.id]
      ? layerEntity[data.id].toUpperCase()
      : _.isEmpty(data.district)
      ? "STATE"
      : "DISTRICT";
    const layer = formatMapData(data, type);
    setLayerEntity({ ...layerEntity, [data.id]: type });
    if (data.filteredData) {
      const sl = { ...selectedLayers };
      sl[data.id] = layer;
      setSelectedLayers(JSON.parse(JSON.stringify(sl)));
    } else {
      setSelectedLayers(
        JSON.parse(JSON.stringify({ [data.id]: layer, ...selectedLayers }))
      );
    }
  };
  const clickHandler = (feat) => {
    console.log("Map2 inside clickHandler",feat);
  }
  return (
    <div className="map-area">
      {/* Map2 */}
      <Naksha
        viewPort={{
          latitude: 14.5410,
          longitude: 75.9155,
          zoom: 6,
          bearing: 0,
          pitch: 0,
          minZoom: 4,
        }}
        loadToC
        showToC={false}
        mapboxApiAccessToken="pk.eyJ1IjoiZGVlcGt0IiwiYSI6ImNrYWRuZHdkdjBiOHYydG1iY3RyaW52ancifQ.7jlcNtPLOyIBA1GdOzLbfg"
        nakshaApiEndpoint={AppConstant.config.nakshaApi}
        geoserver={{
          endpoint: `${AppConstant.config.nakshaApi}/geoserver`,
          store: "ibp",
          workspace: "biodiv",
          onClick: clickHandler
        }}
        externalLayers={externalLayers}
      />

      {/* Layers */}
      {(!_.isEmpty(selectedLayers) || !_.isEmpty(layersLoading)) && <Layers />}

      {/* Filters */}
      {/* {!_.isEmpty(selectedLayers) && <Filters />} */}
    </div>
  );
};

export default Map2;
