import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-ui/core";

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
import { RadioGroup, Radio, FormControl, FormLabel } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SetupWizard from "./SetupWizard";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";


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
        width: '100%'

    },

}));

export default function SetupWizardd() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
      setCardAnimation("");
    }, 700);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const [open, setOpen] = React.useState(false);
    return (
           
        <div className={`${classes.root} backImage`}>
           {/* <Button onClick={handleClickOpen} simple color="primary" size="lg" className="plus radius create-button" >
               Open SetupWizard
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                    <DialogActions>


                    </DialogActions>

                    <SetupWizard/>
                </DialogContent>
            </Dialog> */}

<GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={`${classes[cardAnimaton]} customCard`}>

<SetupWizard/>
                  </Card>
                  </GridItem>
                  </GridContainer>
        </div>
     
    );
}
