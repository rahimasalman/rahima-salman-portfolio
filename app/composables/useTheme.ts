export type Theme = 'light' | 'dark'

/**
 * Tema idarəetməsi (light/dark).
 *
 * Necə işləyir (SSG-də flash olmaması üçün 3 hissə birlikdə):
 *  1. nuxt.config-dəki inline <head> skripti boyanmadan ƏVVƏL <html data-theme>-i təyin edir
 *     (localStorage → sistem seçimi). Bu, ağ/qara flash-ı aradan qaldırır.
 *  2. Bu composable useState ilə reaktiv state saxlayır; onMounted-də <html>-dəki real
 *     dəyəri geri oxuyur ki, düymə ikonu düzgün göstərsin (hydration mismatch olmasın).
 *  3. toggle() həm DOM atributunu, həm localStorage-ı, həm state-i yeniləyir.
 */
export function useTheme() {
  // useState — SSR-friendly, komponentlər arası paylaşılan state (default: light)
  const theme = useState<Theme>('theme', () => 'light')

  onMounted(() => {
    // inline skript artıq real temanı <html>-ə yazıb — state-i ona uyğunlaşdır
    const applied = document.documentElement.getAttribute('data-theme') as Theme | null
    if (applied) theme.value = applied
  })

  function setTheme(value: Theme) {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('theme', value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
