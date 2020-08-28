import React, { createContext, useState, useEffect } from "react";
import request from "superagent";
import moment from "moment";


import AppConstant from "../constant/AppConstant";

export const IDSPContext = createContext();
const IDSPContextProvider = (props) => {
  const [displayData, setDisplayData] = useState([]);
  const [dataState, setDataState] = useState("LOADING");
  const [diseases, setDiseases] = useState([]);
  const [selectedDiseases, selectDiseases] = useState([
    "Acute Diarrheal Disease",
  ]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, selectDistricts] = useState([]);
  const [startDate, setStartDate] = useState(moment("2019-01-01").toDate());
  const [endDate, setEndDate] = useState(moment("2019-12-31").toDate());
  useEffect(() => {
    if (selectedDiseases.length === 0 && selectedDistricts.length === 0) {
      setDataState("CHOOSE");
      return;
    }
    setDataState("LOADING");
    const districtIds = selectedDistricts.map((d) => d["entity.DistCode"]);
    const terms = { source: ["IDSP"] };
    if (selectedDiseases.length > 0)
      terms["indicator_universal_name"] = selectedDiseases;
    if (districtIds.length > 0) terms["entity.DistCode"] = districtIds;
    const ranges = {
      "duration.start": {
        gte: moment(startDate).get("YYYY/MM/DD"),
        lte: moment(endDate).get("YYYY/MM/DD"),
      },
    };
    request
      .post(`${AppConstant.config.appBaseUrl}/data`)
      .send({ terms, ranges })
      .then((res) => {
        const data = res.body.data;
        if (Array.isArray(data)) {
          setDisplayData(res.body.data);
          setDataState("LOADED");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedDiseases, selectedDistricts, startDate, endDate]);
  useEffect(() => {
    request
      .post(`${AppConstant.config.appBaseUrl}/dimensions`)
      .send({
        filter: {
          terms: {
            source: ["IDSP"],
          },
        },
        fields: ["indicator_universal_name"],
      })
      .then((res) => {
        const indicators = res.body.map((e) => e["indicator_universal_name"]);
        setDiseases(indicators);
      });
  }, []);
  useEffect(() => {
    request
      .post(`${AppConstant.config.appBaseUrl}/dimensions`)
      .send({
        filter: {
          terms: {
            source: ["IDSP"],
          },
        },
        fields: ["entity.state", "entity.district", "entity.DistCode"],
      })
      .then((res) => {
        const districtsWithCode = res.body.filter(
          (d) =>
            d["entity.DistCode"] !== undefined && d["entity.DistCode"] !== ""
        );
        setDistricts(districtsWithCode);
      });
  }, []);

  return (
    <IDSPContext.Provider
      value={{
        displayData,
        dataState,
        diseases,
        selectedDiseases,
        selectDiseases,
        districts,
        selectedDistricts,
        startDate,
        endDate,
        setStartDate,
        setEndDate
      }}
    >
      {props.children}
    </IDSPContext.Provider>
  );
};

export default IDSPContextProvider;
