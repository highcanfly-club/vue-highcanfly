// vue.config.js
const gitlog = require("gitlog").default;
const fs = require('fs');

// Option 1: Just use the function, returned commit type has specified fields
const commits = gitlog({
  repo: ".",
  number: 1,
  fields: ["authorDate"],
});

//workaround
import('./getcfdtrackjoinerversion.mjs').then((module) => {
  module.getLastCommit('eltorio', 'cfdtrackjoiner').then((_date)=>{
    const commit = {
      vue_highcanfly: (new Date(commits[0].authorDate)),
      cfdtrackjoiner: (new Date(_date)),
    };

    fs.writeFile('./src/config/commit.json',
      JSON.stringify(commit),
      'utf8', function (err) {
        if (err) return console.log(err);
      }
    );
    fs.writeFile('./commit.json',
      JSON.stringify(commit),
      'utf8', function (err) {
        if (err) return console.log(err);
      }
    );
    /* minimal workaround must be generate at install from package */
    fs.writeFile('./node_modules/cfdtrackjoiner/commit.json',
      JSON.stringify(commit),
      'utf8', function (err) {
        if (err) return console.log(err);
      }
    );
  });
});

const path = require('path');

/*generate auth0-conf.json*/
const auth0Conf = {
  "domain": process.env.AUTH0_DOMAIN,
  "client_id": process.env.AUTH0_CLIENT_ID,
  "scope": 'openid email profile user_metadata app_metadata picture',
  "useRefreshTokens": true,
  "cacheLocation": "localstorage",
  "audience": "https://highcanfly.api"
};
fs.writeFile('./src/config/auth0-conf.json',
  JSON.stringify(auth0Conf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate mapbox.json */
const mapboxConf = {
  "token": process.env.MAPBOX_TOKEN
};

fs.writeFile('./src/config/mapbox-conf.json',
  JSON.stringify(mapboxConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);
/*generate jwks.json */
/* might be already done with node jwks.js */
require('./jwks.js');

/*generate sanity-conf.json*/
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

fs.writeFile('./src/config/sanity-conf.json',
  JSON.stringify(sanityConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate cloudinary-conf.json*/
const cloudinaryConf = {
  "cloud": {
    "cloudName": process.env.CLOUDINARY_CLOUD_NAME
  }
};
fs.writeFile('./src/config/cloudinary-conf.json',
  JSON.stringify(cloudinaryConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate node-vesion.json*/
const nodeVersion = { version: process.version };
fs.writeFile('./src/config/node-version.json',
  JSON.stringify(nodeVersion),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate cesiumConf.json*/
const cesiumConf = { token: process.env.CESIUM_TOKEN };
fs.writeFile('./src/config/cesium-conf.json',
  JSON.stringify(cesiumConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

process.env.VUE_APP_ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
process.env.VUE_APP_ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;

const webpackPlugins = [];

const cesiumSource = './node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const CopywebpackPlugin = require('copy-webpack-plugin');
const myCopywebpackPlugin = new CopywebpackPlugin({
  patterns: [
    { from: path.join(cesiumSource, cesiumWorkers), to: 'cesium/Workers' },
    { from: path.join(cesiumSource, 'Assets'), to: 'cesium/Assets' },
    { from: path.join(cesiumSource, 'Widgets'), to: 'cesium/Widgets' }
  ]
});
webpackPlugins.push(myCopywebpackPlugin);

if ((process.env.CF_PAGES === '1') && (process.env.__DEBUG__ !== '1')) {
  const PurgecssPlugin = require('purgecss-webpack-plugin');
  const glob = require('glob-all');

  const purgeCssPlugin = new PurgecssPlugin({
    paths: glob.sync(
      [
        path.join(__dirname, './node_modules/cfdtrackjoiner/public/*.html'),
        path.join(__dirname, './node_modules/cfdtrackjoiner/src/**/*.vue'),
        path.join(__dirname, './node_modules/cfdtrackjoiner/src/**/*.js'),
        path.join(__dirname, './node_modules/cfdtrackjoiner/src/**/*.ts'),
        path.join(__dirname, './public/*.html'),
        path.join(__dirname, './src/**/*.vue'),
        path.join(__dirname, './src/**/*.js'),
        path.join(__dirname, './src/**/*.ts')
      ]),
    safelist: [/^dp/, /^cesium/, /^leaflet/, /^sm:/, /^md:/, /^lg:/, /^xl:/, /^2xl:/, /^focus:/, /^hover:/, /^group-hover:/, /^peer:/, /^peer-checked:/, /\[.*\]/, /^basicLightbox/, /\/[0-9]/, /^tns/, /^el-/, /^is-/, /popper/],
    fontFace: true,
  });
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

if ((process.env.CF_PAGES === '1') && (process.env.__DEBUG__ !== '1') && (process.env.__MANGLING__ === '1')) {
  const MangleCssClassPlugin = require('mangle-css-class-webpack-plugin');
  const myManglePlugin = new MangleCssClassPlugin({
    //be carrefull to not mangle javascript code ie: tailwindcss 'static' is a javascript reserved word !
    //classNameRegExp: '\\b([-]*left|[-]*top|[-]*right|[-]*bottom)-[p0-9]+|\\b(bg|[-]*p[xylrbt]*|[-]*m[xylrbt]*|w|[-]*z|h|justify|overflow|border|max-h|min-h|max-w|min-w|flex|text|font|prose|inline|line|rounded|from|to|via|contrast|brightness|leading|items|place|align|backdrop|shadow|duration|whitespace|self|cursor|transition|outline)-[a-z0-9_-]+\\b|\\brelative\\b|\\bshadow\\b|\\bflex\\b|\\brounded\\b|\\bborder\\b|\\bunderline\\b', //\\babsolute\\b|\\fixed\\b| fixed and absolute cannot be mangle with PopperJS because PopperJS us 'absolute' and 'fixed' as strategy name
    log: true,
    reserveClassName: ['fa', 'fas', 'far', 'fab', 'fad', 'h', 'p', 'm', 'w', 'z', 'el', 'pt', 'pb', 'px', 'py', 'pl', 'pr', 'mt', 'mb', 'mx', 'my', 'ml', 'mr', 'sr', 'to'],
    classNameRegExp: '(bg|[-]*p[xylrbt]*|[-]*m[xylrbt]*|[-]*left|[-]*top|[-]*right|[-]*bottom|[-]*w|[-]*z|h|fa|fas|far|fab|fad|justify|overflow|border|max|flex|text|font|inline|rounded|from|sr|to|via|contrast|brightness|leading|items|backdrop|shadow|duration|whitespace|self|cursor|transition|translate|outline)-[a-z0-9_-]+|shadow|flex|rounded|border',
    ignorePrefixRegExp: '(.*tns.*|light[bB]ox|cesium|popover|el-|popper|is-|top-start|top-end|bottom-start|bottom-end|left-start|left-end|right-start|right-end)',
    // eslint-disable-next-line no-useless-escape
    fileMatchRegExp: '.+\.js.*$|.+\.ts.*$|.+\.html.*$|.+\.vue.*$',
    // eslint-disable-next-line no-useless-escape
    fileExlusionRegExp: '.+\.json.*$|.+\.geojson.*$',
  });
  webpackPlugins.push(myManglePlugin);
}

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: webpackPlugins,
    devtool: process.env.CF_PAGES === '1' ? (process.env.__DEBUG__ === '1' ? 'source-map' : false) : 'source-map',
    mode: process.env.CF_PAGES === '1' ? (process.env.__DEBUG__ === '1' ? 'development' : 'production') : 'development',
    // optimization: {
    //   splitChunks: {
    //     // include all types of chunks
    //     chunks: 'all',
    //   },
    // },
    resolve: {
      alias: {
        cesium_src: path.resolve(__dirname, cesiumSource),
        cesium: path.resolve(__dirname, cesiumSource + '/Cesium.js'),
      },
      extensions: ['.geojson'],
      fallback: {
        "path": require.resolve("path-browserify")
      }
    },
    module: {
      rules: [
        {
          test: /\.geojson$/,
          loader: 'json-loader' //external loader
        }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue'));
    config.resolve.alias.set('@vuepic', path.resolve('./node_modules/@vuepic'));
  }
};
