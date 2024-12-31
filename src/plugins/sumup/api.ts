/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import CryptoES from "@highcanfly/crypto-es";

const sumupApi = "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js";
const sumupScriptId = "sumupSdkV2";

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08`
 */
export type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Represent a string like `14:42:34.678`
 */
export type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours etc) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)
 */
export type TDateISO =
  | `${TDateISODate}T${TDateISOTime}Z`
  | `${TDateISODate}T${TDateISOTime}+${number}:${number}`;

export type SumupSecret = {
  application_type: "web";
  client_id: string;
  client_secret: string;
  id: string;
  name: string;
  redirect_uris: string[];
  bearerKey: string;
};

export type SumupCountry =
  | "AT"
  | "BE"
  | "BG"
  | "BR"
  | "CH"
  | "CL"
  | "CO"
  | "CY"
  | "CZ"
  | "DE"
  | "DK"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HR"
  | "HU"
  | "IE"
  | "IT"
  | "LT"
  | "LU"
  | "LV"
  | "MT"
  | "NL"
  | "NO"
  | "PL"
  | "PT"
  | "RO"
  | "SE"
  | "SI"
  | "SK"
  | "US";

export type SumupCurrency =
  | "EUR"
  | "BGN"
  | "BRL"
  | "CHF"
  | "CZK"
  | "DKK"
  | "GBP"
  | "HUF"
  | "NOK"
  | "PLN"
  | "SEK"
  | "USD";

export type SumupState =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

export type SumupLocale =
  | "bg-BG"
  | "cs-CZ"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "de-LU"
  | "el-CY"
  | "el-GR"
  | "en-GB"
  | "en-IE"
  | "en-MT"
  | "en-US"
  | "es-CL"
  | "es-ES"
  | "et-EE"
  | "fi-FI"
  | "fr-BE"
  | "fr-CH"
  | "fr-FR"
  | "fr-LU"
  | "hu-HU"
  | "it-CH"
  | "it-IT"
  | "lt-LT"
  | "lv-LV"
  | "nb-NO"
  | "nl-BE"
  | "nl-NL"
  | "pt-BR"
  | "pt-PT"
  | "pl-PL"
  | "sk-SK"
  | "sl-SI"
  | "sv-SE";

export type SumupPersonalDetails = {
  email: string;
  first_name: string;
  last_name: string;
  tax_id?: string;
  address?: SumupAddress;
};

export type SumupCheckoutRequest = {
  checkout_reference: string;
  amount: number;
  currency: SumupCurrency;
  merchant_code: string;
  pay_to_email?: string;
  description?: string;
  return_url?: string;
  customer_id?: string;
  redirect_url?: string;
  payment_type?: string;
  personal_details: SumupPersonalDetails;
};

export type SumupPaymentStatus =
  | "SUCCESSFUL"
  | "CANCELLED"
  | "PENDING"
  | "FAILED"
  | "PAID";

export type SumupCheckout = {
  checkout_reference: string;
  amount: number;
  currency: SumupCurrency;
  merchant_code: string;
  merchant_name?: string;
  pay_to_email?: string;
  description?: string;
  return_url?: string;
  id?: string;
  status: SumupPaymentStatus;
  payment_type?: string;
  customer_id?: string;
  date: TDateISO;
  valid_until?: TDateISO;
  mandate?: [];
  transactions: SumupTransaction[];
};
export type SumupCheckoutAccess = SumupCheckout & {
  access_token: string;
};

export type SumupCheckoutAccessSecured = SumupCheckout & {
  access_token_aes: string;
};

export type SumupAddress = {
  country: SumupCountry;
  city: string;
  line_1: string;
  state?: SumupState;
  postal_code: string;
};

export type SumupPaymentType =
  | "MOTO"
  | "CASH"
  | "CC_SIGNATURE"
  | "ELV"
  | "CC_CUSTOMER_ENTERED"
  | "MANUAL_ENTRY"
  | "EMV";

export type SumupTransaction = {
  id: string;
  transaction_code: string;
  amount: number;
  currency: SumupCurrency;
  timestamp: TDateISODate;
  status: SumupPaymentStatus;
  payment_type: "ECOM" | "RECURRING";
  installments_count: number;
  merchant_code: string;
  vat_amount: number;
  tip_amount: number;
  entry_mode: "CUSTOMER_ENTRY";
  auth_code: string;
  internal_id: number;
  product_summary: string;
  payouts_total: number;
  payouts_received: number;
  payout_plan:
    | "SINGLE_PAYMENT"
    | "TRUE_INSTALLMENT"
    | "ACCELERATED_INSTALLMENT";
  username: string;
  simple_payment_type: SumupPaymentType;
  verification_method:
    | "none"
    | "signature"
    | "offline pin"
    | "online pin"
    | "offline pin + signature"
    | "confirmation code verified";
  card: SumupCardInfo;
  local_time: TDateISODate;
  payout_type: string;
  products: [];
  vat_rates: null[];
  transaction_events: [];
  simple_status: string;
  links: [];
  events: [];
  location: { lat: number; lon: number; horizontal_accuracy: number };
  tax_enabled: boolean;
};

export type SumupCardInfo = {
  last_4_digits: string;
  type:
    | "AMEX"
    | "CUP"
    | "DINERS"
    | "DISCOVER"
    | "ELO"
    | "ELV"
    | "HIPERCARD"
    | "JCB"
    | "MAESTRO"
    | "MASTERCARD"
    | "VISA"
    | "VISA_ELECTRON"
    | "VISA_VPAY"
    | "UNKNOWN";
  cardholder_name?: string;
  expiry_month?: string;
  expiry_year?: string;
  token?: string;
};

export type SumupReceipt = {
  transaction_data: SumupTransaction & { receipt_no: string };
  merchant_data: {
    merchant_profile: {
      merchant_code: string;
      business_name: string;
      email: string;
      address: {
        address_line1: string;
        city: string;
        country: string;
        country_en_name: string;
        country_native_name: string;
        landline: string;
        post_code: string;
      };
      settings: [Object];
      legal_type: [Object];
      national_id: string;
    };
  };
  locale: string;
  emv_data: any;
  acquirer_data: {
    tid: string;
    return_code: string;
    local_time: TDateISO;
  };
};

export function getCheckout(
  amount: number,
  clientEmail: string,
  clientFirstName: string,
  clientLastName: string,
  sumupSecret: SumupSecret
): Promise<SumupCheckoutAccess> {
  // return fetch("https://api.sumup.com/v0.1/checkouts", config);
  return new Promise<SumupCheckoutAccess>((resolve, reject) => {
    getSumupMerchantToken(sumupSecret.client_id, sumupSecret.client_secret)
      .then((tokenAnswer) => {
        const checkoutRequest: SumupCheckoutRequest = {
          checkout_reference: crypto.randomUUID(),
          amount: amount,
          currency: "EUR",
          merchant_code: sumupSecret.id,
          personal_details: {
            email: `${clientEmail}`,
            first_name: `${clientFirstName}`,
            last_name: `${clientLastName}`,
          },
        };
        const config = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokenAnswer.access_token}`,
          },
          body: JSON.stringify(checkoutRequest),
        } as RequestInit;
        fetch("https://api.sumup.com/v0.1/checkouts", config)
          .then((value) => {
            value
              .json()
              .then((data) => {
                resolve({ ...data, access_token: tokenAnswer.access_token });
              })
              .catch((reason) => {
                //json()
                return `Error while parsing json response for creating a checkout ${reason}`;
              });
          })
          .catch((reason) => {
            //fetch
            return `Error while fetching for a checkout ${reason}`;
          });
      })
      .catch((reason) => {
        //getSumupMerchantToken
        reject(reason);
      });
  });
}

