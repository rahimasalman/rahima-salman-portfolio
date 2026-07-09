<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/" class="nav__brand">Rahima</NuxtLink>
      <div class="nav__links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/activity">Projects</NuxtLink>
      </div>
    </nav>
    <slot />
  </div>
</template>

<style scoped>
.nav {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem; padding-block: 1.25rem;
}
.nav__brand { font-family: var(--font-display),sans-serif; font-size: 1.25rem; }
.nav__links { display: flex; gap: 1.25rem; font-size: .95rem; }
.nav__links a { text-decoration: none; padding-block: 2px; transition: color .2s; }
.nav__links a:hover,
.nav__links a.router-link-active { color: var(--accent); }
</style>