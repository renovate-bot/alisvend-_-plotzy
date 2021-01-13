import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/marc.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { Card, Table } from '@material-ui/core';
import Comment from "../LandingPage/Sections/Comment";
import Vote from "../LandingPage/Sections/Vote";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';


import apiClient from "../../api";
import { Col, Row } from "react-bootstrap";


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
    width: '100%',
  },
}));




export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);




  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [conspiracies, setConspiracies] = React.useState([]);
  const [long, setLong] = React.useState(null);
  const [lat, setLat] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState([]);
  let [hashtags, setHashtags] = React.useState([{ id: 1, name: 'Politics', checked: 'false' }, { id: 2, name: 'Health', checked: 'true' }, { id: 3, name: 'Social', checked: 'true' }, { id: 4, name: 'Series', checked: 'false' }, { id: 5, name: 'Sports', checked: 'false' }, { id: 6, name: 'Technology', checked: 'false' }]);
  const [checkedHashtags, setCheckedHashtags] = React.useState([]);
  const [checkedOne, setcheckedOne] = React.useState(false);
  const [checkedTwo, setcheckedTwo] = React.useState(false);
  const [checkedThree, setcheckedThree] = React.useState(false);
  const [checkedFour, setcheckedFour] = React.useState(false);
  const [checkedFive, setcheckedFive] = React.useState(false);
  const [checkedSix, setcheckedSix] = React.useState(false);
  const [number, setNumber] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };




  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue==1){
      getFollowers();      
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  React.useEffect(() => {
    fetchConspiracies();
    getUser();
    if (sessionStorage.getItem("loggedIn")) {
      apiClient.get('/api/hashtags')
        .then(response => {
          setHashtags(response.data)
          hashtags = response.data;


        })
        .catch(error => console.error(error))

    }

    getCheckedHashtags();
    getNumberOfConspiracies();

  }, []);

  const fetchConspiracies = () => {


    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/conspiraciesForUser")
        .then((response) => {
          setConspiracies([]);
          setConspiracies(response.data);

        })
        .catch((error) => console.error(error))


    };


  }

  const getUser = () => {


    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/userInfo")
        .then((response) => {
          setUser([]);
          setUser(response.data);

        })
        .catch((error) => console.error(error))


    };


  }

  const setHashtag = (id) => {

    if (sessionStorage.getItem("loggedIn")) {


      apiClient
        .post("/api/addHashtag", {
          hashtags: [{ id: 1, checked: checkedOne }, { id: 2, checked: checkedTwo }, { id: 3, checked: checkedThree }, { id: 4, checked: checkedFour }, { id: 5, checked: checkedFive }, { id: 6, checked: checkedSix }]

        }
        )

    }

  }



  const handleEditUsername = (name) => {


    if (sessionStorage.getItem("loggedIn")) {


      const fd = new FormData();

      fd.append('username', name);

      apiClient
        .post("/api/editName", fd)



    }
    sessionStorage.setItem("username", name);
  }


  const getCheckedHashtags = () => {

    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/checkedHashtags")
        .then((response) => {

          setCheckedHashtags(response.data);

        })
        .catch((error) => console.error(error))


    };

  }

  const [followers, setFollowers] = React.useState([]);

  const getFollowers = () => {

    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/getFollowers")
        .then((response) => {

          setFollowers(response.data);

        })
        .catch((error) => console.error(error))


    };

  }

  const getNumberOfConspiracies = () => {

    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/numberOfConspiracies")
        .then((response) => {

          setNumber(response.data);

        })
        .catch((error) => console.error(error))


    };

  }


  React.useEffect(() => {
    checkedHashtags.forEach(element => {
      for (let index = 1; index <= 6; index++) {
        if (element.hashtag_id == index) {
          switch (index) {
            case 1:
              setcheckedOne(true);
              break;
            case 2:
              setcheckedTwo(true);
              break;
            case 3:
              setcheckedThree(true);
              break;
            case 4:
              setcheckedFour(true);
              break;
            case 5:
              setcheckedFive(true);
              break;
            case 6:
              setcheckedSix(true);
              break;

            default:
              break;
          }


        }

      }
    });
  }, [checkedHashtags]);



  return (
    <div>
      
      {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}

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
            <Tab label="My Posts" {...a11yProps(0)} />
            <Tab label="Friends" {...a11yProps(1)} />
            <Tab label="Personal Info" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div style={{textAlign:"left", fontSize:"2rem"}}>
            Number of Posts: {number}
            </div>
            <div>{conspiracies.map((conspiracy) => {

              if (conspiracy.user_id !== null) {
                return (


                  <div key={conspiracy.id} style={{ border: '6px solid rgba(0, 0, 0, 0.05)' }}>

                    <Card className={classes.root1}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.profile}>
                            
                    <img style={{width:"40px",height:"40px"}} src={conspiracy.user.profile_pic} alt="..." className={imageClasses} />
                  
</Avatar>
                        }
                        action={
                          <i className='fas fa-map-marker-alt' onClick={() => { setLong(conspiracy.long); setLat(conspiracy.lat); handleClickOpen()}} />
                        }
                        title={`${conspiracy.title}`}
                        subheader={moment(conspiracy.created_at).format("LLL")}
                      /> 
                      <Typography variant="h6" style={{ color: 'cornflowerblue' }}>#{conspiracy.hashtag.name}</Typography>

                        
                      
                      {conspiracy.media.map((path) => {

                        return (<>
                          <div style={{width:'100%', textAlign:'center'}}>
                        <img src={path.path} className="conspImage"></img>
                        </div>

                         </>)
                      })}
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{conspiracy.content}
                        </Typography>
                        
                        
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <Vote postID={conspiracy.id} />
                        </IconButton>

                      </CardActions>

                      <Comment postID={conspiracy.id} />
                    </Card>




                  </div>);
              }
            })}</div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          {followers.map((follower)=>{return(
           follower.requestee.username==sessionStorage.getItem('username')?<></>:<>
            <Table><tbody><tr>
              <td style={{width:'50px'}}>
            <Avatar>
            <img src = {follower.requestee.profile_pic} className="Avatar"/></Avatar>
            </td>
            <td style={{width:'50px',float:"left"}}>
            <h4>{follower.requestee.username}</h4></td>
            <td style={{width:'50px',float:"left",marginLeft:"60px"}}><Button>Unfollow</Button></td></tr></tbody></Table></>
      
          )})}
        </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
          
            {user.map((user) => { return (<>
              <p> <EditText onSave={(e) => (handleEditUsername(e.value))} value={sessionStorage.getItem("username")} style={{width:'20%',fontSize:'23px'}}/></p>
            <p>Date of Birth: {user.dob}</p> <p>Gender: {user.gender}</p><p>Phone Number: {user.phoneNumber}</p></>) })}

            <div><form>


              <label>
                <input
                  checked={checkedOne}
                  onChange={() => { checkedOne ? setcheckedOne(false) : setcheckedOne(true) }}
                  type="checkbox"

                  value="1"
                />Politics</label>

              <label>
                <input
                  checked={checkedTwo}
                  onChange={() => { checkedTwo ? setcheckedTwo(false) : setcheckedTwo(true) }}
                  type="checkbox"

                  value="2"
                />Health</label>

              <label>
                <input
                  checked={checkedThree}
                  onChange={() => { checkedThree ? setcheckedThree(false) : setcheckedThree(true) }}
                  type="checkbox"

                  value="3"
                />Social</label>
              <label>
                <input
                  checked={checkedFour}
                  onChange={() => { checkedFour ? setcheckedFour(false) : setcheckedFour(true) }}
                  type="checkbox"

                  value="4"
                />Series</label>
              <label>
                <input
                  checked={checkedFive}
                  onChange={() => { checkedFive ? setcheckedFive(false) : setcheckedFive(true) }}
                  type="checkbox"

                  value="5"
                />Sports</label>
              <label>
                <input
                  checked={checkedSix}
                  onChange={() => { checkedSix ? setcheckedSix(false) : setcheckedSix(true) }}
                  type="checkbox"

                  value="6"
                />Technology</label>
              <br/>
              <Button color="success" onClick={setHashtag} >Submit</Button>
            </form></div>
          </TabPanel>
        </SwipeableViews>
      </div>






      <Footer />
    </div>
  );
}
