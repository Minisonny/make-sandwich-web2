import React, { useState } from "react";
import { Button, Dialog, DialogActions } from "@material-ui/core";
import SignIn from "./SignIn";
// import SignUp from "./SignUp";
import propTypes from "prop-types";
import { logUserIntoSystem } from "../services/userServices";

/**
 * @param setUser: set the current user
 * @param openUserForm: display the sign in form or not
 * @param handleClose: handle closing the form.
 * @returns a signin form with buttons.
 */
const UserForm = ({ setUser, openUserForm, handleClose }) => {
  const [signInInfo, setSignInInfo] = useState({
    username: "",
    password: ""
  });
  const [loginFail, setLoginFail] = useState(false);

  const handleCancel = () => {
    setLoginFail(false);
    handleClose();
  };

  const handleSignInSubmit = () => {
    logUserIntoSystem(signInInfo)
      .then(apiKey => {
        setUser({
          username: signInInfo.username,
          apiKey: apiKey
        });
        handleClose();
        setLoginFail(false);
        setSignInInfo({ ...signInInfo, password: "" });
      })
      .catch(() => setLoginFail(true));
  };

  const shouldButtonDisabled = !signInInfo.username || !signInInfo.password;
  return (
    <Dialog
      open={openUserForm}
      onClose={handleCancel}
      aria-labelledby="login-form"
    >
      <SignIn signInInfo={signInInfo} setSignInInfo={setSignInInfo} />
      {loginFail && (
        <div style={{ color: "red" }}>Invalid username or password</div>
      )}
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSignInSubmit}
          disabled={shouldButtonDisabled}
          color="primary"
        >
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserForm.propTypes = {
  setUser: propTypes.func.isRequired,
  openUserForm: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired
};

export default UserForm;
