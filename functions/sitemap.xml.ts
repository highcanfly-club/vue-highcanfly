/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
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