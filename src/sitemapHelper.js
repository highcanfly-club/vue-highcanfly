const canonicalURL = "https://www.highcanfly.club";

let getRoutesList = function (router) {
    //eslint-disable-line
    let list = [];
    for (let i = 0; i < router.length; i++) {
      if (router[i].name != undefined)
        list.push({
          id: i,
          path: router[i].path,
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
  
  let getRoutesXML = function (router,baseURL = canonicalURL) {
    //eslint-disable-line
    let list = "";
    for (let i = 0; i < router.length; i++) {
      if (router[i].path != undefined)
        list += `<url><loc>${baseURL}${router[i].path}</loc></url>\n`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${list}
    </urlset>`;
  };
  
  let getSlugList = function (posts) {
    let ret = [];
    for (let i = 0; i < posts.length; i++) {
      ret.push({id:i,path:`/sanity-blog/${posts[i].slug.current}`});
    }
    return ret;
  };

  export {getRoutesList,getRoutesXML,getSlugList,canonicalURL};