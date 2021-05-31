const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);

const sandwichSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  name: {
    type: String,
    required: true
  },
  toppings: [
    {
      id: {
        type: Number,
        required: true,
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value"
        }
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  breadType: {
    type: String,
    required: true,
    enum: ["oat", "rye", "wheat"]
  },
  imageURL: String
});

sandwichSchema.plugin(uniqueValidator);

sandwichSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.toppings = returnedObject.toppings.map(({ id, name }) => ({
      id,
      name
    }));
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Sandwich", sandwichSchema);
