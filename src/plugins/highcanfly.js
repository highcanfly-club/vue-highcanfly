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

let getJpgOrWebpIfSupported = function (jpgImg, webpImg, feature = 'lossy') {
  let getOptimizedFileAsPromise = new Promise(function (resolve, reject) { //eslint-disable-line
    var img = new Image();
    img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      resolve(result ? webpImg : jpgImg);
    };
    img.onerror = function () {
      resolve(jpgImg);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  });
  return getOptimizedFileAsPromise;
}

let uuidv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const getWebKitImageSet = (imageAsset1x,imageAssetWebp1x,imageAsset2x, imageAssetWebp2x,minSize) => {
  const srcSet = {low: `-webkit-image-set(url('${imageAssetWebp1x}') type('image/webp'),url('${imageAsset1x}')type('image/jpeg'))`,
  high: `-webkit-image-set(url('${imageAssetWebp2x}') type('image/webp'),url('${imageAsset2x}')type('image/jpeg'))`};
  return window.innerWidth < minSize ? srcSet.low : srcSet.high;
};
export default {
  install: (app, options) => { //eslint-disable-line
    app.provide('isWebpCompatible', isWebpCompatible);
    app.provide('getJpgOrWebpIfSupported', getJpgOrWebpIfSupported);
    app.provide('uuidv4', uuidv4);
    app.provide('getWebKitImageSet',getWebKitImageSet);
  },
};