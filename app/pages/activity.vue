<script setup lang="ts">
const {t} = useI18n()

/* SEO — bu səhifə sitemap-dadır (`__sitemap__/<locale>.xml`) və indi nav-dan da linklidir,
   yəni Google onu ziyarət edir. Buna baxmayaraq <title> BOŞ idi: 08-05-də /projects-in
   başlıqsızlığı düzəldildi, amma /activity prerender siyahısından kənarda olduğu üçün
   həmin təmizlikdən də kənarda qalmışdı — "orfan səhifə" probleminin ikinci üzü.
   Mətn uydurulmadı: mövcud `activity.title` açarı işlədilir, ad tərcümə olunmur (hero qərarı).
   ⏭️ `description` QƏSDƏN yoxdur — hazır açar yoxdur, yenisi 5 dildə MƏZMUN qərarıdır. */
useSeoMeta({
  title: () => t('activity.title') + ' — Rahima Salman',
  ogTitle: () => t('activity.title') + ' — Rahima Salman',
  ogType: 'website',
})

const { data: repos, pending, error } = await useFetch(
    'https://api.github.com/users/rahimasalman/repos',
    { query: { sort: 'updated', per_page: 6 } }
)
</script>

<template>
  <main>
    <h1>{{ $t('activity.title') }}</h1>
    <p v-if="pending">{{ $t('activity.loading') }}</p>
    <p v-else-if="error">{{ $t('activity.error') }}</p>
    <ul v-else>
      <li v-for="repo in repos" :key="repo.id">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        <span v-if="repo.description"> — {{ repo.description }}</span>
      </li>
    </ul>
  </main>
</template>
