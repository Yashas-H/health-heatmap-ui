import { useContext } from "react";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Select from "react-select";
import { Text, Flex, Spinner, Box, RadioGroup, Radio } from "@chakra-ui/core";
import { useDimensionValues } from "context/hhm-data";
import { contains } from "underscore";
import KeyboardDateInput from "@material-ui/pickers/_shared/KeyboardDateInput";

export default function IDSPSidebar({ filter, dispatchFilter }) {
  const idspFilter = {
    terms: {
      "source.id": ["IDSP"],
      "entity.type": ["DISTRICT"],
    },
  };
  const {
    loading: statesLoading,
    error: statesError,
    data: states,
  } = useDimensionValues({
    fields: ["entity.State"],
    filter: idspFilter,
  });

  const {
    loading: diagnosesLoading,
    error: diagnosesError,
    data: diagnoses,
  } = useDimensionValues({
    fields: ["diagnosis.id", "diagnosis.Name"],
    filter: idspFilter,
  });
  return (
    <Flex
      p={5}
      direction="column"
      alignItems="left"
      textAlign="center"
      height="calc(100vh - 62px)"
      overflowY="scroll"
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Text fontWeight="bold" pt="0.6em" textAlign="left">
          Date Range
        </Text>
        <Flex flexWrap="wrap" justifyContent="left">
          <KeyboardDatePicker
            variant="inline"
            margin="normal"
            style={{
              width: `100%`,
            }}
            value={filter?.ranges?.["duration.start"]?.["gte"]}
            onChange={(e) => {
              dispatchFilter({
                type: "add-range-date",
                payload: ["duration.start", "gte", moment(e).get("YYYY/MM/DD")],
              });
            }}
            format="yyyy/MM/DD"
          />
          <KeyboardDatePicker
            variant="inline"
            margin="normal"
            style={{
              width: `100%`,
            }}
            value={filter?.ranges?.["duration.start"]?.["lte"]}
            onChange={(e) => {
              dispatchFilter({
                type: "add-range-date",
                payload: ["duration.start", "lte", moment(e).get("YYYY/MM/DD")],
              });
            }}
            format="yyyy/MM/DD"
          />
        </Flex>
      </MuiPickersUtilsProvider>
      <Flex flexWrap="wrap" flexDirection="column">
        <Text fontWeight="bold" pt="0.6em" textAlign="left">
          Disease
        </Text>

        {!diagnoses ? (
          <Spinner />
        ) : (
          <Select
            id="diseases"
            instanceId="diseases"
            inputId="diseases"
            name="diseases"
            isMulti
            options={diagnoses}
            getOptionLabel={(o) => o["diagnosis.Name"]}
            getOptionValue={(o) => o["diagnosis.id"]}
            onChange={(diagnoses) => {
              if (diagnoses === null)
                dispatchFilter({
                  type: "remove-term-entirely",
                  payload: "diagnosis.id",
                });
              else
                dispatchFilter({
                  type: "set-term",
                  payload: [
                    "diagnosis.id",
                    diagnoses.map((o) => o["diagnosis.id"]),
                  ],
                });
            }}
            defaultValue={diagnoses.filter((d) =>
              contains(filter?.terms?.["diagnosis.id"], d["diagnosis.id"])
            )}
            styles={selectStyles}
          />
        )}
        <Text fontWeight="bold" pt="0.6em" textAlign="left">
          State
        </Text>
        {statesLoading ? (
          <Spinner />
        ) : (
          <Select
            id="states"
            instancedId="states"
            inputId="states"
            name="states"
            isMulti
            options={states}
            getOptionLabel={(o) => o["entity.State"]}
            getOptionValue={(o) => o["entity.State"]}
            styles={selectStyles}
            onChange={(states) => {
              if (states === null || states.length === 0)
                dispatchFilter({
                  type: "remove-term-entirely",
                  payload: "entity.State",
                });
              else
                dispatchFilter({
                  type: "set-term",
                  payload: [
                    "entity.State",
                    states.map((s) => s["entity.State"]),
                  ],
                });
            }}
          />
        )}
        <Text fontWeight="bold" pt="0.6em" textAlign="left">
          Data
        </Text>

        <RadioGroup
          textAlign="left"
          onChange={(e) =>
            dispatchFilter({
              type: "set-term",
              payload: ["meta.original.countOf", [e.target.value]],
            })
          }
          value={filter?.terms?.["meta.original.countOf"][0]}
        >
          <Radio value="Number of cases">Number of Cases</Radio>
          <Radio value="Number of deaths">Number of Deaths</Radio>
        </RadioGroup>
      </Flex>
    </Flex>
  );
}

const selectStyles = {
  container: (base) => ({
    ...base,
    flex: 1,
    maxWidth: `200px`,
  }),
};
