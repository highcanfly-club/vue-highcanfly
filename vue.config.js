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

const auth0Conf = {
  "domain": process.env.AUTH0_DOMAIN,
  "clientId": process.env.AUTH0_CLIENT_ID
};
fs.writeFile('./auth0-conf.json',
  JSON.stringify(auth0Conf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

const sanityApiVersion = "2021-10-21";
const sanityConf = {
  projectId: process.env.SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: process.env.SANITY_DATASET, // this is from those question during 'sanity init'
  token: process.env.SANITY_READ_TOKEN,
  apiVersion: sanityApiVersion,
  useCdn: true,
};

process.env.VUE_APP_SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
process.env.VUE_APP_SANITY_DATASET = process.env.SANITY_DATASET;
process.env.VUE_APP_SANITY_READ_TOKEN = process.env.SANITY_READ_TOKEN;
process.env.VUE_APP_SANITY_VERSION = sanityApiVersion; //why cannot be read from env ???

fs.writeFile('./sanity-conf.json',
  JSON.stringify(sanityConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

process.env.VUE_APP_ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
process.env.VUE_APP_ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devtool: process.env.CF_PAGES === '1' ? (process.env.__DEBUG__ === '1' ? 'source-map' : false) : 'eval-source-map', //'eval',//'source-map',//'eval-source-map',
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
