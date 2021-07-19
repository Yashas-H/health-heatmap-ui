import React, { useState, useContext, useEffect } from "react";
import _ from "underscore";
import { LayerContext } from "../../context/Layer";
import Map2 from "../Map2";
import DataGrid from "../DataGrid";
import VerticalBar from './sampleChart'
import {Grid} from '@material-ui/core';
function MapDashboard() {
    const { loadedData, selectedLayers } = useContext(LayerContext);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (_.isEmpty(loadedData)) setTabIndex(0);
    }, [loadedData]);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };
    return (
        <div>
            {/* <Grid
                h="600px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
<GridItem rowSpan={2} colSpan={1} bg="tomato" />
  <GridItem colSpan={2} bg="papayawhip" />
  <GridItem colSpan={2} bg="papayawhip" />
  <GridItem colSpan={4} bg="tomato" />

            </Grid> */}
            <Grid container xs={12}>
            <Grid container xs={12}>
                <Grid container xs={12} style={{'maxHeight':'100vh'}}>
                <Grid item xs={7}>
                        <Map2 />
                </Grid>
                <Grid item xs={5} style={{padding:"0px 20px"}}>
                <VerticalBar/>
                </Grid>
                       
                        <Grid item xs={12} style={{padding:'50px'}}>
                        {!_.isEmpty(loadedData) && (
                            <DataGrid
                                indicatorsLoaded={loadedData}
                                selectedLayers={selectedLayers}
                            />
                        )}
                    </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>

    );
}
export default MapDashboard;
