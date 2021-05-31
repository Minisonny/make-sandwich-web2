import React, { useState } from "react";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createUser } from "../services/userServices";
import PropTypes from "prop-types";
import { generateId } from "../utils/helper";
import AlertBar from "./AlertBar";

const useStyles = makeStyles({
  textField: {
    marginTop: "1em"
  }
});

/**
 * @returns sign up form for adding new user.
 */
const SignUp = ({ apiKey }) => {
  const classes = useStyles();
  const emptyInfo = {
    email: "",
    username: "",
    password: "",
    passwordAgain: ""
  };
  const [signUpInfo, setSignUpInfo] = useState(emptyInfo);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const displayStatus = (notiStatus, notiMessage) => {
    setMessage(notiMessage);
    setStatus(notiStatus);
    setTimeout(() => {
      setStatus(null);
      setMessage("");
    }, 1000);
  };

  const handleInfoChange = event => {
    const { value, name } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
    if (name === "passwordAgain") {
      if (signUpInfo.password === value) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  };

  const handleSignUp = () => {
    if (
      !passwordMatch ||
      signUpInfo.email === "" ||
      signUpInfo.username === "" ||
      signUpInfo.password === ""
    ) {
      return;
    }
    signUpInfo.id = generateId();
    delete signUpInfo.passwordAgain;
    createUser(signUpInfo, apiKey)
      .then(() => {
        setSignUpInfo(emptyInfo);
        displayStatus("success", "Success");
      })
      .catch(err =>
        displayStatus("error", `error: ${err.response.data.error}`)
      );
  };

  return (
    <>
      <DialogTitle id="login-form">Register a new account</DialogTitle>
      <DialogContent>
        <AlertBar status={status} message={message}></AlertBar>
        <TextField
          required
          id="email"
          name="email"
          type="email"
          label="Email"
          onChange={handleInfoChange}
          value={signUpInfo.email}
          className={classes.textField}
        />
        <br />
        <TextField
          required
          id="username"
          name="username"
          type="username"
          label="username"
          onChange={handleInfoChange}
          value={signUpInfo.username}
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
          value={signUpInfo.password}
          className={classes.textField}
        />
        <br />
        <TextField
          required
          id="passwordAgain"
          name="passwordAgain"
          type="password"
          label="Re-enter password"
          onChange={handleInfoChange}
          value={signUpInfo.passwordAgain}
          error={signUpInfo.passwordAgain !== signUpInfo.password}
          helperText="Passwords must match"
          className={classes.textField}
        />
      </DialogContent>
      {passwordMatch ? null : (
        <Typography style={{ color: "red" }}>
          Re-password doesnot match
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </>
  );
};

SignUp.propTypes = {
  children: PropTypes.node,
  apiKey: PropTypes.string.isRequired
};

export default SignUp;
