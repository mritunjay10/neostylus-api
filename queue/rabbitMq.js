const amqp = require('amqplib/callback_api');
const { v4:  uuid } = require('uuid');


let ch = null;

console.log(process.env.Q_URL);
amqp.connect(process.env.Q_URL, (err, conn) => {
    conn.createChannel((err, channel) => {
        ch = channel;
    })
});

exports.publishToQueue = async (queueName, data) => {
    const msg = { ...data } ;
    msg['jobId'] = uuid();
    // console.log(msg);
    // console.log(queueName, data);
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), { persistent: true });
    // console.log('SENT')
};

exports.channel = ()=>{
    return ch;
};

process.on('exit', code => {
    ch.close();
    // console.log('Closing RabbitMq channel')
});

exports.mqc = ch;
