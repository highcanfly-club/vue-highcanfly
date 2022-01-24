let kTestImages = {
  lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",//+"e",
  lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
  alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
  animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
};

let isWebpCompatible = function (feature = 'lossy') {
  let isWEBPCompatiblePromise = new Promise(function (resolve, reject) { //eslint-disable-line
    var img = new Image();
    img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      resolve(result);
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  });
  return isWEBPCompatiblePromise;
}

let getJpgOrWebpIfSupported = function (jpgImg, webpImg, feature='lossy'){
  let getOptimizedFileAsPromise = new Promise(function (resolve, reject) { //eslint-disable-line
    var img = new Image();
    img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      resolve(result ? webpImg:jpgImg);
    };
    img.onerror = function () {
      resolve(jpgImg);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  });
  return getOptimizedFileAsPromise;
}

export default {
  install: (app, options) => { //eslint-disable-line
    app.provide('isWebpCompatible', isWebpCompatible);
    app.provide('getJpgOrWebpIfSupported', getJpgOrWebpIfSupported);
  },
};