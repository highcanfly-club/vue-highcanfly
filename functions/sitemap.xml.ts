import { getResponsePaths } from "@/sitemapHelper.js";


export const onRequestGet: PagesFunction = async (context) => { //eslint-disable-line
    const originUrl = (new URL(context.request.url)).origin;
    const globPaths = await getResponsePaths(originUrl, Date.now());
    return new Response(globPaths.xml, {
        headers: {
            "content-type": "text/xml"
        }
    });


}