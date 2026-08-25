<script setup lang="ts">
import type {Project} from '~/data/projects'

/* Kart İKİ yerdə istifadə olunur: ana səhifə və /projects.
   Ona görə komponentdir — əks halda eyni markup iki faylda yaşayardı və biri
   dəyişəndə o biri geridə qalardı (eyni səbəbdən CSS də main.css-ə çıxarılmışdı). */
const props = defineProps<{ project: Project }>()

const localePath = useLocalePath()

/* ⭐ BİR kartda BİR əsas hərəkət.
   Hədəf "ən dərin FAYDALI nöqtədir": case study yazılıbsa detal səhifəsi,
   yoxdursa canlı sayt, o da yoxdursa repo. Beləcə klik heç vaxt boşa çıxmır. */
const target = computed(() => {
  if (props.project.caseStudy) return localePath('/projects/' + props.project.slug)
  return props.project.live ?? props.project.repo
})

/* Xarici link `<a>`, daxili marşrut `<NuxtLink>` olmalıdır (prefetch + client-side keçid).
   `is` ilə eyni şablonda ikisini də idarə edirik. */
const isInternal = computed(() => !!props.project.caseStudy)
</script>

<template>
  <article class="exp-card project">
    <!-- COVER — şəkil varsa. Performans qaydaları:
         · `loading="lazy"` → ekrana girənə qədər yüklənmir
         · `width`/`height` → brauzer yeri əvvəlcədən ayırır, CLS = 0
         · `decoding="async"` → şəkil parse-ı əsas thread-i bloklamır
         · `alt=""` → ad onsuz da aşağıdakı başlıq linkindədir; təkrar oxumaq ekran
           oxuyucusunda səs-küydür (dekorativ təkrar). -->
    <!-- ⚠️ `<component :is="'NuxtLink'">` İŞLƏMİR: Nuxt-un auto-import-u kompilyasiya zamanıdır,
         şablonda hərfi <NuxtLink> görməlidir. Sətir kimi veriləndə HTML-ə `<NuxtLink>` teqi
         olduğu kimi düşür — nə <a href>, nə klik, nə də prerender crawler-i üçün link.
         Ona görə burada açıq v-if/v-else var: sehr yoxdur, çıxış HTML-i proqnozlaşdırılandır.
         Şəkil linki `aria-hidden` + `tabindex="-1"`-dir: aşağıdakı başlıq linkinin təkrarıdır,
         ekran oxuyucusu eyni hədəfi iki dəfə oxumasın. -->
    <NuxtLink
        v-if="project.cover && isInternal"
        :to="target"
        class="project__media"
        tabindex="-1"
        aria-hidden="true"
    >
      <img :src="project.cover" alt="" width="1200" height="750" loading="lazy" decoding="async">
    </NuxtLink>
    <a
        v-else-if="project.cover"
        :href="target"
        target="_blank"
        rel="noopener"
        class="project__media"
        tabindex="-1"
        aria-hidden="true"
    >
      <img :src="project.cover" alt="" width="1200" height="750" loading="lazy" decoding="async">
    </a>

    <!-- Başlıq sətri: ad = ƏSAS hərəkət (ox STATİKDİR — mobil cihazda hover yoxdur,
         affordance hover-ə bağlanarsa ziyarətçilərin yarısı üçün mövcud olmur),
         yanında kiçik ikonlar = ikinci dərəcəli hədəflər.
         ⚠️ Şəkil qridin XARİCİNDƏDİR (qardaş element), qrid isə həmişə mövcud olan üç
         elementdən ibarətdir. Səbəb: `v-if`-li element qridin içində olsa, implicit sətir
         nömrələri şəkil olan/olmayan kartlarda SÜRÜŞÜR — yerləşdirmə qırılır. -->
    <div class="project__grid">
      <div class="project__head">
        <h3>
        <NuxtLink v-if="isInternal" :to="target" class="project__title-link">
          {{ project.title }}<span class="project__arrow" aria-hidden="true">→</span>
        </NuxtLink>
        <a v-else :href="target" target="_blank" rel="noopener" class="project__title-link">
          {{ project.title }}<span class="project__arrow" aria-hidden="true">↗</span>
        </a>
      </h3>
      </div>

      <!-- İkonlar başlığın YANINDA deyil, sətrin SAĞ KƏNARINDA öz sütunundadır:
           ada yapışanda sıxıntı yaradırdı, halbuki sağda boş yer var idi.
           ⚠️ İkon-linkdə MƏTN yoxdur → `aria-label` MƏCBURİDİR, əks halda ekran oxuyucusu
           linki "link" deyə oxuyur, hara getdiyini demir. SVG özü `aria-hidden`-dir. -->
      <span class="project__icons">
        <a
            v-if="project.live"
            class="project__icon"
            :href="project.live"
            target="_blank"
            rel="noopener"
            :aria-label="project.title + ' — live'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <path d="M15 3h6v6"/>
            <path d="M10 14 21 3"/>
          </svg>
        </a>

        <a
            class="project__icon"
            :href="project.repo"
            target="_blank"
            rel="noopener"
            :aria-label="project.title + ' — GitHub'"
        >
          <IconGithub/>
        </a>
      </span>

      <!-- DOM sırası: ad → ikonlar → təsvir → texnologiya.
           Mobildə axın elə budur; desktopda qrid təsviri SAĞ sütuna, ikonları isə lap sağ
           kənara aparır. Yəni sıra CSS ilə dəyişir, oxunma məntiqi HTML-də düzgün qalır. -->
      <p class="project__desc">{{ $t('projects.items.' + project.slug + '.description') }}</p>
      <p class="exp-card__tech">{{ project.tech.join(' · ') }}</p>
    </div>
  </article>
