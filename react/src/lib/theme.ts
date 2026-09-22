"use client"
// Linear-inspired theme: dark first, system default, manual override persisted.
import { useEffect, useState } from "react"

export type Theme = "system" | "light" | "dark"

function apply(t: Theme) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const dark = t === "dark" || (t === "system" && sysDark)
  root.classList.toggle("dark", dark)
  root.classList.toggle("light", t === "light")
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system")

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "system"
    setThemeState(stored)
    apply(stored)
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      const cur = (localStorage.getItem("theme") as Theme) || "system"
      if (cur === "system") apply("system")
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  function setTheme(t: Theme) {
    setThemeState(t)
    if (t === "system") localStorage.removeItem("theme")
    else localStorage.setItem("theme", t)
    apply(t)
  }

  return { theme, setTheme }
}
