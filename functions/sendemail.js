//store these environment variables in Clouflare Pages UI
//MAILJET_API_KEY = '89c9b3b4be6f6bcc1e96f5b17371d1fc';
//MAILJET_API_PWD = '69168d2a48f80294f3ffd51241f14856';
//MAILJET_TO = 'your@email.com';

async function readRequestBody(request) {
    const { headers } = request
    const contentType = headers.get('content-type')
    if (contentType.includes('application/json')) {
        const body = await request.json()
        return body
    } else if (contentType.includes('form')) {
        const formData = await request.formData()
        let body = {}
        for (let entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return JSON.stringify(body)
        // return body;
    } else {
        let myBlob = await request.blob()
        var objectURL = URL.createObjectURL(myBlob)
        return objectURL
    }
}

async function sendEmail({ api_key, api_pwd, dest, fromemail, name, message, redirect }) {
    const MAILJET_API_KEY = api_key;
    const MAILJET_API_PWD = api_pwd;
    if (!dest) {
        return Response.redirect(redirect) // handle errors here
    }

    const email = await fetch('https://api.mailjet.com/v3.1/send', {
        body: JSON.stringify({
            "Messages": [
              {
                "From": {
                  "Email": "parapente@highcanfly.club",
                  "Name": "Ronan"
                },
                "To": [
                  {
                    "Email": "parapente@highcanfly.club",
                    "Name": "Ronan"
                  }
                ],
                "Subject": `Contact formulaire web:${fromemail} ` ,
                "TextPart": `NOM :  ${name} \nEMAIL = ${fromemail} \nMESSAGE : ${message}`,
                "HTMLPart": `NOM :  ${name} <br />EMAIL : ${fromemail} <br />MESSAGE : ${message}`,
                "CustomID": "AppGettingStartedTest"
              }
            ]
          }),
        headers: {
            'Authorization': `Basic ${btoa(MAILJET_API_KEY + ":" + MAILJET_API_PWD)}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    return email
}

let getRedirectURL = function (context) {
    let url = new URL(context.request.url);
    return url.protocol + url.hostname + ':' + url.port + '/';
}
/*
* All get return to index
* */
export async function onRequestGet(context) {
    return Response.redirect(getRedirectURL(context));

}


export async function onRequestPost(context) {
    let MAILJET_TO = context.env.MAILJET_TO;
    let MAILJET_API_KEY = context.env.MAILJET_API_KEY;
    let MAILJET_API_PWD = context.env.MAILJET_API_PWD;
    let reqBody = await readRequestBody(context.request);
    let params = JSON.parse(reqBody);
    let name = params.name;
    let email = params.email;
    let message = params.message;
    let sendGridApi = await sendEmail({
        api_key: MAILJET_API_KEY,
        api_pwd: MAILJET_API_PWD,
        dest: MAILJET_TO,
        fromemail: email,
        name: name,
        message: message,
        redirect: getRedirectURL(context)
    });

    return new Response('NAME: ' + name + '\nEMAIL: ' + email + '\nMESAGE: ' + message + '\n' + 'API: ' + sendGridApi.statusText);
}