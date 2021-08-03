import { vaccineData } from "./vaccineData";
import { BarChartWithPlainFilteredData } from "./Chart";
import { filterDSD, filterPlainGraph, CategoryValueData, filterTheList } from "./filter";
import { FormControl, InputLabel, Select, MenuItem, Grid, Paper,Typography } from "@material-ui/core";
import { useState, useEffect } from "react";




const BarChart = () => {

    let [category, indicatorList] = CategoryValueData(vaccineData)
    const [categoryName, setCategoryName] = useState(category[0]);
    const [indicator, setIndicator] = useState(indicatorList[0]);
    const [filter, setFilter] = useState(category[0]);
    const [filterList, setFilterList] = useState(filterTheList(vaccineData, filter));
    const [selectedFilterList, setSelectedFilterList] = useState([]);
    const [selectedAxisLabel, setSelectedAxisLabel] = useState(category[1]);
    const [finalPlainGraphData, setFinalPlainGraphData] = useState(
        filterPlainGraph(vaccineData, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel)
    );
    const [createPlainGraph, setCreatePlainGraph] = useState(<BarChartWithPlainFilteredData data={finalPlainGraphData[0]} labels={finalPlainGraphData[1]} />)
    filterPlainGraph(vaccineData, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel)



    useEffect(() => {
        setFilterList(filterTheList(vaccineData, filter))
    }, [filter]);
    useEffect(() => {
        setFinalPlainGraphData(
            filterPlainGraph(vaccineData, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel)
        )
    }, [vaccineData, categoryName, indicator, filter, selectedFilterList, selectedAxisLabel]);

    useEffect(() => {
        setCreatePlainGraph(<BarChartWithPlainFilteredData data={finalPlainGraphData[0]} labels={finalPlainGraphData[1]} />)

    }, [finalPlainGraphData])

    const handleChangeCategory = (event) => {
        setCategoryName(event.target.value);
    };
    const handleChangeChooseIndicator = (event) => {
        setIndicator(event.target.value);
    };
    const handleChangeFilter = (event) => {
        setSelectedFilterList([]);
        setFilter(event.target.value);
    };

    const handleChangeFilterSelection = (event) => {
        setSelectedFilterList([event.target.value]);
    };
    const handleChangeAxisLabel = (event) => {
        setSelectedAxisLabel(event.target.value);
    };
    return (
        <Grid xs={12} container>
            <Grid xs={12} style={{textAlign:'center', marginBottom:'20px'}}>
                <Typography variant="h3" component="h2">
                    Genomics Data
                </Typography>
                <Typography >
                    Genomic analysis of COVID-19 breakthrough infections during second wave in different states of India.
                </Typography>
            </Grid>
            <Grid xs={6} item>
                {/* {createGraph} */}
                {
                    createPlainGraph
                }
            </Grid>
            <Grid xs={6} container item>
                <Grid xs={12}
                    style={{ display: "flex", margin: "auto" }}
                ><Paper style={{ display: "table-row", margin: 'auto', padding: '50px', backgroundColor: '#F8F8FF' }}>
                        <Grid xs={12} style={{ fontSize: '28px', textAlign: 'center', fontWeight: '500', marginBottom: '10px' }}>Filter</Grid>
                        <Grid>
                            <FormControl style={{
                                margin: '4px',
                                minWidth: 350,
                                maxWidth: 350,
                            }}>
                                <InputLabel style={{
                                    fontSize: '18px',
                                    color: 'blue'
                                }}>Categorize By</InputLabel>
                                <Select
                                    labelId="Categorize By"
                                    id="Categorize By"
                                    onChange={handleChangeCategory}
                                    value={categoryName}
                                >
                                    {category.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                                </Select>

                            </FormControl></Grid>
                        <Grid>
                            <FormControl style={{
                                margin: '4px',
                                minWidth: 350,
                                maxWidth: 350,
                            }}>
                                <InputLabel style={{
                                    fontSize: '18px',
                                    color: 'blue'
                                }}>Choose Indicator</InputLabel>
                                <Select
                                    labelId="Choose Indicator"
                                    id="Choose Indicator"
                                    onChange={handleChangeChooseIndicator}
                                    value={indicator}
                                >
                                    {indicatorList.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                                </Select>

                            </FormControl></Grid>
                        {/* <Grid>
              <FormControl style={{
                margin: '4px',
                minWidth: 350,
                maxWidth: 350,
              }}>
                <InputLabel style={{
                  fontSize: '18px',
                  color: 'blue'
                }}>Filter By</InputLabel>
                <Select
                  labelId="Filter By"
                  id="Filter By"
                  onChange={handleChangeFilterSelection}
                  value={selectedFilterList[0]}
                >
                  {filterList.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                </Select>
              </FormControl></Grid> */}
                        <Grid>
                            <FormControl style={{
                                margin: '4px',
                                minWidth: 350,
                                maxWidth: 350,
                            }}>
                                <InputLabel style={{
                                    fontSize: '18px',
                                    color: 'blue'
                                }}>Axis Label</InputLabel>
                                <Select
                                    labelId="Axis Label"
                                    id="Axis Label"
                                    onChange={handleChangeAxisLabel}
                                    value={selectedAxisLabel}
                                >
                                    {category.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                                </Select>
                            </FormControl></Grid>
                    </Paper>
                </Grid>

            </Grid>

        </Grid>

    )
}

export const VaccineDoseChart = () => {
    return (
        <BarChart />
    )

}