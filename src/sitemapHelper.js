import sanity from "@/plugins/sanity-client";
import {routes} from "@/staticRoutes.js";


let getRoutesList = function (router) {
  let list = [];
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

let getRoutesXML = function (router, baseURL) {
  let list = "";
  for (let i = 0; i < router.length; i++) {
    if (!(typeof(router[i].path) === 'undefined'))
    {
      let lastmod = typeof(router[i]._updatedAt) === 'undefined' ? '' : `<lastmod>${router[i]._updatedAt}</lastmod>` ;
      list += `<url><loc>${baseURL}${router[i].path}</loc>${lastmod}</url>\n`;
    }
  }
  //return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/assets/sitemap.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${list}
    </urlset>`;
};

let getSlugList = function (posts) {
  let ret = [];
  for (let i = 0; i < posts.length; i++) {
    ret.push({ id: i, path: `/sanity-blog/${posts[i].slug.current}`, _updatedAt: `${posts[i]._updatedAt}` });
  }
  return ret;
};

const query = `*[_type == "post"]{
  slug,_updatedAt
}| order(slug asc)`;

let getResponsePaths = function (canonicalURL) {
  let baseURL = canonicalURL;
  return new Promise((resolve, reject) => {
      sanity.fetch(query).then(
          (posts) => {
              const slugList = getSlugList(posts);
              let routesList = getRoutesList(routes);
              routesList = routesList.concat(slugList);
              resolve({xml: getRoutesXML(routesList, baseURL),paths: routesList});
          },
          (error) => {
              reject(error);
          });
  }
  );
};

export { getRoutesList, getRoutesXML, getSlugList, getResponsePaths, routes};