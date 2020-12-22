import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@material-ui/core";


import axios from "axios";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(styles);
export default function NewTask(props) {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setConfirmPassword] = React.useState('');
    const [dob, setDOB] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    React.useEffect(() => {

    }, []);
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSubmit = (e) => {
        setOpen(false);
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/register', {
                    username: username,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    dob: dob,
                    gender: gender,

                }).then(response => {

                    if (response.status === 201) {
                        setToHome(true);
                        sessionStorage.setItem('loggedIn', true);
                        axios.get('api/user', {}).then(response => {
                            sessionStorage.setItem('username', response.data.username);
                            sessionStorage.setItem('userId', response.data.id);
                        });
                    }
                });
            });


    };

    if (toHome === true) {
        return <Redirect to='/profile-page' />
    }

    return (
        <div>

            <Button onClick={handleClickOpen} simple color="primary" size="lg" className="plus radius" style={{ marginRight: "1em", float: "right" }}>
                Create Account
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                    <DialogActions>
                        

                    </DialogActions>

                    <form className={classes.form} >
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>Register Now and post your theory!</h4>

                        </CardHeader>

                        <CardBody>
                            <CustomInput
                                labelText="Username..."
                                id="username"
                                value={username}

                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    onChange: e => setUsername(e.target.value),
                                    type: "text",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <People className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <CustomInput
                                labelText="Email..."
                                id="email"
                                value={email}

                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    type: "email",
                                    onChange: e => setEmail(e.target.value),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <br></br>
                            <CustomInput
                                labelText="Password"
                                id="password"
                                value={password}

                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    type: "password",
                                    onChange: e => setPassword(e.target.value),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className={classes.inputIconsColor}>
                                                lock_outline
                            </Icon>
                                        </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                }}
                            />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <CustomInput
                                labelText="Password Confirmation"
                                id="password_confirmation"
                                value={password_confirmation}

                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    type: "password",
                                    onChange: e => setConfirmPassword(e.target.value),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className={classes.inputIconsColor}>
                                                lock_outline
                            </Icon>
                                        </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                }}
                            />
                            <br></br><br></br>
                            <TextField
                                id="date"
                                label="Date of birth"
                                type="date"
                                value={dob}
                                onChange={e => { setDOB(e.target.value) }}
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={e => setGender(e.target.value)}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>


                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button simple color="primary" size="lg" type="submit" onClick={handleSubmit}>
                                Get started
                    </Button>
                        </CardFooter>
                    </form>


                </DialogContent>

            </Dialog>
        </div>
    );
}
