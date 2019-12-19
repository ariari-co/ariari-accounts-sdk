const AriariAccountsSdk = require('../../lib/');
const MockAdapter = require('axios-mock-adapter');
const RequestHelper = require('../../lib/resources/request-helper');
const testUtils = require('../test-utils');

describe('AriariAccountsSdk - Account', function() {
  const accountsApi = new AriariAccountsSdk();
  const customId = 'Test-tx';
  const url = 'https://accounts-api.kzlabs.co/v1';
  const auth = 'bearer ' + testUtils.getToken();
  let headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    Authorization: auth,
  };

  beforeEach(function() {
    accountsApi.setToken(testUtils.getToken());
    this.axiosMock = new MockAdapter(accountsApi.account.requestHelper.axios);
  });

  afterEach(function() {
    this.axiosMock.reset();
    this.axiosMock.restore();
  });

  it('Should create account successfully', async function() {
    this.axiosMock.onPost(url + '/accounts', { customId }, headers).reply(200, testUtils.getCreateAccountResponse());
    const result = accountsApi.account.create(customId);
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.have.property('companyId');
    await expect(result).to.eventually.have.property('customId', customId);
  });

  it('Throws error if the customId already exists in the db', async function() {
    this.axiosMock.onPost(url + '/accounts', { customId }, headers).reply(500, {
      error: {
        code: 'accounts-api.errors.account.duplicate-customId',
      }
    });
    const result = accountsApi.account.create(customId);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.account.duplicate-customId');
  });

  it('Should login into account successfully', async function() {
    this.axiosMock.onPost(url + '/auth-account', { customId }, headers).reply(200, { token: testUtils.getToken() });
    let result = accountsApi.account.login({ customId });
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.be.equal(testUtils.getToken());

    const id = '1';
    this.axiosMock.onPost(url + '/auth-account', { id }, headers).reply(200, { token: testUtils.getToken() });
    result = accountsApi.account.login({ id });
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.be.equal(testUtils.getToken());

    const publicKey = 'GBV5XY4ABRJK3KETW2VP5KDP5HHWJXXBWGMFECWUCIRXO34AMUV3DN37';
    this.axiosMock.onPost(url + '/auth-account', { publicKey }, headers).reply(200, { token: testUtils.getToken() });
    result = accountsApi.account.login({ publicKey });
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.be.equal(testUtils.getToken());
  });

  it('Throws error if there are missing fields', async function() {
    const data = {};
    this.axiosMock.onPost(url + '/auth-account', data, headers).reply(500, {
      error: {
        code: 'accounts-api.errors.account.login.missing-fields',
      }
    });
    const result = accountsApi.account.login(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.account.login.missing-fields');
  });

  it('Throws error if the data sent does not exist in the db', async function() {
    let data = { customId: 'adsacdbla' };
    this.axiosMock.onPost(url + '/auth-account', data, headers).reply(500, {
      error: {
        code: 'accounts-api.errors.invalid-account',
      }
    });
    let result = accountsApi.account.login(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.invalid-account');

    data = { id: '3' };
    this.axiosMock.onPost(url + '/auth-account', data, headers).reply(500, {
      error: {
        code: 'accounts-api.errors.invalid-account',
      }
    });
    result = accountsApi.account.login(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.invalid-account');

    data = { publicKey: 'GBV5XY4ABRJK3KETW2VP5KDP5HHWJXXBWGMFECWUCIRXO34AMUV3DN37' };
    this.axiosMock.onPost(url + '/auth-account', data, headers).reply(500, {
      error: {
        code: 'accounts-api.errors.invalid-account',
      }
    });
    result = accountsApi.account.login(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.invalid-account');
  });

  it('Should sign a transaction successfully', async function() {
    const tx = 'AAAAAByVciiGtjE9wQen2iOEOq293/svLEWoVYYnVXXBsisBAAAAZAAGk9cAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAASCAC+uX+0rCPWxdmojnS1+yLH0aHfv+znIJmgkCsYh4AAAAAAAAAAACYloAAAAAAAAAAAA==';
    accountsApi.setToken(testUtils.getAccountToken());
    this.axiosMock = new MockAdapter(accountsApi.account.requestHelper.axios);
    this.axiosMock.onPost(url + '/transaction', { tx }, testUtils.getAccountHeaders()).reply(200, { signedTx: testUtils.getSignedTx() });
    const result = accountsApi.account.signTransaction(tx);
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.be.deep.equal(testUtils.getSignedTx());
  });

  it('Throws an exception if the transaction is invalid', async function() {
    const tx = 'AAAAByVciiGtjE9wQen2iOEOq293/svLEWoVYYnVXXBsisBAAAAZAAGk9cAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAASCAC+uX+0rCPWxdmojnS1+yLH0aHfv+znIJmgkCsYh4AAAAAAAAAAACYloAAAAAAAAAAAA==';
    accountsApi.setToken(testUtils.getAccountToken());
    this.axiosMock = new MockAdapter(accountsApi.account.requestHelper.axios);
    this.axiosMock.onPost(url + '/transaction', { tx }, testUtils.getAccountHeaders()).reply(500, {
      error: {
        code: 'accounts-api.errors.transaction.invalid-transaction',
      }
    });
    const result = accountsApi.account.signTransaction(tx);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.transaction.invalid-transaction');
  });
})
