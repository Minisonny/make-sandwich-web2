import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { generateId } from "../utils/helper";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import propTypes from "prop-types";
import { BREADTYPE } from "../utils/constant";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    marginTop: "1em"
  }
}));

/**
 * @param sandwich: object of a sandwich that the user has selected
 * @param setSandwich: function set state of sandwich
 * @param method: string - enum ["Modify", "Add"]
 * @returns a form of sandwich, filled with sandwich object in fields.
 */
const SandwichForm = ({ sandwich, setSandwich, method }) => {
  const classes = useStyles();
  const handleInfoChange = event => {
    const { value, name } = event.target;
    setSandwich({ ...sandwich, [name]: value });
  };

  const newTopping = () => ({ id: 0, name: "" });

  useEffect(() => {
    const tempSandwich = {
      id: generateId(),
      name: "",
      breadType: "",
      toppings: [newTopping()],
      imageURL: ""
    };
    if (!sandwich) {
      setSandwich(tempSandwich);
    }
  }, [sandwich]);

  return (
    sandwich && (
      <>
        <DialogTitle id="sandwich-form">{method} your sandwich</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TextField
                required
                id="sandwichId"
                name="id"
                type="sandwichId"
                label="Sandwich ID"
                value={sandwich.id}
                className={classes.textField}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="bread-type-select-label">
                  Bread type:
                </InputLabel>
                <Select
                  labelId="bread-type-select-label"
                  id="bread-type-select"
                  value={sandwich.breadType}
                  onChange={event =>
                    setSandwich({ ...sandwich, breadType: event.target.value })
                  }
                >
                  {BREADTYPE.map(breadtype => (
                    <MenuItem key={`breadtype-${breadtype}`} value={breadtype}>
                      {breadtype}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                required
                id="sandwichName"
                name="name"
                type="name"
                label="Name"
                onChange={handleInfoChange}
                value={sandwich.name}
                className={classes.textField}
              />
            </Grid>
            <Grid item>
              <Typography>Toppings:</Typography>
            </Grid>
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              spacing={2}
            >
              {sandwich.toppings.map(({ id, name }, index) => {
                return (
                  <Grid item key={index}>
                    <TextField
                      id={`topping-id-${index + 1}`}
                      type="number"
                      label={`Topping ${index + 1} ID`}
                      index={index}
                      value={id}
                      onChange={event => {
                        const newToppings = sandwich.toppings;
                        newToppings[index] = {
                          ...newToppings[index],
                          id: parseInt(event.target.value)
                        };
                        setSandwich({ ...sandwich, toppings: newToppings });
                      }}
                    />
                    <TextField
                      id={`topping-name-${index + 1}`}
                      type="text"
                      label={`Topping ${index + 1}`}
                      index={index}
                      value={name}
                      onChange={event => {
                        const newToppings = [...sandwich.toppings];
                        newToppings[index] = {
                          ...newToppings[index],
                          name: event.target.value
                        };
                        setSandwich({ ...sandwich, toppings: newToppings });
                      }}
                    />
                    <Button
                      variant="contained"
                      color="default"
                      startIcon={<ClearIcon />}
                      size="small"
                      disableElevation
                      onClick={() => {
                        const newToppings = [...sandwich.toppings];
                        newToppings.splice(index, 1);
                        setSandwich({ ...sandwich, toppings: newToppings });
                      }}
                    />
                  </Grid>
                );
              })}
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    const toppingsList = sandwich.toppings;
                    toppingsList.push(newTopping());
                    setSandwich({ ...sandwich, toppings: toppingsList });
                  }}
                >
                  Add topping
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                required
                id="imageURL"
                name="imageURL"
                type="text"
                label="Image URL"
                onChange={handleInfoChange}
                value={sandwich.imageURL}
                className={classes.textField}
              />
            </Grid>
            <Grid item>
              <Typography>Image Preview</Typography>
              <Typography>
                <img
                  src={sandwich.imageURL}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </>
    )
  );
};

SandwichForm.propTypes = {
  sandwich: propTypes.object,
  setSandwich: propTypes.func.isRequired,
  method: propTypes.string.isRequired
};
export default SandwichForm;
