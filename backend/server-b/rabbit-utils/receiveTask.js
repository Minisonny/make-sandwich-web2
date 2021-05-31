#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
const { addTask } = require('./sendTask');

module.exports.getTask = function(rabbitHost, prepareQueueName, doneQueueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(prepareQueueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(prepareQueueName, doWork, {noAck: false});
        console.log(new Date(), " [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        const body = JSON.parse(msg.content.toString());
        console.log(" [x] Received '%s'", body);
        //console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function() {
          console.log(new Date(), " [x] Done");

          // Let's random the "ready" chance of an order
          const status = Math.random() > 0.5 ? "ready" : "failed";
          body.status = status;
          addTask(rabbitHost, doneQueueName, body);
          ch.ack(msg);
        }, 10000);
      }
    });
  }).catch(console.warn);
}
