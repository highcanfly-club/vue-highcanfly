import type { Auth0Instance } from "./plugins/auth0";
import type {SanityConf} from '@/plugins/auth0/sanityStore';

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth0: Auth0Instance;
    $sanityConf: SanityConf;
  }
}

export {}