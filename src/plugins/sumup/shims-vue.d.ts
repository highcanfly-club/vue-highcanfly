/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Les Ailes du Mont-Blanc
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
*/

declare module "*.vue" {
  import type { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module '*.json?inline' {
  const value: any
  export default value
}
