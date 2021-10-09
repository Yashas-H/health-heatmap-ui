import axios from "axios";

import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/core";

// import "../Editor.css";
import React, { useState, useContext } from "react";

import { LayerContext } from "../../context/Layer";
//import  g  from "./images/r1.png";

function CodeEditor() {
  const { loadedData, selectedLayers } = useContext(LayerContext);
  //console.log("i",i)
  
  const [codev, setCodev] = useState("#Type your code below...");
  const para={code:codev};
  //const handleSubmit = async() =>{
   // await axios.post("http://localhost:5000/run", {code:codev});
 // }
  const handleSubmit = () =>{
    console.log(codev);
    fetch("http://localhost:5000/run",{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body: para
    }).then(() =>{
    console.log("New file")
    })
  }
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Text fontWeight="bold" mt="8px">
            Code Editor
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div style={{height: "600px",width: "100%"}}>
            <div className="Editor" style={{height:"100%",width: "50%", float: "left"}}> 
              <textarea
                style={{background: "black", color: "white", padding: "4px"}}
                rows="25"
                cols="60"
                value={codev}
                onChange={(e) => {
                  setCodev(e.target.value);
                }}
              ></textarea>
              <br />
              <button style=  {{background: "green", color: "white", padding: "4px"}} onClick={handleSubmit} >
                Submit
              </button>
              <br />
              <div>
                {para.code}
              </div>
            </div>
            <div style={{height: "600px", width:"50%", float: "left", overflow: "scroll"}}>
              <img src="/r1.png" alt="graph3" style={{height:"200px",width: "100px"}}/>
              <img src="./images/r2.png" alt="graph4" style={{height:"200px",width: "100px"}}/>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    
  );
}

export default CodeEditor;
