const webpackConfig = require("./webpack.dev.js");

delete webpackConfig.plugins;
delete webpackConfig.output;

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],
    browsers: ["FirefoxHeadless"],

    files: [
      "dist/ariari-accounts-sdk.dev.js",
      "test/mocha.js",
      "test/lib/**/*.js",
    ],

    preprocessors: {
      "test/**/*.js": ["webpack"],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },

    singleRun: true,

    reporters: ["dots"],
  });
};
