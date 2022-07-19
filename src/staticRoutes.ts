// ToDo extract automatically from router
import places from '@/config/places.json'
// eslint-disable-next-line no-undef
const commit = require('@/config/commit.json')

const getRoutes = function (now = Date.now()) {
  const getRandomISODateNearLastHour = function (now) { // workaroud for Cloudflare always return 0
    const dt = new Date(now)
    let timesamp = dt.getTime()
    timesamp -= 3600 * 1000
    const dt2 = new Date(timesamp)
    dt2.setMinutes(Math.random() * 60, Math.random() * 60, Math.random() * 100)
    return dt2.toISOString()
  }
  const routes = [
    {
      path: '/policy',
      name: 'Policy'
    },
    {
      path: '/landing',
      name: 'Landing',
      _updatedAt: commit.vue_highcanfly
    },
    {
      path: '/blog',
      name: 'Blog'
    },
    {
      path: '/about',
      name: 'À propos'
    },
    {
      path: '/index-new'
    },
    {
      path: '/contact',
      name: 'contactez-nous'
    },
    {
      path: '/trackjoiner',
      name: 'Joignez vos traces',
      _updatedAt: commit.cfdtrackjoiner
    },
    {
      path: '/trackjoiner/help',
      name: 'Joignez vos traces',
      _updatedAt: commit.cfdtrackjoiner
    },
    {
      path: '/windy',
      name: 'Le vent (Windy)'
    },
    {
      path: '/meteo',
      name: 'Météo sur nos sites',
      _updatedAt: getRandomISODateNearLastHour(now)
    },
    {
      path: '/map-sites-de-pratique',
      name: 'Sites de pratique'
    },
    {
      path: '/',
      name: 'index',
      _updatedAt: commit.vue_highcanfly
    }
  ]
  places.features.forEach(place => {
    if (place.properties.slug !== undefined) {
      routes.push({ path: `/meteo/${place.properties.slug}`, name: `Météo à ${place.properties.name}`, _updatedAt: getRandomISODateNearLastHour(now) })
    }
  })
  return routes
}
export { getRoutes }
