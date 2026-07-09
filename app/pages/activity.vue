<script setup lang="ts">
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