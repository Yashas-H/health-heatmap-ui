import React, { useState, useEffect, useContext } from "react";
import request from "superagent";
import _ from "underscore";
import { v4 as uuidv4 } from "uuid";
import { Box, Skeleton, Stack , Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/core";


import AppConstant from "../../constant/AppConstant";
import Accordion from "./Accordion";
import Search from "./Search";
import MetadataPopUp from "./MetadataPopUp";
import MetadatPopUpIBP from "./MetadataPopUp_IBP";
import IBPLayers from "./IBP";
import { LayerContext } from "../../context/Layer";

const filterIndicators = (groups, q) => {
  return _.filter(groups, (group) => {
    return _.filter(group.subs, (sub, key) => {
      if (key.toLowerCase().includes(q.toLowerCase())) return true;
      const indicators = _.filter(sub, (i) => {
        return (
          i["indicator.id"].toLowerCase().includes(q.toLowerCase()) ||
          i["source.id"].toLowerCase().includes(q.toLowerCase())
        );
      });
      group.subs[key] = [...indicators];
      return indicators.length;
    }).length;
  });
};

function Sidebar() {
  const [indicators, setIndicators] = useState(false);
  const [filteredIndicators, setFilteredIndicators] = useState(false);
  const [q, setQ] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const { setSelectedLayers, setLoadedData } = useContext(LayerContext);

  useEffect(() => {
    setFilteredIndicators(
      q
        ? filterIndicators(JSON.parse(JSON.stringify(indicators)), q)
        : indicators
    );
  }, [q, indicators]);

  const clearAll = () => {
    setSelectedLayers({});
    setLoadedData({});
  };
  useEffect(() => {
    // Get Indicators
    request
      .post(`${AppConstant.config.appBaseUrl}/dimensions`)
      .send({
        fields: [
          "indicator.id",
          "indicator.Category",
          "indicator.Sub-Category",
          "indicator.Positive/Negative",
          "source.id",
        ],
      })
      .then((res) => {
        const groups = _.groupBy(
          _.filter(
            res.body,
            (item) =>
              item["indicator.id"] != "" &&
              item["indicator.Category"] &&
              item["indicator.Sub-Category"] &&
              item["indicator.Category"] === "Covid Statistics"
          ),
          "indicator.Category"
        );
        const groupsWithSubs = [];
        _.each(groups, (group, key) => {
          // Remove duplicate indicators and group by source
          let dupes = _.groupBy(group, "indicator.id");
          dupes = _.map(dupes, (dupe) => {
            if (dupe.length > 1)
              return {
                ...dupe[0],
                sources: _.map(dupe, (i) => ({
                  name: i["source.id"],
                  id: uuidv4(),
                })),
              };
            return { ...dupe[0], id: uuidv4() };
          });
          groupsWithSubs.push({
            name: key,
            count: dupes.length,
            subs: _.groupBy(dupes, "indicator.Sub-Category"),
          });
        });
        setIndicators(groupsWithSubs);
      })
      .catch((err) => {
        console.log("Error loading Data", err);
      });
  }, []);

  const LoadingSkeleton = () => {
    return _.map(_.range(5), (i) => {
      return (
        <Box mx="20px" py="10px" width="70%" key={i}>
          <Skeleton
            colorStart="#a9a9a9"
            colorEnd="#bfbfbf"
            height="16px"
            mb="5px"
          />
          <Skeleton
            colorStart="#a9a9a9"
            colorEnd="#bfbfbf"
            height="12px"
            mb="5px"
            mr="10%"
          />
          <Skeleton
            colorStart="#a9a9a9"
            colorEnd="#bfbfbf"
            height="12px"
            mb="20px"
            mr="30%"
          />
        </Box>
      );
    });
  };

  return (
    <Tabs>
      <TabList>
        <Tab>
          <Text fontWeight="bold" mt="8px">
            Indicators
          </Text>
        </Tab>
        <Tab>
          <Text fontWeight="bold" mt="8px">
            IBP Layers
          </Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <div>
            <Box className="sidebar-container" pb="50px">
              <Box className="sidebar-header">
                <div className="searchbox">
                  <Search
                    onChange={setQ}
                    disabled={!indicators}
                    placeholder="Filter indicators by name"
                  />
                </div>
                <Stack
                  isInline
                  spacing={1}
                  align="right"
                  className="expand-all-stack"
                  justifyContent="space-between"
                >
                  <Stack isInline spacing={8}>
                    <a
                      className="expand-collapse-btn"
                      onClick={(e) => setOpenAll(true)}
                    >
                      EXPAND ALL
                    </a>
                    <a className="expand-collapse-btn">|</a>
                    <a
                      className="expand-collapse-btn"
                      onClick={(e) => setOpenAll(false)}
                    >
                      COLLAPSE ALL
                    </a>
                  </Stack>
                  <a
                    className="expand-collapse-btn"
                    onClick={(e) => clearAll(false)}
                  >
                    CLEAR ALL
                  </a>
                </Stack>
              </Box>
              {indicators ? (
                <Box mt="10px" className="inidicator-list">
                  <Box mx="7px">
                    {_.map(filteredIndicators, (group, index) => (
                      <Accordion
                        key={index}
                        group={group}
                        index={index}
                        q={q}
                        openAll={openAll}
                        setOpenAll={setOpenAll}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                <LoadingSkeleton />
              )}
              <MetadataPopUp />
            </Box>
          </div>
        </TabPanel>
        <TabPanel>
          <IBPLayers />
          <MetadatPopUpIBP />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sidebar;
