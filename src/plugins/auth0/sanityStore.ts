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
  ((window as any).app.config.globalProperties.$sanityConf as SanityConf) = { ...sanityConfDist };
  ((window as any).app.config.globalProperties.$sanityConf as SanityConf).preview = false
}
