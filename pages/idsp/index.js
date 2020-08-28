import Head from "next/head";
import { Grid, Box } from "@chakra-ui/core";

import Layout from "../../components/Layout";

import IDSPContextProvider from "../../context/IDSP";
import IDSPSidebar from "../../components/IDSPSidebar";
import {IDSPVisualization, IDSPTable} from "../../components/IDSPVisualization";

export default function IDSP() {
  return (
    <IDSPContextProvider>
      <Layout>
        <Head>
          <title>Health Heatmap - IDSP</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <main>
            <div>
              <Grid gridTemplateColumns={"20% 1fr"} gap={10}>
                <Box>
                  <IDSPSidebar />
                </Box>

                <Box className="vis-right-column">
                  <div className="visualization-area">
                    <IDSPVisualization />
                  </div>
                </Box>
              </Grid>
              <Box>
                <IDSPTable />
              </Box>
            </div>
          </main>
        </div>
      </Layout>
    </IDSPContextProvider>
  );
}
