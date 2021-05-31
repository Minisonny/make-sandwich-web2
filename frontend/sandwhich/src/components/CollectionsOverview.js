import React from "react";
import SandwichPreview from "./SandwichPreview.js";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { generateId } from "../utils/helper";
import { addAnOrder } from "../services/orderServices";
import PropTypes from "prop-types";
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const OrderButton = withStyles(() => ({
  root: {
    background: "#418c00",
    borderRadius: "20px",
    color: "white",
    marginTop: "1em"
  }
}))(Button);

/**
 * @param sandwichData: Array of sandwich objects
 * @param showOrderButton: bool flag, true - adding additional order button when at the homepage
 * @param addOrder function handler when an order is added (change the state of the sandwichData)
 * @param setSandwich function set the sandwich the user is selecting to modify
 * @param setOpenModifyDialog function set the dialog open to modify the sandwich
 * @returns Collection view of all the sandwiches
 */

const CollectionsOverView = ({
  sandwichData,
  showOrderButton,
  addOrder,
  setSandwich,
  setOpenModifyDialog
}) => {
  const classes = useStyles();

  const addOrderById = sandwichId => {
    return () =>
      addAnOrder({
        sandwichId,
        status: "ordered",
        id: generateId()
      }).then(data => addOrder(data));
  };

  return (
    <div className="collections-overview">
      <Grid container className={classes.root} justify="center" spacing={4}>
        {sandwichData.map(({ id, ...otherSectionProps }) => (
          <Grid key={`sandwich-${id}`} item>
            <SandwichPreview
              {...otherSectionProps}
              onClick={() => {
                if (setSandwich) {
                  setSandwich({ id, ...otherSectionProps });
                }
                if (setOpenModifyDialog) {
                  setOpenModifyDialog(true);
                }
              }}
              heightPercentage={showOrderButton ? 90 : 100}
            />
            {showOrderButton && (
              <Typography component="div">
                <OrderButton
                  variant="contained"
                  onClick={addOrderById(id)}
                  fullWidth
                >
                  Order now
                </OrderButton>
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
CollectionsOverView.propTypes = {
  sandwichData: PropTypes.array,
  showOrderButton: PropTypes.bool.isRequired,
  addOrder: PropTypes.func,
  orderData: PropTypes.arrayOf(PropTypes.object),
  setSandwich: PropTypes.func,
  setOpenModifyDialog: PropTypes.func
};
export default CollectionsOverView;
