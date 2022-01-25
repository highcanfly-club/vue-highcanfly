<script>
let getRoutesXML = function (router) { //eslint-disable-line
    let list = '';
    for (let i = 0; i < router.length; i++) {
        if (router[i].name != undefined)
            list += `<url><loc>/${router[i].path}</loc></url>`;
    }
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}
export default {
    // data() {
    //     const routes = getRoutesXML(this.$router.getRoutes()) ;
    //     return {
    //         routes: routes,
    //     }
    // },
    data() {
        return {
            
        }
    },
    render() {
        return  getRoutesXML(this.$router.getRoutes()) ;
    }
}
</script>