import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

/**
 * @returns Alert bar display the result of the request
 * @param status: The status of the operation (enum: ["success", "error"])
 */
const AlertBar = ({ status, message }) => {
  return status && status.length && <Alert severity={status}>{message}</Alert>;
};
AlertBar.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string
};

export default AlertBar;
