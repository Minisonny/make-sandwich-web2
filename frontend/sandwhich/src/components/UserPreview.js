import React, { useState } from "react";
import { TextField, DialogContent, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUserByUserName, deleteUser } from "../services/userServices";
import PropTypes from "prop-types";
import AlertBar from "../components/AlertBar";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  textField: {
    marginTop: "1em"
  }
});

/**
 * @param user: current user object
 * @param setUser: set current user info
 * @returns a form to get/delete user by username.
 */
const UserPreview = ({ user, setUser }) => {
  const history = useHistory();
  const classes = useStyles();
  const [queryUsername, setQueryUsername] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const emptyUser = {
    id: "",
    username: "",
    email: ""
  };
  const [fetchUser, setFetchUser] = useState(emptyUser);

  const displayStatus = (notiStatus, notiMessage) => {
    setMessage(notiMessage);
    setStatus(notiStatus);
    setTimeout(() => {
      setStatus(null);
      setMessage("");
    }, 1000);
  };

  const handleUsernameChange = event => {
    setQueryUsername(event.target.value);
  };

  const fetch = () => {
    getUserByUserName(queryUsername)
      .then(data => {
        setFetchUser({ ...data });
        displayStatus("success", "Suceess!");
      })
      .catch(err => {
        displayStatus("error", `error: ${err.response.data.error}`);
        setFetchUser(emptyUser);
      });
  };

  const handleDeleteUser = () => {
    deleteUser(queryUsername, user.apiKey)
      .then(() => {
        if (queryUsername === user.username) {
          history.push("/");
          setUser(null);
        } else {
          displayStatus("success", "Success!");
        }
      })
      .catch(err =>
        displayStatus("error", `error: ${err.response.data.error}`)
      );
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <AlertBar status={status} message={message} />
        </Grid>
        <Grid item>
          <TextField
            required
            id="username"
            name="username"
            type="username"
            label="Username"
            onChange={handleUsernameChange}
            value={queryUsername}
            className={classes.textField}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={fetch}>
            Get User
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteUser}
          >
            Delete user
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <DialogContent>
          <TextField
            id="id"
            name="id"
            type="id"
            label="ID"
            value={fetchUser.id}
            className={classes.textField}
            inputProps={{ readOnly: true }}
          />
          <br />
          <TextField
            id="username"
            name="username"
            type="username"
            label="Username"
            value={fetchUser.username}
            className={classes.textField}
            inputProps={{ readOnly: true }}
          />
          <br />
          <TextField
            required
            id="email"
            name="email"
            type="email"
            label="Email"
            value={fetchUser.email}
            className={classes.textField}
            inputProps={{ readOnly: true }}
          />
        </DialogContent>
      </Grid>
    </>
  );
};

UserPreview.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
};

export default UserPreview;
