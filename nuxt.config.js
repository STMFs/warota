export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Ogiri',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/firebase.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: "AIzaSyDQXlUHSYNUEWF8sI3t3mW2mpAAF19QUpk",
    //       authDomain: "ogiri-73674.firebaseapp.com",
    //       projectId: "ogiri-73674",
    //       storageBucket: "ogiri-73674.appspot.com",
    //       messagingSenderId: "608639623509",
    //       appId: "1:608639623509:web:9313811dfc12865423cfdc",
    //       measurementId: "G-1TXLB3Q70Z"
    //     },
    //     services: {
    //       auth: true, // Just as example. Can be any other service.
    //       firestore: true
    //     }
    //   }
    // ]
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
