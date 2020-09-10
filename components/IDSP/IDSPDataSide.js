import { Tabs, TabList, Tab, Text, TabPanels, TabPanel } from "@chakra-ui/core";
import IDSPVisualization from "./IDSPVisualization";
import IDSPTable from "./IDSPTable";

export default function IDSPDataSide({ filter }) {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <Text fontWeight="bold" mt="8px">
              Bubble Plot
            </Text>
          </Tab>
          <Tab>
            <Text fontWeight="bold" mt="8px">
              Table
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <IDSPVisualization filter={filter} />
          </TabPanel>
          <TabPanel>
            <IDSPTable filter={filter} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
