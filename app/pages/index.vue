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
        <a href="mailto:hello.rahimasalman@gmail.com">Email</a>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section class="reveal">
      <h2>{{ $t('experience.title') }}</h2>
      <article v-for="job in experience" :key="job.key" class="exp-card">
        <p class="exp-card__period">{{ job.period }}</p>
        <h3>{{ $t('experience.' + job.key + '.title') }}</h3>
        <p>{{ $t('experience.' + job.key + '.desc') }}</p>
        <p v-if="job.tech.length" class="exp-card__tech">{{ job.tech.join(' · ') }}</p>
      </article>
    </section>

    <!-- APPROACH -->
    <section class="reveal approach">
      <h2>{{ $t('approach.title') }}</h2>
      <div v-for="key in approach" :key="key" class="approach__item">
        <p class="approach__lead">{{ $t('approach.items.' + key + '.lead') }}</p>
        <p class="approach__body">{{ $t('approach.items.' + key + '.body') }}</p>
      </div>
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
    <!-- id="projects" → nav-dakı "Projects" artıq ayrıca səhifəyə yox, BU bölməyə enir.
         Səbəb: cəmi 4 layihə var, siyahı səhifəsi ziyarətçini bir klik uzaqlaşdırırdı. -->
    <section id="projects" class="reveal">
      <h2>{{ $t('projects.title') }}</h2>
      <p>{{ $t('projects.subtitle') }}</p>
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project"/>
      <div class="projects__more">
        <NuxtLink :to="localePath('/activity')" class="view-live">
          {{ $t('experience.activityLink') }}
        </NuxtLink>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="reveal contact">
      <h2>{{ $t('contact.title') }}</h2>
      <!-- ⚠️ Əlaqə linkləri buradan GÖTÜRÜLDÜ → footer-ə köçdü (hər səhifədə görünür).
           Səbəb: footer dərhal aşağıdadır; eyni üç ikonu 100px aralıqla iki dəfə vermək
           çağırışı gücləndirmir. Bölmə indi yalnız BƏYANATDIR, hərəkət isə footer-dədir —
           ikisi birlikdə səhifənin bağlanışını təşkil edir. -->
      <p class="contact__line">{{ $t('contact.headline') }}</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import {projects} from '~/data/projects'
import {experience} from '~/data/experience'

const {t} = useI18n()

const localePath = useLocalePath()

/* Layihələr TAM siyahı ilə göstərilir (`slice`/`featured` yoxdur) — cəmi 4 ədəddir,
   "ilk 3 + hamısına bax" nisbəti bu sayda ziyarətçini boş yerə bir klik uzağa göndərirdi. */

/* APPROACH — yalnız AÇARLAR burada, mətn i18n-də.
   Səbəb: bu mətn Rahima-nın mövqeyidir və dəyişəcək (v1 qaralamadır) →
   düzəliş komponentə yox, `approach.items.*`-a gedir. Sıra bu massivlə idarə olunur. */
const approach = ['boundary', 'core', 'verify']

/* STACK — sətirlərin MƏZMUNU i18n-də deyil, burada.
   Səbəb: elementlərin hamısı xüsusi ad / tərcümə olunmayan texniki termindir
   (Vue.js, SSR/SSG, REST) → 5 dilə kopyalamaq eyni mətnin 5 nüsxəsini yaradardı.
   Tərcümə olunan yalnız QRUP ADLARI-dır (`stack.core` və s.). */
const stack = [
  { key: 'core',        items: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'React', 'Composition API', 'Pinia / Vuex'] },
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
      email: 'mailto:hello.rahimasalman@gmail.com',
      sameAs: [
        'https://github.com/rahimasalman',
        'https://www.linkedin.com/in/rahima-salman/',
      ],
      knowsAbout: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'React', 'Frontend Architecture', 'Advertising Technology'],
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
   ⚠️ EDITORIAL QRAMMATİKA ARTIQ BURADA DEYİL → `assets/css/main.css`.
   Bölmə ritmi, etiket başlıq, `.exp-card` siyahısı, `.view-all`, `.reveal` və 12 sütunlu
   qrid saytın HƏR səhifəsinə lazımdır (`/projects`, `/projects/[slug]`), scoped isə yalnız
   bu komponentə çatırdı. Aşağıda YALNIZ ana səhifəyə xas qaydalar qalıb.
   ⚠️ hover-tilt + box-shadow bloku hələ 07-30-da silinmişdi: kartsız/kölgəsiz dildə
   qalxma və kölgə ziddiyyətdir (squint test-in tapdığı problem).
   ========================================================== */

/* nav-dan `#projects` ilə gələndə bölmə ekranın lap yuxarısına yapışmasın */
#projects { scroll-margin-block-start: 2rem; }

/* 5) ALT LİNKLƏR — mərkəz YOX, səhifənin qalanı kimi sola bağlı */
/* ⚠️ `--flow` azaldıldı: bu link Projects bölməsinin QUYRUĞUDUR, amma bölmələr arası
   boşluq qədər ayrılanda ayrıca bölmə kimi oxunurdu (asılı sətir effekti). */
