// webpack.config.js

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Your webpack configuration options go here
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
  ,
  // Other webpack configuration options...

  // Add the following configuration for server-side builds
  target: 'node',
  externals: [nodeExternals()],
};
