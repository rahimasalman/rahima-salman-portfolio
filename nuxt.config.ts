import {publishedCraft} from './app/data/craft'

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
            // Nuxt default loqosu əvəzinə öz monoqram: saytın tokenləri + temaya görə özü uyğunlaşır
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
        baseUrl: 'https://rahimasalman.netlify.app',   // hreflang/canonical MÜTLƏQ URL tələb edir
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        // ⚠️ `language` (BCP47) MƏCBURİDİR — <html lang> və hreflang məhz ondan yaranır.
        // O olmadan useLocaleHead yalnız `dir` verir, alternativ linklər ümumiyyətlə yaranmır.
        locales: [
            { code: 'en', name: 'English',      file: 'en.json', language: 'en' },
            { code: 'az', name: 'Azərbaycanca', file: 'az.json', language: 'az' },
            { code: 'ru', name: 'Русский',      file: 'ru.json', language: 'ru' },
            { code: 'es', name: 'Español',      file: 'es.json', language: 'es' },
            { code: 'de', name: 'Deutsch',      file: 'de.json', language: 'de' },
        ],
    },
    css: ['~/assets/css/main.css'],
    /* 🔴 `@nuxtjs/sitemap` URL-ləri `pages/` qovluğundan ÖZÜ toplayır — nav-da link olub-olmaması onu maraqlandırmır.
       Nəticə: yazı yoxdurkən `/craft` sitemap-a düşürdü, halbuki səhifə 404 verir →
       Google-a "bu ünvanı indeksləyin" deyib 404 göstərmək = GSC-də "Submitted URL not found" xətası.
       (Eyni kök səbəb build-i də sındırmışdı: səhifə faylının MÖVCUDLUĞU marşrutu doğurur.)
       Şərt burada da özü-özünü ləğv edir: ilk yazı `published` olan kimi istisna yox olur. */
    sitemap: {
        exclude: publishedCraft.length ? [] : ['/craft', '/*/craft'],
    },
    site: {
        url: 'https://rahimasalman.netlify.app',
        name: 'Rahima Salman — Portfolio',
    },
    nitro: {
        prerender: {
            // ⚠️ routeRules-dakı `prerender: true` marşrut YARATMIR — yalnız "bu yol statik ola bilər" deyir.
            // Glob (`/projects/**`) və dil prefiksləri (`/az`, `/ru`, …) heç yerdə siyahılanmadığı üçün
            // Nitro onların mövcudluğunu bilmirdi → build cəmi 2 HTML çıxarırdı (`/` və `/projects`).
            // Crawler `/`-dan başlayıb linkləri gəzir: dil menyusu → 5 dil, projects → 4 slug (× 5 dil).
            crawlLinks: true,
            ignore: [
                // `/activity` GitHub API-dən asılıdır → statikləşməməlidir, ISR qalır.
                // Regex lazımdır, çünki crawler dil variantlarını da tapır: /az/activity, /ru/activity …
                /\/activity$/,
                // ⚠️ Crawler `/sitemap.xml`-i də gəzdi və onu `sitemap.xml/index.html` kimi yazdı.
                // Netlify statik faylı server marşrutundan ƏVVƏL verir → Google sitemap əvəzinə
                // meta-refresh HTML-i alardı (sitemap üçün meta-refresh izlənmir) = sitemap sınardı.
                // Sitemap @nuxtjs/sitemap tərəfindən dinamik verilir, prerender olunmamalıdır.
                /\.xml$/,
                /* `/craft` HƏLƏ YAZI YOXDURKƏN prerender növbəsindən çıxarılır.
                   🔑 Tapıntı (08-25): səhifə faylı `pages/`-də mövcud olan kimi Nitro onu
                   prerender növbəsinə SALIR — nav linki gizli olsa da. Səhifə boş siyahıda
                   qəsdən 404 verdiyi üçün build 5 dildə `[404] Server Error` ilə sınırdı.
                   ⚠️ Bu ignore ÖZÜ-ÖZÜNÜ ləğv edir: ilk case-study `published: true` olan kimi
                   şərt `false` olur, ignore yox olur və crawler səhifəni normal tapır.
                   (Ona görə əl ilə silinməli "gizli açar" qalmır.) */
                ...(publishedCraft.length ? [] : [/\/craft$/]),
            ],
        },
    },
    routeRules: {
        '/': {prerender: true},      // SSG (while build, static)
        // '/activity': {ssr: true},    // SSR (new on each request)
        // '/activity': {swr: 3600},      // 1 saat keş: köhnəni ver, arxada təzələ
        '/activity': {isr: 3600},      // 1 saat keş: CDN-də statik kimi saxla, N saniyədən sonra təzələ
        // '/activity': {isr: true},       // növbəti deploy-a qədər keş (tam statik kimi)
        '/projects': { prerender: true },
        '/projects/**': { prerender: true },
        /* `/craft` üçün QƏSDƏN routeRules YOXDUR — və bu, 08-05 qaydasının incə düzəlişidir:
           🔑 `prerender: true` **konkret yol** üçün marşrutu NÖVBƏYƏ SALIR (yaradır),
              **glob** (`/projects/**`) üçün isə yalnız icazədir, kəşf etmir.
           Yəni `'/craft': { prerender: true }` yazan kimi Nitro boş (404 verən) səhifəni
           prerender etməyə çalışdı və **build sındı** (5 dil × [404] Server Error).
           Düzgün yol: yazı `published` olan kimi nav linki görünür və `crawlLinks: true`
           həm `/craft`-i, həm slug səhifələrini özü tapır — əlavə qayda lazım deyil. */
    }
})
