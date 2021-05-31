const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);

const orderSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  sandwichId: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  status: {
    type: String,
    enum: ["ordered", "received", "inQueue", "ready", "failed"],
    default: "received"
  }
});

orderSchema.plugin(uniqueValidator);

orderSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Order", orderSchema);
