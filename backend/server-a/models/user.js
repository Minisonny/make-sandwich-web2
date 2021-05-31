const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    require: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    default: ""
  }
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    // do not send passwordHash and apiKey to frontend
    delete returnedObject.passwordHash;
    delete returnedObject.apiKey;
  }
});

module.exports = mongoose.model("User", userSchema);
