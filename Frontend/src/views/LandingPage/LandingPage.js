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

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page

import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import Tabs from "./Sections/Tabs.js";
import Conspiracies from "./Sections/Conspiracies.js";
import apiClient from './../../api';

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
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}></h1>
              <h4>

              </h4>
              <br />

            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Tabs onAddConsp={fetchConspiracies} />
          <div>{conspiracies.map((conspiracy) => {

            return (<div key={conspiracy.id}>
              <h3 style={{ color: 'black' }}>{conspiracy.title}</h3>
              <p style={{ color: 'black' }}>{conspiracy.content}</p>
              <h5 style={{ color: 'black' }}>{conspiracy.created_at}</h5>
              <h5 style={{ color: 'black' }}>{conspiracy.hashtag.name}</h5>
              <Conspiracies consp={conspiracy} />{console.log(conspiracies)}
              {conspiracy.media.map((path) => {

                return (
                  <div className="photo">
                    <img src={path.path}></img></div>
                )
              })}
            </div>);
          })}</div>
          
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
