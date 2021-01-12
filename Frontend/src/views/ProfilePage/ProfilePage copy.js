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

import profile from "assets/img/faces/christian.jpg";

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
import ProfilePage from "./ProfilePage";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import apiClient from "../../api";


const useStyles = makeStyles(styles);

export default function ProfilePagee(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const [user,setUser]=React.useState([]);


    React.useEffect(() => {
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
    }, []);
    


  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>

              {/* {user.map((user) => { return (<>
                {sessionStorage.setItem("profile_pic",user.profile_pic)}
            </>) })} */}
                <div className={classes.profile}>
                  <div>
                    <img src={sessionStorage.getItem("profile_pic")} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{sessionStorage.getItem('username')}</h3>
                   
                   
                    
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <ProfilePage/>
          
             
              
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
