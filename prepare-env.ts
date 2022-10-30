// vue.config.js
import {gitlogPromise, GitlogOptions} from "gitlog"
import fs from 'fs'

// Option 1: Just use the function, returned commit type has specified fields
const commits = await gitlogPromise({
  repo: ".",
  number: 1,
  fields: ["authorDate"],
} as GitlogOptions);

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
    // /* minimal workaround must be generate at install from package */
    // fs.writeFile('./node_modules/cfdtrackjoiner/commit.json',
    //   JSON.stringify(commit),
    //   'utf8', function (err) {
    //     if (err) return console.log(err);
    //   }
    // );
  });
});

/*generate auth0-conf.json*/
const auth0Conf = {
  "domain": process.env.AUTH0_DOMAIN,
  "clientId": process.env.AUTH0_CLIENT_ID,
  "scope": 'openid email profile user_metadata app_metadata picture',
  "useRefreshTokens": true,
  "cacheLocation": "localstorage",
  "audience": "https://highcanfly.api",
  "authorizationParams": {
    "scope": 'openid email profile user_metadata app_metadata picture',
    "audience": "https://highcanfly.api"
  }
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
await import('./jwks.js');

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

/*generate meteo-france-conf.json*/
const meteoFranceKey = { api_key: process.env.METEO_FRANCE_API_KEY };
fs.writeFile('./src/config/meteo-france-conf.json',
  JSON.stringify(meteoFranceKey),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate cesium-onf.json*/
const cesiumConf = { token: process.env.CESIUM_TOKEN };
fs.writeFile('./src/config/cesium-conf.json',
  JSON.stringify(cesiumConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

/*generate algolia-conf.json*/
const algoliaConf = { key: process.env.ALGOLIA_SEARCH_KEY,  id:process.env.ALGOLIA_APP_ID};
fs.writeFile('./src/config/algolia-conf.json',
  JSON.stringify(algoliaConf),
  'utf8', function (err) {
    if (err) return console.log(err);
  }
);

import {writeFile, mkdir} from 'fs/promises'
// Get latest View from cfdtrackjoiner
const CFDTRACKJOINER_BRANCH = 'master'
const CFDTRACKJOINER_BASE = 'highcanfly-club/cfdtrackjoiner'
const GITHUB_BASE = 'https://raw.githubusercontent.com'
function downloadFile(url: URL, outputPath: string) {
  return fetch(url)
      .then(x => x.arrayBuffer())
      .then(x => writeFile(outputPath, Buffer.from(x)));
}

await mkdir('src/trackjoiner/fit-parser',{recursive:true})
await mkdir('src/trackjoiner/gpx-parser',{recursive:true})
await mkdir('src/trackjoiner/igc-parser',{recursive:true})
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/views/TrackJoinerView.vue`), './src/views/TrackJoinerView.vue')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/views/TrackJoinerHelp.vue`), './src/views/TrackJoinerHelp.vue')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/trackjoiner.ts`), './src/trackjoiner/trackjoiner.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/igc-parser/index.ts`), './src/trackjoiner/igc-parser/index.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/gpx-parser/index.ts`), './src/trackjoiner/gpx-parser/index.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/binary.d.ts`), './src/trackjoiner/fit-parser/binary.d.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/binary.js`), './src/trackjoiner/fit-parser/binary.js')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/fit.d.ts`), './src/trackjoiner/fit-parser/fit.d.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/fit.js`), './src/trackjoiner/fit-parser/fit.js')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/index.d.ts`), './src/trackjoiner/fit-parser/index.d.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/index.js`), './src/trackjoiner/fit-parser/index.js')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/messages.d.ts`), './src/trackjoiner/fit-parser/messages.d.ts')
await downloadFile(new URL(`${GITHUB_BASE}/${CFDTRACKJOINER_BASE}/${CFDTRACKJOINER_BRANCH}/src/trackjoiner/fit-parser/messages.js`), './src/trackjoiner/fit-parser/messages.js')