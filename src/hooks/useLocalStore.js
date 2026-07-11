import { useEffect, useState } from 'react'

export function useLocalStore(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or unavailable — fail silently, data stays in memory
    }
  }, [key, value])

  return [value, setValue]
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('fade-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem('fade-theme', theme)
  }, [theme])

  return [theme, setTheme]
}
