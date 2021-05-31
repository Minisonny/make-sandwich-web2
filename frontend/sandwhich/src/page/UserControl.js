import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Paper, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import UserPreview from "../components/UserPreview";
import SignUp from "../components/SignUp";
import TabPanel from "../components/TabPanel";
import ModifyUserForm from "../components/ModifyUserForm";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

/**
 * @param user: the user data containing api key
 * @returns page displaying page to get/add/modify user.
 */
const UserControl = ({ user, setUser }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    user !== null && (
      <Paper className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Get/Delete user by username"></Tab>
          <Tab label="Add user"></Tab>
          <Tab label="Modify user"></Tab>
        </Tabs>
        <TabPanel value={tabValue} index={0} p={3}>
          <UserPreview user={user} setUser={setUser} />
        </TabPanel>
        <TabPanel value={tabValue} index={1} p={3}>
          <SignUp apiKey={user.apiKey} />
        </TabPanel>
        <TabPanel value={tabValue} index={2} p={3}>
          <ModifyUserForm user={user} />
        </TabPanel>
      </Paper>
    )
  );
};

UserControl.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
};

export default UserControl;
