import { getResponsePaths } from "@/sitemapHelper.js";


export const onRequestGet: PagesFunction = async (context) => { //eslint-disable-line
    let originUrl = (new URL(context.request.url)).origin;
    let globPaths = await getResponsePaths(originUrl, Date.now());
    return new Response(globPaths.xml, {
        headers: {
            "content-type": "text/xml"
        }
    });


}