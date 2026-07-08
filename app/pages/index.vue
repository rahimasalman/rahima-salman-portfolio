<template>
  <main>
    <!-- HERO -->
    <section class="hero" @mousemove="onMove" @mouseleave="onLeave">
      <div class="hero__card" :style="{ transform: tilt }">
      <h1>Rahima Salmanova</h1>
      <p>Frontend Developer — Vue.js / Nuxt · ~5 il · reklam platformaları (ads-tech)</p>
      <p><!-- 1-2 cümlə tagline: sən kimsən, nədə güclüsən --></p>
      <div class="links">
        <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
        <a href="mailto:rahimasalman7@gmail.com">Email</a>
      </div>
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

const tilt = ref('')
function onMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5   // -0.5 .. 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  tilt.value = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`
}
function onLeave() { tilt.value = 'rotateY(0deg) rotateX(0deg)' }
</script>

<style scoped>
/* BAZA (mobil): sadə, statik, depth üçün yüngül kölgə */
.hero__card {
  background: var(--card);
  border-radius: 18px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  transition: transform .25s ease-out;
  transform-style: preserve-3d;
  will-change: transform;
}

/* GÜCLƏNDİRMƏ (desktop + mouse): 3D perspektiv */
@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .hero { perspective: 900px; }
}
.links > a{
  padding:4px;
}
</style>