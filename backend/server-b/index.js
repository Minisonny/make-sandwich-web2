'use strict';

const { getTask } = require('./rabbit-utils/receiveTask');

getTask(process.env.RABBIT_HOST, process.env.PREPARE_QUEUE_NAME, process.env.DONE_QUEUE_NAME)