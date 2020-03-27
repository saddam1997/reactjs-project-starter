import React, { Component } from "react";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import logo from "./logo.svg";
import { userActions } from '../../_actions';
import { CONST } from '../../_config';
import  styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.loginSubmit = this.loginSubmit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }
  componentDidMount() {
  }
  inputChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }
  loginSubmit(e) {
    e.preventDefault();
    let {email,password}=this.state;
    this.props.dispatch(userActions.login({ username:email,password},this.props));
  }
  render() {

    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>{CONST.APP_NAME}</Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            
            <React.Fragment>
              <TextField
                id="email"
                name="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={this.state.email}
                onChange={this.inputChange}
                margin="normal"
                placeholder="Email"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={this.state.password}
                onChange={this.inputChange}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {false ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      disabled={
                        this.state.email.length === 0 || this.state.password.length === 0
                      }
                      onClick={this.loginSubmit}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                  </Button>
                  )}
              </div>
            </React.Fragment>

          </div>
          <Typography color="primary" className={classes.copyright}>
          {CONST.FOOTER_TEXT}
        </Typography>
        </div>
      </Grid>
    )
  }
}
function mapStateToProps(state) {
  console.log("state  ", state);
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Login));
