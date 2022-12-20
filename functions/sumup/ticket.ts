/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import { getAcessTokenFromSecured, getReceipt, SumupSecret } from "@/plugins/sumup/api";
import _sumupConf from "../config/sumup-conf.json"
const sumupConf:SumupSecret = _sumupConf as SumupSecret

export const onRequestGet: PagesFunction = async (context) => {
    const searchParams = new URLSearchParams(new URL(context.request.url).search);
    if (searchParams.has("access_token") &&
    searchParams.get("access_token") as string &&
    searchParams.has("checkout_reference") &&
    searchParams.get("checkout_reference") as string &&
    searchParams.has("transaction_id") &&
    searchParams.get("transaction_id") as string)
    {
        const accessToken = getAcessTokenFromSecured(searchParams.get("access_token") as string,sumupConf.bearerKey, searchParams.get("checkout_reference") as string )
        const receipt = await getReceipt(accessToken,searchParams.get("transaction_id") as string, sumupConf.id)
        return new Response(JSON.stringify(receipt), {
            headers: { "content-type": "application/json" },
          });
    }else{
        return new Response(JSON.stringify({ error: "incorrect params" }), {
            headers: { "content-type": "application/json" },
          });
    }
}