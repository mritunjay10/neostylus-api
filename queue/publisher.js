const amqp = require('amqplib/callback_api');

amqp.connect(process.env.Q_URL, async (error0, connection)=> {
  if (error0) {
    throw error0;
  }
  connection.createChannel( async (error1, channel)=> {
    'use strict';

    require('@queue/worker')
  });
});

