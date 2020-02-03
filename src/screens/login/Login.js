import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../../common/Header';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import '../login/Login.css';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, Input, Button, FormHelperText } from '@material-ui/core';


const styles = theme => ({
    formControl: {
        margin: theme.spacing(),
        width: 350
    },

    buttonControl: {
        margin: theme.spacing(),
        pointer: 'cursor'
    }
})



class Login extends Component {
    constructor() {
        super();
        sessionStorage.removeItem("access-token");
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            authError: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    /*When login button clicked, loginClickHandler checks whether username and password fields are empty. 
    If empty we show required error. If not empty then we check if username and password matches the defined one
    If it matches then it allows user to home page or it will show inline error of incorrect username or password
    */
    loginClickHandler = () => {
        let uname = "abcd";
        let pwd = "abcd";
        let accessToken = '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784';
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        let authErr = this.state.authError;
        if (this.state.username !== "" && this.state.password !== "") {
            if (this.state.username === uname && this.state.password === pwd) {
                authErr = "dispNone";
                this.setState({ authError: authErr });
                window.sessionStorage.setItem('access-token', accessToken);
                this.props.history.push('/home');
            } else {
                authErr = "dispBlock";
                this.setState({ authError: authErr });
            }
        } else {
            authErr = "dispNone";
            this.setState({ authError: authErr });
        }
    }

    render() {
        // Used FormControl,Input and Buttons for Login card. Also used FormHelperText for showing inline errors
        const { classes } = this.props;
        return (
            <div>
                <Header parent="login" history={this.props.history} />
                <Card className="loginCard">
                    <CardContent>
                        <FormControl className={classes.formControl}>
                            <Typography className="title">
                                LOGIN
                            </Typography>
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl} required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" onChange={this.inputUsernameChangeHandler}></Input>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl} required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler}></Input>
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.authError}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl className={classes.buttonControl} required>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Login);