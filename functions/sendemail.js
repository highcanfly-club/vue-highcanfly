//store these environment variables in Clouflare Pages UI
//MAILJET_API_KEY = '89c9b3b4be6f6bcc1e96f5b17401d1fc';
//MAILJET_API_PWD = '69168d2a48f80294f3ffd51241f14856';
//MAILJET_TO = 'your@email.com';
//HCAPTCHA_SECRET = 'yoursecret'

const hcaptcha_host = "hcaptcha.com";
const hcaptcha_path = "/siteverify";

function verifyHCaptcha(secret, token) {
  const rawResponse = fetch(`https://${hcaptcha_host}/${hcaptcha_path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `response=${token}&secret=${secret}`
  });
  return rawResponse;
}

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
  //const email = await Promise.resolve({                           // for testing without emailing
    body: JSON.stringify({
      "Messages": [
        {
          "From": {
            "Email": `${dest}`,
            "Name": `${dest}`
          },
          "To": [
            {
              "Email": `${dest}`,
              "Name": `${dest}`
            }
          ],
          "ReplyTo": 
              {
                "Email": `${fromemail}`,
              "Name": `${name}`
            },
          "Subject": `Contact formulaire web:${fromemail} `,
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
  let HCAPTCHA_SECRET = context.env.HCAPTCHA_SECRET;
  let response_code = { hCaptchaResponse: false, mailjetResponse: 'ERROR' };
  let reqBody = await readRequestBody(context.request);
  let params = reqBody; //JSON.parse(reqBody); //automatically parsed
  let hCaptchaSitekey = params.sitekey;
  let hCaptchaToken = params.token;
  let hCaptchaEkey = params.ekey;
  let name = params.name;
  let email = params.email;
  let message = params.message;
  let hCaptchaVerified = await verifyHCaptcha(HCAPTCHA_SECRET, hCaptchaToken);
  let hCaptchaResponse = await hCaptchaVerified.json();
  let hCaptchaSucess = hCaptchaResponse.success;

  let sendGridApi = { "statusText": "ERROR", "error-codes": "ERROR API" };
  if (hCaptchaSucess) {
    sendGridApi = await sendEmail({
      api_key: MAILJET_API_KEY,
      api_pwd: MAILJET_API_PWD,
      dest: MAILJET_TO,
      fromemail: email,
      name: name,
      message: message,
      redirect: getRedirectURL(context)
    });
  }
  console.log('NAME: ' + name + ' EMAIL: ' + email + ' MESAGE: ' + message + ' Sitekey: ' + hCaptchaSitekey + ' hCaptchaStatus: ' + hCaptchaSucess + ' API: ' + sendGridApi.statusText);
  response_code.hCaptchaResponse = hCaptchaSucess;
  response_code.mailjetResponse = sendGridApi.statusText;
  return new Response(JSON.stringify(response_code,null,2), {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  })
}