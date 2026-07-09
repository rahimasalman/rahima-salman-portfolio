export default defineNuxtConfig({
    $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/sitemap', '@nuxt/fonts', '@nuxtjs/i18n'],
    i18n: {
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        locales: [
            { code: 'en', name: 'English',      file: 'en.json' },
            { code: 'az', name: 'Azərbaycanca', file: 'az.json' },
            { code: 'ru', name: 'Русский',      file: 'ru.json' },
            { code: 'es', name: 'Español',      file: 'es.json' },
            { code: 'de', name: 'Deutsch',      file: 'de.json' },
        ],
    },
    css: ['~/assets/css/main.css'],
    site: {
        url: 'https://rahimasalman.netlify.app',
        name: 'Rahima Salman — Portfolio',
    },
    routeRules: {
        '/': {prerender: true},      // SSG (while build, static)
        // '/activity': {ssr: true},    // SSR (new on each request)
        // '/activity': {swr: 3600},      // 1 saat keş: köhnəni ver, arxada təzələ
        '/activity': {isr: 3600},      // 1 saat keş: CDN-də statik kimi saxla, N saniyədən sonra təzələ
        // '/activity': {isr: true},       // növbəti deploy-a qədər keş (tam statik kimi)
    }
})