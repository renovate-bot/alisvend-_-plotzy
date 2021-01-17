import React, { useState, useEffect } from 'react';
import { Avatar, Button, Typography } from "@material-ui/core";

import apiClient from "../../api";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Next } from "react-bootstrap/esm/PageItem";
import './setup.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CustomInput from "components/CustomInput/CustomInput.js";
import Box from '@material-ui/core/Box';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import CheckboxGroup from 'react-checkbox-group'
import Axios from 'axios';
import { RadioGroup, Radio, FormControl, FormLabel} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
var AvatarPicker = require("material-ui-avatar-picker");

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },

}));

export default function SetupWizard() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [phone, setPhone] = useState(null);
    const[source,setSource] = useState('')
    let phone1 = null;
    let image = null;
   let dob = null;
   let gender = null;

   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [hashtags, setHashtags] = useState([{ 'id': 1, 'name': 'Politics',checked:false }, { 'id': 2, 'name': 'Health',checked:false }, { 'id': 3, 'name': 'Social',checked:false }, { 'id': 4, 'name': 'Series',checked:false }, { 'id': 5, 'name': 'Sports',checked:false }, { 'id': 6, 'name': 'Technology',checked:false }]);
    let hashtags1=[];
    const [renderDump,setRenderDump]=useState(null);

   const handleChangeHashtags = (e)=>{
     let tempHashtags=hashtags;
     setHashtags([]);
     
     tempHashtags.forEach(hashtag => {
        if(hashtag.id==e.target.value){
           
            //console.log(hashtag.checked,"awwal if");
         if(hashtag.checked==false){
             
            hashtag.checked=true;
            setHashtags(tempHashtags);
            setRenderDump(hashtag.checked+e.target.value);

            //console.log(hashtag.checked,"tene if");
         }else{hashtag.checked=false;
            setHashtags(tempHashtags);
            setRenderDump(hashtag.checked+e.target.value);
        }   
        }

    }
    
    );
    


    }
    

    const setHashtag = (id) => {

        if (sessionStorage.getItem("loggedIn")) {


            apiClient
                .post("/api/addHashtag", {
                    
                    hashtags: hashtags

                }
                )

        }

    }

    const handleSubmitPhone = (e) => {
        e.preventDefault();
       
        if (sessionStorage.getItem("loggedIn")) {
            apiClient.post('/api/addPhone', {
                phoneNumber: phone1,
                dob:dob,
                gender:gender
            })
        }
       
    }

    const handleImage = (file) => {
        //setImage(file[0]);
        image = file[0];
        setSource("/ali.JPG")
    }

    const handleSubmitPic = (e) => {

        if (sessionStorage.getItem("loggedIn")) {
            e.preventDefault();
            
            const fd = new FormData();

            fd.append('profile_pic', image);

            apiClient
                .post("/api/addProfilePicture", fd).then(
                    apiClient.get("api/user").then((response) => {
                       
                        sessionStorage.setItem("profile_pic",response.data.profile_pic)
              
                      })
                )

        }

    }


    const step1Content = <><br />
        <form className="formCustom">
<div>            
            <CustomInput
                labelText="Phone Number..."
                id="phone"
                value={phone}

                formControlProps={{
                    fullWidth: false
                }}
                inputProps={{
                    type: "text",
                    onChange: e => { phone1 = e.target.value },

                }}
            />
            </div>
            <div>
            <TextField
                                id="date"
                                label="Date of birth"
                                type="date"
                                value={dob}
                                onChange={e => { dob=e.target.value }}
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               </div>
                               <div><FormControl component="fieldset">
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <FormLabel component="legend" style={{marginRight:'20px'}}>Gender</FormLabel>

                                    <RadioGroup  aria-label="gender" name="gender1" value={gender} onChange={e => {gender = e.target.value}}>
                                   <div style={{display:'flex'}}>
                                   <div><FormControlLabel value="female" control={<Radio />} label="Female" /></div> 
                                   <div><FormControlLabel value="male"  control={<Radio />} label="Male" /></div> 
                                   <div><FormControlLabel value="other"  control={<Radio />} label="Other" /></div> 
                                   </div>
                                    </RadioGroup></div>
                            </FormControl>
                            </div>
            <Button variant="contained" color="secondary" type="submit" onClick={handleSubmitPhone}>Save Changes</Button>

        </form></>;


    const step2Content = <>
        <Typography variant="h4" style={{ color: 'black', textAlign: 'center',padding:'40px 0' }}><br />Choose Your favorite topics to follow!</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{padding:'30px 0'}}>{ hashtags.map((hashtag) => {
            
        return (
            <FormControlLabel
                value="end"
                control={<Checkbox color="primary" key={hashtag.id} />}
                label={hashtag.name}
                labelPlacement="end"
                value={hashtag.id} key={hashtag.id} onChange={(e) => { handleChangeHashtags(e) }}
            />)
    }
    ) }</div>
        </div></>;


    const step3Content = <> <br /> <div style={{fontWeight:'bold',marginLeft:"75px"}}><br/>Upload your profile Picture:</div>
        <form onSubmit={handleSubmitPic} className="formCustom">
            {/* <input

                accept="image/*"
                className={classes.input}
                id="media-file-input"
                multiple
                type="file"
                onChange={(e) => { handleImage(e.target.files) }}
            /> */}
             <Avatar style={{width:200,height:200,marginLeft:"140px",marginBottom:"20px"}} src={source} alt="..."/>

           <div style={{ width: "35%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>

     
                  <input
                    hidden
                    
                    className={classes.input}
                    id="media-file-input"
                    multiple
                    type="file"
                    onChange={(e) => { handleImage(e.target.files) }}
                  />

                  <label htmlFor="media-file-input">
                      <div style={{display:"flex"}}>
                    <Button style={{width:"180px", marginLeft:"100px"}} variant="contained" color="primary" component="span" size="large" >
                      Upload Picture
                    </Button>
                    
                    <Button style={{marginLeft:"20px"}} variant="contained" color="secondary" type="submit" >Save</Button> </div>
                  </label>


                </div>
            
          
        </form>
    </>;

    function onFormSubmit() {
        setHashtag();
        window.location.href = '/landing-page';
    }
    return (
     
        <div className={classes.root}>
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        label: 'Step 1',
                        subtitle: '10%',
                        name: 'step 1',
                        content: step1Content
                    },
                    {
                        label: 'Step 2',
                        subtitle: '50%',
                        name: 'step 2',
                        content: step2Content,

                    },
                    {
                        label: 'Step 3',
                        subtitle: '100%',
                        name: 'step 3',
                        content: step3Content,

                    }
                ]}
            />

        </div>
    );
}
