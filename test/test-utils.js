'use strict';
const AriariAccountsSdk = require('../lib/index');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOjIsImlhdCI6MTU3NTY2MDk3NiwiZXhwIjoxNTc1NjY0NTc2LCJpc3MiOiJmLmt6bGFicy5jbyIsInN1YiI6IkdDUUZPTEEyMkJRTk1MM1hBUjJDRVpNWUtPSUlWV0FaRVpPTVZTS05WM0FRRVZMS0JPUDMyNjNCIiwianRpIjoiMDRjNDkwMTQ3Y2Q2MTAwMTFmMTY2NDJmNjFhMWY0YTZiOGQyMWViYWIyNDJmNTNkOTlmN2E1ZWZiYjc0MmRiNCJ9.-nH9rH14AgrIIy2HYBxdrThGRS_x9G0fUcVA3cfcme8';
const accountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOjIsImFjY291bnRJZCI6MSwiaWF0IjoxNTc2MTY0MjkwLCJleHAiOjE1NzYxNjc4OTAsImlzcyI6ImYua3psYWJzLmNvIiwic3ViIjoiR0I1VExXUk5BTVJVR0NMUTNNWFgyRlBNSlhKSk82N0JUNzVURTdVVkY2VlBGSEtMUDY1VTRWNkgiLCJqdGkiOiIxIn0.nfa5SJ5rrFs7cg87XpqsBaOfrsvz32g6y407QkALQrs';
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: 'bearer ' + accountToken,
};
const pingResponse = {
  "version": "1.0",
  "environment": "development"
};
const response = {
  'message': 'Success'
};
const error = {
  data: {
    code: 400,
    message: 'missing fields'
  }
}
const data = {
  "company": {
    "publicKey": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
    "domain": "www.anchorusd.com",
    "enabled": false,
    "updated_at": "2019-12-11T15:48:40.090Z",
    "created_at": "2019-12-11T15:48:40.090Z",
    "id": 56
  }
};
const accountData = {
    "account": {
        "customId": "Test-tx",
        "publicKey": "GDZDOMX3AVPYCUUIZ5XBP35YYJQUJ4BPQNNZ37SDOLK5X4KTHR44PGIV",
        "companyId": 2,
        "updated_at": "2019-12-11T19:52:24.455Z",
        "created_at": "2019-12-11T19:52:24.455Z",
        "id": 252
    }
};
const txData = {
    "signedTx": "AAAAAByVciiGtjE9wQen2iOEOq293/svLEWoVYYnVXXBsisBAAAAZAAGk9cAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAASCAC+uX+0rCPWxdmojnS1+yLH0aHfv+znIJmgkCsYh4AAAAAAAAAAACYloAAAAAAAAAAAUt/u04AAABApZDfDT32QppnCZk49Ns7c4RVNF9kNYHNCNa2RoFAZHCubo5IppyV1tBWsVfATWqVg/azIMhDdFUKsaclLs84Ag=="
};

const publicKey = 'GDV3F744UBAMTX3E76TLYV4CDTEOUBIOOJECZP4ZQJ74I7SEG7HHK7PZ';

var utils = module.exports = {
  getAriariAccountsSdkInstance: function(baseUrl = 'http://api.accountsapi.local') {
    return new AriariAccountsSdk({ baseUrl });
  },
  getPingResponse: function() {
    return pingResponse;
  },
  getToken: function() {
    return token;
  },
  getResponse: function() {
    return response;
  },
  getError: function() {
    return error;
  },
  getCreateCompanyResponse: function() {
    return data;
  },
  getCreateAccountResponse: function() {
    return accountData;
  },
  getServerPublicKey: function() {
    return publicKey;
  },
  getSignedTx: function() {
    return txData;
  },
  getAccountToken: function() {
    return accountToken;
  },
  getAccountHeaders: function() {
    return headers;
  }
};
