import React from "react";
import { TextField, DialogContent, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import propTypes from "prop-types";

const useStyles = makeStyles({
  textField: {
    marginTop: "1em"
  }
});

/**
 * @param signInInfo: sign in information filled by the user
 * @param setSignInInfo: function set state of signInInfo
 * @returns sign in form
 */
const SignIn = ({ signInInfo, setSignInInfo }) => {
  const classes = useStyles();

  const handleInfoChange = event => {
    const { value, name } = event.target;
    setSignInInfo({ ...signInInfo, [name]: value });
  };

  return (
    <>
      <DialogTitle id="login-form">Log in to your account</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="username"
          name="username"
          type="username"
          label="Username"
          onChange={handleInfoChange}
          value={signInInfo.username}
          className={classes.textField}
        />
        <br />
        <TextField
          required
          id="password"
          name="password"
          type="password"
          label="Password"
          onChange={handleInfoChange}
          value={signInInfo.password}
          className={classes.textField}
        />
      </DialogContent>
    </>
  );
};

SignIn.propTypes = {
  signInInfo: propTypes.any.isRequired,
  setSignInInfo: propTypes.func.isRequired
};

export default SignIn;
