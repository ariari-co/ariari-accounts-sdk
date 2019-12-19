const axios = require('axios');

function RequestHelper(baseURL, token) {
  const config = {
    baseURL: baseURL || 'https://accounts-api.kzlabs.co',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? 'bearer ' + token : '',
    },
  }
  this.config = config;
  this.axios = axios.create(config);
}

RequestHelper.prototype = {
  post(url, data) {
    return this.axios.post(url, data)
      .then(res => res.data)
      .catch(this._parseAxiosError);
  },
  get(url, params) {
    return this.axios.get(url, { params })
      .then(res => res.data)
      .catch(this._parseAxiosError);
  },

  _parseAxiosError(err) {
    let code = err.code || err.message;
    let msg = err.message;
    if (err.response) {
      code = err.response.status || code;
      msg = err.response.statusText || msg;
      const data = err.response.data;
      if (data && data.error && data.error.code) {
        code = err.response.data.error.code || code;
        msg = err.response.data.error.message || code;
      }
    }
    const e = new Error(msg);
    e.code = code;
    throw e;
  }
};

module.exports = RequestHelper;
