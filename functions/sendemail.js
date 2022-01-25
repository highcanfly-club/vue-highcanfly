/*
* All get return to index
* */
export async function onRequestGet({ params }) { //eslint-disable-line
    return new Response.redirect("/", 302);
  }


export async function onRequestPost(request) { //eslint-disable-line
    return new Response(`Hello world`);
  }