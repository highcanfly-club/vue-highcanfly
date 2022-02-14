import sanity from "@/plugins/sanity-client";
import {getRoutesList,getRoutesXML,getSlugList} from "@/sitemapHelper.js";
const commit = require('../commit.json');

//ToDo extract automatically from router
const routes = [
    {
        path: "/policy",
        name: "Policy",
    },
    {
        path: "/landing",
        name: "Landing",
        _updatedAt: commit
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

const query = `*[_type == "post"]{
    slug,_updatedAt
  }| order(slug asc)`;

let getResponse = function () {
    return new Promise((resolve, reject) => {
        sanity.fetch(query).then(
            (posts) => {
                const slugList = getSlugList(posts);
                let routesList = getRoutesList(routes);
                routesList = routesList.concat(slugList);
                resolve(getRoutesXML(routesList));
            },
            (error) => {
                reject(error);
            });
    }
    );
};

export async function onRequestGet(context) { //eslint-disable-line
    console.log(commit);
    let stringXML = await getResponse()
    return new Response(stringXML, {
        headers: {
          "content-type": "text/xml"
        }
      });


}