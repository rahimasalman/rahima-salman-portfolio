<script setup lang="ts">
import {projects} from "~/data/projects";

const {t} = useI18n()

/* SEO — bu səhifə prerender olunur, yəni Google onu statik sənəd kimi indeksləyir.
   Öz <title>-ı olmasa 5 dilin hamısında BAŞLIQSIZ görünürdü.
   Mətn uydurulmayıb: mövcud i18n açarları təkrar istifadə olunur.
   Ad tərcümə olunmur (hero-dakı eyni qərar) → "Rahima Salman" sabit qalır. */
useSeoMeta({
  title: () => `${t('projects.title')} — Rahima Salman`,
  description: () => t('projects.subtitle'),
  ogTitle: () => `${t('projects.title')} — Rahima Salman`,
  ogDescription: () => t('projects.subtitle'),
  ogType: 'website',
})
</script>

<template>
  <!-- ⚠️ <main> MƏCBURİDİR: `max-width`, `margin-inline: auto` və `--gutter`
       main.css-də `nav, main, footer` qaydasına bağlıdır. Əvvəl bura sadə <div> idi →
       səhifə ekranın sol kənarından başlayır və heç bir eni məhdudiyyəti yox idi. -->
  <main>
    <!-- Səhifə başlığı. Ana səhifədəki "asılı etiket" qrammatikası burada İŞLƏDİLMİR:
         orada h2 = etiket, çünki səhifənin əsl başlığı hero-dur. Burada isə səhifənin
         ÖZ bəyanatı h1-dir → böyük, display şrift, sol kənardan. -->
    <header class="page-head">
      <h1>{{ $t('projects.title') }}</h1>
      <p>{{ $t('projects.subtitle') }}</p>
    </header>

    <!-- `.exp-card` sinif əsaslıdır (struktur əsaslı deyil) → ana səhifə ilə EYNİ
         editorial siyahını heç nə təkrar yazmadan verir: xətt + sıxlıq, fon/kölgə yox. -->
    <div class="reveal">
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project"/>
    </div>
  </main>
</template>

<style scoped>
/* Səhifə başlığı — hero-nun kiçildilmiş forması (eyni məntiq: display şrift + sıx letter-spacing),
   amma hero deyil: burada "ton" yox, "harada olduğunu bil" funksiyası var. */
.page-head {
  margin: 0 0 clamp(2rem, 6vh, 3.5rem);
}

.page-head h1 {
  margin: 0;
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  letter-spacing: -.025em;
}

.page-head p {
  margin: .75rem 0 0;
  color: var(--muted);
  max-width: 48ch;
}
</style>
