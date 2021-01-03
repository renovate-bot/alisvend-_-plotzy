import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-ui/core";

import apiClient from "../../api";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Next } from "react-bootstrap/esm/PageItem";

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
    let phone1 = null;
    let image = null;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [hashtags, setHashtags] = useState([{ 'id': 1, 'name': 'Politics' }, { 'id': 2, 'name': 'Health' }, { 'id': 3, 'name': 'Social' }, { 'id': 4, 'name': 'Series' }, { 'id': 5, 'name': 'Sports' }, { 'id': 6, 'name': 'Technology' }]);

    useEffect(() => {
        if (sessionStorage.getItem("loggedIn")) {
            apiClient.get('/api/hashtags')
                .then(response => {
                    setHashtags(response.data)
                    hashtags = response.data;


                })
                .catch(error => console.error(error))

        }
    }, []);

    const setHashtag = (id) => {

        if (sessionStorage.getItem("loggedIn")) {


            apiClient
                .post("/api/addHashtag", {
                    user_id: sessionStorage.getItem('userId'),
                    hashtag_id: id

                }
                )

        }

    }

    const handleSubmitPhone = (e) => {
        e.preventDefault();
       
        if (sessionStorage.getItem("loggedIn")) {
            apiClient.post('/api/addPhone', {
                phoneNumber: phone1

            })
        }
       
    }

    const handleImage = (file) => {
        //setImage(file[0]);
        image = file[0]
    }

    const handleSubmitPic = (e) => {

        if (sessionStorage.getItem("loggedIn")) {
            e.preventDefault();
           
            const fd = new FormData();

            fd.append('profile_pic', image);

            apiClient
                .post("/api/addProfilePicture", fd)

        }

    }

    const hashtagsList = hashtags.map((hashtag) => {
        return (
            <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label={hashtag.name}
                labelPlacement="end"
                value={hashtag.id} key={hashtag.id} onClick={() => { setHashtag(hashtag.id) }}
            />)
    }
    );


    const step1Content = <><br />Enter your phone number:
        <form>
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

            <Button type="submit" onClick={handleSubmitPhone}>Submit</Button>

        </form></>;


    const step2Content = <>
        <Typography variant="h4" style={{ color: 'black', textAlign: 'center' }}><br />Choose Your favorite topics to follow!</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <div>{hashtagsList.length > 0 ? hashtagsList : <></>}</div>
        </div></>;


    const step3Content = <> <br /> Upload your profile Picture:
        <form onSubmit={handleSubmitPic}>
            <input

                accept="image/*"
                className={classes.input}
                id="media-file-input"
                multiple
                type="file"
                onChange={(e) => { handleImage(e.target.files) }}
            />

            <label htmlFor="media-file-input"><Button type="submit" >Upload</Button> </label>
        </form>
    </>;

    function onFormSubmit() {
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
