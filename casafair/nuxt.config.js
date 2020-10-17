export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Casafair',
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
    { src: '~/plugins/helpers' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  auth: {
    strategies: {
        local: {
            endpoints: {
                // DEV LOCAL
                // login: { url: 'http://localhost:7001/user/authenticate', propertyName: 'token'},
                // user: { url: 'http://localhost:7001/user/get/me', method: 'get', propertyName: '' },
                // logout: { url: 'http://localhost:7001/user/logout', method: 'get'},
            },
            tokenType: 'bearer',
        }
    },
    redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: false
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
