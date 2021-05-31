const orderRouter = require("express").Router();
const Order = require("../models/order");
const { addTask } = require("../rabbit-utils/sendTask");
const config = require("../utils/config");
const {
  ORDER_ERROR_MESSAGES,
  INVALID_ID_SUPPLIED
} = require("../utils/constants");

orderRouter.get("/", async (_req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});

orderRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newOrder = new Order(body);

    const result = await newOrder.save();

    // notify MQ about newly created order
    addTask(config.RABBIT_HOST, config.PREPARE_QUEUE_NAME, body, req.io);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: ORDER_ERROR_MESSAGES.notCreated });
  }
});

orderRouter.get("/:orderId", async (req, res) => {
  const id = Number(req.params.orderId);

  if (Number.isNaN(id) || id < 0) {
    return res.status(400).json({ error: INVALID_ID_SUPPLIED });
  }

  const order = await Order.findOne({ id });

  if (!order) {
    res.status(404).json({ error: ORDER_ERROR_MESSAGES.notFound });
  } else {
    res.status(200).json(order);
  }
});

module.exports = orderRouter;
