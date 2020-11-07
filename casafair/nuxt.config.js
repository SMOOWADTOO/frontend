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
    { src: '~/plugins/scroller.js', mode: 'client' },
    '~plugins/buefy.js',
    '~plugins/vue-js-modal.js'
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
    '@nuxtjs/auth',
    'nuxt-stripe-module'
  ],
  stripe: {
    // version: 'v3',
    publishableKey: 'pk_test_IvYzdyvIdcwePrzqrp4JSKS800xyHThH0F',
  },
  axios: {
    baseURL: 'https://www.casafair.org/', // Used as fallback if no runtime config is provided
  },

  auth: {
    strategies: {
        local: {
            endpoints: {
                // DEV LOCAL
                // login: { url: 'http://localhost:7001/user/authentication', propertyName: 'token'},
                // user: { url: 'http://localhost:7001/user/profile/me', method: 'get', propertyName: '' },
                // logout: { url: 'http://localhost:7001/user/logout', method: 'get'},
                // DEV INSTANCE
                login: { url: 'https://www.casafair.org/api/user/authentication', propertyName: 'token'},
                user: { url: 'https://www.casafair.org/api/user/profile/me', method: 'get', propertyName: '' },
                logout: { url: 'https://www.casafair.org/api/user/logout', method: 'get'},
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
