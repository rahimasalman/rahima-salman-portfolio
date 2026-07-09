<template>
  <main>
    <!-- HERO -->
    <section class="hero reveal" @mousemove="onMove" @mouseleave="onLeave">
      <div class="hero__card" :style="{ transform: tilt }">
      <h1>Rahima Salmanova</h1>
      <p>Frontend Developer — Vue.js / Nuxt · ~5 il · reklam platformaları (ads-tech)</p>
<!--        TODO: Add a brief tagline -->
      <p><!-- 1-2 cümlə tagline: sən kimsən, nədə güclüsən --></p>
      <div class="links">
        <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
        <a href="mailto:rahimasalman7@gmail.com">Email</a>
      </div>
      </div>
    </section>

    <!-- TƏCRÜBƏ -->
    <section class="reveal">
      <h2>Təcrübə</h2>
      <article class="exp-card">
        <h3>New Media Azerbaijan — Frontend Developer</h3>
<!--        TODO: Add a brief description of your role and responsibilities -->
        <p><!-- TS Vue/Nuxt ads platform, +30% revenue, modullar... --></p>
      </article>
      <article class="exp-card">
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

onMounted(() => {
  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
  }, { threshold: 0.15 })
  els.forEach(el => io.observe(el))
})
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
/* BAZA (mobil): təmiz kart, depth üçün kölgə */
.exp-card {
  background: var(--card);
  border-radius: 14px;
  padding: clamp(1.25rem, 4vw, 2rem);
  box-shadow: 0 6px 20px rgba(0,0,0,.06);
  margin-block: 1rem;
}
/* GÜCLƏNDİRMƏ (desktop + mouse): hover-da yüngül qalxma + əyilmə */
@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .exp-card {
    transition: transform .25s ease, box-shadow .25s ease;
    transform-style: preserve-3d;
  }
  .exp-card:hover {
    transform: translateY(-6px) rotateX(4deg);
    box-shadow: 0 18px 40px rgba(0,0,0,.12);
  }
}
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

.hero__card h1 { font-size: clamp(2.2rem, 7vw, 4rem); margin: 0 0 .5rem; }
.hero__card > p { color: var(--muted); font-size: clamp(1rem, 2.5vw, 1.2rem); margin: .25rem 0; }

.links { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 1.5rem; }
.links > a {
  padding: .5rem .9rem; border: 1px solid var(--ink); border-radius: 999px;
  text-decoration: none; font-size: .9rem; transition: background .2s, color .2s;
}
.links > a:hover { background: var(--ink); color: var(--bg); }
</style>