import React from "react";
import OrderPreview from "./OrderPreview";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// import { SERVER_URL } from "../services/constant";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

/**
 * @param orderData: array of all orders
 * @param sandwichData: array of all sandwiches
 * @returns a view of collection of all orders
 */
const OrderOverview = ({ orderData, sandwichData }) => {
  const classes = useStyles();

  return (
    <div className="orders-overview">
      <Grid container className={classes.root} justify="center" spacing={4}>
        {orderData.map(({ id, sandwichId, ...otherSectionProps }) => (
          <Grid key={id} item>
            <OrderPreview
              {...otherSectionProps}
              orderId={id}
              sandwich={sandwichData.find(element => element.id === sandwichId)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

OrderOverview.propTypes = {
  orderData: PropTypes.arrayOf(PropTypes.object),
  sandwichData: PropTypes.arrayOf(PropTypes.object)
};

export default OrderOverview;
