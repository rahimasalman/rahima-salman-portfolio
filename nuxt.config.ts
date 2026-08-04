export default defineNuxtConfig({
    $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/sitemap', '@nuxt/fonts', '@nuxtjs/i18n'],
    fonts: {
        families: [
            // Yalnız FAKTİKİ istifadə olunan kəsimlər — hər çəki ayrı fayldır.
            // Fraunces:      400 = .nav__brand · 600 = h1/h2/h3 + .hero__name
            // Space Grotesk: 300 = hero tagline · 400 = body · 500 = bölmə h2 + aktiv dil
            { name: 'Fraunces', weights: [400, 600] },
            { name: 'Space Grotesk', weights: [300, 400, 500] },
        ],
    },
    app: {
        head: {
            // SSG-də HTML build-də statikdir → server istifadəçinin temasını bilmir.
            // Bu inline skript səhifə BOYANMADAN əvvəl işləyir və flash-ı (ağ/qara sıçrayış) aradan qaldırır:
            // localStorage-dakı seçim → yoxdursa sistem seçimi (prefers-color-scheme).
            htmlAttrs: { 'data-theme': 'light' },   // SSR/prerender üçün default; skript client-də üstündən yazır
            script: [
                {
                    innerHTML:
                        '!function(){try{var t=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}}();',
                    tagPosition: 'head',
                },
            ],
        },
    },
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
        '/projects': { prerender: true },
        '/projects/**': { prerender: true },
    }
})
