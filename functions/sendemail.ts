/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
// store these environment variables in Clouflare Pages UI
// MAILJET_API_KEY = '89c9b3b4be6f6bcc1e96f5b17401d1fc';
// MAILJET_API_PWD = '69168d2a48f80294f3ffd51241f14856';
// MAILJET_TO = 'your@email.com';
// HCAPTCHA_SECRET = 'yoursecret'
const hcaptchaHost = 'hcaptcha.com'
const hcaptchaPath = '/siteverify'

type HCaptchaVerifyError = string | string[]

export interface SendmailParams {
  name: string,
  email: string,
  message: string,
  sitekey: string,
  token: string,
  ekey?: string,
}

export type HCaptchaVerifyResponse = {
  success: boolean // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
  challenge_ts: string // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string // the hostname of the site where the challenge was solved
  credit?: boolean // optional: whether the response will be credited
  'error-codes'?: HCaptchaVerifyError // optional: any error codes
  score?: number // ENTERPRISE feature: a score denoting malicious activity.
  score_reason?: string[] // ENTERPRISE feature: reason(s) for score.
}

function verifyHCaptcha (secret:string, token:string) {
  const rawResponse = fetch(`https://${hcaptchaHost}/${hcaptchaPath}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `response=${token}&secret=${secret}`
  })
  return rawResponse
}

async function readRequestBody (request:Request) {
  const { headers } = request
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    const body = await request.json() as SendmailParams
    return body
  } else if (contentType.includes('form')) {
    const formData = await request.formData()
    const body = {} as SendmailParams
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return body
  }
}

async function sendEmail ({ apiKey, apiPwd, dest, fromemail, name, message, redirect }: {
  apiKey: string;
  apiPwd: string;
  dest: string;
  fromemail: string;
  name: string;
  message: string;
  redirect: string;
}) {
  const MAILJET_API_KEY = apiKey
  const MAILJET_API_PWD = apiPwd
  if (!dest) {
    return Response.redirect(redirect) // handle errors here
  }

  const email = await fetch('https://api.mailjet.com/v3.1/send', {
  // const email = await Promise.resolve({                           // for testing without emailing
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: `${dest}`,
            Name: `${dest}`
          },
          To: [
            {
              Email: `${dest}`,
              Name: `${dest}`
            }
          ],
          ReplyTo:
              {
                Email: `${fromemail}`,
                Name: `${name}`
              },
          Subject: `Contact formulaire web:${fromemail} `,
          TextPart: `NOM :  ${name} \nEMAIL = ${fromemail} \nMESSAGE : ${message}`,
          HTMLPart: `NOM :  ${name} <br />EMAIL : ${fromemail} <br />MESSAGE : ${message}`,
          CustomID: 'AppGettingStartedTest'
        }
      ]
    }),
    headers: {
      Authorization: `Basic ${btoa(MAILJET_API_KEY + ':' + MAILJET_API_PWD)}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  return email
}

const getRedirectURL = function (request:Request) {
  const url = new URL(request.url)
  return url.protocol + url.hostname + ':' + url.port + '/'
}
/*
* All get return to index
* */
export const onRequestGet:PagesFunction = async ({ request }) => {
  return Response.redirect(getRedirectURL(request))
}

export const onRequestPost: PagesFunction<{
  MAILJET_TO: string;
  MAILJET_API_KEY: string;
  MAILJET_API_PWD: string;
  HCAPTCHA_SECRET: string;
}> = async ({ request, env }) => {
  const MAILJET_TO = env.MAILJET_TO
  const MAILJET_API_KEY = env.MAILJET_API_KEY
  const MAILJET_API_PWD = env.MAILJET_API_PWD
  const HCAPTCHA_SECRET = env.HCAPTCHA_SECRET
  const responseCode = { hCaptchaResponse: false, mailjetResponse: 'ERROR' }
  const reqBody = await readRequestBody(request)
  const params = reqBody // JSON.parse(reqBody); //automatically parsed
  const hCaptchaSitekey = params.sitekey
  const hCaptchaToken = params.token
  // let hCaptchaEkey = params.ekey; //eslint-disable-line
  const name = params.name
  const email = params.email
  const message = params.message
  const hCaptchaVerified = await verifyHCaptcha(HCAPTCHA_SECRET, hCaptchaToken)
  const hCaptchaResponse = (await hCaptchaVerified.json()) as HCaptchaVerifyResponse
  const hCaptchaSucess = hCaptchaResponse.success

  let sendMailJetApi = { statusText: 'ERROR' } as Response
  if (hCaptchaSucess) {
    sendMailJetApi = await sendEmail({
      apiKey: MAILJET_API_KEY,
      apiPwd: MAILJET_API_PWD,
      dest: MAILJET_TO,
      fromemail: email,
      name,
      message,
      redirect: getRedirectURL(request)
    })
  }
  console.log('NAME: ' + name + ' EMAIL: ' + email + ' MESAGE: ' + message + ' Sitekey: ' + hCaptchaSitekey + ' hCaptchaStatus: ' + hCaptchaSucess + ' API: ' + sendMailJetApi.statusText)
  responseCode.hCaptchaResponse = hCaptchaSucess
  responseCode.mailjetResponse = sendMailJetApi.statusText
  return new Response(JSON.stringify(responseCode, null, 2), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
