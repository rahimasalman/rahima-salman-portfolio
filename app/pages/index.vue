<template>
  <main>
    <!-- HERO -->
    <section class="hero">
      <p class="hero__kicker">{{ $t('hero.role') }}</p>
      <h1 class="hero__name"><span>Rahima</span><span>Salman</span></h1>
      <p class="hero__tagline">{{ $t('hero.tagline') }}</p>
      <div class="hero__links">
        <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
        <a href="mailto:rahimasalman7@gmail.com">Email</a>
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
        <div>
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
import {projects} from '~/data/projects'

const {t} = useI18n()

const localePath = useLocalePath()

const featured = projects.slice(0, 3)

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
})

onMounted(() => {
  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target)
      }
    })
  }, {threshold: 0.15})
  els.forEach(el => io.observe(el))
})
</script>

<style scoped>
/* ==========================================================
   HERO — baza (mobil). Media query-siz yazılan = mobil.
   ========================================================== */
.hero {
  display: grid;
  align-content: start;           /* mobil: mərkəzləmə YOX — nav+padding üstdədir, mərkəz aşağı sürüşür */

}

/* şaquli ritm: brauzerin defaultunu öldür, sonra fərdi boşluq ver */
.hero > * {
  margin: 0;
  animation: rise .6s ease-out backwards;
  animation-delay: calc(var(--i, 0) * 90ms);
}
.hero > * + * { margin-block-start: var(--flow, 2rem); }

.hero__kicker {
  --i: 0;
  font-size: clamp(.75rem, .72rem + .15vw, .85rem);
  letter-spacing: .04em;
  color: var(--muted);
}

.hero__name {
  --i: 1;
  --flow: .75rem;                              /* kicker-ə SIX — bir blok kimi oxunurlar */
  font-size: clamp(3rem, 1rem + 9vw, 8rem);
  font-weight: 800;                            /* qlobal h1-in 600-ünü üstələyir */
  line-height: 0.88;                           /* böyük şriftdə sətirlər sıxılır */
  letter-spacing: -0.035em;                    /* böyük şriftdə hərflər sıxılır */
}

.hero__name span { display: block; }           /* addım 3: iki sətir = sıx blok */

.hero__tagline {
  --i: 2;
  --flow: clamp(2rem, 5vh, 4rem);              /* GENİŞ — fikir dəyişir, nəfəs lazımdır */
  font-weight: 300;                            /* 800 vs 300 = çəki kontrastı */
  font-size: clamp(1.05rem, 1rem + .35vw, 1.35rem);
  line-height: 1.5;
  max-width: 34ch;                             /* dar sütun — ad geniş, bu dar = forma kontrastı */
  text-wrap: balance;
}

.hero__links {
  --i: 3;
  display: flex;                               /* addım 4: məsafəni HTML boşluğu yox, gap idarə edir */
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: .9rem;
}

.hero__links a {
  text-decoration-thickness: 1px;              /* editorial: nazik altxətt, pill YOX */
  text-underline-offset: .3em;
  transition: color .2s;
}

.hero__links a:hover { color: var(--accent); } /* addım 5: hero-dakı YEGANƏ aksent */

@keyframes rise {
  from { opacity: 0; transform: translateY(12px); }
}

/* ==========================================================
   HERO — 768px+. Burada YALNIZ ekran enindən asılı olanlar.
   ========================================================== */
@media (min-width: 768px) {
  .hero {
    grid-template-columns: repeat(12, 1fr);
    column-gap: clamp(1rem, 3vw, 2rem);
    align-content: center;        /* geniş ekranda şaquli yer boldur → sətir dəstini birlikdə mərkəzə yığ */
    min-height: min(60svh, 800px);  /* small viewport height */
  }
  .hero__kicker  { grid-column: 1/8; }
  .hero__name    { grid-column: 1/11; }
  .hero__tagline { grid-column: 6/12; }        /* sağa sürüşür → diaqonal */
  .hero__links   { grid-column: 1/8; }
}

:root[data-theme="light"] .hero__name { font-weight: 700; }
/** :root[data-theme="light"] .hero__name { color: color-mix(in oklab, var(--ink) 88%, var(--bg)); } */

/* ==========================================================
   Qalan bölmələr
   ========================================================== */

.hero + section { margin-block-start: clamp(3rem, 12vh, 6rem); }

.exp-card {
  padding-block: clamp(1.5rem, 4vw, 2.25rem);
  border-block-start: 1px solid var(--border);
  margin-block: 0;
}

@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
  .exp-card {
    transition: transform .25s ease, box-shadow .25s ease;
    transform-style: preserve-3d;
  }

  .exp-card:hover {
    transform: translateY(-6px) rotateX(4deg);
    box-shadow: 0 18px 40px rgba(0, 0, 0, .12);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

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
