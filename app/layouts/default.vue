<template>
  <div>
    <nav class="nav">
      <NuxtLink :to="localePath('/')" class="nav__brand">rahimasalman</NuxtLink>
      <div class="nav__right">
        <div class="nav__links">
          <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
          <!-- Ayrıca siyahı səhifəsi ƏVƏZİNƏ ana səhifədəki bölməyə enir: 4 layihə üçün
               ayrı səhifə ziyarətçini boş yerə bir klik uzaqlaşdırırdı. `/projects` özü qalır
               (prerender + SEO), sadəcə məcburi keçid nöqtəsi deyil. -->
          <NuxtLink class="nav__anchor" :to="localePath('/') + '#projects'">{{ $t('nav.projects') }}</NuxtLink>
        </div>

        <button
            class="theme-toggle"
            type="button"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- ClientOnly: ikon yalnız client-də hydration-dan sonra render olunur → SSG/SSR mismatch YOX -->
          <ClientOnly>
            <span v-if="theme === 'dark'" aria-hidden="true">☀</span>
            <span v-else aria-hidden="true">🌙</span>
            <template #fallback><span aria-hidden="true">🌓</span></template>
          </ClientOnly>
        </button>

        <div class="lang" ref="langRef">
          <button class="lang__toggle" @click="isOpen = !isOpen" :aria-expanded="isOpen">
            {{ locale.toUpperCase() }}
            <span class="lang__caret">⌄</span>
          </button>
          <ul v-if="isOpen" class="lang__menu">
            <li v-for="l in locales" :key="l.code">
              <NuxtLink
                  :to="switchLocalePath(l.code)"
                  :class="{ 'is-active': l.code === locale }"
                  @click="isOpen = false"
              >{{ l.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
    <!-- Footer HƏR səhifədə görünür → əlaqə ikonlarının yeri buradır.
         E-poçt mətn kimi yazılmır (ikon), sosial linklər də eyni formadadır —
         layihə kartları və Contact bölməsi ilə eyni lüğət. -->
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Rahima Salman</p>
      <div class="footer__icons">
        <a
            class="footer__icon"
            href="https://github.com/rahimasalman"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
        ><IconGithub/></a>
        <a
            class="footer__icon"
            href="https://www.linkedin.com/in/rahima-salman/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
        ><IconLinkedin/></a>
        <a class="footer__icon" href="mailto:hello.rahimasalman@gmail.com" aria-label="Email"><IconMail/></a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const { theme, toggleTheme } = useTheme()

const isOpen = ref(false)
const langRef = ref<HTMLElement | null>(null)

function onClickOutside(e: MouseEvent) {
  if (langRef.value && !langRef.value.contains(e.target as Node)) isOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
/* Footer artıq yalnız müəllif hüququdur → geri çəkilməlidir.
   Əvvəl ink rəngdə və adi ölçüdə idi, yəni Contact bəyanatı ilə eyni səs tonunda danışırdı. */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;   /* müəllif hüququ solda, ikonlar sağda */
  flex-wrap: wrap;
  gap: 1rem;
  padding-block: clamp(2rem, 6vh, 3.5rem);
  font-size: .8rem;
  color: var(--muted);
}

.footer p { margin: 0; }

.footer__icons { display: flex; gap: 1.1rem; }

.footer__icon {
  display: inline-flex;
  color: var(--muted);
  transition: color .2s, transform .2s ease;
}

.footer__icon svg { width: 18px; height: 18px; display: block; }

.footer__icon:hover { color: var(--accent); transform: translateY(-1px); }

/* mətnsiz linkdə klaviatura fokusu GÖRÜNMƏLİDİR */
.footer__icon:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  color: var(--accent);
}

.nav { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-block: 1.25rem; }
.nav__brand { font-family: var(--font-display), sans-serif; font-size: 1.25rem;  text-decoration: none}
.nav__right { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
.nav__links { display: flex; gap: 1.25rem; font-size: .95rem; }
.nav__links a { text-decoration: none; transition: color .2s; }
/* 🐞 `.nav__anchor` istisnası: "Projects" artıq ayrıca səhifə deyil, ana səhifədəki
   BÖLMƏYƏ enən lövbərdir (`/#projects`). Vue Router lövbəri yox sayır — onun üçün bu
   marşrut sadəcə `/`-dır → ana səhifədə HƏM Home, HƏM Projects `router-link-active`
   alırdı, yəni ikisi də aktiv görünürdü. Aktiv halı yalnız əsl marşrutlara veririk. */
.nav__links a:hover,
.nav__links a.router-link-active:not(.nav__anchor) { color: var(--accent); }

.theme-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; border-radius: 999px;
  background: none; border: 1px solid var(--border);
  color: var(--ink); cursor: pointer; font-size: .9rem; line-height: 1;
  transition: border-color .2s, background .2s;
}
.theme-toggle:hover { border-color: var(--accent); background: var(--hover); }

.lang { position: relative; }
.lang__toggle {
  display: flex; align-items: center; gap: .3rem;
  background: none; border: 1px solid var(--border); border-radius: 999px;
  padding: .3rem .7rem; font-size: .72rem; letter-spacing: .05em;
  color: var(--ink); cursor: pointer; transition: border-color .2s;
}
.lang__toggle:hover { border-color: var(--accent); }
.lang__caret { display: inline-flex; align-items: center; line-height: 1; font-size: .6rem; opacity: .6; padding-bottom:6px}
.lang__menu {
  position: absolute; top: calc(100% + .5rem); right: 0;
  background: var(--card); border: 1px solid var(--border-soft); border-radius: .6rem;
  padding: .35rem; min-width: 8rem; box-shadow: 0 8px 24px var(--shadow);
  display: flex; flex-direction: column; gap: .1rem; z-index: 20;
  list-style: none; margin: 0;
}
.lang__menu a {
  display: block; padding: .4rem .6rem; border-radius: .4rem;
  font-size: .82rem; text-decoration: none; color: var(--ink); transition: background .15s;
}
.lang__menu a:hover { background: var(--hover); }
.lang__menu a.is-active { color: var(--accent); font-weight: 500; }  /* 600 ayrıca fayl tələb edirdi — 500 onsuz da yüklüdür */
</style>
