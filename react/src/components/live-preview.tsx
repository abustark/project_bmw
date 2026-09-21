"use client"
import { useEffect, useRef, useState } from "react"
import { PREVIEWS, installPreviewStyles, importUrl, LOTTIE_SRC, LOTTIE_CDN, MOTION_CDN, type PreviewKind } from "@/data/previews"

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([promise, new Promise<T>((_, rej) => setTimeout(() => rej(new Error("cdn timeout")), ms))])
}

export function LivePreview({ kind, size = "card" }: { kind: PreviewKind | string; size?: "card" | "full" }) {
  installPreviewStyles()
  const stage = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const def = PREVIEWS[kind as PreviewKind]

  useEffect(() => {
    let alive = true
    if (kind === "lottie-cdn") {
      withTimeout(importUrl(LOTTIE_CDN), 5000)
        .then((mod) => {
          const canvas = stage.current?.querySelector("canvas")
          if (!alive || !canvas) throw new Error("no canvas")
          new mod.DotLottie({ canvas, src: LOTTIE_SRC, autoplay: true, loop: true })
        })
        .catch(() => alive && setFailed(true))
    }
    if (kind === "motion-spring") {
      withTimeout(importUrl(MOTION_CDN), 5000)
        .then((mod) => {
          const el = stage.current?.querySelector(".pv-motion-box")
          if (!alive || !el || !mod.animate) throw new Error("no motion")
          mod.animate(el, { x: [-40, 40] }, { duration: 1.2, repeat: Infinity, repeatType: "mirror" })
        })
        .catch(() => alive && setFailed(true)) // CSS fallback spring
    }
    return () => {
      alive = false
    }
  }, [kind])

  return (
    <div ref={stage} className={`pv-stage ${size === "full" ? "pv-stage--full" : ""} pv-k-${kind} ${failed ? "pv-failed" : ""}`}>
      <div dangerouslySetInnerHTML={{ __html: def?.html || "" }} />
    </div>
  )
}
