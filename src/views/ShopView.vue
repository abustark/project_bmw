<template>
  <div class="bg-[hsl(var(--canvas))] min-h-screen">
    <!-- sticky control bar (uiverse /elements) -->
    <div class="sticky top-14 z-30 bg-[hsl(var(--canvas))]/90 backdrop-blur-xl border-b border-[hsl(var(--hairline))]">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- row 1: categories -->
        <div class="flex items-center gap-2 h-12 overflow-x-auto no-scrollbar">
          <button v-for="c in categories" :key="c.id" @click="category = c.id" :class="['h-8 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap border transition', category === c.id ? 'bg-[#5e6ad2] border-transparent text-white' : 'bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']">
            {{ c.label }} <span class="ml-1 opacity-60 tabular-nums">{{ count(c.id) }}</span>
          </button>
        </div>
        <!-- row 2: tags + sort + filters -->
        <div class="flex items-center gap-2 h-11 overflow-x-auto no-scrollbar">
          <button v-for="t in SHOP_TAGS" :key="t" @click="tag = tag === t ? '' : t" :class="['h-7 px-3 rounded-full text-xs whitespace-nowrap border transition', tag === t ? 'bg-[hsl(var(--ink))] border-transparent text-[hsl(var(--canvas))]' : 'border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']" :aria-pressed="tag === t">#{{ t }}</button>
          <div class="flex-1 min-w-4"></div>
          <select v-model="sortBy" class="h-8 px-3 pr-7 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs text-[hsl(var(--ink))] focus:outline-none focus:border-[#5e6ad2]" aria-label="Sort">
            <option value="popular">Popular</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
          <button @click="filtersOpen = true" class="h-8 px-3.5 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Filters</button>
        </div>
      </div>
    </div>

    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <!-- result line -->
      <div class="flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
        <span><span class="text-[hsl(var(--ink))] font-medium tabular-nums">{{ filtered.length }}</span> free components · every item ₹0</span>
        <span v-if="q" class="inline-flex items-center gap-1.5">“{{ q }}” <button @click="clearSearch" class="hover:text-[hsl(var(--ink))] underline underline-offset-4" aria-label="Clear search">×</button></span>
        <button v-if="tag || minRating || priceMax < 6000 || q" @click="resetFilters" class="hover:text-[hsl(var(--ink))] underline underline-offset-4">Reset</button>
      </div>

      <!-- dense grid -->
      <div v-if="filtered.length" class="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
      </div>
      <div v-else class="mt-10 rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-12 text-center">
        <div class="text-base font-medium text-[hsl(var(--ink))]">No components found</div>
        <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1">Try a different tag or clear filters.</div>
        <button @click="resetFilters" class="mt-4 h-9 px-5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Clear filters</button>
      </div>
    </div>

    <!-- filters drawer -->
    <div v-if="filtersOpen" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/60" @click="filtersOpen = false"></div>
      <div class="absolute right-0 top-0 h-full w-[300px] bg-[hsl(var(--card))] border-l border-[hsl(var(--hairline))] p-5 flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-[hsl(var(--ink))]">Filters</span>
          <button @click="filtersOpen = false" class="w-8 h-8 grid place-items-center rounded-[8px] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]" aria-label="Close filters">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div>
          <div class="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">PRICE (ESTIMATE)</div>
          <input type="range" min="0" max="6000" step="500" v-model.number="priceMax" class="w-full accent-[#5e6ad2] h-1" aria-label="Max price" />
          <div class="mt-2 flex justify-between text-xs text-[hsl(var(--ink-subtle))] tabular-nums">
            <span>₹0</span><span class="text-[hsl(var(--ink))] font-medium">≤ ₹{{ priceMax.toLocaleString('en-IN') }}</span>
          </div>
          <p class="mt-2 text-[11px] text-[hsl(var(--ink-subtle))]">Estimates — every item is ₹0</p>
        </div>
        <div>
          <div class="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">RATING</div>
          <div class="space-y-1.5">
            <label v-for="r in [0, 4, 4.5]" :key="r" class="flex items-center gap-2 text-sm text-[hsl(var(--ink-muted))] cursor-pointer hover:text-[hsl(var(--ink))]">
              <input type="radio" :value="r" v-model="minRating" class="accent-[#5e6ad2]" />
              <span>{{ r === 0 ? 'Any rating' : r + '+ stars' }}</span>
            </label>
          </div>
        </div>
        <button @click="resetFilters(); filtersOpen = false" class="mt-auto h-9 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Apply & reset</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '../data/products'
import { SHOP_TAGS } from '../data/previews'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const category = ref(route.query.cat || 'all')
const q = ref(route.query.q || '')
const tag = ref('')
const priceMax = ref(6000)
const minRating = ref(0)
const sortBy = ref('popular')
const filtersOpen = ref(false)

watch(() => route.query.cat, v => { category.value = v || 'all' })
watch(() => route.query.q, v => { q.value = v || '' })
watch(category, v => router.replace({ query: { ...route.query, cat: v === 'all' ? undefined : v } }))

function count(catId) {
  return catId === 'all' ? products.length : products.filter(p => p.category === catId).length
}

const filtered = computed(() => {
  let list = [...products]
  if (category.value !== 'all') list = list.filter(p => p.category === category.value)
  if (tag.value) list = list.filter(p => p.tags.some(t => t.toLowerCase().includes(tag.value.toLowerCase())))
  if (q.value) {
    const needle = q.value.toLowerCase()
    list = list.filter(p => [p.name, p.author, p.description, p.category, ...(p.tags || [])].join(' ').toLowerCase().includes(needle))
  }
  list = list.filter(p => (p.originalPrice ?? p.price) <= priceMax.value)
  if (minRating.value) list = list.filter(p => p.rating >= minRating.value)
  switch (sortBy.value) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break
    case 'price-desc': list.sort((a, b) => b.price - a.price); break
    case 'rating': list.sort((a, b) => b.rating - a.rating); break
    case 'newest': list.sort((a, b) => b.id - a.id); break
    default: list.sort((a, b) => b.sales - a.sales)
  }
  return list
})

function resetFilters() {
  category.value = 'all'; tag.value = ''; priceMax.value = 6000; minRating.value = 0; sortBy.value = 'popular'
  clearSearch()
}
function clearSearch() {
  q.value = ''
  if (route.query.q) router.replace({ query: { ...route.query, q: undefined } })
}
</script>
