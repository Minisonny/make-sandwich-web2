const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

/**
 * Generate new API key
 * @returns API key
 */
const generateApiKey = () => {
  const key = uuidv4();
  return key;
};

/**
 * Verify if API key exists in the database, which indicates a user has logged in
 * @param apiKey API key that needed to be verified
 * @returns true if API key is valid, otherwise false
 */
const verifyApiKey = async apiKey => {
  if (!apiKey) {
    return false;
  }

  const loggedInUser = await User.findOne({ apiKey });
  if (!loggedInUser) {
    return false;
  }

  return true;
};

module.exports = { generateApiKey, verifyApiKey };
