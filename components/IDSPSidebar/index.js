import { useContext } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Select from "react-select";
import { Text, Flex, Spinner } from "@chakra-ui/core";


import { IDSPContext } from "../../context/IDSP";

export default function IDSPSidebar() {
  const {
    displayData,
    dataState,
    diseases,
    selectDiseases,
    selectedDiseases,
    districts,
    selectedDistricts,
    startDate,
    endDate,
    setStartDate,
    setEndDate
  } = useContext(IDSPContext);
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Flex flexWrap="wrap" justifyContent="space-evenly">
          <Text>Date Range: </Text>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            format="yyyy/MM/DD"
          />
          <Text>To</Text>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            format="yyyy/MM/DD"
          />
        </Flex>
      </MuiPickersUtilsProvider>
      <Flex flexWrap="wrap" flexDirection="column">
        <Text>Source: </Text>
        <Select
          id="sources"
          instanceId="sources"
          inputId="sources"
          isDisabled
          options={["IDSP"]}
          getOptionLabel={(o) => o}
          value={["IDSP"]}
          styles={selectStyles}
        />
        <Text>Disease: </Text>
        {diseases.length === 0 ? (
          <Spinner />
        ) : (
          <Select
            id="diseases"
            instanceId="diseases"
            inputId="diseases"
            name="diseases"
            isMulti
            options={diseases}
            getOptionLabel={(o) => o}
            getOptionValue={(o) => o}
            onChange={(diseases) => {
              if (diseases === null) selectDiseases([]);
              else selectDiseases(diseases);
            }}
            defaultValue={[diseases[0]]}
            styles={selectStyles}
          />
        )}
        <Text>District: </Text>
        {districts.length === 0 ? (
          <Spinner />
        ) : (
          <Select
            id="districts"
            instancedId="districts"
            inputId="districts"
            name="districts"
            isMulti
            options={districts}
            getOptionLabel={(o) =>
              `${o["entity.district"]} - ${o["entity.state"]}`
            }
            getOptionValue={(o) => o["entity.DistCode"]}
            styles={selectStyles}
            onChange={(districts) => {
              if (districts === null) selectDistricts([]);
              else selectDistricts(districts);
            }}
          />
        )}
      </Flex>
    </>
  );
}

const selectStyles = {
  container: (base) => ({
    ...base,
    flex: 1,
  }),
};
