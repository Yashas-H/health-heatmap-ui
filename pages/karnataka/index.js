import React from "react";
import { Helmet } from "react-helmet";
import _ from "underscore";
import { Box } from "@chakra-ui/core";
import { Grid,Paper,Typography } from '@material-ui/core';
import LayerContextProvider2 from "../../context/Layer";
import Sidebar2 from "../../components/Sidebar2";
import MapTabs from "../../components/MapTabs";
import MapDashboard from "components/MapDashboard";
import { DashboardChart } from "components/DashboardChart/DashboardChart";
import Layout from "../../components/Layout";
import { VaccineDoseChart } from "components/DashboardChart/vaccineDoseChart";
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
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper:{
    margin:'50px 50px',
    padding:'25px 25px'
  }
}));
export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const classes=useStyles()
  return (
    <LayerContextProvider2>
      <Layout>
        <article className="main-container">
          <Helmet>
            <title>Health Heatmap Of India - Map explorer</title>
            <meta name="description" content="Health Heat Map" />
          </Helmet>
          <div>
            <Grid xs={12}>
              <Box 
              style={{
                backgroundColor:'cornflowerblue',
                minHeight:'200px',
                color:'white',
                padding:'50px',
                textAlign:'center'
              }}
              >
              <Typography variant="h3" 
              style={{
                paddingBottom:'20px'
              }}
              >
              Karnataka Covid Dashboard
                </Typography>
                <Typography 
                style={{
                  fontSize:'18px',
                  marginLeft:'20px'
                }}>
                Explore data from Covid serosurveys conducted district wise, analyse breakthrough infections data, results from genome sequencing, all on a single dashboard.
                </Typography>
              </Box>
              <Fab color="secondary" aria-label="add" onClick={onOpen}
              style={{
                margin: '4px',
                position: 'absolute',
                bottom:'20px',
                right: '150px',
              }}
              >
                <AddIcon />
              </Fab>
              <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='sm'>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">Indicators List</DrawerHeader>
                  <DrawerBody>
                    <Box>
                      <Sidebar2 />
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
              <Paper 
               style={{margin:'50px 50px',
               padding:'25px 25px'}}
              >
              <Box className="vis-right-column">
                <div className="visualization-area">
                  <MapDashboard />
                </div>
              </Box>
              </Paper>
            </Grid>
            <Paper 
              style={{margin:'50px 50px',
              padding:'25px 25px'}}
            >
              <DashboardChart />
            </Paper>
            <Paper 
              style={{margin:'50px 50px',
              padding:'25px 25px'}}
            >
              <VaccineDoseChart />
            </Paper>
          </div>
        </article>
      </Layout>
    </LayerContextProvider2>
  );
}

export default HomePage;
