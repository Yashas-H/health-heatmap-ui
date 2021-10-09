/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Grid, Box } from "@chakra-ui/core";
import LayerContextProvider from "../../context/Layer";
import Sidebar from "../../components/Sidebar";
import CodeEditor from "../../components/CodeEditor";
//import { generateFile } from "./generateFile";
import Layout from "../../components/Layout";



export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}){
  return (
    <LayerContextProvider>
    <Layout>
      <article className="main-container">
        <Helmet>
          <title>Health Heatmap Of India - Map explorer</title>
          <meta name="description" content="Health Heat Map" />
        </Helmet>
        <div>
          <Grid gridTemplateColumns="30% 1fr" gap={0}>
            <Box>
              <Sidebar />
            </Box>
            <Box className="vis-right-column">
              <div className="Editor">
                {/* Visualization Area */}
                <CodeEditor />
              </div>
            </Box>
            </Grid>
          </div>
        </article>
      </Layout>
    </LayerContextProvider>
            
  );
}


export default HomePage;
