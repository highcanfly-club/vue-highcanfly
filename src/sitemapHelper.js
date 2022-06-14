import sanityClient from "@sanity/client";
import {getRoutes} from "@/staticRoutes.js";

const isWorkingAtWorker = function(){
  let test = false;
  try {
    test = (WebSocketPair !== undefined); //eslint-disable-line
  } catch (error) {
    test = false;
  }
   return test;
};

const getRoutesList = function (router) {
  const list = [];
  for (let i = 0; i < router.length; i++) {
    if (router[i].name != undefined)
      list.push({
        id: i,
        path: router[i].path,
        _updatedAt: router[i]._updatedAt
      });
  }
  list.sort(function (a, b) {
    if (a.path < b.path) {
      return -1;
    }
    if (a.path > b.path) {
      return 1;
    }
    return 0;
  });

  return list;
};

const getRoutesXML = function (router, baseURL) {
  let list = "";
  for (let i = 0; i < router.length; i++) {
    if (!(typeof(router[i].path) === 'undefined'))
    {
      const lastmod = typeof(router[i]._updatedAt) === 'undefined' ? '' : `<lastmod>${router[i]._updatedAt}</lastmod>` ;
      list += `<url><loc>${baseURL}${router[i].path}</loc>${lastmod}</url>\n`;
    }
  }
  //return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/assets/sitemap.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${list}
    </urlset>`;
};

const getSlugList = function (posts) {
  const ret = [];
  for (let i = 0; i < posts.length; i++) {
    ret.push({ id: i, path: `/sanity-blog/${posts[i].slug.current}`, _updatedAt: `${posts[i]._updatedAt}` });
  }
  return ret;
};

const query = `*[_type == "post" && !(_id in path('drafts.**'))]{
  slug,_updatedAt
}| order(slug asc)`;

const getSanityClient = function(){
    if (isWorkingAtWorker()){
      const client = require('@/config/sanity-conf.json');
        return sanityClient(client);
    }else{
        return sanityClient({
          projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
          dataset: process.env.VUE_APP_SANITY_DATASET,
          token: process.env.VUE_APP_SANITY_READ_TOKEN,
          useCdn: true,
          apiVersion: process.env.VUE_APP_SANITY_VERSION,
        });
    }
};
const getResponsePaths = function (canonicalURL,now = Date.now()) {
  const baseURL = canonicalURL;
  return new Promise((resolve, reject) => {
    getSanityClient().fetch(query).then(
          (posts) => {
              const slugList = getSlugList(posts);
              let routesList = getRoutesList(getRoutes(now));
              routesList = routesList.concat(slugList);
              resolve({xml: getRoutesXML(routesList, baseURL),paths: routesList});
          },
          (error) => {
              reject(error);
          });
  }
  );
};

export { getRoutesList, getRoutesXML, getSlugList, getResponsePaths, isWorkingAtWorker};