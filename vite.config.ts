/*!
=========================================================
* © 2022 Ronan LE MEILLAT for HighCanFly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

//await import('./prepare-env')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './node_modules'),
      '§': path.resolve(__dirname, './'),
    },
  },
  optimizeDeps: { include: [ 'lodash.throttle', 'lodash.orderby' ] },
  // build:{
  //   rollupOptions:{
  //     plugins:[
  //       {
  //       transform ( code, id ) {
  //         console.log( id );
  //         console.log( code );
  //       }
  //     } as any,]
  //   }
  // }
})
