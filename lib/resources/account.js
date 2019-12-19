const RequestHelper = require('./request-helper');

function Account(accountsApi) {
  this._accountsApi = accountsApi;
  this.requestHelper = new RequestHelper(this._accountsApi.baseUrl, this._accountsApi.getToken());
}

Account.prototype = {
  create(customId = null) {
    return this.requestHelper.post('/accounts', { customId })
      .then(response => response.account);
  },
  login(data) {
    return this.requestHelper.post('/auth-account', data)
      .then((response) => response.token);
  },
  signTransaction(transaction) {
    return this.requestHelper.post('/transaction', { tx: transaction })
      .then((response) => response.signedTx);
  }
};
module.exports = Account;
