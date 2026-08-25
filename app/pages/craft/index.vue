<script setup lang="ts">
import {publishedCraft} from '~/data/craft'

const localePath = useLocalePath()

/* ⚠️ Yazı yoxdursa SƏHİFƏ DƏ YOXDUR.
   Boş "Craft" səhifəsi iki dəfə zərərlidir: ziyarətçiyə yalançı vəd, Google-a "thin content".
   404 qaytarmaq onu həm indeksdən, həm nav-dan kənarda saxlayır (nav linki eyni şərtə bağlıdır). */
if (!publishedCraft.length) {
  throw createError({statusCode: 404, fatal: true})
}

/* "Craft" QƏSDƏN i18n-də deyil: meyar — *bu mətn dilə görə dəyişirmi?*
   Bölmənin adı termin/brend kimi işlənir (layihə adları, `Vue.js`, `SSR` ilə eyni qayda).
   Yazıların ÖZ başlığı və mətni isə i18n-dədir: `craft.items.<slug>.*`. */
useSeoMeta({
  title: 'Craft — Rahima Salman',
  ogTitle: 'Craft — Rahima Salman',
  ogType: 'website',
})
</script>

<template>
  <!-- ⚠️ <main> MƏCBURİDİR: `max-width`, `margin-inline: auto` və `--gutter`
       main.css-də `nav, main, footer` qaydasına bağlıdır (07-16 dərsi). -->
  <main>
    <header class="page-head">
      <h1>Craft</h1>
    </header>

    <article v-for="entry in publishedCraft" :key="entry.slug" class="exp-card">
      <h3>
        <NuxtLink :to="localePath('/craft/' + entry.slug)">
          {{ $t('craft.items.' + entry.slug + '.title') }}
        </NuxtLink>
      </h3>
      <p>{{ $t('craft.items.' + entry.slug + '.summary') }}</p>
    </article>
  </main>
</template>
