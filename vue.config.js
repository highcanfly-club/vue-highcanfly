// vue.config.js
const gitlog = require("gitlog").default;
const fs = require('fs');

// Option 1: Just use the function, returned commit type has specified fields
const commits = gitlog({
  repo: ".",
  number: 1,
  fields: ["authorDate"],
});

const commits_trackjoiner = gitlog(
  {
    repo: "CFDTrackJoiner",
    number: 1,
    fields: ["authorDate"],
  }
);

const commit = {
  vue_highcanfly: (new Date(commits[0].authorDate)),
  cfdtrackjoiner: (new Date(commits_trackjoiner[0].authorDate)).toISOString(),
};

process.env.VUE_APP_GIT_LAST_COMMIT = new Date(commits[0].authorDate);
process.env.VUE_APP_GIT_TRACKJOINER_LAST_COMMIT = new Date(commits_trackjoiner[0].authorDate);
fs.writeFile('./commit.json',
  JSON.stringify(commit),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);
var path = require('path');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devtool: process.env.CF_PAGES === '1' ? false : 'source-map', //'eval',//'source-map',//'eval-source-map',
    mode: 'production',
    resolve: {
      fallback: {
        "fs": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "timers": require.resolve("timers-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue')); //if using yarn rather than npm
    //config.resolve.alias.set( '...', path.resolve('./node_modules/tailwindcss')) //bug in tailwindcss ???
  }
};
