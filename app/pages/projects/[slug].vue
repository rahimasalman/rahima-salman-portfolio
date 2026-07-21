<script setup lang="ts">
import {projects} from "~/data/projects";
const route = useRoute();
const selectedProject = projects.find((project) => project.slug === route.params.slug)
if (!selectedProject) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>
<template>
  <div>
    <p> {{selectedProject.title}} </p>
    <p>{{ $t('projects.items.' + selectedProject.slug + '.description') }}</p>
    <p> Technologies: {{selectedProject.tech.join(', ')}} </p>
    <a  :href="selectedProject.link" target="_blank">View Project</a>
  </div>
</template>
