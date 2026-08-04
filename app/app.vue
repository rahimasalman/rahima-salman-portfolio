<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
/* i18n SEO — bütün səhifələr üçün <html lang>, canonical və hreflang alternativləri.
   `useLocaleHead` 5 dilin hər biri üçün <link rel="alternate" hreflang="…"> + x-default yaradır.
   ⚠️ Mütləq (absolute) URL tələb olunur → `nuxt.config.ts` → `i18n.baseUrl`. */
const localeHead = useLocaleHead({ dir: true, lang: true, seo: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>
