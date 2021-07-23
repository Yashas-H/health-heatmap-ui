import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Box} from "@chakra-ui/core";
import {Grid} from '@material-ui/core';
import LayerContextProvider2 from "../../context/Layer";
import Sidebar2 from "../../components/Sidebar2";
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
    <LayerContextProvider2>
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
                      <Sidebar2/>
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
    </LayerContextProvider2>
  );
}

export default HomePage;
