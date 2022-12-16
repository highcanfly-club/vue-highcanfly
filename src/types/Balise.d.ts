/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
export interface Balise {
  idbalise: string;
  LUM: string;
  balise_type?: string;
  city?: string;
  date: string
  dateIso?: string;
  departement?: string;
  descri?: string;
  directVentInst: string
  directVentMoy: string
  eMailResp?: string;
  hydrometrie?: string
  latitude?: string;
  lienUtile?: string;
  longitude?: string;
  luminosite?: string;
  nomResp?: string;
  numTelResp?: string;
  photo?: string;
  pression?: string
  structure_id?: string;
  temperature: string;
  u_bat?: number;
  u_sol?: number;
  unitVent?: string;
  vhf_enabled?: string;
  vitesseVentMax: string
  vitesseVentMax: string;
  vitesseVentMin: string;
  vitesseVentMoy: string;
}
