/*
* All get return to index
* */
export async function onRequestGet(context) { //eslint-disable-line
    let url = new URL(context.request.url);
    return Response.redirect(url.protocol+url.hostname+':'+url.port+'/');
  }


export async function onRequestPost(context) { //eslint-disable-line
    return new Response(`Hello world`);
  }