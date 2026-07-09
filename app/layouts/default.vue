<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/" class="nav__brand">Rahima</NuxtLink>
      <div class="nav__right">
        <div class="nav__links">
          <NuxtLink to="/">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink to="/activity">{{ $t('nav.projects') }}</NuxtLink>
        </div>
        <div class="lang">
          <NuxtLink
              v-for="l in locales" :key="l.code"
              :to="switchLocalePath(l.code)"
              class="lang__item"
              :class="{ 'is-active': l.code === locale }"
          >{{ l.code.toUpperCase() }}</NuxtLink>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<style scoped>
.nav { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-block: 1.25rem; }
.nav__brand { font-family: var(--font-display), sans-serif; font-size: 1.25rem; }
.nav__right { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
.nav__links { display: flex; gap: 1.25rem; font-size: .95rem; }
.nav__links a { text-decoration: none; transition: color .2s; }
.nav__links a:hover, .nav__links a.router-link-active { color: var(--accent); }
.lang { display: flex; gap: .4rem; }
.lang__item { text-decoration: none; font-size: .72rem; letter-spacing: .05em; opacity: .5; transition: opacity .2s, color .2s; }
.lang__item:hover { opacity: 1; }
.lang__item.is-active { opacity: 1; color: var(--accent); }
</style>