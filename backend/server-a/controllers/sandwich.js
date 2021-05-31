const sandwichRouter = require("express").Router();
const Sandwich = require("../models/sandwich");
const {
  SANDWICH_ERROR_MESSAGES,
  INVALID_ID_SUPPLIED,
  INVALID_API_KEY
} = require("../utils/constants");
const { verifyApiKey } = require("../utils/helpers");

sandwichRouter.get("/", async (_req, res) => {
  const sandwiches = await Sandwich.find({});
  res.status(200).json(sandwiches);
});

sandwichRouter.get("/:sandwichId", async (req, res) => {
  const id = req.params.sandwichId;
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: INVALID_ID_SUPPLIED });
  }

  const sandwich = await Sandwich.findOne({ id });

  if (!sandwich) {
    res.status(404).json({ error: SANDWICH_ERROR_MESSAGES.notFound });
  } else {
    res.status(200).json(sandwich);
  }
});

sandwichRouter.post("/", async (req, res) => {
  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  const body = req.body;

  try {
    const newSandwich = new Sandwich(body);
    const result = await newSandwich.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(405).json({ error: SANDWICH_ERROR_MESSAGES.invalidInput });
  }
});

sandwichRouter.put("/:sandwichId", async (req, res) => {
  const id = req.params.sandwichId;
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: INVALID_ID_SUPPLIED });
  }

  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  const body = req.body;
  delete body.id;

  try {
    const result = await Sandwich.findOneAndUpdate({ id }, body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(405).json({ error: SANDWICH_ERROR_MESSAGES.invalidInput });
  }
});

sandwichRouter.delete("/:sandwichId", async (req, res) => {
  const id = req.params.sandwichId;
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: INVALID_ID_SUPPLIED });
  }

  const apiKey = req.get("x-api-key");
  const isApiKeyValid = await verifyApiKey(apiKey);
  if (!isApiKeyValid) {
    return res.status(401).json({ error: INVALID_API_KEY });
  }

  try {
    await Sandwich.findOneAndDelete({ id });
    res.status(200).end();
  } catch (err) {
    return res.status(404).json({ error: SANDWICH_ERROR_MESSAGES.notFound });
  }
});

module.exports = sandwichRouter;
