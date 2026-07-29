<template>
  <div>
    <nav class="nav">
      <NuxtLink :to="localePath('/')" class="nav__brand">rahimasalman</NuxtLink>
      <div class="nav__right">
        <div class="nav__links">
          <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/activity')">{{ $t('nav.projects') }}</NuxtLink>
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
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Rahima Salman· <a href="mailto:rahimasalman7@gmail.com">rahimasalman7@gmail.com</a></p>
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
.nav { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-block: 1.25rem; }
.nav__brand { font-family: var(--font-display), sans-serif; font-size: 1.25rem;  text-decoration: none}
.nav__right { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
.nav__links { display: flex; gap: 1.25rem; font-size: .95rem; }
.nav__links a { text-decoration: none; transition: color .2s; }
.nav__links a:hover, .nav__links a.router-link-active { color: var(--accent); }

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
.lang__menu a.is-active { color: var(--accent); font-weight: 600; }
</style>
