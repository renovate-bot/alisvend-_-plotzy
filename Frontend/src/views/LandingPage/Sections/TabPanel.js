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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SearchableMap from './SearchableMap';



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
        <Box p={3} style={{backgroundImage:"/src/assets/img/bj8.jpg"}}>
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
    borderRadius: "0px 0px 10px 10px",
    paper: { minWidth: "500px" }
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
  const [open, setOpen] = React.useState(false);
  const [longitude, setLongitude] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [link, setLink] = useState('');


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
      fd.append('long', longitude);
      fd.append('lat', latitude);

      apiClient
        .post("/api/addConspiracy",

          fd

        )

        .then(() => { props.onAddConsp() })
        .catch((error) => console.error(error))

      e.target.reset();

    }
    setConspiracies(props.conspiracies);


  }



  const handleChangeHashtagID = hashtag => {
    setHashtag(hashtag);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const onChangelong = (e) => {
    setLongitude(e)
    // console.log(this.state.longitude)
  }
  const onChangelat = (e) => {
    setLatitude(e)
    // console.log(this.state.latitude)
  }

  const handleSubmitLink = (e) => {

    if (sessionStorage.getItem("loggedIn")) {
      e.preventDefault();
      const fd = new FormData();

      fd.append('content', link);


      apiClient
        .post("/api/addLink",

          fd

        )

        .then(() => { props.onAddLink() })
        .catch((error) => console.error(error))

      e.target.reset();

    }
    setLink(props.links);


  }


  return (


    <div className={classes.root}>

      <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

        <DialogContent>

          <SearchableMap longitude={onChangelong} latitude={onChangelat} />



        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>


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
          <Tab label="Link" {...a11yProps(1)} />
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
                <div style={{ width: "15%", display: "inline-flex", justifyContent: "center", alignItems: "center"}}>
                  <Button
                    onClick={handleClickOpen}
                    variant=""
                    color="primary"
                    className={classes.button}
                    startIcon={<RoomIcon />}
                    style = {{left:"20px"}}
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
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", top: "20px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  type="submit"
                  style = {{top:"20px"}}
                >
                  Post
                </Button >

              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <form onSubmit={handleSubmitLink}>
            <TextField
              style={{ marginTop: "20px" }}
              id="link"
              label="Paste your link here to share"
              multiline
              rows={6}
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={e => setLink(e.target.value)}
            />


            <Button type="submit">Post</Button>
          </form>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}