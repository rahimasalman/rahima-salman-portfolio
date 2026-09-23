<script setup lang="ts">
import {projects} from "~/data/projects";

const route = useRoute();
const localePath = useLocalePath()
const {t} = useI18n()

const selectedProject = computed(() =>
    projects.find(p => p.slug === route.params.slug)
)

/* 404 — niyə `watchEffect`, niyə setup-da sadə `if` yox:
   /projects/a → /projects/b keçidində Vue Router EYNİ komponenti təkrar istifadə edir,
   yəni `setup` BİR DƏFƏ işləyir. Setup-da atılan xəta yalnız ilk yüklənməni tutardı;
   `watchEffect` isə `route.params` dəyişəndə yenidən qiymətləndirir. */
watchEffect(() => {
  if (!selectedProject.value) throw createError({statusCode: 404, statusMessage: 'Project not found', fatal: true})
})

/* SEO — 20 statik səhifə (4 layihə × 5 dil), hamısı başlıqsız idi.
   Layihə adı `data/projects.ts`-dən gəlir (xüsusi ad → tərcümə olunmur),
   təsvir isə i18n-dən (`projects.items.<slug>.description`) → dilə görə dəyişir.
   ⚠️ Getter (`() => …`) forması vacibdir: 404 halında `selectedProject` undefined-dir,
   həmçinin dil dəyişəndə başlıq özü yenilənməlidir. */
const description = () =>
    selectedProject.value ? t(`projects.items.${selectedProject.value.slug}.description`) : ''
const title = () => `${selectedProject.value?.title ?? ''} — Rahima Salman`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
})
</script>

<template>
  <!-- ⚠️ <main> MƏCBURİDİR — bax `projects/index.vue`-dəki eyni qeyd. -->
  <main v-if="selectedProject">
    <header class="page-head">
      <h1>{{ selectedProject.title }}</h1>
      <p class="page-head__lead">{{ $t('projects.items.' + selectedProject.slug + '.description') }}</p>
    </header>

    <!-- Cover — detal səhifəsində şəkil BÖYÜK ola bilər: ziyarətçi artıq niyyət göstərib.
         Yenə də `loading="lazy"` deyil, çünki bu, səhifənin ƏSAS vizualıdır (fold-un içindədir). -->
    <img
        v-if="selectedProject.cover"
        class="cover"
        :src="selectedProject.cover"
        alt=""
        width="1200"
        height="750"
        decoding="async"
    >

    <!-- Texnologiyalar: ana səhifədəki Stack bölməsi ilə EYNİ qrammatika —
         <dl> (ad → dəyər), etiket uppercase + muted, dəyər ` · ` ilə birləşir.
         Yeni forma icad edilmir; səhifə saytın öz lüğətindən danışır. -->
    <dl class="meta">
      <dt>{{ $t('projects.technologies') }}</dt>
      <dd>{{ selectedProject.tech.join(' · ') }}</dd>
    </dl>

    <div class="actions">
      <!-- rel="noopener": target="_blank" ilə açılan səhifə `window.opener` üzərindən
           bu tab-a müdaxilə edə bilməsin (müasir brauzerlər özü qoyur, açıq yazmaq ucuzdur). -->
      <a v-if="selectedProject.live" class="view-all" :href="selectedProject.live" target="_blank" rel="noopener">
        {{ $t('projects.viewProject') }}
      </a>
      <a class="view-all" :href="selectedProject.repo" target="_blank" rel="noopener">GitHub ↗</a>
      <NuxtLink class="view-all" :to="localePath('/projects')">
        {{ $t('projects.viewAll') }}
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.page-head {
  margin: 0 0 clamp(2rem, 6vh, 3rem);
}

.page-head h1 {
  margin: 0;
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  letter-spacing: -.025em;
}

/* təsvir = bəyanat forması: display şrift.
   ⚠️ `34ch` idi — təsvirlər qısa ikən (bir-iki söz) işləyirdi; bir cümləlik təsvir isə sütunun
   üçdə birində 3 sətrə bölünüb sağda boş sahə qoyurdu. `60ch` ≈ oxunaqlı sətir həddi:
   cümlə eni istifadə edir, amma geniş ekranda da göz sətrin sonundan başına rahat qayıdır. */
.page-head__lead {
  margin: 1rem 0 0;
  font-family: var(--font-display), serif;
  font-size: clamp(1.15rem, 1.05rem + .5vw, 1.5rem);
  line-height: 1.35;
  letter-spacing: -.015em;
  max-width: 60ch;
  text-wrap: balance;
}

.cover {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border: 1px solid var(--border);
  margin-block: 0 clamp(2rem, 5vh, 2.5rem);
}

.meta {
  margin: 0;
  padding-block: clamp(.9rem, 2.5vw, 1.3rem);
  border-block: 1px solid var(--border);
}

.meta dt {
  font-size: clamp(.66rem, .64rem + .1vw, .72rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--muted);
}

.meta dd {
  margin: .3rem 0 0;                /* brauzer `dd`-yə 40px soldan girinti verir */
  font-size: .95rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-block-start: clamp(2rem, 5vh, 2.5rem);
}

@media (min-width: 768px) {
  /* etiket | dəyər — Stack bölməsindəki eyni "asılı etiket" məntiqi */
  .meta {
    display: grid;
    grid-template-columns: 8rem 1fr;
    column-gap: 1.5rem;
    align-items: baseline;
  }

  .meta dd { margin-block-start: 0; }
}
</style>
