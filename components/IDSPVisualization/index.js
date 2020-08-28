import { useContext } from "react";
import { Text, Spinner } from "@chakra-ui/core";

import { BubbleChart } from "@metastring/multidimensional-charts";

import { IDSPContext } from "../../context/IDSP";
import TableOfResults from "./TableOfResults";

export function IDSPVisualization () {
    const {
        displayData,
        dataState,
      } = useContext(IDSPContext);
      
    return (
        <DisplayData data={displayData} dataState={dataState} />
    )
}


const getTableMessage = ({ data, dataState }) => {
    switch (dataState) {
      case "CHOOSE": {
        return (
          <Text fontSize="2xl">
            Please choose at least one disease or district
          </Text>
        );
      }
      case "LOADING": {
        return <Spinner />;
      }
      case "LOADED": {
        return <TableOfResults results={data} />;
      }
    }
  };
  
  const DisplayData = function ({ data, dataState }) {
    return (
      <>
        <BubbleChart data={data} colorParam="indicator_normalized" />
      </>
    );
  };
  
  export function IDSPTable () {
    const {
      displayData,
      dataState,
    } = useContext(IDSPContext);
  
    return getTableMessage({ data: displayData, dataState })
  }