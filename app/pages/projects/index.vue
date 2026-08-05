<script setup lang="ts">
import {projects} from "~/data/projects";
const localePath = useLocalePath()
const {t} = useI18n()

/* SEO — bu səhifə prerender olunur, yəni Google onu statik sənəd kimi indeksləyir.
   Öz <title>-ı olmasa 5 dilin hamısında BAŞLIQSIZ görünürdü.
   Mətn uydurulmayıb: mövcud i18n açarları təkrar istifadə olunur.
   Ad tərcümə olunmur (hero-dakı eyni qərar) → "Rahima Salman" sabit qalır. */
useSeoMeta({
  title: () => `${t('projects.title')} — Rahima Salman`,
  description: () => t('projects.subtitle'),
  ogTitle: () => `${t('projects.title')} — Rahima Salman`,
  ogDescription: () => t('projects.subtitle'),
  ogType: 'website',
})
</script>
<template>
<div  v-for="project in projects" :key="project.slug">
  <p> {{project.title}} </p>
  <p> Technologies: {{project.tech.join(', ')}} </p>
  <NuxtLink :to="localePath('/projects/' + project.slug)">View Project</NuxtLink>
</div>
</template>
