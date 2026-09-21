<template>
  <div class="bg-[#fcfcf9] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <!-- header — clear, not crowded -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl lg:text-3xl font-bold tracking-tight">Shop <span class="text-sm font-normal text-amber-700 ml-2">— reference • ₹0</span></h1>
          <p class="text-sm text-zinc-500 mt-1">{{ filtered.length }} drops • {{ activeCategoryLabel }} • {{ sortLabel }}</p>
          <p class="text-xs text-amber-700 mt-1">All are extracted components • Source name on card • no outbound link • ₹0 demo</p>
        </div>
        <div class="flex gap-2 items-center">
          <select v-model="sortBy" class="h-10 px-4 pr-8 rounded-full border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900" aria-label="Sort products">
            <option value="popular">Most popular</option>
            <option value="rating">Highest rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest</option>
          </select>
          <button @click="showFilters = !showFilters" class="lg:hidden h-10 px-4 rounded-full border border-zinc-200 bg-white text-sm font-medium focus-visible:ring-2 focus-visible:ring-zinc-900" :aria-expanded="showFilters">Filters</button>
        </div>
      </div>

      <div class="mt-6 grid lg:grid-cols-12 gap-6">
        <!-- sidebar — clean, consistent cards -->
        <aside :class="['lg:col-span-3 space-y-4', showFilters ? 'block' : 'hidden lg:block']">
          <div class="rounded-[16px] bg-white border border-zinc-200 p-5">
            <div class="font-semibold text-sm">Categories</div>
            <div class="mt-3 space-y-1">
              <button v-for="c in categories" :key="c.id" @click="category = c.id" :class="['w-full text-left px-3 py-2.5 rounded-xl text-sm flex justify-between items-center transition', category === c.id ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50 border border-transparent hover:border-zinc-100']">
                <span>{{ c.label }}</span><span class="text-xs opacity-60">{{ c.id === 'all' ? products.length : products.filter(p => p.category === c.id).length }}</span>
              </button>
            </div>
          </div>

          <div class="rounded-[16px] bg-white border border-zinc-200 p-5">
            <div class="font-semibold text-sm">Reference value</div>
            <div class="text-xs text-zinc-500 mt-1">Estimated → <span class="font-bold text-emerald-700">₹0</span> demo</div>
            <div class="mt-3 flex items-center gap-3">
              <input type="range" min="0" max="6000" v-model.number="priceMax" class="flex-1 accent-zinc-900 h-1" aria-label="Filter by reference value" />
              <span class="text-sm font-medium tabular-nums shrink-0">≤ ₹{{ priceMax.toLocaleString('en-IN') }}</span>
            </div>
            <div class="mt-2 text-xs text-zinc-400">Filters estimated value (₹0 in cart)</div>
          </div>

          <div class="rounded-[16px] bg-white border border-zinc-200 p-5">
            <div class="font-semibold text-sm">Rating</div>
            <div class="mt-3 space-y-2">
              <label v-for="r in [4.5, 4, 0]" :key="r" class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="rating" :value="r" v-model="minRating" class="accent-zinc-900" />
                <span v-if="r === 0">Any rating</span><span v-else>≥ {{ r }} ★</span>
              </label>
            </div>
          </div>

          <div class="rounded-[16px] border border-amber-200 bg-amber-50 p-5">
            <div class="font-semibold text-sm text-amber-900">Reference • Not for sale</div>
            <div class="text-xs text-amber-800 mt-2 leading-relaxed">Extracted components rendered here. Source name on card only — no link, stays on site. Prices <span class="line-through">estimates</span> → <span class="font-bold text-emerald-700">₹0</span>.</div>
          </div>

          <button @click="resetFilters" class="w-full h-10 rounded-full border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-900">Reset filters</button>
        </aside>

        <!-- main grid -->
        <div class="lg:col-span-9">
          <!-- search + chips — single row, not crowded -->
          <div class="flex flex-col sm:flex-row gap-3 mb-4">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input v-model="search" placeholder="Search products, tags, authors…" class="w-full pl-10 pr-4 h-11 rounded-full border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900" aria-label="Search products" />
            </div>
            <div class="flex gap-2 flex-wrap items-center">
              <span v-if="category !== 'all'" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs">{{ categories.find(c => c.id === category)?.label }} <button @click="category = 'all'" class="ml-1 w-4 h-4 grid place-items-center rounded-full bg-white/20" aria-label="Clear category">×</button></span>
              <span v-if="search" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs">“{{ search }}” <button @click="search = ''" class="ml-1" aria-label="Clear search">×</button></span>
            </div>
          </div>

          <div v-if="!filtered.length" class="rounded-[16px] bg-white border border-zinc-200 p-10 text-center">
            <div class="text-lg font-semibold">No drops found</div>
            <div class="text-sm text-zinc-500 mt-1">Try adjusting filters or search.</div>
            <button @click="resetFilters" class="mt-4 btn-primary">Clear filters</button>
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
