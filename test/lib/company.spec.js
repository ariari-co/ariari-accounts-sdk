const MockAdapter = require('axios-mock-adapter');
const AriariAccountsSdk = require('../../lib/');
const testUtils = require('../test-utils');

describe('AriariAccountsSdk - Company', function() {
  const accountsApi = new AriariAccountsSdk();
  const url = 'https://accounts-api.kzlabs.co/v1';

  beforeEach(function() {
    this.axiosMock = new MockAdapter(accountsApi.company.requestHelper.axios);
  });

  afterEach(function() {
    this.axiosMock.reset();
    this.axiosMock.restore();
  });

  it('Should create successfully', async function() {
    const data = {
      publicKey: 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
      domain: 'www.anchorusd.com',
    }
    this.axiosMock.onPost(url + '/companies', data).reply(200, testUtils.getCreateCompanyResponse());
    const result = accountsApi.company.create(data);
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.have.property('id');
  });

  it('Throws error if information is missing in data', async function() {
    const data = {
      publicKey: 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
    }
    this.axiosMock.onPost(url + '/companies', data).reply(500, {
      "error": {
        "code": "accounts-api.errors.company.missing-fields",
      }
    });
    const result = accountsApi.company.create(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.company.missing-fields');
  });

  it('Throws error if the company already exists in the db', async function() {
    const data = {
      publicKey: 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
    }
    this.axiosMock.onPost(url + '/companies', data).reply(500, {
      "error": {
        "code": "accounts-api.errors.company.duplicate-entry-in-database",
      }
    });
    const result = accountsApi.company.create(data);
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('accounts-api.errors.company.duplicate-entry-in-database');
  });

  // it('Should login successfully', async function() {
  //   const secret = 'SC23U35YVUC2OPHPRYA7ULOO5Q7IHMOFQ6AZC7PS335HEJESCLMSCYAA';
  //   const result = accountsApi.company.login(secret, { domain: 'stellarport.io'});
  //   expect(accountsApi.getToken()).to.equal(null);
  //   await expect(result).to.be.fulfilled;
  //   await expect(result).to.not.equal(null);
  //   await expect(result).to.not.equal('');
  //   expect(accountsApi.getToken()).to.not.equal(null);
  // });
  //
  // it('Throws exception if secret is wrong in login function', async function() {
  //   const secret = 'SC23U35YVUC2OPHPRYA7ULOO5Q7IHMOFQ6AZC7PS335HEJESCLMSCYA';
  //   const result = accountsApi.company.login(secret,{ domain: 'stellarport.io'});
  //   await expect(result).to.be.rejected;
  //   await expect(result).to.be.rejectedWith('stellar-auth.errors.invalid-secret');
  // });
});
