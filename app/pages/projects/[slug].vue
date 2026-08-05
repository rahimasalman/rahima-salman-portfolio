<script setup lang="ts">
import {projects} from "~/data/projects";
const route = useRoute();

const selectedProject = computed(() =>
    projects.find(p => p.slug === route.params.slug)
)
// if (!selectedProject.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Project not found' })
// }

watchEffect(() => { if (!selectedProject.value) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true }) })

const {t} = useI18n()

/* SEO — 20 statik səhifə (4 layihə × 5 dil), hamısı başlıqsız idi.
   Layihə adı `data/projects.ts`-dən gəlir (xüsusi ad → tərcümə olunmur),
   təsvir isə i18n-dən (`projects.items.<slug>.description`) → dilə görə dəyişir.
   ⚠️ Getter (`() => …`) forması vacibdir: 404 halında `selectedProject` undefined-dir,
   həmçinin dil dəyişəndə başlıq özü yenilənməlidir. */
const description = () =>
    selectedProject.value ? t(`projects.items.${selectedProject.value.slug}.description`) : ''
const title = () => `${selectedProject.value?.title ?? ''} — Rahima Salman`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
})
</script>
<template>
  <div v-if="selectedProject">
    <p>{{ selectedProject.title }}</p>
    <p>{{ $t('projects.items.' + selectedProject.slug + '.description') }}</p>
    <p>Technologies: {{ selectedProject.tech.join(', ') }}</p>
    <a :href="selectedProject.link" target="_blank">View Project</a>
  </div>
</template>
