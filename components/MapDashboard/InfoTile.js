import { Grid, Paper } from "@material-ui/core";

const Tile=()=>{
  return <Grid item xs={6} md={4} style={{margin:'10px',textAlign:'center',minHeight:'150px'}}>
  <Paper style={{minHeight:'100px',minWidth:'150px'}}>
  <div style={{fontSize:'20px',fontWeight:'500'}}>Indicator</div>
  <div style={{fontSize:'15px',fontWeight:'400',color:'grey'}}>Value</div>
  </Paper>
</Grid>
}

const InfoTile = () => {

  return <Grid container spacing={8} style={{alignItems:'center',justifyContent:"center",backgroundColor:'grey'}}>
    <Grid item xs={12} style={{fontSize:'1.5em',textAlign:'center',padding:'0 0 10px 0',color:'white'}}>District</Grid>
    {[1,2,3,4].map((index)=>(<Tile/>))}
  </Grid>

}

export default InfoTile;
