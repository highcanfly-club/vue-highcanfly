export async function onRequestGet(context) {
  const originUrl = (new URL(context.request.url)).origin;
  if (context.params !== undefined) {
    if (context.params.link !== undefined) {
      const req = context.params.link;
      const link = await context.env.SHORTURL.get(req);
      if (link) {
        return Response.redirect(link, 301)
      }
      else {
        return Response.redirect(originUrl, 301)
      }
    }
  }
  return new Response("ERROR NO SHORT LINK PROVIDED", null, 2);
}