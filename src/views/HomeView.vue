<template>
  <div class="bg-[hsl(var(--canvas))]">
    <!-- HERO — one line each + live mosaic -->
    <section class="px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
      <div class="max-w-[720px] mx-auto text-center flex flex-col items-center gap-4">
        <h1 class="font-display font-semibold text-[38px] sm:text-[48px] leading-[1.05] tracking-[-1.5px] text-[hsl(var(--ink))]" style="text-wrap: balance">
          The living library of <span class="font-light text-[hsl(var(--ink-muted))]">free UI</span>
        </h1>
        <p class="text-base text-[hsl(var(--ink-muted))] max-w-[460px]">Open-source components, extracted and rendered live in this page. Copy the code — free.</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <router-link to="/shop" class="h-9 px-5 inline-flex items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition">Browse components</router-link>
          <router-link to="/about" class="h-9 px-5 inline-flex items-center justify-center rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">What is this?</router-link>
        </div>
        <!-- stat chips (professional info, no prose) -->
        <div class="flex flex-wrap gap-2 justify-center text-[11px] text-[hsl(var(--ink-subtle))]">
          <span class="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b class="text-[hsl(var(--ink))] tabular-nums">14</b> components</span>
          <span class="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b class="text-[hsl(var(--ink))]">100%</b> free</span>
          <span class="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b class="text-[hsl(var(--ink))]">MIT / ISC</b> licensed</span>
          <span class="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] tabular-nums"><b class="text-[hsl(var(--ink))]">₹0</b> forever</span>
        </div>
      </div>

      <!-- live mosaic — real components playing, not a screenshot -->
      <div class="max-w-[1040px] mx-auto mt-10">
        <div class="rounded-[16px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-2">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div v-for="k in MOSAIC" :key="k" class="aspect-[4/3] rounded-[10px] border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))] overflow-hidden">
              <LivePreview :kind="k" />
            </div>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
          <span>Live — hover, click and toggle every one</span>
          <span class="tabular-nums">rendered in-page · no iframes</span>
        </div>
      </div>
    </section>

    <!-- CATEGORY CHIPS -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <router-link v-for="c in cats" :key="c.id" :to="`/shop?cat=${c.id}`" class="group flex items-center justify-between h-12 px-4 rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-2))] transition">
          <span class="text-sm font-medium text-[hsl(var(--ink))]">{{ c.label }}</span>
          <span class="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">{{ count(c.id) }}</span>
        </router-link>
      </div>
    </section>

    <!-- TABBED GRID — Featured / Trending / Recent (ui8) -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16 pb-14">
      <div class="flex items-center justify-between gap-4">
        <div class="flex gap-1 bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] rounded-[10px] p-1">
          <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id" :class="['h-8 px-4 rounded-[8px] text-sm font-medium transition', activeTab === t.id ? 'bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink))]' : 'text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']">{{ t.label }}</button>
        </div>
        <router-link to="/shop" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">All →</router-link>
      </div>
      <div class="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <ProductCard v-for="p in tabProducts" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- TAG MARQUEE (uiverse) -->
    <section class="border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/40 py-4 overflow-hidden">
      <div class="marquee flex gap-2 w-max">
        <span v-for="(t, i) in marqueeTags" :key="i" class="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs text-[hsl(var(--ink-subtle))] whitespace-nowrap">#{{ t }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products, categories } from '../data/products'
import { MOSAIC, SHOP_TAGS } from '../data/previews'
import ProductCard from '../components/ProductCard.vue'
import LivePreview from '../components/LivePreview.vue'

const cats = categories.filter(c => c.id !== 'all')
const activeTab = ref('featured')
const tabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'trending', label: 'Trending' },
  { id: 'recent', label: 'Recent' },
]
const tabProducts = computed(() => {
  if (activeTab.value === 'trending') return [...products].sort((a, b) => b.sales - a.sales).slice(0, 8)
  if (activeTab.value === 'recent') return [...products].sort((a, b) => b.id - a.id).slice(0, 8)
  return products.filter(p => p.featured).concat(products.filter(p => !p.featured)).slice(0, 8)
})
function count(catId) {
  return catId === 'all' ? products.length : products.filter(p => p.category === catId).length
}
const marqueeTags = [...SHOP_TAGS, ...SHOP_TAGS]
</script>
