export default defineNuxtConfig({
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: 'https://rahimasalman.netlify.app',
    name: 'Rahima Salman — Portfolio',
  },
  routeRules: {
    '/': { prerender: true },      // SSG (while build, static)
    '/activity': { ssr: true },    // SSR (new on each request)
  }
})