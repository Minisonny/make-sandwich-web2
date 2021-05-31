const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const { USER_ERROR_MESSAGES, INVALID_API_KEY } = require("../utils/constants");
const { generateApiKey, verifyApiKey } = require("../utils/helpers");

userRouter.post("/", async (req, res) => {
  const { id, username, password, email } = req.body;

  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = new User({ id, username, passwordHash, email });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: USER_ERROR_MESSAGES.invalidInput });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: USER_ERROR_MESSAGES.invalidUsernamePassword });
  }

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    return res
      .status(400)
      .json({ error: USER_ERROR_MESSAGES.invalidUsernamePassword });
  }

  if (user.apiKey !== "") {
    return res.status(200).send(user.apiKey);
  }

  const apiKey = generateApiKey();

  user.apiKey = apiKey;
  await user.save();
  res.status(200).send(apiKey);
});

userRouter.post("/logout", async (req, res) => {
  const username = req.body.username;
  await User.findOneAndUpdate({ username }, { apiKey: "" });

  res.status(200).end();
});

userRouter.get("/:username", async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: USER_ERROR_MESSAGES.invalidUsername });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: USER_ERROR_MESSAGES.notFound });
  }

  return res.status(200).json(user);
});

userRouter.put("/:username", async (req, res) => {
  const paramUsername = req.params.username;

  if (!paramUsername) {
    return res.status(400).json({ error: USER_ERROR_MESSAGES.invalidUsername });
  }

  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  const user = await User.findOne({ username: paramUsername });
  if (!user) {
    return res.status(404).json({ error: USER_ERROR_MESSAGES.notFound });
  }

  const { password, email } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    user.passwordHash = passwordHash;
    user.email = email;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: USER_ERROR_MESSAGES.invalidInput });
  }
});

userRouter.delete("/:username", async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: USER_ERROR_MESSAGES.invalidUsername });
  }

  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  try {
    await User.findOneAndDelete({ username });
    res.status(200).end();
  } catch (err) {
    return res.status(404).json({ error: USER_ERROR_MESSAGES.notFound });
  }
});

userRouter.get("/apikey/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  if (!user || !user.apiKey.length) {
    return res.status(401).end();
  }

  res.status(200).send(user.apiKey);
});

module.exports = userRouter;
