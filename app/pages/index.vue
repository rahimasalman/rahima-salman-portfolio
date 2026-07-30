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
   Qalan bölmələr — editorial dil (hero ilə eyni qrammatika)
   ========================================================== */

/* 1) BÖLMƏLƏR ARASI VAHİD RİTM
   hero də <section>-dır → TƏK qayda hamısını tutur.
   (əvvəlki ayrıca `.hero + section` qaydası buna görə silindi — iki həqiqət mənbəyi olmasın) */
main > section + section {
  margin-block-start: clamp(3rem, 12vh, 6rem);
}

/* 2) BÖLMƏ DAXİLİ RİTM — hero-dakı eyni "flow" pattern.
   :not(.hero) → hero-nun öz qaydaları var, ora qarışmırıq. */
main > section:not(.hero) > * { margin: 0; }
main > section:not(.hero) > * + * { margin-block-start: var(--flow, 1.5rem); }

/* 3) BÖLMƏ BAŞLIĞI = ETİKET, ulduz deyil.
   Hero kicker-in eyni forması → səhifə boyu təkrarlanan qrammatika. */
main > section:not(.hero) > h2 {
  font-family: var(--font-body);
  font-size: clamp(.7rem, .68rem + .1vw, .78rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--muted);
}

/* h2-dən DƏRHAL sonrakı p = alt başlıq → etiketə sıx yapışır */
main > section:not(.hero) > h2 + p {
  --flow: .5rem;
  color: var(--muted);
  max-width: 48ch;
}

/* 4) KARTLAR — "kart" deyil, EDITORIAL SİYAHI (fon/radius/kölgə yox, yalnız xətt) */
.exp-card {
  --flow: clamp(2rem, 5vh, 3rem);                   /* başlıqdan sonra ilk sətir */
  padding-block: clamp(1.5rem, 4vw, 2.25rem);       /* ⚠️ `padding: 10px` silindi — clamp-i öldürürdü */
  border-block-start: 1px solid var(--border);
}

/* sətirlər arası boşluğu margin yox, XƏTT + padding verir */
.exp-card + .exp-card { --flow: 0; }

/* sonuncu xətt: xəttsiz bitən siyahı "yarımçıq kəsilmiş" oxunur */
.exp-card:last-of-type { border-block-end: 1px solid var(--border); }

.exp-card h3,
.exp-card p { margin: 0; }                          /* brauzer defaultu */

.exp-card h3 {
  font-size: clamp(1.35rem, 1.1rem + 1vw, 1.9rem);    /* bölmənin ulduzu */
  letter-spacing: -.02em;
}

.exp-card p {
  margin-block-start: .6rem;
  font-size: 1rem;
  max-width: 62ch;
}

.exp-card a {
  display: inline-block;                            /* inline element margin-block qəbul etmir */
  margin-block-start: 1rem;
  font-size: .9rem;
  text-decoration-thickness: 1px;
  text-underline-offset: .3em;
  transition: color .2s;
}

.exp-card a:hover { color: var(--accent); }

/* ⚠️ hover-tilt + box-shadow bloku TAM SİLİNDİ:
   kartsız/kölgəsiz dildə qalxma və kölgə ziddiyyətdir (squint test-in tapdığı problem). */

/* 5) ALT LİNKLƏR — mərkəz YOX, səhifənin qalanı kimi sola bağlı */
.projects__more {
  --flow: clamp(2rem, 5vh, 3rem);
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: .75rem;
}

.view-all {
  font-size: .9rem;
  text-decoration-thickness: 1px;
  text-underline-offset: .3em;
  transition: color .2s;
}

.view-all:hover { color: var(--accent); }

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

/* 6) REVEAL — dəyişmədi */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ==========================================================
   Bölmələr — 768px+ : hero-nun 12 sütunlu qrideri aşağıda davam edir
   ========================================================== */
@media (min-width: 768px) {
  main > section:not(.hero) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: clamp(1rem, 3vw, 2rem);
  }

  /* etiket öz sütununda "asılı" qalır — ölçü ilə yox, MÖVQE ilə görünür */
  main > section:not(.hero) > h2 {
    grid-column: 1 / 4;
    grid-row: 1 / -1;        /* 1-ci sətirdən SONUNCUYA qədər — bütün bölmə boyu */
    align-self: start;       /* uzanmasın, yuxarıda dursun */
    position: sticky;
    top: 2rem;
  }

  /* qalan hər şey sağ blokda; sağ kənar 12 = hero tagline-ın sağ kənarı */
  main > section:not(.hero) > *:not(h2) {
    grid-column: 4 / 12;
  }

  /* alt başlıq etiketlə yan-yana durur → onu aşağı itələyən boşluq lazım deyil */
  main > section:not(.hero) > h2 + p { --flow: 0; }
}
</style>
