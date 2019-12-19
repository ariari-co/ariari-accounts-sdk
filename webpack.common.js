const path = require("path");

module.exports = {
  entry: {
    "ariari-accounts-sdk": "./lib/browser.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "AriariAccountsSdk",
    umdNamedDefine: true,
  },
  externals: {
    '@ledgerhq/hw-transport-node-hid': 'TransportNodeHid'
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: "babel-loader",
      }
    ]
  }
};
