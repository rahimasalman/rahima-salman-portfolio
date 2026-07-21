<script setup lang="ts">
import {projects} from "~/data/projects";
</script>
<template>
<div  v-for="project in projects" :key="project.slug">
  <p> {{project.title}} </p>
  <p> {{project.description}} </p>
  <p> Technologies: {{project.tech.join(', ')}} </p>
  <NuxtLink :to="localePath('/projects/' + project.slug)">View Project</NuxtLink>
</div>
</template>
