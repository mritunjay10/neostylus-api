const isJSON = require('is-json');
const { v4:  uuid } = require('uuid');
const path = require('path');

const rabbit = require('./rabbitMq');

class QueueHandler{

    identifier = null;

    async fetchMedia(channel, msg){

        try{

            channel.ack(msg);
        }
        catch (e){

            channel.nack(msg)
        }
    }
}

module.exports = QueueHandler;