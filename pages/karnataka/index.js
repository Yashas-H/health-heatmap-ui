import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Box} from "@chakra-ui/core";
import {Grid} from '@material-ui/core';
import LayerContextProvider from "../../context/Layer";
import Sidebar from "../../components/Sidebar";
import MapTabs from "../../components/MapTabs";
import MapDashboard from "components/MapDashboard";

import Layout from "../../components/Layout";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/core"

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <LayerContextProvider>
      <Layout>
        <article className="main-container">
          <Helmet>
            <title>Health Heatmap Of India - Map explorer</title>
            <meta name="description" content="Health Heat Map" />
          </Helmet>
          <div>
            <Grid>
              <Button colorScheme="blue" onClick={onOpen}>
                Click To Select Indicators
              </Button>
              <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='sm'>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">Indicators List</DrawerHeader>
                  <DrawerBody>
                    <Box>
                      <Sidebar/>
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <Box className="vis-right-column">
                <div className="visualization-area">
                  {/* Visualization Area */}
                  <MapDashboard/>
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
