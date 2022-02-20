//ToDo extract automatically from router
const commit = require('../commit.json');
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
        path: "/map-sites-de-pratique",
        name: "Sites de pratique",
    },
    {
        path: "/",
        name: 'index',
        _updatedAt: commit.vue_highcanfly
    },
];
export {routes};