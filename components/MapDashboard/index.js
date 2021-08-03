import React, { useState, useContext, useEffect } from "react";
import _ from "underscore";
import { LayerContext } from "../../context/Layer";
import Map2 from "../Map2";
import DataGrid from "../DataGrid";
import CreateGraph from './Chart'
import {Grid, Paper} from '@material-ui/core';
import InfoTile from "./InfoTile";


function MapDashboard() {
    const { loadedData, selectedLayers } = useContext(LayerContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [mapInsideClick,setMapInsideClick]=useState(0);

    useEffect(() => {
        if (_.isEmpty(loadedData)) setTabIndex(0);
    }, [loadedData]);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };
    return (
        <div>
            <Grid container>
                <Grid container item >
                <Grid item className="subGrid" xs={6} style={{ padding:"0px 0px",maxHeight:'600px',display:'table-cell'}}>
                        <Map2 setMapInsideClick={setMapInsideClick} style={{ padding:"0px 0px",maxHeight:'600px',display:'table-cell'}}/>
                </Grid>
                <Grid item xs={6} style={{padding:"0px 20px",maxHeight:'600px',overflow:'scroll',display:'table-cell'}}>
                {/* <InfoTile/> */}
                {!_.isEmpty(loadedData) && (
                        <Paper style={{marginLeft:'15px'}}>
                            <CreateGraph
                                indicatorsLoaded={loadedData}
                                selectedLayers={selectedLayers}
                                mapInsideClick={mapInsideClick}
                            />
                        </Paper>
                            
                        )}
                </Grid>
                </Grid>
            </Grid>
        </div>

    );
}
export default MapDashboard;
