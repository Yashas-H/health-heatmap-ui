import React, { useState, useEffect, useContext } from "react";
import _ from "underscore";
import Naksha from "naksha-component-react-restructured";

import { LayerContext } from "../../context/Layer";
import Filters from "../Filters";
import Layers from "../Layers";

import formatMapData from "../../helper/formatMapData";
import AppConstant from "../../constant/AppConstant";

const Map = () => {
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
    if (!_.isEmpty(currentIndicatorData)) updateMap();
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

  const updateMap = () => {
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

  return (
    <div className="map-area">
      {/* Map */}
      <Naksha
        viewPort={{
          latitude: 23.17182424768975,
          longitude: 91.52421299825329,
          zoom: 3.4494111278786177,
          bearing: 0,
          pitch: 0,
          minZoom: 3.5,
        }}
        loadToC
        showToC={false}
        mapboxApiAccessToken="pk.eyJ1IjoiZGVlcGt0IiwiYSI6ImNrYWRuZHdkdjBiOHYydG1iY3RyaW52ancifQ.7jlcNtPLOyIBA1GdOzLbfg"
        nakshaApiEndpoint={AppConstant.config.nakshaApi}
        geoserver={{
          endpoint: `${AppConstant.config.nakshaApi}/geoserver`,
          store: "ibp",
          workspace: "biodiv",
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

export default Map;
