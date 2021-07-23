import React, { useState, useContext, useEffect } from "react";
import _ from "underscore";
import { LayerContext } from "../../context/Layer";
import Map2 from "../Map2";
import DataGrid from "../DataGrid";
import CreateGraph from './Chart'
import {Grid} from '@material-ui/core';
import InfoTile from "./InfoTile";


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
            <Grid container>
                <Grid container item >
                <Grid item className="subGrid" xs={6} style={{ padding:"0px 0px",display:'table-cell'}}>
                        <Map2 />
                </Grid>
                <Grid item xs={6} style={{padding:"0px 20px",maxHeight:'600px',overflow:'scroll',display:'table-cell'}}>
                {/* <InfoTile/> */}
                {!_.isEmpty(loadedData) && (
                            
                            <CreateGraph
                                indicatorsLoaded={loadedData}
                                selectedLayers={selectedLayers}
                            />
                            
                        )}
                </Grid>
                </Grid>
            </Grid>
        </div>

    );
}
export default MapDashboard;
