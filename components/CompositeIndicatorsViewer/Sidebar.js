import { useIndicators } from "context/hhm-data";
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

export default function Sidebar({initialFilter, filter, dispatchFilter}) {
  const { indicatorsLoading, indicatorsError, indicators } = useIndicators({
    filter: initialFilter,
  });
  if (indicatorsLoading) {
    return <div>Loading indicators...</div>;
  }
  if (indicatorsError) {
    return <div>An Error: {indicatorsError.message}</div>;
  }
  const groupedIndicators = groupBy(indicators, (i) => i["indicator.Category"]);

  return (
    <>
      <div>Selected Indicators:</div>
      <List as="ol" styleType="decimal">
        {filter?.terms?.["indicator.id"]?.map((i) => (
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
                      dispatchFilter({
                        type: "add-term",
                        payload: ["indicator.id", v["indicator.id"]],
                      });
                    } else {
                      dispatchFilter({
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
