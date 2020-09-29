import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Grid, Box } from "@chakra-ui/core";

import { Sidebar, DataViewer } from "components/CompositeIndicatorsViewer";
import Layout from "components/Layout";
import { useDataFilter } from "context/hhm-data";

export default function CompositePage({}) {
  const relevantDataFilter = {
    terms: {
      "source.id": ["NFHS - 4"],
      "settlement.id": [null],
      "entity.type": ["DISTRICT"],
      "indicator.Positive/Negative": ["POSITIVE", "NEGATIVE"],
    },
  };
  const filterWithInitialSelections = {
    terms: {
      ...relevantDataFilter.terms,
      "indicator.id": [
        "Breastfeeding children age 6-23 months receiving an adequate diet (%)",
        "Children age 12-23 months who have received BCG (%)",
        "Households using clean fuel for cooking (%)",
        "Households using improved sanitation facility (%)",
      ],
    },
  };
  const [filter, dispatchFilter] = useDataFilter(filterWithInitialSelections);

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
              <Sidebar
                relevantDataFilter={relevantDataFilter}
                filter={filter}
                dispatchFilter={dispatchFilter}
              />
            </Box>

            <Box className="vis-right-column" borderLeft="1px solid #ccc">
              <div className="visualization-area">
                <DataViewer filter={filter} />
              </div>
            </Box>
          </Grid>
        </div>
      </article>
    </Layout>
  );
}
