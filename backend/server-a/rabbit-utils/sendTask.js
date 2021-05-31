#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

"use strict";

const amqp = require("amqplib");
const Order = require("../models/order");

module.exports.addTask = function (rabbitHost, queueName, order, io) {
  amqp.connect(`amqp://${rabbitHost}`).then(function (c) {
    c.createConfirmChannel().then(function (ch) {
      ch.sendToQueue(
        queueName,
        new Buffer.from(JSON.stringify(order)),
        {},
        async function (err, _ok) {
          if (err !== null) console.warn(new Date(), "Message nacked!");
          else {
            console.log(`Order ${order.id} sent. Status: ${order.status}`);
            const orderInQueue = { ...order, status: "inQueue" };
            const updatedOrder = await Order.findOneAndUpdate(
              { id: order.id },
              orderInQueue,
              { new: true }
            ).catch(console.error);

            // notify frontend about status "inQueue" after MQ acks the message
            io.emit("statusChanged", updatedOrder);
            console.log(
              `Order ${order.id} status changed. Status: ${updatedOrder.status}`
            );
          }
        }
      );
    });
  });
};
