/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import * as sanityConfDist from '@/config/sanity-conf.json'

export enum HIGHCANFLY_DATASET{
    development='development',
    production='production'
}
export interface SanityConf {
    projectId: string;
    dataset: string;
    apiVersion: string;
    useCdn: boolean;
    preview?: boolean;
    token?: string;
}

export const sanityConf:SanityConf = { ...sanityConfDist }

export const resetSanityConfToDefaults = () => {
  // (window.app.config.globalProperties.$sanityConf as SanityConf) = { ...sanityConfDist };
  // (window.app.config.globalProperties.$sanityConf as SanityConf).preview = false
}
