/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import axios from "axios";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();


  const logout = () => {
    axios.post('/logout').then(response => {
        if (response.status === 204) {
            // sessionStorage.setItem('loggedIn', false);
            //   sessionStorage.setItem('role', null);
            sessionStorage.clear();
            

        }
    })
};

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            ,
           <Link to="/profile-page" className={classes.dropdownLink}>
           Profile
         </Link>,
         <Link to="/analytics-page" className={classes.dropdownLink}>
         Analytics
       </Link>,
       
       <Link to="/" onClick={logout} className={classes.dropdownLink}>
       Logout
     </Link>
        
            
          ]}
        />
         <CustomDropdown
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            ,
           
        
            
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
       
      </ListItem>
      <ListItem className={classes.listItem}>
       
        
      </ListItem>
      <ListItem className={classes.listItem}>
       
         
           
      </ListItem>
      <ListItem className={classes.listItem}>
       
        
      </ListItem>
    </List>
  );
}
