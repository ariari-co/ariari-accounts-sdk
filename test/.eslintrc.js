module.exports = {
  env: {
    mocha: true
  },
  globals: {
    AriariAccountsSdk: true,
    StellarSdk: true,
    axios: true,
    chai: true,
    expect: true
  },
  rules: {
    'no-unused-vars': 0
  },
  parserOptions: {
    ecmaVersion: 2017
  }
};
