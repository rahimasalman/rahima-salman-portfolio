/* MAILTO obfuskasiyası — ünvan STATİK HTML-də OLMASIN.
   Problem (08-16-da dəqiqləşdirildi): ikon spamdan qorumur — bot səhifənin GÖRÜNƏN mətnini yox,
   HTML-in özünü oxuyur, `href="mailto:…"` isə orada açıq qalırdı.

   Həll: href server render-ində BOŞDUR, yalnız hydration-dan sonra (brauzerdə) qurulur.
   `ref('')` → SSR və client-in İLK render-i eynidir, ona görə hydration mismatch YOXDUR;
   dəyər `onMounted`-də dəyişir, bu isə adi reaktiv yeniləmədir.

   Ünvan mənbədə də bütöv sətir kimi yazılmır (`join`) — bundle-a `hello.rahimasalman@gmail.com`
   şəklində düşməsin ki, sadə regex ilə tarayan skript onu tapmasın.

   ⚠️ Qiyməti (şüurlu güzəşt): JS söndürülübsə link işləmir və ünvan heç yerdə görünmür.
   Ona görə hero-da GitHub/LinkedIn linkləri qalır — əlaqə yolu tək deyil. */
const USER = ['hello', 'rahimasalman'].join('.')
const DOMAIN = ['gmail', 'com'].join('.')

export function useMailto() {
    const href = ref('')
    const address = ref('')

    onMounted(() => {
        address.value = `${USER}@${DOMAIN}`
        href.value = `mailto:${address.value}`
    })

    return {href, address}
}
