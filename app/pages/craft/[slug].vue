<script setup lang="ts">
import {publishedCraft} from '~/data/craft'

const route = useRoute()
const entry = publishedCraft.find(c => c.slug === route.params.slug)

/* Olmayan (və ya hələ qaralama olan) slug → 404. `/projects/[slug]` ilə eyni qayda. */
if (!entry) {
  throw createError({statusCode: 404, fatal: true})
}

const {t} = useI18n()

/* ⚠️ getter (`() => …`) məcburidir: 404 halında `entry` undefined-dir və
   `watchEffect` obyektə toxunmazdan əvvəl atmalıdır (08-05-də `[slug].vue`-də tutulmuşdu). */
useSeoMeta({
  title: () => t('craft.items.' + entry!.slug + '.title') + ' — Rahima Salman',
  ogTitle: () => t('craft.items.' + entry!.slug + '.title') + ' — Rahima Salman',
  ogType: 'article',
})
</script>

<template>
  <main v-if="entry">
    <header class="page-head">
      <h1>{{ $t('craft.items.' + entry.slug + '.title') }}</h1>
      <p>{{ $t('craft.items.' + entry.slug + '.summary') }}</p>
    </header>

    <!-- Mətn i18n-dədir. Uzun mətn üçün açar `.body`-dir; formatlaşdırma lazım olanda
         bura MDC/markdown gətirilə bilər — indi skelet sadə saxlanılır. -->
    <p>{{ $t('craft.items.' + entry.slug + '.body') }}</p>
  </main>
</template>
