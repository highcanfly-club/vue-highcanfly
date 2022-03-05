//ToDo extract automatically from router
const commit = require('../commit.json');
const places = require('./places.json');
const getRandomISODateNearLastHour = function () {//workaroud for Cloudflare always return 0
    let dt = (globalThis.fetchDate !== undefined) ? global.fetchDate : new Date(Date.now()); //eslint-disable-line 
    let timesamp = dt.getTime();
    timesamp -= 3600 * 1000;
    let dt2 = new Date(timesamp);
    dt2.setMinutes(Math.random() * 60, Math.random() * 60, Math.random() * 100);
    return dt2.toISOString();
};
const routes = [
    {
        path: "/policy",
        name: "Policy",
    },
    {
        path: "/landing",
        name: "Landing",
        _updatedAt: commit.vue_highcanfly
    },
    {
        path: "/blog",
        name: "Blog",
    },
    {
        path: "/about",
        name: "À propos",
    },
    {
        path: "/index-new",
    },
    {
        path: "/contact",
        name: 'contactez-nous'
    },
    {
        path: "/trackjoiner",
        name: 'Joignez vos traces',
        _updatedAt: commit.cfdtrackjoiner
    },
    {
        path: "/trackjoiner/help",
        name: 'Joignez vos traces',
        _updatedAt: commit.cfdtrackjoiner
    },
    {
        path: "/windy",
        name: 'Le vent (Windy)'
    },
    {
        path: "/meteo",
        name: "Météo sur nos sites",
        _updatedAt: getRandomISODateNearLastHour(),
    },
    {
        path: "/map-sites-de-pratique",
        name: "Sites de pratique",
    },
    {
        path: "/",
        name: 'index',
        _updatedAt: commit.vue_highcanfly
    },
];
places.forEach(place => {
    if (place.slug !== undefined) {
        routes.push({ path: `/meteo/${place.slug}`, name: `Météo à ${place.name}`, _updatedAt: getRandomISODateNearLastHour() });
    }
});
export { routes };