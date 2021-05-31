import React from "react";
import CollectionsOverView from "../components/CollectionsOverview";
import PropTypes from "prop-types";

/**
 * @param sandwichData: the sandwich data
 * @param addOrder: function handler when the button order is pushed.
 * @returns homepage with sandwiches can be ordered.
 */
const Homepage = ({ sandwichData, addOrder }) => {
  return (
    <div className="homepage">
      <CollectionsOverView
        showOrderButton={true}
        sandwichData={sandwichData}
        addOrder={addOrder}
      />
    </div>
  );
};

Homepage.propTypes = {
  sandwichData: PropTypes.arrayOf(PropTypes.object),
  addOrder: PropTypes.func.isRequired
};

export default Homepage;