</template>

<style scoped>
/* Şəkil kartın İÇİNDƏ ilk elementdir: xətt → şəkil → ad.
   Radius/kölgə YOXDUR — səhifənin dili "kart" deyil, editorial siyahıdır.
   Şəkli fərqləndirən yeganə şey nazik haşiyədir. */
.project__media {
  display: block;
  margin-block-end: 1.25rem;
  border: 1px solid var(--border);
  overflow: hidden;                 /* hover zoom kənardan çıxmasın */
  line-height: 0;                   /* inline img-in altındakı boşluğu öldürür */
}

.project__media img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;            /* şəkil gec gəlsə də yer hazırdır */
  object-fit: cover;
  transition: transform .4s ease, filter .3s ease;
  filter: saturate(.92);
}

.project__media:hover img {
  transform: scale(1.02);
  filter: saturate(1);
}

/* KART SƏVİYYƏSİNDƏ SİQNAL: kartın üst xətti hover-də aksentə dönür.
   Yeni dekorasiya gətirmir — səhifədə onsuz da olan hairline-ın rəngini dəyişir. */
.project { transition: border-color .3s ease; }
.project:hover { border-block-start-color: var(--accent); }

/* başlıq linki: h3 display şriftdədir, altxətt yalnız hover-də gəlir (statik altxətt
   display başlığı ağırlaşdırır) — amma "klikləmək olar" siqnalı OX-dadır, hover-də yox. */
.project__title-link {
  text-decoration: none;
  transition: color .2s;
}

.project__title-link:hover {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: .18em;
}

.project__arrow {
  display: inline-block;
  margin-inline-start: .35em;
  font-size: .7em;
  color: var(--muted);
  transition: transform .2s ease, color .2s;
}

.project__title-link:hover .project__arrow {
  transform: translateX(3px);
  color: var(--accent);
}

/* mobil: ikonlar adın altında öz sətrində dayanır (yan-yana sıxılmır) */
.project__icons {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  margin-block-start: 1rem;
}

/* ⚠️ `margin-block-start: 0` MƏCBURİDİR: qlobal `.exp-card a` qaydası hər linkə 1rem verir
   (mətn linkləri üçün nəzərdə tutulub) — ikon sətrində bu, ikonları aşağı itələyirdi. */
.project__icon {
  margin-block-start: 0;
  display: inline-flex;
  /* Toxunma hədəfi 24×24 (WCAG 2.2). `padding` İŞLƏMİR: yuxarı padding ikon sətrini aşağı itələyərdi,
     `margin-block-start` isə burada 0 qalmalıdır (yuxarıdakı qeyd). → min-ölçü + mərkəzləmə. */
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  color: var(--muted);
  transition: color .2s, transform .2s ease;
}

.project__icon svg {
  width: 17px;
  height: 17px;
  display: block;
}

.project__icon:hover {
  color: var(--accent);
  transform: translateY(-1px);
}

/* klaviatura ilə gəzənlər üçün fokus halqası: ikonun mətni yoxdur, fokus GÖRÜNMƏLİDİR */
.project__icon:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .project__media img { transition: none; }
  .project__media:hover img { transform: none; }
}

/* ==========================================================
   768px+ — SƏTİR İKİ SÜTUNA BÖLÜNÜR
   Problem: ad, təsvir və texnologiya alt-alta düzüləndə sətrin sağında ~350px
   istifadəsiz qalırdı — kart "nazik və uzun" görünürdü.
   Həll: solda KİMLİK (ad + ikon + texnologiya), sağda MƏZMUN (təsvir).
   Nisbət 1 : 1.15 — sağ sütun bir az geniş, çünki orada cümlə var, etiket yox.
   ========================================================== */
@media (min-width: 768px) {
  /* 3-cü sütun `auto`: ikonlar nə qədər yer tutursa o qədər alır, qalanı mətnə qalır */
  .project__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) auto;
    column-gap: clamp(1.5rem, 3vw, 3rem);
  }

  .project__head { grid-column: 1; grid-row: 1; }

  /* ikonlar sətrin LAP SAĞ kənarında — ada yapışmır, sağdakı boş yeri işlədir */
  .project__icons {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    margin-block-start: 0;
    padding-block-start: .5rem;     /* display başlığın optik xəttinə oturur */
  }

  /* təsvir hər iki sətri əhatə edir → sol sütun uzun olsa belə sağ blok bütöv qalır */
  .project__desc {
    grid-column: 2;
    grid-row: 1 / span 2;
    margin-block-start: 0;          /* qlobal `.exp-card p` .6rem verir — burada sıfırlanır */
    padding-block-start: .35rem;    /* display başlığın optik xəttinə oturtmaq üçün */
  }

  /* ⚠️ `.project` prefiksi qəsdən: qlobal `.exp-card .exp-card__tech` qaydası ilə
     spesiflik BƏRABƏR olsaydı (0,2,0), nəticəni fayl sırası həll edərdi — yəni təsadüf. */
  .project .exp-card__tech {
    grid-column: 1;
    grid-row: 2;
    margin-block-start: .9rem;
  }
}
</style>
