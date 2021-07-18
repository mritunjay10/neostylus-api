const IORedis = require('ioredis');
const redis =  new IORedis();
const pipeline = redis.pipeline();

class Redis{

  async get(key){
    return redis.get(key);
  }

  async set(key, value){
    return redis.set(key, value);
  }

}

module.exports = Redis;