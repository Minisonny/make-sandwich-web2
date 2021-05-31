import React from "react";
import OrdersOverView from "../components/OrdersOverview";
import PropTypes from "prop-types";

/**
 * @param sandwichData: the sandwiches data
 * @param orderData: the data of all orders
 * @returns page displaying all the orders.
 */
const Orders = ({ orderData, sandwichData }) => {
  return (
    <div className="orders">
      <OrdersOverView orderData={orderData} sandwichData={sandwichData} />
    </div>
  );
};
Orders.propTypes = {
  orderData: PropTypes.arrayOf(PropTypes.object),
  sandwichData: PropTypes.arrayOf(PropTypes.object)
};
export default Orders;
