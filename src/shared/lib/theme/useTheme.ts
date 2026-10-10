import { useState, useCallback } from 'react'
export type Theme = 'light' | 'dark'
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem('theme') as Theme) || 'light'
}
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    if (newTheme === 'light') {
      localStorage.removeItem('theme')
      delete document.documentElement.dataset.theme
    } else {
      localStorage.setItem('theme', newTheme)
      document.documentElement.dataset.theme = newTheme
    }
  }, [])
  return { theme, setTheme } as const
}
