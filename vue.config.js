// vue.config.js
var path = require('path');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack(config) {
    config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue')); //if using yarn rather than npm
    //config.resolve.alias.set( '...', path.resolve('./node_modules/tailwindcss')) //bug in tailwindcss ???
    }
};
