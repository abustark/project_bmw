<template>
  <div v-if="product" class="bg-[hsl(var(--canvas))] min-h-screen">
    <div class="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- breadcrumb -->
      <div class="text-xs text-[hsl(var(--ink-subtle))]">
        <router-link to="/shop" class="hover:text-[hsl(var(--ink))]">Shop</router-link>
        <span class="mx-1 opacity-40">/</span>
        <router-link :to="`/shop?cat=${product.category}`" class="hover:text-[hsl(var(--ink))]">{{ categoryLabel }}</router-link>
      </div>

      <!-- title row (21st.dev) -->
      <div class="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-[hsl(var(--ink))]" style="text-wrap: balance">{{ product.name }}</h1>
          <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[hsl(var(--ink-subtle))]">
            <span>by <span class="font-medium text-[hsl(var(--ink))]" translate="no">{{ product.author }}</span></span>
            <span class="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span class="tabular-nums">★ {{ product.rating }}</span>
            <span class="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span class="tabular-nums">{{ formatUses(product.sales) }} uses</span>
            <span class="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span>updated {{ product.updated }}</span>
            <span class="px-2 py-0.5 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] font-medium">{{ product.license }}</span>
          </div>
        </div>
        <!-- actions -->
        <div class="flex flex-wrap gap-2">
          <button @click="copyCode" class="h-9 px-4 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
            {{ copied ? 'Copied ✓' : 'Copy code' }}
          </button>
          <button @click="wish.toggle(product.id)" :aria-pressed="wish.has(product.id)" class="h-9 px-4 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
            {{ wish.has(product.id) ? '♥ Saved' : '♡ Save' }}
          </button>
          <button @click="cart.add(product)" class="h-9 px-4 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-2))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
            Add to cart · <span class="tabular-nums">₹0</span> <span class="line-through opacity-60">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
          </button>
        </div>
      </div>

      <!-- tabs: Preview / Code / Info (21st.dev) -->
      <div class="mt-6 flex gap-1 border-b border-[hsl(var(--hairline))]">
        <button v-for="t in ['Preview', 'Code', 'Info']" :key="t" @click="activeTab = t" :class="['px-4 py-2.5 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', activeTab === t ? 'border-[#5e6ad2] text-[hsl(var(--ink))]' : 'border-transparent text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']">{{ t }}</button>
      </div>

      <!-- PREVIEW -->
      <div v-if="activeTab === 'Preview'" class="mt-5 rounded-[16px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-2">
        <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))] overflow-hidden">
          <div class="flex items-center gap-1.5 h-9 px-3 border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
            <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
            <span class="mx-auto text-[10px] font-mono text-[hsl(var(--ink-subtle))]">live · rendered in this page</span>
          </div>
          <div class="min-h-[360px] grid place-items-center p-6">
            <LivePreview :kind="product.preview || 'shadcn-buttons'" size="full" />
          </div>
        </div>
      </div>

      <!-- CODE -->
      <div v-if="activeTab === 'Code'" class="mt-5">
        <div class="flex items-center gap-2 mb-3">
          <button v-for="f in codeFiles" :key="f.id" @click="codeFile = f.id" :class="['h-8 px-3.5 rounded-[8px] text-xs font-medium border transition', codeFile === f.id ? 'bg-[hsl(var(--ink))] border-transparent text-[hsl(var(--canvas))]' : 'border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']">{{ f.label }}</button>
          <div class="flex-1"></div>
          <button @click="copyCode" class="h-8 px-3.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">{{ copied ? 'Copied ✓' : 'Copy' }}</button>
        </div>
        <pre class="rounded-[12px] bg-[#010102] border border-[#23252a] p-0 overflow-auto text-xs font-mono leading-relaxed"><code><span v-for="(line, i) in activeCodeLines" :key="i" class="grid grid-cols-[3ch_1fr]"><span class="pr-4 text-right select-none text-[#3e3e44]">{{ i + 1 }}</span><span class="text-[#f7f8f8] whitespace-pre">{{ line }}</span></span></code></pre>
        <p class="mt-3 text-xs text-[hsl(var(--ink-subtle))]">
          Extracted from <span class="font-medium text-[hsl(var(--ink))]" translate="no">{{ product.referenceName }}</span> · {{ product.license }} · rendered live in the Preview tab — the code you copy is the code you see.
        </p>
      </div>

      <!-- INFO -->
      <div v-if="activeTab === 'Info'" class="mt-5 grid sm:grid-cols-2 gap-4">
        <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] p-5">
          <div class="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">ABOUT</div>
          <p class="text-sm text-[hsl(var(--ink-muted))] leading-relaxed">{{ product.description }}</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span v-for="t in product.tags" :key="t" class="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">#{{ t }}</span>
          </div>
        </div>
        <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] p-5">
          <div class="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">DETAILS</div>
          <dl class="text-sm space-y-2">
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">License</dt><dd class="font-medium text-[hsl(var(--ink))]">{{ product.license }} — free for unlimited use</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">Delivery</dt><dd class="font-medium text-[hsl(var(--ink))] text-right">{{ product.delivery }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">Files</dt><dd class="font-medium text-[hsl(var(--ink))] text-right">{{ (product.files || []).join(' · ') }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">Stack</dt><dd class="font-medium text-[hsl(var(--ink))] text-right">{{ (product.stack || []).join(' · ') }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">Updated</dt><dd class="font-medium text-[hsl(var(--ink))]">{{ product.updated }}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-[hsl(var(--ink-subtle))]">Price</dt><dd class="font-medium text-[hsl(var(--ink))] tabular-nums">₹0 <span class="line-through opacity-60 font-normal">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span></dd></div>
          </dl>
          <p class="mt-4 text-xs text-[hsl(var(--ink-subtle))] leading-relaxed">Reference — not for sale. All rights remain with the original authors.</p>
        </div>
      </div>

      <!-- similar drops (both sites have this rail) -->
      <div class="mt-10">
        <div class="flex items-baseline justify-between">
          <h2 class="text-base font-semibold text-[hsl(var(--ink))]">Similar drops</h2>
          <router-link to="/shop" class="text-xs font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">View all →</router-link>
        </div>
        <div class="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ProductCard v-for="p in similar" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-[920px] mx-auto px-4 py-20 text-center bg-[hsl(var(--canvas))]">
    <div class="text-lg font-medium text-[hsl(var(--ink))]">Product not found</div>
    <router-link to="/shop" class="mt-4 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Back to shop</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { products, categories } from '../data/products'
import { PREVIEWS } from '../data/previews'
import ProductCard from '../components/ProductCard.vue'
import LivePreview from '../components/LivePreview.vue'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const cart = useCartStore()
const wish = useWishlistStore()
const product = computed(() => products.find(p => String(p.id) === String(route.params.id)))
const activeTab = ref('Preview')
const codeFile = ref('html')
const copied = ref(false)

const categoryLabel = computed(() => categories.find(c => c.id === product.value?.category)?.label || product.value?.category)

const similar = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.id !== product.value.id && (p.category === product.value.category || p.tags.some(t => product.value.tags.includes(t))))
    .slice(0, 4)
})

const codeFiles = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'react', label: 'React' },
]

const activeCode = computed(() => {
  const def = PREVIEWS[product.value?.preview]
  if (!def) return ''
  return codeFile.value === 'html' ? def.html : codeFile.value === 'css' ? def.css : def.react
})
const activeCodeLines = computed(() => activeCode.value.split('\n'))

function formatUses(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(activeCode.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch { /* clipboard unavailable */ }
}
</script>
