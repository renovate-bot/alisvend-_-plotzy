import { Button, Typography } from "@material-ui/core";
import React from "react";
import apiClient from "../../api";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Next } from "react-bootstrap/esm/PageItem";



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

    const setHashtag = (id)=>{

        if (sessionStorage.getItem("loggedIn")) {
      
       
            apiClient
                .post("/api/addHashtag",{
                    user_id:sessionStorage.getItem('userId'),
                    hashtag_id:id
    
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
        value={hashtag.id} key={hashtag.id} onClick={()=>{setHashtag(hashtag.id)}}
      />
    );

    return(


<div><Typography variant="h3" style={{ color: 'black', textAlign:'center'}}>Welcome to plotzy!</Typography>
<Typography variant="h4" style={{ color: 'black', textAlign:'center'}}>Choose Your favorite topics to follow!</Typography>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

<div>{hashtagsList}</div>
</div>
<Button  onClick={(e) => {
    e.preventDefault();
    window.location.href='/landing-page';
    }} >Next</Button>
</div>



    )



}