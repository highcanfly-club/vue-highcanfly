const MAILGUN_API_KEY = '89c9b3b4be6f6bcc1e96f5b17371d1fc';
const MAILGUN_API_PWD = '69168d2a48f80294f3ffd51241f14856';
const MAILGUN_TO = 'parapente@highcanfly.club';

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

/*
curl -s \
            -X POST \
            --user "89c9b3b4be6f6bcc1e96f5b17371d1fc:69168d2a48f80294f3ffd51241f14856" \
            https://api.mailjet.com/v3.1/send \
            -H 'Content-Type: application/json' \
            -d '{
            "Messages":[
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
                "Subject": "My first Mailjet email",
                "TextPart": "Greetings from Mailjet.",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
                }
            ]
            }'
*/

async function sendEmail({ dest, fromemail, name, message, redirect }) {
    if (!dest) {
        return Response.redirect(url) // handle errors here
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
            'Authorization': `Basic ${btoa(MAILGUN_API_KEY + ":" + MAILGUN_API_PWD)}`,
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
    let reqBody = await readRequestBody(context.request);
    let params = JSON.parse(reqBody);
    let name = params.name;
    let email = params.email;
    let message = params.message;
    let sendGridApi = await sendEmail({
        dest: MAILGUN_TO,
        fromemail: email,
        name: name,
        message: message,
        redirect: getRedirectURL(context)
    });

    return new Response('NAME: ' + name + '\nEMAIL: ' + email + '\nMESAGE: ' + message + '\n' + 'API: ' + sendGridApi.statusText);
}