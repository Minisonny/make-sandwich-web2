import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import SandwichPreview from "./SandwichPreview";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    height: "100%"
  },
  root2: {
    height: "90%"
  },
  h5: {
    marginTop: "0.5em",
    marginBottom: "0",
    paddingBottom: "0"
  }
});

/**
 * @param orderId: the id of the order
 * @param status: the status of the order
 * @param sandwich: the sandwich object of this order
 * @returns a preview of an order.
 */
const OrderPreview = ({ orderId, status, sandwich }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.root2}>
        <Typography align="left" gutterBottom variant="h5" component="h2">
          ORDER ID: {orderId}
        </Typography>
        {sandwich ? (
          <SandwichPreview
            {...sandwich}
            heightPercentage={90}
          ></SandwichPreview>
        ) : (
          <Typography>Sandwich display is not available</Typography>
        )}
        <Typography
          className={classes.h5}
          align="left"
          gutterBottom
          variant="h5"
          component="h2"
        >
          Status: {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

OrderPreview.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  sandwich: PropTypes.object.isRequired
};

export default React.memo(OrderPreview);
