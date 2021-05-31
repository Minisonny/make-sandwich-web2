/* eslint-disable no-console */
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const orderRouter = require("./controllers/order");
const sandwichRouter = require("./controllers/sandwich");
const userRouter = require("./controllers/user");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const http = require("http").createServer(app);

const { getTask } = require("./rabbit-utils/receiveTask");

const io = socketIo(http, { cors: { origin: "*" } });

getTask(config.RABBIT_HOST, config.DONE_QUEUE_NAME, io);

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(err => {
    console.error("error connecting to MongoDB:", err.message);
  });

app.use(cors());
app.use(express.json());

// middleware to attach socket.io to request object
app.use((req, _res, next) => {
  req.io = io;
  next();
});

app.use("/v1/order", orderRouter);
app.use("/v1/sandwich", sandwichRouter);
app.use("/v1/user", userRouter);

module.exports = http;
