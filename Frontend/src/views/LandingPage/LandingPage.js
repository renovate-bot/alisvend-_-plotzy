import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import './landing.css'
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import { Typography } from '@material-ui/core';
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page

import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import TabPanel from './Sections/TabPanel.js'

import apiClient from './../../api';
import Comment from "./Sections/Comment.js";
import Vote from "./Sections/Vote.js";
import SuggestedUsers from "./Sections/SuggestedUsers";
import SearchableMap from "./Sections/ViewMap.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import moment from 'moment';
import { ReactTinyLink } from 'react-tiny-link';



import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles()
  const { ...rest } = props;
  const [conspiracies, setConspiracies] = React.useState([]);
  const [long, setLong] = React.useState(null);
  const [lat, setLat] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [links, setLinks] = React.useState([]);


  React.useEffect(() => {
    fetchConspiracies();
    fetchLinks();;
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };


  const fetchConspiracies = () => {
    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/conspiracies")
        .then((response) => {
          setConspiracies([]);
          setConspiracies(response.data);

        })
        .catch((error) => console.error(error))

    }
  };

  const fetchLinks = () => {
    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/links")
        .then((response) => {
          setLinks([]);
          setLinks(response.data);

        })
        .catch((error) => console.error(error))

    }
  };


  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="plotzy"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
        </div>
      </Parallax>
      <div style={{ display: "flex", width: '100%' }}>
        <div>
          {links.map((link) => {
            return (
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={link.content}
              />

            )
          })}
        </div>
        <div className={classNames(classes.main, classes.mainRaised)} style={{ width: '100%', paddingTop: "40px" }}>

          <div className={classes.container} >


            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

              <DialogContent>

                <SearchableMap longitude={long} latitude={lat} />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>

              </DialogActions>
            </Dialog>


            <div >
              <TabPanel onAddConsp={fetchConspiracies} onAddLink={fetchLinks} />
            </div>

            <div>{conspiracies.map((conspiracy) => {

              if (conspiracy.user_id !== null) {
                return (


                  <div key={conspiracy.id} style={{ border: '6px solid rgba(0, 0, 0, 0.05)' }}>

                    <Card className={classes.root1}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar1}>
                            <img src={conspiracy.user.profile_pic}/>
          </Avatar>
                        }
                        action={
                          <i className='fas fa-map-marker-alt' onClick={() => { setLong(conspiracy.long); setLat(conspiracy.lat); handleClickOpen()}} />
                        }
                        title={`${conspiracy.title} by ${conspiracy.user.username}`}
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
                        <Typography variant="h6" color="textSecondary" component="p">{conspiracy.content}
                        </Typography>
                        
                        {/* <Button onClick={() => { setLong(conspiracy.long); setLat(conspiracy.lat); handleClickOpen() }}>Location</Button> */}
                        {/* <i className='fas fa-map-marker-alt' onClick={() => { setLong(conspiracy.long); setLat(conspiracy.lat); handleClickOpen()}} /> */}
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <Vote postID={conspiracy.id} />
                        </IconButton>

                      </CardActions>

                      <Comment postID={conspiracy.id} />
                    </Card>




                  </div>);
              } else {
                return (<Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                    }
                    
                    title={`${conspiracy.title} by Anonymous`}
                   
                    subheader={moment(conspiracy.created_at).format("LLL")}
                  /> 
                  <Typography variant="h5" style={{ color: 'cornflowerblue' }}>#{conspiracy.hashtag.name}</Typography>
                  
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

                </Card>);
              }
            })} </div>



          </div>
        </div>
        <div className={`${classNames(classes.main, classes.mainRaised)} suggested-container`} >    <div style={{ color: 'black' }}>
          <SuggestedUsers /></div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
