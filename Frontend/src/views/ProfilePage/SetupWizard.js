import { Typography } from "@material-ui/core";
import React from "react";
import Hashtags from "../LandingPage/Sections/Hashtags";


export default function SetupWizard(props){



    return(


<div><Typography variant="h3" style={{ color: 'black', textAlign:'center'}}>Welcome to plotzy!</Typography>
<Typography variant="h4" style={{ color: 'black', textAlign:'center'}}>Choose Your favorite topics to follow!</Typography>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Hashtags/></div>

</div>



    )



}