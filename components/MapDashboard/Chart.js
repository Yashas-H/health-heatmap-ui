import React from 'react';
import { Bar,Pie } from 'react-chartjs-2';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core"
import { chartColors } from './colors';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import {TableContainer} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const Piechart = (datavalue) => {
  const options = {
    responsive: true,
    legend: {
      display: false
  },
};
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: datavalue['data']['district'],
    datasets: [
      {
        data: datavalue['data']['values'],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ],
    
  };
  return (
    <div style={{width:'400px',margin:'20px auto'}}>
    <Pie
      data={data}
      options= {{
        plugins: {
            title: {
                display: true,
                text: datavalue['data']['indicatorName']
            },
            legend:{
              display:false
            }
        }
    }}
      width={'300px'}
    />
    </div>
  )
}
const Barchart = (datavalue) => {
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: datavalue['data']['district'],
    datasets: [
      {
        data: datavalue['data']['values'],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };
  return (
    <Bar
      data={data}
      options= {{
        plugins: {
            title: {
                display: true,
                text: datavalue['data']['indicatorName']
            }
        }
    }}
    />
  )
}
const getData=(data)=>{
  // console.log(data)
  const topLayer=Object.keys(data)
  // console.log(topLayer)
  let district=[]
 
    district=Object.keys(data[topLayer[0]]['properties'])
  const values=[]
  for(let i=0;i<district.length;i++){
    values.push(data[topLayer[0]]['properties'][district[i]][0]['value'])
  }
  return {'indicatorName':data[topLayer[0]]['indicator']['indicatorName'],'district':district,'values':values}
}

const tableData=(data)=>{
  const topLayer=Object.keys(data)
  let indicatorList=[]
  let state=Object.keys(data[topLayer[0]]['indicator']['data']['district'])
  for(let i=0;i<topLayer.length;i++){
    indicatorList.push(data[topLayer[i]]['indicator']['indicatorName'])
  }
  let tableDataList=[[...['District'],...indicatorList]]
  for(let i=0;i<state.length;i++){
    let row=[state[i]]
    for(let j=0;j<indicatorList.length;j++){
      row.push(data[topLayer[j]]['indicator']['data']['district'][state[i]][0]['value'])
    }
    tableDataList.push(row)
  }
  
  return tableDataList;
}

const getTable=(tData,mapClick)=>{
  console.log(mapClick)
  return <div>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        {tData[0].map((i)=>(<TableCell style={{fontSize:'15px'}}>{i}</TableCell>))}
      </TableRow>
    </TableHead>
    {console.log(tData.splice(0, 1))}
    <TableBody>
      {tData.map((row) => (
        <TableRow>
        {
          row[0]===mapClick['new_distt'] ? row.map((column)=>(<TableCell style={{backgroundColor:'lightgrey',fontSize:'15px'}}>{column}</TableCell>)) :  row.map((column)=>(<TableCell style={{fontSize:'15px'}}>{column}</TableCell>))
        
        }
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
}

const CreateGraph = (props) => {
  let data={}
  const tableDataList=tableData(props['selectedLayers'])
  let mapClick=props['mapInsideClick']
  data=getData(props['selectedLayers'])

  return (
    <Grid style={{margin:'20px 0px'}}>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Pie View</Tab>
          <Tab>Histogram View</Tab>
          <Tab>Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Piechart data={data}/>
          </TabPanel>
          <TabPanel>
          <Barchart data={data}/>
          </TabPanel>
          <TabPanel>
            <div style={{height:'100%'}}>
          {getTable(tableDataList,mapClick)}
          </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Grid>
  )
};

export default CreateGraph;