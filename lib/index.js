const companyResource = require('./resources/company');
const accountResource = require('./resources/account');

function AccountsAPI(options = {}) {
  this.useHttp = options.useHttp || false;
  this.domain = options.domain || AccountsAPI.DEFAULT_DOMAIN;
  this.apiVersion = options.apiVersion || AccountsAPI.DEFAULT_API_VERSION;
  const protocol = this.useHttp ? 'http' : 'https';

  this.baseUrl = `${protocol}://${this.domain}/${this.apiVersion}`;
  this.token = null;
  this._prepResources();
}
AccountsAPI.DEFAULT_DOMAIN = 'accounts-api.kzlabs.co';
AccountsAPI.DEFAULT_API_VERSION = 'v1';

AccountsAPI.prototype = {
  _setApiField: function(key, value) {
    this[key] = value;
    this._prepResources();
  },

  setToken: function(token) {
    this._setApiField('token', token);
  },

  getToken: function() {
    return this.token;
  },

  setDomain: function(domain) {
    const d = domain || AccountsAPI.DEFAULT_DOMAIN;
    const protocol = this.useHttp ? 'http' : 'https';
    this._setApiField('domain', d);
    this._setApiField('baseUrl', `${protocol}://${d}/${this.apiVersion}`);
  },

  getDomain: function() {
    return this.domain;
  },

  getBaseUrl: function() {
    return this.baseUrl;
  },

  _prepResources() {
    this.company = new companyResource(this);
    this.account = new accountResource(this);
  }
}

module.exports = AccountsAPI;
