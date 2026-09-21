<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- header -->
    <div class="flex flex-wrap gap-4 items-end justify-between">
      <div>
        <h1 class="font-display text-3xl font-bold">Shop <span class="text-base font-normal text-amber-700">— reference • ₹0</span></h1>
        <p class="text-sm text-zinc-500 mt-1">{{ filtered.length }} products • {{ activeCategoryLabel }} • sorted by {{ sortBy }}</p>
      </div>
      <div class="flex gap-2 items-center">
        <select v-model="sortBy" class="px-4 py-2.5 rounded-full border border-zinc-200 bg-white text-sm">
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="newest">Newest</option>
        </select>
        <button @click="showFilters=!showFilters" class="lg:hidden px-4 py-2.5 rounded-full border border-zinc-200 bg-white text-sm">Filters</button>
      </div>
    </div>

    <div class="mt-6 grid lg:grid-cols-12 gap-6">
      <!-- sidebar -->
      <aside :class="['lg:col-span-3 lg:block', showFilters ? 'block' : 'hidden']" class="space-y-4">
        <div class="card p-5">
          <div class="font-semibold text-sm">Categories</div>
          <div class="mt-3 space-y-1">
            <button v-for="c in categories" :key="c.id" @click="category=c.id" :class="['w-full text-left px-3 py-2 rounded-xl text-sm flex justify-between', category===c.id ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50']">
              <span>{{ c.label }}</span><span class="text-xs opacity-60">{{ c.id==='all' ? products.length : products.filter(p=>p.category===c.id).length }}</span>
            </button>
          </div>
        </div>

        <div class="card p-5">
          <div class="font-semibold text-sm">Reference value</div>
          <div class="text-xs text-zinc-500 mt-1">All items <span class="line-through">estimated</span> → <span class="font-bold text-emerald-700">₹0</span> • demo only</div>
          <div class="mt-3 flex items-center gap-2">
            <input type="range" min="0" max="6000" v-model.number="priceMax" class="flex-1 accent-zinc-900" />
            <span class="text-sm font-medium tabular-nums">≤ ₹{{ priceMax.toLocaleString('en-IN') }}</span>
          </div>
          <div class="mt-2 text-xs text-zinc-500">Filters estimated value (₹0 in cart)</div>
        </div>

        <div class="card p-5">
          <div class="font-semibold text-sm">Rating</div>
          <div class="mt-3 space-y-2">
            <label v-for="r in [4.5,4,0]" :key="r" class="flex items-center gap-2 text-sm">
              <input type="radio" name="rating" :value="r" v-model="minRating" class="accent-zinc-900" />
              <span v-if="r===0">Any rating</span><span v-else>≥ {{ r }} ★</span>
            </label>
          </div>
        </div>

        <div class="card p-5 border-amber-200 bg-amber-50">
          <div class="font-semibold text-sm text-amber-900">Reference • Not for sale</div>
          <div class="text-xs text-amber-800 mt-2 leading-relaxed">Open-source via original sites. Prices are <span class="line-through">estimates</span> → <span class="font-bold text-emerald-700">₹0</span>.<br/>Tap “View Source” to visit the source — no payment.</div>
        </div>

        <button @click="resetFilters" class="w-full btn-ghost">Reset filters</button>
      </aside>

      <!-- grid -->
      <div class="lg:col-span-9">
        <!-- search + active chips -->
        <div class="flex flex-wrap gap-2 items-center mb-4">
          <div class="relative flex-1 min-w-[220px]">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input v-model="search" placeholder="Search products, tags, authors…" class="w-full pl-10 pr-4 py-2.5 rounded-full border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900" />
          </div>
          <span v-if="category!=='all'" class="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs">{{ categories.find(c=>c.id===category)?.label }} <button @click="category='all'" class="ml-1">×</button></span>
          <span v-if="search" class="px-3 py-1.5 rounded-full bg-white border text-xs">“{{ search }}” <button @click="search=''" class="ml-1">×</button></span>
        </div>

        <div v-if="!filtered.length" class="card p-10 text-center">
          <div class="text-lg font-semibold">No products found</div>
          <div class="text-sm text-zinc-500">Try adjusting filters or search.</div>
          <button @click="resetFilters" class="mt-4 btn-primary">Clear filters</button>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" @add="cart.add($event)" />
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

watch(category, v => router.replace({ query: { ...route.query, cat: v==='all'? undefined : v }}))
watch(search, v => router.replace({ query: { ...route.query, q: v || undefined }}))

onMounted(()=>{
  if(route.query.cat) category.value = route.query.cat
})

const activeCategoryLabel = computed(()=> categories.find(c=>c.id===category.value)?.label || 'All')

const filtered = computed(()=>{
  let list = [...products]
  if(category.value!=='all') list = list.filter(p=>p.category===category.value)
  if(search.value){
    const q = search.value.toLowerCase()
    list = list.filter(p=> [p.name,p.author,p.description,p.tags.join(' '),p.category].join(' ').toLowerCase().includes(q))
  }
  list = list.filter(p=> (p.originalPrice ?? p.price) <= priceMax.value)
  if(minRating.value) list = list.filter(p=> p.rating >= minRating.value)
  switch(sortBy.value){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break
    case 'rating': list.sort((a,b)=>b.rating-a.rating); break
    case 'newest': list.sort((a,b)=>b.id-a.id); break
    default: list.sort((a,b)=>b.sales-a.sales)
  }
  return list
})

function resetFilters(){
  category.value='all'; search.value=''; priceMax.value=6000; minRating.value=0; sortBy.value='popular'
}
</script>
