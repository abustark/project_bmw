// Linear-inspired theme: dark first, system default, manual override persisted.
import { ref } from 'vue'

const theme = ref('system')

function apply(t) {
  const root = document.documentElement
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = t === 'dark' || (t === 'system' && sysDark)
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', t === 'light')
}

const inited = { done: false }

export function useTheme() {
  if (!inited.done) {
    inited.done = true
    const stored = localStorage.getItem('theme') || 'system'
    theme.value = stored
    apply(stored)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') apply('system')
    })
  }

  function setTheme(t) {
    theme.value = t
    if (t === 'system') localStorage.removeItem('theme')
    else localStorage.setItem('theme', t)
    apply(t)
  }

  return { theme, setTheme }
}