.projects__more {
  --flow: clamp(1.25rem, 3vh, 1.75rem);
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: .75rem;
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

/* 4b) APPROACH — bölmənin FORMASI qəsdən fərqlidir.
   Experience/Projects/Stack hamısı XƏTT-lə işləyir (hairline + sıra). Bura xətt QOYULMADI:
   ritmi qıran şey elə xəttin YOXLUĞU-dur. Yəni fərq dekorasiya ilə deyil,
   səhifənin öz qrammatikasının bir elementini geri çəkməklə yaradılır.
   Lead sətri display şriftdədir (səs), body isə `--ink` qalır — `--muted` qəsdən istifadə edilmədi
   (07-30 dərsi: təsvirlərdə boz mətn kütləsi yaradırdı). */
.approach__item { --flow: clamp(2rem, 5vh, 3rem); }

.approach__lead {
  margin: 0;
  font-family: var(--font-display), serif;
  font-size: clamp(1.15rem, 1.05rem + .5vw, 1.5rem);
  line-height: 1.25;
  letter-spacing: -.015em;
  max-width: 28ch;                  /* dar = bəyanat forması */
  text-wrap: balance;
}

.approach__body {
  margin: .6rem 0 0;
  font-size: 1rem;
  max-width: 60ch;
}

/* 5b) STACK — `.exp-card` ilə EYNİ qrammatika: fon/radius/kölgə yox, yalnız xətt.
   <dl> seçildi çünki bu, semantik olaraq "ad → dəyər" cütlüyüdür (etiket → texnologiyalar);
   div sarğısı `dt`+`dd`-ni bir sətir kimi qruplaşdırmaq üçündür (HTML-də icazəlidir). */
.stack {
  --flow: clamp(2rem, 5vh, 3rem);   /* h2-dən sonrakı nəfəs — .exp-card ilə eyni dəyər */

  /* ⭐ RİTM QƏRARI: Stack üçüncü "etiket + xətli sətirlər" bloku olmamalıdır.
     Experience və Projects ağırdır; bu blok onların ARASINDA NƏFƏS rolunu oynayır.
     Ona görə hər sətrin öz xətti YOX — bütün bloka BİR nazik xətt (giriş siqnalı),
     sətirlər isə sıx yığılır. Yəni fərq RƏNGLƏ deyil, SIXLIQLA yaradılır
     (07-30 dərsi: `--muted` geri alınmışdı — boz mətn kütləsi yaradırdı). */
  padding-block-start: clamp(.9rem, 2.5vw, 1.3rem);
  border-block-start: 1px solid var(--border);
}

.stack__group {
  display: grid;
  gap: .15rem;
  padding-block: .45rem;            /* sıx — siyahı deyil, yığcam məlumat zolağı */
}

/* qrup adı = ETİKET, h2-nin eyni forması → səhifə boyu təkrarlanan qrammatika */
.stack dt {
  font-size: clamp(.66rem, .64rem + .1vw, .72rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--muted);
}

.stack dd {
  margin: 0;                        /* brauzer `dd`-yə 40px soldan girinti verir */
  font-size: .95rem;                /* .exp-card-dan kiçik — iyerarxiyada bir pillə aşağı */
  line-height: 1.5;
  max-width: 52ch;
}

/* 5c) CONTACT — səhifənin bağlanışı. Hero "kim" deyir, bura "indi nə?" deyir. */
/* ⚠️ İki sinifli seçici MƏCBURİDİR: `main > section:not(.hero) > h2 + p` qaydası bu elementi də tutur
   (o, `--flow: .5rem` + `color: var(--muted)` + `max-width: 48ch` verir). Spesifiklikdə əvvəl SİNİF sayı
   müqayisə olunur → (0,2,0) > (0,1,4), yəni bir sinif əlavə etmək 4 elementdən güclüdür. */
/* ⚠️ `max-width: 20ch` SİLİNDİ və ölçü kiçildildi: bəyanat BİR SƏTİRDƏ oxunmalıdır.
   Dar sütun + böyük şrift onu üç sətrə bölürdü — "bəyanat forması" məhz sətrin
   bütövlüyündədir, dar sütunda deyil.
   ⚠️ Ölçü sərhədi hesablanıb: məzmun sütunu ~637px-dir (12 sütunun 8-i), cümlə ~52 hərfdir
   → hərf başına ~12px, yəni display şriftdə maksimum ~1.45rem. Daha böyüyü sətri qırır.
   Uzun tərcümələrdə (de/ru/es) iki sətrə düşə bilər — bu normaldır, qırılma yoxdur. */
.contact .contact__line {
  --flow: clamp(2rem, 5vh, 3rem);
  color: var(--ink);
  font-family: var(--font-display), serif;
  font-size: clamp(1.05rem, .85rem + .95vw, 1.45rem);
  line-height: 1.3;
  letter-spacing: -.015em;
  text-wrap: balance;
}

/* ==========================================================
   Ana səhifə — 768px+ (12 sütunlu qridin ÖZÜ main.css-dədir)
   ========================================================== */
@media (min-width: 768px) {
  /* stack sətri: etiket | dəyər — bölmə səviyyəsindəki eyni "asılı etiket" məntiqi, kiçik miqyasda.
     Sıx qalır: sətirlər arası boşluq YOX, sütun ayrılığı informasiyanı onsuz da oxunaqlı edir. */
  .stack__group {
    grid-template-columns: 8rem 1fr;
    column-gap: 1.5rem;
    align-items: baseline;
    padding-block: .3rem;
  }

  /* desktop-da etiket yan sütundadır → bəyanatı aşağı itələyən boşluq lazım deyil */
  .contact .contact__line { --flow: 0; }
}
</style>
