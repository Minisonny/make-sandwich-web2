import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

/**
 * @param children: the content of the tab
 * @param value: the current display tab
 * @param index: the index of this tab
 * @param p: the box attribute
 * @returns a tab container
 */
const TabPanel = ({ children, value, index, p }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {" "}
      {value === index && (
        <Box p={p}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  p: PropTypes.number.isRequired
};

export default TabPanel;
