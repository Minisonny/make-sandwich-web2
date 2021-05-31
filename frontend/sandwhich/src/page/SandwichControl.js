import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tab,
  Paper,
  Tabs,
  Button,
  Dialog,
  DialogActions
} from "@material-ui/core";
import SandwichForm from "../components/SandwichForm";
import CollectionsOverView from "../components/CollectionsOverview";
import AlertBar from "../components/AlertBar";
import TabPanel from "../components/TabPanel";
import {
  addASandwich,
  updateASandwich,
  deleteASandwich
} from "../services/sandwichServices";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

/**
 * @param user: the user data containing api key
 * @param sandwichData: the data of all sandwiches
 * @param setSandwichData: function set state of sandwich data
 * @returns page displaying page to add and modify sandwich
 */
const SandwichControl = ({ user, sandwichData, setSandwichData }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [sandwich, setSandwich] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [openModifyDialog, setOpenModifyDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOnCancel = () => {
    setOpenModifyDialog(false);
    setSandwich(null);
  };

  const displayStatus = (notiStatus, notiMessage) => {
    setMessage(notiMessage);
    setStatus(notiStatus);
    setTimeout(() => {
      setStatus(null);
      setMessage("");
      if (notiStatus === "success") {
        handleOnCancel();
      }
    }, 1000);
  };

  const handleDelete = () => {
    if (user) {
      deleteASandwich(sandwich.id, user.apiKey)
        .then(() => {
          const newSandwichData = sandwichData.filter(
            element => element.id !== sandwich.id
          );
          setSandwichData(newSandwichData);
          displayStatus("success", "Success!");
        })
        .catch(err =>
          displayStatus("error", `error: ${err.response.data.error}`)
        );
    } else {
      displayStatus("error", "Error: Not signed in");
    }
  };

  const handleModify = () => {
    if (user) {
      return updateASandwich(sandwich, user.apiKey)
        .then(updatedSandwich => {
          setSandwichData(
            sandwichData.map(element =>
              element.id === updatedSandwich.id ? updatedSandwich : element
            )
          );
          displayStatus("success", "Success!");
        })
        .catch(err =>
          displayStatus("error", `Error: ${err.response.data.error}`)
        );
    } else {
      displayStatus("error", "Error: not signed in");
    }
  };

  const sendSandwich = () => {
    if (user) {
      return addASandwich(sandwich, user.apiKey)
        .then(() => {
          const newSandwichData = [...sandwichData];
          newSandwichData.push(sandwich);
          setSandwichData(newSandwichData);
          displayStatus("success", "Success!");
        })
        .catch(err => {
          displayStatus("error", `error: ${err.response.data.error}`);
        });
    }
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
          <Tab label="Add sandwich"></Tab>
          <Tab label="Modify sandwich"></Tab>
        </Tabs>
        <TabPanel value={tabValue} index={0} p={2}>
          <AlertBar status={status} message={message} />
          <SandwichForm
            sandwich={sandwich}
            setSandwich={setSandwich}
            method={"Add"}
          />
          <Button color="primary" variant="contained" onClick={sendSandwich}>
            Add sandwich
          </Button>
        </TabPanel>
        <TabPanel value={tabValue} index={1} p={2}>
          <CollectionsOverView
            sandwichData={sandwichData}
            showOrderButton={false}
            setSandwich={setSandwich}
            setOpenModifyDialog={setOpenModifyDialog}
          />
          <Dialog
            open={openModifyDialog}
            onClose={handleOnCancel}
            aria-labelledby="login-form"
          >
            <AlertBar status={status} message={message}></AlertBar>
            <SandwichForm
              sandwich={sandwich}
              setSandwich={setSandwich}
              method={"Modify"}
            ></SandwichForm>
            <DialogActions>
              <Button onClick={handleOnCancel} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModify}
              >
                Modify
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>
      </Paper>
    )
  );
};

SandwichControl.propTypes = {
  user: PropTypes.object,
  sandwichData: PropTypes.arrayOf(PropTypes.object),
  setSandwichData: PropTypes.func
};

export default SandwichControl;
