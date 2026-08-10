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

    <!-- STACK -->
    <section class="reveal">
      <h2>{{ $t('stack.title') }}</h2>
      <dl class="stack">
        <div v-for="group in stack" :key="group.key" class="stack__group">
          <dt>{{ $t('stack.' + group.key) }}</dt>
          <dd>{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
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

    <!-- CONTACT -->
    <section class="reveal contact">
      <h2>{{ $t('contact.title') }}</h2>
      <p class="contact__line">{{ $t('contact.headline') }}</p>
      <a class="contact__mail" href="mailto:rahimasalman7@gmail.com">rahimasalman7@gmail.com</a>
      <div class="contact__links">
        <a href="https://github.com/rahimasalman" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/rahima-salman/" target="_blank">LinkedIn</a>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import {projects} from '~/data/projects'

const {t} = useI18n()

const localePath = useLocalePath()

const featured = projects.slice(0, 3)

/* STACK — sətirlərin MƏZMUNU i18n-də deyil, burada.
   Səbəb: elementlərin hamısı xüsusi ad / tərcümə olunmayan texniki termindir
   (Vue.js, SSR/SSG, REST) → 5 dilə kopyalamaq eyni mətnin 5 nüsxəsini yaradardı.
   Tərcümə olunan yalnız QRUP ADLARI-dır (`stack.core` və s.). */
const stack = [
  { key: 'core',        items: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'Composition API', 'Pinia / Vuex'] },
  { key: 'interface',   items: ['SCSS', 'Tailwind CSS', 'Design Systems', 'Web Accessibility'] },
  { key: 'engineering', items: ['SSR / SSG', 'Web Performance', 'REST', 'Git', 'Code Review'] },
]

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
})

/* GEO/SEO — Person schema (JSON-LD).
   Niyə: h1 = ad qərarının (07-29) texniki tamamlayıcısıdır. Google və LLM-lər üçün
   "Rahima Salman" sadəcə mətn yox, ŞƏXS ENTİTY-si olur; sameAs GitHub/LinkedIn profillərini
   eyni şəxsə bağlayır. Yalnız səhifədə onsuz da görünən məlumatlar yazılıb. */
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Rahima Salman',
      url: 'https://rahimasalman.netlify.app',
      jobTitle: 'Front-end Engineer',
      email: 'mailto:rahimasalman7@gmail.com',
      sameAs: [
        'https://github.com/rahimasalman',
        'https://www.linkedin.com/in/rahima-salman/',
      ],
      knowsAbout: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Frontend Architecture', 'Advertising Technology'],
      address: { '@type': 'PostalAddress', addressLocality: 'Baku', addressCountry: 'AZ' },
    }),
  }],
})

/* reveal artıq sırf CSS-dir (aşağıda `.reveal`) — IntersectionObserver silindi.
   Səbəb: bazada `opacity: 0` + JS ilə açmaq = SSR anti-pattern (hero-da da eyni səhv idi):
   serverdən gələn HTML görünməz olur və hydration bitənə qədər elə qalır. */
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
  --flow: .75rem;
  font-size: clamp(3rem, 1rem + 9vw, 8rem);
  font-weight: 600;                            /* qloballa eyni — açıq yazılıb ki, hero bir blokda oxunsun */
  line-height: 0.88;                           /* böyük şriftdə sətirlər sıxılır */
  letter-spacing: -0.025em;                    /* böyük şriftdə hərflər sıxılır */
}

/* adın İKİ SƏTRİ ayrı-ayrı gecikir (plan belə nəzərdə tuturdu).
   h1-in öz animasiyası söndürülür, pilləkən span-lara keçir. */
.hero__name { animation: none; }

.hero__name span {
  display: block;                              /* addım 3: iki sətir = sıx blok */
  animation: rise .6s ease-out backwards;
  animation-delay: calc(var(--i, 0) * 90ms);
}
.hero__name span:nth-child(1) { --i: 1; }
.hero__name span:nth-child(2) { --i: 2; }

.hero__tagline {
  --i: 3;
  --flow: clamp(2rem, 5vh, 4rem);              /* GENİŞ — fikir dəyişir, nəfəs lazımdır */
  font-weight: 300;                            /* 800 vs 300 = çəki kontrastı */
  font-size: clamp(1.05rem, 1rem + .35vw, 1.35rem);
  line-height: 1.5;
  max-width: 34ch;                             /* dar sütun — ad geniş, bu dar = forma kontrastı */
  text-wrap: balance;
}

