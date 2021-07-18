const axios = require('axios');

const baseURL = 'https://onesignal.com/api/v1/';

const oneSignalInstance = axios.create({
  baseURL,
  timeout: process.env.AXIOS_TIMEOUT,
});

const authInterceptor = (config) => {
  config['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['Authorization'] = `Basic ${process.env.ONE_SIGNAL_REST_API}`;
  return config;
};

oneSignalInstance.interceptors.request.use(authInterceptor);

class OneSignal{

  constructor(){
    this.http = oneSignalInstance;
  }

  async sendNotification({ title, heading, users }){
    try{

      const body = {
        app_id: process.env.ONE_SIGNAL_APP_ID,
        contents: {
          en : title,
        },
        headings: {
          en: heading,
        },
        include_player_ids: users,
      };

      await this.http.post('notifications', body);

      return true;
    }
    catch (e){
      console.log(e.message);

      return false;
    }

  }
}

module.exports = OneSignal;