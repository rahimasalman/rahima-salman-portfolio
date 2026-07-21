<template>
  <main>
    <!-- HERO -->
    <section class="hero reveal" @mousemove="onMove" @mouseleave="onLeave">
      <div class="hero__card" :style="{ transform: tilt }">
        <h1>Rahima Salman</h1>
        <p>{{ $t('hero.role') }}</p>
        <p>{{ $t('hero.tagline') }}</p>
        <div class="links">
          <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
          <a href="mailto:rahimasalman7@gmail.com">Email</a>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section class="reveal">
      <h2>{{ $t('experience.title') }}</h2>
      <article class="exp-card">
        <h3>{{ $t('experience.newmedia.title') }}</h3>
        <p>{{ $t('experience.newmedia.desc') }}</p>
      </article>
      <article class="exp-card">
        <h3>{{ $t('experience.adviad.title') }}</h3>
        <p>{{ $t('experience.adviad.desc') }}</p>
      </article>
    </section>

    <!-- PROJECTS -->
    <section class="reveal">
      <h2>{{ $t('projects.title') }}</h2>
      <p>{{ $t('projects.subtitle') }}</p>
      <article class="exp-card" v-for="project in featured" :key="project.slug">
        <div >
          <h3>{{ project.title }}</h3>
          <p>{{ $t('projects.items.' + project.slug + '.description') }}</p>
          <NuxtLink :to="localePath('/projects/' + project.slug)">{{ $t('projects.viewProject') }}</NuxtLink>
        </div>
      </article>
      <div class="projects__more">
        <NuxtLink :to="localePath('/projects')" class="view-all">
          {{ $t('projects.viewAll') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/activity')" class="view-live">
          {{ $t('experience.activityLink') }}
        </NuxtLink>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()

const localePath = useLocalePath()

const featured = projects.slice(0, 3)


useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
})

const tilt = ref('')
function onMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
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
.hero__card {
  background: var(--card);
  border-radius: 18px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  transition: transform .25s ease-out;
  transform-style: preserve-3d;
  will-change: transform;
}
.hero__card h1 { font-size: clamp(2.2rem, 7vw, 4rem); margin: 0 0 .5rem; }
.hero__card > p { color: var(--muted); font-size: clamp(1rem, 2.5vw, 1.2rem); margin: .25rem 0; }

@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .hero { perspective: 900px; }
}

.links { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 1.5rem; }
.links > a {
  padding: .5rem .9rem; border: 1px solid var(--ink); border-radius: 999px;
  text-decoration: none; font-size: .9rem; transition: background .2s, color .2s;
}
.links > a:hover { background: var(--ink); color: var(--bg); }

.exp-card {
  background: var(--card);
  border-radius: 14px;
  padding: clamp(1.25rem, 4vw, 2rem);
  box-shadow: 0 6px 20px rgba(0,0,0,.06);
  margin-block: 1rem;
}
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
.footer {
  margin-top: clamp(3rem, 10vh, 6rem);
  padding-block: 2rem;
  border-top: 1px solid rgba(0,0,0,.08);
  font-size: .85rem; color: var(--muted);
}
.footer a { color: var(--accent); text-decoration: none; }

.projects__more {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
  margin-top: 2rem;
}
.view-live {
  font-size: .85rem;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color .2s, border-color .2s;
}
.view-live:hover {
  color: var(--accent);
  border-color: var(--accent);
}

</style>
