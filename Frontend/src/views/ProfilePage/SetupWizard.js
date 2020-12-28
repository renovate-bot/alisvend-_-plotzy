import { Typography } from "@material-ui/core";
import React from "react";
import apiClient from "../../api";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



export default function SetupWizard(props){

    const [hashtags, setHashtags] = React.useState([]);

    React.useEffect(() => {
        if (sessionStorage.getItem("loggedIn")) {
             apiClient.get('/api/hashtags')
                .then(response => {
                    setHashtags(response.data)
                })
                .catch(error => console.error(error))

        }
    }, []);

    const setHashtag = (name)=>{

        if (sessionStorage.getItem("loggedIn")) {
      
       
            apiClient
                .post("/api/addHashtag",{
                    name:name
    
                }
    
                    
    
                )
    
            
    
        }

    }
    const hashtagsList = hashtags.map((hashtag) =>
        <FormControlLabel
        value="end"
        control={<Checkbox color="primary" />}
        label={hashtag.name}
        labelPlacement="end"
        value={hashtag.id} key={hashtag.id} onClick={()=>{setHashtag(hashtag.name)}}
      />
    );

    return(


<div><Typography variant="h3" style={{ color: 'black', textAlign:'center'}}>Welcome to plotzy!</Typography>
<Typography variant="h4" style={{ color: 'black', textAlign:'center'}}>Choose Your favorite topics to follow!</Typography>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

<div>{hashtagsList}</div>
</div>

</div>



    )



}