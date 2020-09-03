import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Grid, Box } from "@chakra-ui/core";

import { Sidebar, DataViewer } from "components/CompositeIndicatorsViewer";
import Layout from "components/Layout";
import { useDataFilter } from "context/hhm-data";

export default function CompositePage({}) {
  const initialFilter = {"terms": {
    "source.id" : ["NFHS - 4"],
    "settlement.id": ["Total"],
    "entity.type": ["DISTRICT"]
  }}
  const [filter, dispatchFilter] = useDataFilter(initialFilter);

  return (
    <Layout>
      <article className="main-container">
        <Helmet>
          <title>Health Heatmap Of India - Composite Indicators</title>
          <meta name="description" content="Health Heat Map" />
        </Helmet>
        <div>
          <Grid gridTemplateColumns={"30% 1fr"} gap={0}>
            <Box>
              <Sidebar initialFilter={initialFilter} filter={filter} dispatchFilter={dispatchFilter} />
            </Box>

            <Box className="vis-right-column">
              <div className="visualization-area">
                <DataViewer filter={filter}/>
              </div>
            </Box>
          </Grid>
        </div>
      </article>
    </Layout>
  );
}
