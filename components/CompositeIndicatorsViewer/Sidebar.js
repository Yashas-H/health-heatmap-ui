import { useIndicators, useDataFilter } from "context/hhm-data";
import { groupBy } from "underscore";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Checkbox,
  List,
  ListItem,
} from "@chakra-ui/core";

export default function Sidebar() {
  const { indicatorsLoading, indicatorsError, indicators } = useIndicators({
    filter: { terms: { "source.id": ["NFHS - 4"] } },
  });
  if (indicatorsLoading) {
    return <div>Loading indicators...</div>;
  }
  if (indicatorsError) {
    return <div>An Error: {indicatorsError.message}</div>;
  }
  const groupedIndicators = groupBy(indicators, (i) => i["indicator.Category"]);

  const [state, dispatch] = useDataFilter();
  return (
    <>
      <div>Selected Indicators:</div>
      <List as="ol" styleType="decimal">
        {state?.terms?.["indicator.id"]?.map((i) => (
          <ListItem>{i}</ListItem>
        ))}
      </List>
      <div>Select from:</div>
      <Accordion allowToggle>
        {Object.entries(groupedIndicators).map(([key, value]) => (
          <AccordionItem>
            <AccordionHeader>{key}</AccordionHeader>
            <AccordionPanel>
              {value.map((v) => (
                <Checkbox
                  value={v["indicator.id"]}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch({
                        type: "add-term",
                        payload: ["indicator.id", v["indicator.id"]],
                      });
                    } else {
                      dispatch({
                        type: "remove-term",
                        payload: ["indicator.id", v["indicator.id"]],
                      });
                    }
                  }}
                >
                  {v["indicator.Name"]}
                </Checkbox>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
