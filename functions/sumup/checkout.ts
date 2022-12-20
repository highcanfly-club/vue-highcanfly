/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import {
  getCheckout,
  getCheckoutSecured,
  isValidEmailAddress,
  SumupSecret,
} from "@/plugins/sumup/api.js";

import _sumupConf from "../config/sumup-conf.json"
const sumupConf:SumupSecret = _sumupConf as SumupSecret

export const onRequestGet: PagesFunction = async (context) => {
  const searchParams = new URLSearchParams(new URL(context.request.url).search);
  if (
    searchParams.has("email") &&
    isValidEmailAddress(searchParams.get("email") as string) &&
    searchParams.has("amount") &&
    parseFloat(searchParams.get("amount") as string) > 1 &&
    searchParams.has("last_name") &&
    (searchParams.get("last_name") as string).length > 2 &&
    searchParams.has("first_name") &&
    (searchParams.get("first_name") as string).length > 2
  ) {
    const email = searchParams.get("email") as string;
    const amount = parseFloat(searchParams.get("amount") as string);
    const reference = searchParams.get("reference") as string;
    const firstName = searchParams.get("first_name") as string;
    const lastName = searchParams.get("last_name") as string;
    const checkout = await getCheckout(
      amount,
      email,
      firstName,
      lastName,
      sumupConf
    );
    return new Response(JSON.stringify(getCheckoutSecured(checkout,sumupConf.bearerKey)));
  } else {
    return new Response(JSON.stringify({ error: "incorrect params" }), {
      headers: { "content-type": "application/json" },
    });
  }
};
