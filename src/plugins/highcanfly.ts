/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import { Cloudinary } from '@cloudinary/url-gen'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { fill } from '@cloudinary/url-gen/actions/resize'
import cloudinaryConf from '@/config/cloudinary-conf.json'
import type { Forecast, RainOrSnow } from '@/types/ForecastCollection'
const cloudinary = new Cloudinary(cloudinaryConf)

const kTestImages = {
  lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA', // +"e",
  lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
  animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
}

const isWebpCompatible = function (feature = 'lossy') {
  let isWEBPCompatiblePromise = new Promise(function (resolve, reject) { //eslint-disable-line
    const img = new Image()
    img.onload = function () {
      const result = (img.width > 0) && (img.height > 0)
      resolve(result)
    }
    img.onerror = function () {
      resolve(false)
    }
    img.src = 'data:image/webp;base64,' + kTestImages[feature]
  })
  return isWEBPCompatiblePromise
}

const getJpgOrWebpIfSupported = function (jpgImg, webpImg, feature = 'lossy') {
  let getOptimizedFileAsPromise = new Promise(function (resolve, reject) { //eslint-disable-line
    const img = new Image()
    img.onload = function () {
      const result = (img.width > 0) && (img.height > 0)
      resolve(result ? webpImg : jpgImg)
    }
    img.onerror = function () {
      resolve(jpgImg)
    }
    img.src = 'data:image/webp;base64,' + kTestImages[feature]
  })
  return getOptimizedFileAsPromise
}

export const uuidv4 = () => {
  return ((1e7).toString() + (-1e3).toString() + (-4e3).toString() + (-8e3).toString() + (-1e11).toString()).replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  )
}

const getCloudinaryImg = (img, width, height) => {
  const _img = cloudinary.image(img)
  if (width !== undefined || height !== undefined) {
    let _fill = fill()
    if (width !== undefined) {
      _fill = _fill.width(width)
    }
    if (height !== undefined) {
      _fill = _fill.height(height)
    }
    _img.resize(_fill)
  }
  return _img.delivery(quality('auto')).format('auto')
}

const getCloudinaryResponsiveBackground = (img) => {
  return getCloudinaryImg(img, (Math.ceil(window.innerWidth / 200) * 200), undefined)
}

export const weatherIsFlyable = (
  forecast: Forecast,
  flying = {
    sectors: [{ min_angle: -1, max_angle: 360 }],
    wind: { min_speed: 0, max_speed: 6.11 }
  }
) => {
  let directionOK = false
  flying.sectors.forEach((sector) => {
    if (
      sector.min_angle <= forecast.wind.direction &&
      forecast.wind.direction <= sector.max_angle
    ) {
      directionOK = true
    }
  })
  return (
    directionOK &&
    flying.wind.min_speed <= forecast.wind.speed &&
    forecast.wind.speed <= flying.wind.max_speed &&
    flying.wind.min_speed <= forecast.wind.gust &&
    forecast.wind.gust <= flying.wind.max_speed &&
    weatherGetRain(forecast.rain).height === 0
  )
}

export const weatherGetRain = (rain: RainOrSnow) => {
  const rainInterval = Object.keys(rain)
  return { interval: rainInterval[0], height: rain[rainInterval[0]] }
}
export { getCloudinaryImg, getCloudinaryResponsiveBackground }

export const getWebKitImageSet = (imageAsset1x, imageAssetWebp1x, imageAsset2x, imageAssetWebp2x, minSize) => {
  const srcSet = {
    low: `-webkit-image-set(url('${imageAssetWebp1x}') type('image/webp'),url('${imageAsset1x}')type('image/jpeg'))`,
    high: `-webkit-image-set(url('${imageAssetWebp2x}') type('image/webp'),url('${imageAsset2x}')type('image/jpeg'))`
  }
  return window.innerWidth < minSize ? srcSet.low : srcSet.high
}

export default {
  install: (app, options) => { //eslint-disable-line
    app.provide('isWebpCompatible', isWebpCompatible)
    app.provide('getJpgOrWebpIfSupported', getJpgOrWebpIfSupported)
    app.provide('uuidv4', uuidv4)
    app.provide('getWebKitImageSet', getWebKitImageSet)
  }
}
