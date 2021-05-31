#!/usr/bin/env node
// Process tasks from the work queue

"use strict";

const amqp = require("amqplib");
const Order = require("../models/order");

module.exports.getTask = function (rabbitHost, queueName, io) {
  amqp
    .connect(`amqp://${rabbitHost}`)
    .then(function (conn) {
      process.once("SIGINT", function () {
        conn.close();
      });
      return conn.createChannel().then(function (ch) {
        let ok = ch.assertQueue(queueName, { durable: true });
        ok = ok.then(function () {
          ch.prefetch(1);
        });
        ok = ok.then(function () {
          ch.consume(queueName, doWork, { noAck: false });
          console.log(" [*] Waiting for messages. To exit press CTRL+C");
        });
        return ok;

        async function doWork(msg) {
          const body = JSON.parse(msg.content.toString());
          console.log(" [x] Received order %s", body);
          const updatedOrder = await Order.findOneAndUpdate(
            { id: body.id },
            body,
            {
              new: true
            }
          ).catch(console.error);
          // Notify that the sandwhich is done or failed
          console.log(" [x] Done");
          io.emit("statusChanged", updatedOrder);
          ch.ack(msg);
        }
      });
    })
    .catch(console.error);
};
