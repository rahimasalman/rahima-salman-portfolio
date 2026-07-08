<template>
  <main>
    <!-- HERO -->
    <section>
      <h1>Rahima Salmanova</h1>
      <p>Frontend Developer — Vue.js / Nuxt · ~5 il · reklam platformaları (ads-tech)</p>
      <p><!-- 1-2 cümlə tagline: sən kimsən, nədə güclüsən --></p>
      <div>
        <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
        <a href="mailto:rahimasalman7@gmail.com">Email</a>
      </div>
    </section>

    <!-- TƏCRÜBƏ -->
    <section>
      <h2>Təcrübə</h2>
      <article>
        <h3>New Media Azerbaijan — Frontend Developer</h3>
        <p><!-- TS Vue/Nuxt ads platform, +30% revenue, modullar... --></p>
      </article>
      <article>
        <h3>Adviad — Frontend Developer</h3>
        <p><!-- cross-channel ads platform, +45% revenue... --></p>
      </article>
      <p><NuxtLink to="/activity">Canlı GitHub layihələrim →</NuxtLink></p>
    </section>
  </main>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Rahima Salmanova — Frontend Developer',
  description: 'Frontend developer with ~5 years building Vue.js & Nuxt applications, specialized in advertising platforms. Open to frontend/senior roles — Baku & remote',
  ogTitle: 'Rahima Salmanova — Frontend Developer',
  ogDescription: 'Frontend developer with ~5 years building Vue.js & Nuxt applications, specialized in advertising platforms. Open to frontend/senior roles — Baku & remote',
  ogType: 'website',
})
</script>