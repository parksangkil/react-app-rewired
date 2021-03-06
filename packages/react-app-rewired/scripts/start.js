/* start.js */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env files
require("react-scripts/config/env");

const paths = require('./utils/paths');
const webpackConfig = paths.scriptVersion + '/config/webpack.config.dev';
require(paths.scriptVersion + '/config/env');
const config = require(webpackConfig);
const override = require(paths.configOverrides);
const overrideFn = typeof override === 'function'
  ? override
  : override.webpack || ((config, env) => config);

require.cache[require.resolve(webpackConfig)].exports =
  overrideFn(config, process.env.NODE_ENV);

if (typeof override !== 'function' && typeof override.devServer === 'function') {
  const devServerConfig = paths.scriptVersion + '/config/webpackDevServer.config.js';
  const devServerRewire = require(devServerConfig);

  require.cache[require.resolve(devServerConfig)].exports =
    override.devServer(devServerRewire);
}

require(paths.scriptVersion + '/scripts/start');
