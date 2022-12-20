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
  isAllowed,
  parseTokenFromAuthorizationHeader,
  HIGHCANFLY_PERMISSION
} from "@/plugins/auth0/TokenHelper";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-",
  5
);

/**
 * executed on post request,
 * env.SHORTURL is an environment variable containing the KV used to store requests
 * env.AUTH0_DOMAIN is an environment variable containing the Auth0 domain (ex: yourname.eu.auth0.com)
 * ex request:
 * HOST=http://localhost:3000
 * TOKEN="ej……xX"
 * curl -v -X POST $HOST/api/add-short-url -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"url":"https://www.cloudflare.com","ttl":"86400","description":"Cf web site"}'
 * @param param0 
 * @returns 
 */
export const onRequestPost: PagesFunction<{
  SHORTURL: KVNamespace;
  AUTH0_DOMAIN: string;
}> = async ({ request, env }) => {
  const auth0Domain: string = env.AUTH0_DOMAIN;

  /**
   * 1- Read Authorization header
   * ex: Authorization: Bearer eyJhbGci…AsTy
   */
  const authorizationHeader: string = request.headers.get("Authorization");
  const jwtToken: string =
    parseTokenFromAuthorizationHeader(authorizationHeader);

  if (jwtToken !== null) {
    /**
     * 2 - Validate JWT token
     * 2a - validate signature against the certificate retrieved from https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json
     *      during vuejs lauch (via vue.config.js)
     * 2b - check if now is beetween iat (claim) and exp (expiry)
     * 2c - check if ADD_SHORT_URL is present in permissions[]
     */
    const hasPermission: boolean = await isAllowed(
      jwtToken,
      auth0Domain,
      Date.now() / 1000,
      HIGHCANFLY_PERMISSION.add_short_url
    );
    if (hasPermission !== false) {
      console.log("permission OK");
      let slug: string;
      do {
        slug = nanoid();
        console.log(slug);
      } while ((await env.SHORTURL.get(slug)) !== null); //ensure that the key is not already registred ()
      const requestBody: { url: string; ttl: string | null,description: string|undefined } =
        await request.json();
      if ("url" in requestBody && "ttl" in requestBody) {
        // Add slug to our KV store so it can be retrieved later:
        await env.SHORTURL.put(slug, requestBody.url, {
          expirationTtl: Number(requestBody.ttl),
          metadata: {description: requestBody.description, expiration: Date.now()+1000*Number(requestBody.ttl)},
        });
        const shortenedURL = `${new URL(request.url).origin}/${slug}`;
        const responseBody = {
          message: "Link shortened successfully",
          slug,
          url:requestBody.url,
          shortened: shortenedURL,
          expiration: Date.now()+1000*Number(requestBody.ttl),
        };
        return new Response(JSON.stringify(responseBody), { status: 200 });
      }
      return new Response(
        JSON.stringify({ error: "Error during save" }, null, 3),
        { status: 500 }
      );
    } else {
      console.log("no permission");
      return new Response(JSON.stringify({ error: "JWT invalid" }, null, 3), {
        status: 403,
      });
    }
  } else {
    console.log("no token");
    return new Response(
      JSON.stringify(
        { error: "You must provide JWT in 'Authorization: Bearer' header" },
        null,
        3
      ),
      { status: 403 }
    );
  }
};
