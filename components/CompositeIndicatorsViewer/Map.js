import React from "react";
import _ from "underscore";
import Naksha from "naksha-component-react-restructured";
import AppConstant from "constant/AppConstant";
import formatMapData from "helper/formatMapData";

const Map = ({ data }) => {
  const conformItemToExploreMapDataStructure = (item) => {
    const entityId = item["entity.id"]
    const entityName = entityId.split(' (')[0]
    const value = item["Composite Score"]
    return {
      ...item,
      'entity.Name': entityName,
      value
    }
  }
  let districtData = data.map(conformItemToExploreMapDataStructure)
  districtData = _.groupBy(districtData, (item) => item['entity.Name']);
  const externalLayers = [
    formatMapData(
      {
        id: 'compositeScore',
        district: districtData,
      },
      "DISTRICT",
      100
    ),
  ];
  console.log(externalLayers[0])
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
        }}
        loadToC={true}
        showToC={false}
        mapboxApiAccessToken="pk.eyJ1IjoiZGVlcGt0IiwiYSI6ImNrYWRuZHdkdjBiOHYydG1iY3RyaW52ancifQ.7jlcNtPLOyIBA1GdOzLbfg"
        nakshaApiEndpoint={AppConstant.config.nakshaApi}
        geoserver={{
          endpoint: `${AppConstant.config.nakshaApi}/geoserver`,
          store: "ibp",
          workspace: "biodiv",
        }}
        // hiddenLayers={[{ id: 254 }, { id: 255 }]}
        externalLayers={externalLayers}
      />
    </div>
  );
};

export default Map;
