import React, { useState } from "react";
import { TextField, DialogContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { updateUser } from "../services/userServices";
import AlertBar from "../components/AlertBar";

const useStyles = makeStyles({
  textField: {
    marginTop: "1em"
  }
});

/**
 * @param user: current user object
 * @returns a form to modify user.
 */
const MofifyUserForm = ({ user }) => {
  const classes = useStyles();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: ""
  });

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
    setUserInfo({ ...userInfo, [name]: value });
  };
  const modifyUser = () => {
    if (
      !userInfo ||
      !userInfo.username ||
      !userInfo.username.length ||
      !userInfo.email ||
      !userInfo.email.length ||
      !userInfo.password ||
      !userInfo.password.length
    ) {
      return displayStatus("error", "Error: invalid input");
    }
    updateUser(userInfo.username, userInfo, user.apiKey)
      .then(() => displayStatus("success", "Success!"))
      .catch(err =>
        displayStatus("error", `Error: ${err.response.data.error}`)
      );
  };
  return (
    <>
      <DialogContent>
        <AlertBar status={status} message={message}></AlertBar>
        <TextField
          required
          id="username"
          name="username"
          type="username"
          label="Current username"
          onChange={handleInfoChange}
          value={userInfo.username}
          className={classes.textField}
        />
        <br />
        <TextField
          required
          id="email"
          name="email"
          type="email"
          label="New email"
          onChange={handleInfoChange}
          value={userInfo.email}
          className={classes.textField}
        />
        <br />
        <TextField
          required
          id="password"
          name="password"
          type="password"
          label="New password"
          onChange={handleInfoChange}
          value={userInfo.password}
          className={classes.textField}
        />
      </DialogContent>
      <Button variant="contained" color="primary" onClick={modifyUser}>
        Modify user
      </Button>
    </>
  );
};
MofifyUserForm.propTypes = {
  user: PropTypes.object
};
export default React.memo(MofifyUserForm);
