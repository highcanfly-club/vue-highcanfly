// vue.config.js
const gitlog = require("gitlog").default;

// Option 1: Just use the function, returned commit type has specified fields
const commits = gitlog({
  repo: ".",
  number: 1,
  fields: ["authorDate"],
});
process.env.VUE_APP_GIT_LAST_COMMIT = new Date(commits[0].authorDate);

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
