import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FormControl, IconButton, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RoomIcon from '@material-ui/icons/Room';
import Hashtags from './Hashtags';
import apiClient from "../../../api"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    margin: "auto",
    maxWidth: "700px",
    border: "1px solid #ababab",
    borderRadius: "0px 0px 10px 10px"
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("")

 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [title, setTitle] = React.useState('');
    const [conspiracy, setConspiracy] = React.useState('');
    const [hashtag, setHashtag] = React.useState(null);
    const [image, setImage] = React.useState('');
    const [conspiracies, setConspiracies] = React.useState([]);

    const handleImage = (file) => {
        setImage(file[0]);
    }

    const handleSubmitConspiracy = (e) => {

        if (sessionStorage.getItem("loggedIn")) {
            e.preventDefault();
            const fd = new FormData();
            fd.append('title', title);
            fd.append('content', conspiracy);
            fd.append('hashtag_id', hashtag);
            fd.append('path', image);
            apiClient
                .post("/api/addConspiracy",

                    fd

                ).then(() => { props.onAddConsp() })
                .catch((error) => console.error(error))

            e.target.reset();

        }
        setConspiracies(props.conspiracies);


    }



    const handleChangeHashtagID = hashtag => {
        setHashtag(hashtag);
    }


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Conspiracy" {...a11yProps(0)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <form onSubmit={handleSubmitConspiracy}>
              <TextField
                id="title"
                label="Title"
                type="text"
                variant="outlined"
                fullWidth
                onChange={e => setTitle(e.target.value)}
              />
              <TextField
                style={{ marginTop: "20px" }}
                id="conspiracy"
                label="Conspiracy"
                multiline
                rows={6}
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={e => setConspiracy(e.target.value)}
              />
              <div style={{ width: "100%", marginTop: "20px" }}>
                <div style={{ width: "50%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Hashtag</InputLabel>
                    <Hashtags onChangeHashtagID={handleChangeHashtagID} />
                  </FormControl>
                </div>
                <div style={{ width: "15%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    variant=""
                    color="primary"
                    className={classes.button}
                    startIcon={<RoomIcon />}
                  >
                    Location
                </Button>
                </div>
                <div style={{ width: "35%", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                  <input
                    hidden
                    accept="image/*"
                    className={classes.input}
                    id="media-file-input"
                    multiple
                    type="file"
                    onChange={(e) => { handleImage(e.target.files) }}
                  />

                  <label htmlFor="media-file-input">
                    <Button variant="contained" color="primary" component="span" size="large" >
                      Upload Media
                    </Button>
                  </label>

                </div>


              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  type="submit"
                >
                  Post
                </Button >
                
              </div>
            </form>
          </div>
        </TabPanel>
       
      </SwipeableViews>
    </div>
  );
}