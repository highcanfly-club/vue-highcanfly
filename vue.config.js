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

/*generate auth0-conf.json*/
const auth0Conf = {
  "domain": process.env.AUTH0_DOMAIN,
  "client_id": process.env.AUTH0_CLIENT_ID,
  "scope": 'openid email profile user_metadata app_metadata picture',
  "useRefreshTokens": true,
  "cacheLocation": "localstorage",
  "audience": "https://highcanfly.api"
};
fs.writeFile('./auth0-conf.json',
  JSON.stringify(auth0Conf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

const loadJwks = require('./jwks.js');

const sanityApiVersion = "2021-10-21";
const sanityConf = {
  projectId: process.env.SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: process.env.SANITY_DATASET, // this is from those question during 'sanity init'
  apiVersion: sanityApiVersion,
  useCdn: true,
};

process.env.VUE_APP_SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
process.env.VUE_APP_SANITY_DATASET = process.env.SANITY_DATASET;
process.env.VUE_APP_SANITY_VERSION = sanityApiVersion; //why cannot be read from env ???

fs.writeFile('./sanity-conf.json',
  JSON.stringify(sanityConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

process.env.VUE_APP_ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
process.env.VUE_APP_ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;

const webpackPlugins = [];

if ((process.env.CF_PAGES === '1') && (process.env.__DEBUG__ !== '1')) {
  const PurgecssPlugin = require('purgecss-webpack-plugin');
  const glob = require('glob-all')
  const PATHS = {
    src: path.join(__dirname, 'src')
  }

  const purgeCssPlugin = new PurgecssPlugin({
    paths: glob.sync(
      [
        path.join(__dirname, './public/*.html'),
        path.join(__dirname, './src/**/*.vue'),
        path.join(__dirname, './src/**/*.js')
      ]),
    safelist: [/^sm:/, /^md:/, /^lg:/, /^xl:/, /^2xl:/, /^focus:/, /^hover:/, /^group-hover:/, /\[.*\]/, /^basicLightbox/, /\/[0-9]/, /^tns/,/^el-/,/^is-/,/popper/],
    fontFace: true
  })
  webpackPlugins.push(purgeCssPlugin);
}

if ((process.env.CF_PAGES === '1') && (process.env.__DEBUG__ !== '1')) {
  const FontMinPlugin = require('fontmin-webpack');
  const fontMinPlugin = new FontMinPlugin({
    autodetect: true,
    glyphs: [],
    allowedFilesRegex: /^fa[srltdb]*-/, // RegExp to only target specific fonts by their names
    skippedFilesRegex: null, // RegExp to skip specific fonts by their names
    textRegex: /\.(ts|js|css|html|vue)$/,  // RegExp for searching text reference
    webpackCompilationHook: 'compilation', // Webpack compilation hook (for example PurgeCss webpack plugin use 'compilation' )
  });
  webpackPlugins.push(fontMinPlugin);
}

if ((process.env.CF_PAGES === '1') && (process.env.__DEBUG__ !== '1')) {
  const MangleCssClassPlugin = require('mangle-css-class-webpack-plugin');
  const myManglePlugin = new MangleCssClassPlugin({
    //be carrefull to not mangle javascript code ie: tailwindcss 'static' is a javascript reserved word !
    //classNameRegExp: '\\b([-]*left|[-]*top|[-]*right|[-]*bottom)-[p0-9]+|\\b(bg|[-]*p[xylrbt]*|[-]*m[xylrbt]*|w|[-]*z|h|justify|overflow|border|max-h|min-h|max-w|min-w|flex|text|font|prose|inline|line|rounded|from|to|via|contrast|brightness|leading|items|place|align|backdrop|shadow|duration|whitespace|self|cursor|transition|outline)-[a-z0-9_-]+\\b|\\brelative\\b|\\bshadow\\b|\\bflex\\b|\\brounded\\b|\\bborder\\b|\\bunderline\\b', //\\babsolute\\b|\\fixed\\b| fixed and absolute cannot be mangle with PopperJS because PopperJS us 'absolute' and 'fixed' as strategy name
    log: true,
    reserveClassName: ['fa', 'fas', 'far','fab','fad', 'p', 'm', 'z', 'el', 'pt', 'pb', 'px', 'py', 'pl', 'pr', 'mt', 'mb', 'mx', 'my', 'ml', 'mr', 'to'],
    classNameRegExp: '(bg|[-]*p[xylrbt]*|[-]*m[xylrbt]*|[-]*left|[-]*top|[-]*right|[-]*bottom|w|[-]*z|h|fa|fas|far|fab|fad|justify|overflow|border|max|flex|text|font|inline|rounded|from|to|via|contrast|brightness|leading|items|backdrop|shadow|duration|whitespace|self|cursor|transition|outline)-[a-z0-9_-]+|shadow|flex|rounded|border',
    ignorePrefixRegExp: '(.*tns.*|light[bB]ox|popover|el-|popper|is-|top-start|top-end|bottom-start|bottom-end|left-start|left-end|right-start|right-end)',
    fileMatchRegExp: '.+\.js.*$|.+\.js.*$|.+\.html.*$|.+\.vue.*$',
    fileExlusionRegExp: '.+\.json.*$|.+\.geojson.*$',
  });
  webpackPlugins.push(myManglePlugin);
}

module.exports = {
  pages:{
    index:{
      entry:'src/main.js'
    }
  },
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: webpackPlugins,
    devtool: process.env.CF_PAGES === '1' ? (process.env.__DEBUG__ === '1' ? 'source-map' : false) : 'source-map',
    mode: process.env.CF_PAGES === '1' ? (process.env.__DEBUG__ === '1' ? 'development' : 'production') : 'development',
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
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue')); 
  }
};
