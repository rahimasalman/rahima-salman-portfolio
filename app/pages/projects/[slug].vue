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
</script>
<template>
  <div v-if="selectedProject">
    <p>{{ selectedProject.title }}</p>
    <p>{{ $t('projects.items.' + selectedProject.slug + '.description') }}</p>
    <p>Technologies: {{ selectedProject.tech.join(', ') }}</p>
    <a :href="selectedProject.link" target="_blank">View Project</a>
  </div>
</template>
