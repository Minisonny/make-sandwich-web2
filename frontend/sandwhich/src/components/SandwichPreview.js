import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: "20px",
    boxShadow:
      "0 10px 10px 0 rgba(0, 0, 0, 0.07), 0 10px 10px 0 rgba(0, 0, 0, 0.07)"
  },
  media: {
    height: 140
  }
});

/**
 * @param props: sandwich object
 * @returns a preview of a sandwich
 */
const SandWichPreview = ({
  name,
  toppings,
  breadType,
  imageURL,
  heightPercentage = 100,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ height: `${heightPercentage}%` }}>
      <CardActionArea>
        <CardMedia
          className="sandwichImage"
          component="img"
          alt="Some sandwich"
          height="350"
          image={imageURL}
          title="Contemplative Reptile"
          {...otherProps}
        />
        <CardContent {...otherProps}>
          <Typography align="left" gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            align="left"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Toppings: {toppings.map(topping => topping.name).join(", ")}
          </Typography>
          <Typography
            align="left"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Bread type: {breadType}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

SandWichPreview.propTypes = {
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toppings: PropTypes.array,
  breadType: PropTypes.string,
  onClick: PropTypes.func,
  heightPercentage: PropTypes.number
};

export default React.memo(SandWichPreview);
