const MockAdapter = require('axios-mock-adapter');
const RequestHelper = require('../../lib/resources/request-helper');
const testUtils = require('../test-utils');

describe('AriariAccountsSdk - Request Helper', function() {
  const url = 'https://accounts-api.kzlabs.co';

  beforeEach(function() {
    this.requestHelper = new RequestHelper();
    this.axiosMock = new MockAdapter(this.requestHelper.axios);
  });

  afterEach(function() {
    this.axiosMock.reset();
    this.axiosMock.restore();
  });

  it('Should have default values', function() {
    const { config, axios: ax } = this.requestHelper;
    expect(config.baseURL).to.equal('https://accounts-api.kzlabs.co');
    expect(ax.defaults.baseURL).to.equal('https://accounts-api.kzlabs.co');
    expect(config.headers.Authorization).to.equal('');
    expect(ax.defaults.headers.Authorization).to.equal('');
  });

  it('Should allow user to set baseURL value', function() {
    const reqHelp = new RequestHelper('https://accounts.kslabs.co');
    const { config, axios: ax } = reqHelp;
    expect(config.baseURL).to.equal('https://accounts.kslabs.co');
    expect(ax.defaults.baseURL).to.equal('https://accounts.kslabs.co');
  });

  it('Should allow user to set Authorization header value', function() {
    const reqHelp = new RequestHelper('', testUtils.getToken());
    const { config, axios: ax } = reqHelp;
    expect(config.headers.Authorization).to.equal('bearer ' + testUtils.getToken());
    expect(ax.defaults.headers.Authorization).to.equal('bearer ' + testUtils.getToken());
  });

  it('Should resolve get request successfully', async function() {
    this.axiosMock.onGet(url + '/ping').reply(200, testUtils.getPingResponse());
    let result = this.requestHelper.get('/ping');
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.have.property('environment');

    this.axiosMock.onGet(url + '/other', { params: { id: '12345' } }).reply(200, testUtils.getPingResponse());
    result = this.requestHelper.get('/other', { id: '12345' });
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.have.property('environment');
  });

  it('Throws exception in get if server returns 404 error', async function() {
    const reqHelp = new RequestHelper('http://manuela.local');
    let result = this.requestHelper.get('/ping');
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('Request failed with status code 404');

    result = this.requestHelper.get('/other', { id: '12345' });
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('Request failed with status code 404');
  });

  it('Should resolve post request successfully', async function() {
    this.axiosMock.onPost(url + '/ping').reply(200, testUtils.getResponse());
    const result = this.requestHelper.post(url + '/ping', {});
    await expect(result).to.be.fulfilled;
    await expect(result).to.eventually.have.nested.property('message');
  });

  it('Throws an exception in post if server returns 404 error', async function() {
    const reqHelp = new RequestHelper('http://manuela.local');
    const data = {
      publicKey: 'GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
      domain: 'www.anchorusd.com',
    }
    const result = this.requestHelper.post('/ping', data)
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('Request failed with status code 404');
  });

  it('Throws an exception if there are parameters missing in post', async function() {
    const result = this.requestHelper.post();
    await expect(result).to.be.rejected;
    await expect(result).to.be.rejectedWith('Request failed with status code 404');
  });
});
