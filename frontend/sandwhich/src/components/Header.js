import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import deepEqual from "deep-equal";
import UserForm from "./UserForm";
import propTypes from "prop-types";
import { logOutUser } from "../services/userServices";
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4em"
  },
  userButton: {
    marginLeft: "2em"
  }
});
/**
 * @param user: the user object
 * @param setUser: function set state user.
 * @returns Header of the page, containing navigate buttons, sign in form.
 */
const Header = ({ user, setUser }) => {
  const classes = useStyles();
  const [openUserForm, setOpenUserForm] = useState(false);
  const history = useHistory();
  const handleOpen = () => {
    setOpenUserForm(true);
  };

  const handleClose = () => {
    setOpenUserForm(false);
  };
  const handleLogOut = () => {
    logOutUser(user.username).then(() => setUser(null));
    history.push("/");
  };

  const HeaderButtons = () => {
    if (user) {
      return (
        <div>
          <Button
            color="default"
            startIcon={<HomeIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/")}
          >
            Sandwiches
          </Button>
          <Button
            color="default"
            startIcon={<ShoppingBasketIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/orders")}
          >
            Order history
          </Button>
          <Button
            color="default"
            startIcon={<FastfoodIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/sandwiches")}
          >
            Manage sandwiches
          </Button>
          <Button
            color="default"
            startIcon={<AccountCircleIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/users")}
          >
            Manage users
          </Button>
          <Button
            color="secondary"
            startIcon={<ExitToAppIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={handleLogOut}
          >
            Sign out
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            color="default"
            startIcon={<HomeIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/")}
          >
            Sandwiches
          </Button>
          <Button
            color="default"
            startIcon={<ShoppingBasketIcon />}
            size="large"
            disableElevation
            className={classes.userButton}
            onClick={() => history.push("/orders")}
          >
            Order history
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpen}
          >
            Sign in
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={classes.root} style={{ position: "static" }}>
      <Link className="logo-container" to="/">
        <img src={banner} alt="logo" />
      </Link>
      <div className="options">
        <HeaderButtons />
      </div>
      <UserForm
        setUser={setUser}
        openUserForm={openUserForm}
        handleClose={handleClose}
      />
    </div>
  );
};

const shouldUpdate = (prevProps, nextProps) =>
  deepEqual(prevProps.user, nextProps.user);

Header.propTypes = {
  user: propTypes.any,
  setUser: propTypes.func.isRequired
};
export default React.memo(Header, shouldUpdate);
