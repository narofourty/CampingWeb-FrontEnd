const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@styles': path.resolve(__dirname, 'src/assets/styles'),
  };
  return config;
};