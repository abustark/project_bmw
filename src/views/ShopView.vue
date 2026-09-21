<template>
  <div class="bg-[hsl(var(--canvas))] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl lg:text-3xl font-semibold tracking-tight text-[hsl(var(--ink))]">Shop</h1>
          <p class="text-sm text-[hsl(var(--ink-subtle))] mt-1">{{ filtered.length }} free drops · {{ activeCategoryLabel }} · {{ sortLabel }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <select v-model="sortBy" class="h-9 px-4 pr-8 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm text-[hsl(var(--ink))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2]" aria-label="Sort products">
            <option value="popular">Most popular</option>
            <option value="rating">Highest rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest</option>
          </select>
          <button @click="showFilters = !showFilters" class="lg:hidden h-9 px-4 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm font-medium text-[hsl(var(--ink))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" :aria-expanded="showFilters">Filters</button>
        </div>
      </div>

      <div class="mt-6 grid lg:grid-cols-12 gap-6">
        <aside :class="['lg:col-span-3 space-y-4', showFilters ? 'block' : 'hidden lg:block']">
          <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div class="font-medium text-sm text-[hsl(var(--ink))]">Categories</div>
            <div class="mt-3 space-y-1">
              <button v-for="c in categories" :key="c.id" @click="category = c.id" :class="['w-full text-left px-3 py-2.5 rounded-[8px] text-sm flex justify-between items-center transition', category === c.id ? 'bg-[#5e6ad2] text-white' : 'hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] border border-transparent']">
                <span>{{ c.label }}</span><span class="text-xs opacity-60">{{ c.id === 'all' ? products.length : products.filter(p => p.category === c.id).length }}</span>
              </button>
            </div>
          </div>

          <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div class="font-medium text-sm text-[hsl(var(--ink))]">Price</div>
            <div class="mt-3 flex items-center gap-3">
              <input type="range" min="0" max="6000" v-model.number="priceMax" class="flex-1 accent-[#5e6ad2] h-1" aria-label="Filter by reference value" />
              <span class="text-sm font-medium tabular-nums shrink-0 text-[hsl(var(--ink))]">≤ ₹{{ priceMax.toLocaleString('en-IN') }}</span>
            </div>
            <div class="mt-2 text-xs text-[hsl(var(--ink-subtle))]">Estimates — every item is ₹0</div>
          </div>

          <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div class="font-medium text-sm text-[hsl(var(--ink))]">Rating</div>
            <div class="mt-3 space-y-2">
              <label v-for="r in [4.5, 4, 0]" :key="r" class="flex items-center gap-2 text-sm cursor-pointer text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">
                <input type="radio" name="rating" :value="r" v-model="minRating" class="accent-[#5e6ad2]" />
                <span v-if="r === 0">Any rating</span><span v-else>{{ r }}+ stars</span>
              </label>
            </div>
          </div>

          <button @click="resetFilters" class="w-full h-9 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm font-medium hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Reset filters</button>
        </aside>

        <div class="lg:col-span-9">
          <div class="flex flex-col sm:flex-row gap-3 mb-4">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input v-model="search" placeholder="Search products, tags, authors…" class="w-full pl-10 pr-4 h-11 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2]" aria-label="Search products" />
            </div>
            <div class="flex gap-2 flex-wrap items-center">
              <span v-if="category !== 'all'" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5e6ad2] text-white text-xs">{{ categories.find(c => c.id === category)?.label }} <button @click="category = 'all'" class="ml-1 w-4 h-4 grid place-items-center rounded-full bg-white/20" aria-label="Clear category">×</button></span>
              <span v-if="search" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs text-[hsl(var(--ink-subtle))]">“{{ search }}” <button @click="search = ''" class="ml-1" aria-label="Clear search">×</button></span>
            </div>
          </div>

          <div v-if="!filtered.length" class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-10 text-center">
            <div class="text-lg font-medium text-[hsl(var(--ink))]">No drops found</div>
            <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1">Try adjusting filters or search.</div>
            <button @click="resetFilters" class="mt-4 inline-flex h-9 px-5 rounded-[8px] bg-[#5e6ad2] text-white text-sm font-medium">Clear filters</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ProductCard v-for="p in filtered" :key="p.id" :product="p" @add="cart.add($event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()

const category = ref(route.query.cat || 'all')
const search = ref(route.query.q || '')
const priceMax = ref(6000)
const minRating = ref(0)
const sortBy = ref('popular')
const showFilters = ref(false)

watch(category, v => router.replace({ query: { ...route.query, cat: v === 'all' ? undefined : v } }))
watch(search, v => router.replace({ query: { ...route.query, q: v || undefined } }))

// sync from URL (navbar search / category links while already on /shop)
watch(() => route.query.q, v => { if ((v || '') !== search.value) search.value = v || '' })
watch(() => route.query.cat, v => { if ((v || 'all') !== category.value) category.value = v || 'all' })

onMounted(() => {
  if (route.query.cat) category.value = route.query.cat
})

const activeCategoryLabel = computed(() => categories.find(c => c.id === category.value)?.label || 'All')
const sortLabel = computed(() => ({ popular: 'Most popular', rating: 'Highest rated', 'price-asc': 'Low to high', 'price-desc': 'High to low', newest: 'Newest' }[sortBy.value]))

const filtered = computed(() => {
  let list = [...products]
  if (category.value !== 'all') list = list.filter(p => p.category === category.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => [p.name, p.author, p.description, p.tags.join(' '), p.category].join(' ').toLowerCase().includes(q))
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
  category.value = 'all'; search.value = ''; priceMax.value = 6000; minRating.value = 0; sortBy.value = 'popular'
}
</script>
