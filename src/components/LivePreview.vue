<template>
  <div ref="stage" :class="['pv-stage', size === 'full' ? 'pv-stage--full' : '', 'pv-k-' + kind, failed ? 'pv-failed' : '']">
    <div v-html="html"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { PREVIEWS, installPreviewStyles, importUrl, LOTTIE_SRC, LOTTIE_CDN, MOTION_CDN } from '../data/previews'

const props = defineProps({
  kind: { type: String, default: 'shadcn-buttons' },
  size: { type: String, default: 'card' }, // 'card' | 'full'
})

installPreviewStyles()

const stage = ref(null)
const failed = ref(false)
const html = computed(() => PREVIEWS[props.kind]?.html || '')

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error('cdn timeout')), ms))])
}

onMounted(async () => {
  if (props.kind === 'lottie-cdn') {
    try {
      const mod = await withTimeout(importUrl(LOTTIE_CDN), 5000)
      const canvas = stage.value?.querySelector('canvas')
      if (!canvas) throw new Error('no canvas')
      new mod.DotLottie({ canvas, src: LOTTIE_SRC, autoplay: true, loop: true })
    } catch {
      failed.value = true
    }
  }
  if (props.kind === 'motion-spring') {
    try {
      const mod = await withTimeout(importUrl(MOTION_CDN), 5000)
      const el = stage.value?.querySelector('.pv-motion-box')
      if (!el || !mod.animate) throw new Error('no motion')
      mod.animate(el, { x: [-40, 40] }, { duration: 1.2, repeat: Infinity, repeatType: 'mirror' })
    } catch {
      failed.value = true // CSS fallback spring
    }
  }
})
</script>