.hero__links {
  --i: 4;
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

/* 5b) STACK — `.exp-card` ilə EYNİ qrammatika: fon/radius/kölgə yox, yalnız xətt.
   <dl> seçildi çünki bu, semantik olaraq "ad → dəyər" cütlüyüdür (etiket → texnologiyalar);
   div sarğısı `dt`+`dd`-ni bir sətir kimi qruplaşdırmaq üçündür (HTML-də icazəlidir). */
.stack {
  --flow: clamp(2rem, 5vh, 3rem);   /* h2-dən sonrakı nəfəs — .exp-card ilə eyni dəyər */
}

.stack__group {
  display: grid;
  gap: .35rem;
  padding-block: clamp(1.1rem, 3vw, 1.6rem);
  border-block-start: 1px solid var(--border);
}

/* siyahının sonu bağlanır — açıq qalan xətt "yarımçıq kəsilmiş" oxunur (.exp-card-dakı eyni qərar) */
.stack__group:last-child { border-block-end: 1px solid var(--border); }

/* qrup adı = ETİKET, h2-nin eyni forması → səhifə boyu təkrarlanan qrammatika */
.stack dt {
  font-size: clamp(.7rem, .68rem + .1vw, .78rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--muted);
}

.stack dd {
  margin: 0;                        /* brauzer `dd`-yə 40px soldan girinti verir */
  font-size: 1rem;
  max-width: 52ch;
}

/* 5c) CONTACT — səhifənin bağlanışı. Hero "kim" deyir, bura "indi nə?" deyir. */
/* ⚠️ İki sinifli seçici MƏCBURİDİR: `main > section:not(.hero) > h2 + p` qaydası bu elementi də tutur
   (o, `--flow: .5rem` + `color: var(--muted)` + `max-width: 48ch` verir). Spesifiklikdə əvvəl SİNİF sayı
   müqayisə olunur → (0,2,0) > (0,1,4), yəni bir sinif əlavə etmək 4 elementdən güclüdür. */
.contact .contact__line {
  --flow: clamp(2rem, 5vh, 3rem);
  color: var(--ink);
  font-family: var(--font-display), serif;
  font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.3rem);
  line-height: 1.15;
  letter-spacing: -.02em;
  max-width: 20ch;                  /* dar sütun = bəyanat forması, paraqraf yox */
  text-wrap: balance;
}

.contact__mail {
  --flow: 1.75rem;
  display: block;                   /* inline element margin-block qəbul etmir */
  width: max-content;
  max-width: 100%;
  font-size: clamp(1rem, .95rem + .3vw, 1.15rem);
  text-decoration-thickness: 1px;
  text-underline-offset: .3em;
  transition: color .2s;
}

.contact__mail:hover { color: var(--accent); }

.contact__links {
  --flow: 1.25rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: .9rem;
}

.contact__links a {
  text-decoration-thickness: 1px;
  text-underline-offset: .3em;
  transition: color .2s;
}

.contact__links a:hover { color: var(--accent); }

/* 6) REVEAL — sırf CSS, JS YOXDUR (hero-dakı Qat ③ ilə eyni məntiq)
   🔑 Bazada `opacity: 0` YOXDUR — görünməzlik yalnız @keyframes-in `from`-undadır.
   Nəticə: JS sınsa, gec gəlsə və ya reduced-motion animasiyanı söndürsə,
   element öz TƏBİİ GÖRÜNƏN halında qalır. Tələ yamaqlanmır — quruluşla mövcud olmur. */
.reveal {
  animation: rise-in .6s ease-out backwards;
  animation-timeline: view();              /* scroll-driven: element ekrana girdikcə */
  animation-range: entry 0% entry 100%;
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(24px); }
  /* `to` qəsdən YOXDUR — brauzer elementin öz halını götürür */
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

  /* stack sətri: etiket | dəyər — bölmə səviyyəsindəki eyni "asılı etiket" məntiqi, kiçik miqyasda */
  .stack__group {
    grid-template-columns: 9rem 1fr;
    column-gap: 1.5rem;
    align-items: baseline;
  }

  /* desktop-da etiket yan sütundadır → bəyanatı aşağı itələyən boşluq lazım deyil */
  .contact .contact__line { --flow: 0; }
}
</style>
