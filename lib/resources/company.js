const StellarAuthClient = require('stellar-auth-client');
const RequestHelper = require('./request-helper');

function Company(accountsApi) {
  this._accountsApi = accountsApi;
  this.requestHelper = new RequestHelper(this._accountsApi.baseUrl);
}

Company.prototype = {
  create(data) {
    return this.requestHelper.post('/companies', data)
      .then(res => res.company);
  },
  login(secret, options = { }) {
    const opts = Object.assign({
      allowHttp: this._accountsApi.useHttp,
    }, options);
    const domain = opts.authEndpoint ? '' : opts.domain || this._accountsApi.domain;

    const auth = new StellarAuthClient(domain, opts);

    return auth.loginWithSecret(secret)
      .then(token => {
        this._accountsApi.setToken(token);
        return token;
      })
      .catch(this.requestHelper._parseAxiosError);
  },
};

module.exports = Company;
