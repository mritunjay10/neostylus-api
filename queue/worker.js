const amqp = require('amqplib/callback_api');
const QueueHandler = require('./QueueHandler');

const moment = require('moment');

amqp.connect(process.env.Q_URL, function(error0, connection) {

  const queueHandler = new QueueHandler();

  if (error0) {
    // console.log(error0.message);
    throw error0;
  }
  connection.createChannel(async (error1, channel)=> {

  });
});