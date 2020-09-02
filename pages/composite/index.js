import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Grid, Box } from "@chakra-ui/core";

import { Sidebar, DataViewer } from "components/CompositeIndicatorsViewer";
import Layout from "components/Layout";
import { FilteredDataProvider } from "context/hhm-data";

export default function CompositePage({}) {
  return (
    <FilteredDataProvider>
      <Layout>
        <article className="main-container">
          <Helmet>
            <title>Health Heatmap Of India - Composite Indicators</title>
            <meta name="description" content="Health Heat Map" />
          </Helmet>
          <div>
            <Grid gridTemplateColumns={"30% 1fr"} gap={0}>
              <Box>
                <Sidebar />
              </Box>

              <Box className="vis-right-column">
                <div className="visualization-area">
                  <DataViewer />
                </div>
              </Box>
            </Grid>
          </div>
        </article>
      </Layout>
    </FilteredDataProvider>
  );
}