/**
 * try to load Sumup SDK, reject if not succeed in 5s
 * @returns void
 */
export function loadSumupSdk(): Promise<void> {
  const id = sumupScriptId;
  const src = sumupApi;
  return new Promise<void>((resolve, reject) => {
    if (
      typeof SumUpCard === "object" &&
      typeof SumUpCard.mount === "function"
    ) {
      console.log("Sumup SDK already loaded");
      resolve();
    } else {
      const timeoutId = setTimeout(() => {
        reject("timeout");
      }, 5000);
      const script = !!document.querySelector(`#${id}`)
        ? (document.querySelector(`#${id}`) as HTMLScriptElement)
        : (document.createElement("script") as HTMLScriptElement);
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", src);
      script.setAttribute("id", id);
      document.head.appendChild(script);
      script.addEventListener("load", function () {
        clearTimeout(timeoutId);
        resolve();
      });
    }
  });
}

function urlEncode(request: { [index: string]: string }) {
  const formBody = [] as string[];
  for (const property in request) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(request[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

type TokenAnswer = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

/**
 * Test if 'payments' is included in the scopes
 * @param scopes the retrieved scopes 'scope1 scope2  …"
 * @returns true if contains 'payment'
 */
function hasPayementsScope(scopes: string): boolean {
  return scopes.includes("payments");
}

export function getSumupMerchantToken(clientId: string, clientSecret: string) {
  const request = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope:
      "user.payout-settings user.app-settings transactions.history user.profile_readonly payments", //user.app-settings transactions.history user.profile_readonly
    //payments transactions.history user.app-settings user.profile_readonly
  };
  const urlEncoded = urlEncode(request);
  return new Promise<TokenAnswer>((resolve, reject) => {
    fetch("https://api.sumup.com/token", {
      method: "POST",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request), //urlEncoded,
    })
      .then((value) => {
        value.json().then((data) => {
          console.debug(data);
          if (!hasPayementsScope(data.scope)) {
            {
              reject("No 'payments' scope, please ask SumUp for it");
            }
          }
          resolve(data as TokenAnswer);
        });
      })
      .catch((reason) => {
        return `Error parsing json while retrieving a access token: ${reason}`;
      });
  });
}

export function isValidEmailAddress(emailAddress: string) {
  const pattern = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  const _r = pattern.test(emailAddress);
  return _r;
}

export function getCheckoutFromCheckoutAccess(
  checkoutAccess: SumupCheckoutAccess
): SumupCheckout {
  const { access_token, ...checkout } = checkoutAccess;
  return checkout;
}

export function getCheckoutSecured(
  checkoutAccess: SumupCheckoutAccess,
  aesPassword: string
): SumupCheckoutAccessSecured {
  const { access_token, ...checkout } = checkoutAccess;
  const encrypted = CryptoES.AES.encrypt(
    checkoutAccess.access_token,
    aesPassword + checkoutAccess.checkout_reference
  );
  return { ...checkout, access_token_aes: encrypted.toString() };
}

export function getAcessTokenFromSecured(
  encrypted: string,
  aesPassword: string,
  checkout_reference: string
): string {
  const decrypted = CryptoES.AES.decrypt(
    encrypted,
    aesPassword + checkout_reference
  );
  return decrypted.toString(CryptoES.enc.Utf8);
}

export function getReceipt(
  accessToken: string,
  transactionID: string,
  merchantId: string
) {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  } as RequestInit;
  return new Promise((resolve) => {
    const rURL = `https://api.sumup.com/v1.0/receipts/${transactionID}?mid=${merchantId}`;
    console.log(rURL);
    fetch(rURL, config).then((value) => {
      value.json().then((data) => {
        resolve(data);
      });
    });
  });
}

export const SumupPaymentStatusFR =
{ "SUCCESSFUL": "Paiement réussi",
 "CANCELLED" : "Paiement annulé",
 "PENDING" : "Paiement en attente",
 "FAILED" : "Paiement echoué",
 "PAID" : "Payé"};