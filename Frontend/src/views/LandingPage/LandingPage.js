import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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
import { Card } from '@material-ui/core';
// Sections for this page

import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import TabPanel from './Sections/TabPanel.js'

import apiClient from './../../api';
import Comment from "./Sections/Comment.js";
import Vote from "./Sections/Vote.js";
import SuggestedUsers from "./Sections/SuggestedUsers";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [conspiracies, setConspiracies] = React.useState([]);
  


  React.useEffect(() => {
    fetchConspiracies();

  }, []);


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
      <div className={classNames(classes.main, classes.mainRaised)} style={{paddingTop: "40px"}}>
        <div className={classes.container} >
          

          <div >
            <TabPanel onAddConsp={fetchConspiracies} />
          </div>
          <div style={{ color:'black' }}>
      <SuggestedUsers/></div>
          <div>{conspiracies.map((conspiracy) => {
            if(conspiracy.user_id!==null){
            return (
              
              
            <div key={conspiracy.id}  style={{ border: '3px solid rgba(0, 0, 0, 0.05)'}}>
              <Card >
              <Typography variant="h3" style={{ color: 'black' }}>{conspiracy.title}</Typography> <Typography variant="h5" style={{ color: 'black' }}>By: {conspiracy.user.username}</Typography> 
              <Typography variant="p" style={{ color: 'black' }}>{conspiracy.content}</Typography>
              <Typography variant="h5" style={{ color: 'black' }}>{conspiracy.created_at}</Typography>
              <Typography variant="h5" style={{ color: 'black' }}>#{conspiracy.hashtag.name}</Typography>

              {conspiracy.media.map((path) => {

                return (
                  <div className="photo">
                    <img src={path.path}></img></div> 
                )
              })}
              <Vote postID={conspiracy.id}/>
              <Comment postID={conspiracy.id}/>
              
              
              </Card>
              
            </div>);
}else{return (<Card><div key={conspiracy.id}>
  <Typography variant="h3" style={{ color: 'black' }}>{conspiracy.title}</Typography> <Typography variant="h5" style={{ color: 'black' }}>By: Anonymous</Typography> 
  <Typography variant="p" style={{ color: 'black' }}>{conspiracy.content}</Typography>
  <Typography variant="h6" style={{ color: 'black' }}>{conspiracy.created_at}</Typography>
  <Typography variant="h5" style={{ color: 'black' }}>#{conspiracy.hashtag.name}</Typography>

  {conspiracy.media.map((path) => {

    return (
      <div className="photo">
        <img src={path.path}></img></div>
    )
  })}
</div>
<Vote postID={conspiracy.id}/>
<Comment postID={conspiracy.id}/></Card>); }})} </div>

          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
