[![Version](https://img.shields.io/npm/v/ariari-accounts-sdk.svg)](https://www.npmjs.org/package/ariari-accounts-sdk)
[![Build Status](https://travis-ci.com/ariari-co/ariari-accounts-sdk.svg?branch=master)](https://travis-ci.com/ariari-co/ariari-accounts-sdk)
[![Coverage Status](https://coveralls.io/repos/github/ariari-co/ariari-accounts-sdk/badge.svg)](https://coveralls.io/github/ariari-co/ariari-accounts-sdk)
[![David](https://img.shields.io/david/ariari-co/ariari-accounts-sdk.svg)](https://david-dm.org/ariari-co/ariari-accounts-sdk)
[![David](https://img.shields.io/david/dev/ariari-co/ariari-accounts-sdk.svg)](https://david-dm.org/ariari-co/ariari-accounts-sdk?type=dev)
[![Try on RunKit](https://badge.runkitcdn.com/ariari-accounts-sdk.svg)](https://runkit.com/npm/ariari-accounts-sdk)
# Ariari Accounts SDK library

Ariari Accounts SDK is a JavaScript library for Ariari Accounts API implementation.

## Quick Start

## Installation

Using npm:

```bash
$ npm install ariari-accounts-sdk
```

## Usage

### Initialization

```python
const accountsApiSdk = require('ariari-accounts-sdk');
const accountsApi = new AriariAccountsSdk();
```
### Create a new company

```python
const data = {
   publicKey: 'GC2Z...JXNU',
   domain: 'www.foo-domain.com',
}

accountsApi.company.create(data) # returns the newly created object company
```
- **data**\
Object with mandatory params containing the information to create a new company.
Required: true
  - **publicKey**\
  From the /.well-known/stellar.toml file that matches the domain.
  Required: true
  - **domain**\
  Of the company to be created.
  Required: true

### Authenticate a company

```python
const secret = 'SAAN...OLJ2';

accountsApi.company.login(secret) # returns the authentication token for a company
```

- **secret**\
Secret key that matches the public key used to create a new company.
Required: true

### Create a new account

```python
const customId = 'foo';

accountsApi.account.create(customId) # returns the newly created object account
```

- **customId**\
Custom label that will allow easier identification of the newly created account.
Required: false

### Authenticate an account

```python

const id = '123';
const customId = 'foo';
const publicKey = 'GC2Z...JXNU';

accountsApi.account.login({ id }) # returns the authentication token for an account
accountsApi.account.login({ customId }) # returns the authentication token for an account
accountsApi.account.login({ publicKey }) # returns the authentication token for an account
```
The user must provide either the id, public key or customId of the account to be authenticated.
- **id**\
ID of the account to be authenticated.
Required: false
- **customId**\
Custom ID of the account to be authenticated.
Required: false
- **publicKey**\
Public key of the account to be authenticated.
Required: false

### Sign a transaction

```python
const transaction = 'AAAA...AAAA==';

accountsApi.account.signTransaction(transaction) # returns the signed transaction
```

- **tx**\
Transaction XDR to be signed by the desired account.
Required: true

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
