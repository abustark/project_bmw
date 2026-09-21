<template>
  <div class="bg-[hsl(var(--canvas))]">
    <!-- HERO — Linear: centered, single accent, screenshot protagonist -->
    <section class="px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20">
      <div class="max-w-[760px] mx-auto text-center flex flex-col items-center gap-5">
        <router-link to="/about" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] transition">
          <span class="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" aria-hidden="true"></span>
          Reference — 14 open-source drops
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </router-link>

        <h1 class="font-display font-semibold text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.02] tracking-[-1.6px] lg:tracking-[-2px] text-[hsl(var(--ink))]" style="text-wrap: balance">
          Digital products<br /><span class="font-light text-[hsl(var(--ink-muted))]">that ship faster.</span>
        </h1>

        <p class="text-base lg:text-lg leading-relaxed text-[hsl(var(--ink-muted))] max-w-[520px] text-pretty">
          A curated showcase of free, open-source UI — extracted and rendered in this page. Every drop is ₹0.
        </p>

        <div class="flex flex-wrap gap-3 justify-center">
          <router-link to="/shop" class="inline-flex items-center justify-center h-9 px-5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition">Explore the catalog</router-link>
          <a href="#how" class="inline-flex items-center justify-center h-9 px-5 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">How it works</a>
        </div>
      </div>

      <!-- product screenshot panel with faux chrome -->
      <div class="max-w-[1040px] mx-auto mt-10 lg:mt-14">
        <div class="rounded-[16px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-2">
          <div class="rounded-[10px] overflow-hidden border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
            <div class="flex items-center gap-1.5 h-9 px-3 border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
              <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
              <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
              <span class="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]"></span>
              <span class="mx-auto text-[10px] font-mono text-[hsl(var(--ink-subtle))] tracking-wide">n-gelo.shop</span>
            </div>
            <img :src="`${base}hero-reference.png`" alt="N-GELO catalog — extracted open-source components" width="1040" height="585" class="w-full aspect-[16/9] object-cover" loading="eager" @error="e => (e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1040&q=80&auto=format&fit=crop')" />
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
          <span>The catalog — every card extracted from open source</span>
          <span class="tabular-nums">14 · ₹0</span>
        </div>
      </div>
    </section>

    <!-- SOURCES STRIP — Linear logo-strip pattern, doubles as attribution -->
    <section class="mt-14 lg:mt-20 border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/40">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <p class="text-center text-[11px] tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">CURATED FROM OPEN SOURCE</p>
        <div class="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-[880px] mx-auto">
          <span v-for="s in sources" :key="s" class="text-sm text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] transition" translate="no">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Browse by craft</h2>
        <router-link to="/shop" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">View all →</router-link>
      </div>
      <div class="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <router-link v-for="c in categories" :key="c.id" :to="`/shop?cat=${c.id}`" class="group rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-4 hover:bg-[hsl(var(--surface-2))] transition">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-[hsl(var(--ink))]">{{ c.label }}</span>
            <span class="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">{{ count(c.id) }}</span>
          </div>
          <div class="mt-6 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
            <span>₹0 · free</span>
            <svg class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </div>
        </router-link>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Featured</h2>
        <router-link to="/shop" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">All drops →</router-link>
      </div>
      <div class="mt-5 grid md:grid-cols-3 gap-5">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16 scroll-mt-20">
      <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-8 grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-4">
          <div class="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">HOW IT WORKS</div>
          <h3 class="mt-2 font-display text-2xl font-semibold leading-tight text-[hsl(var(--ink))]">Found in the open.<br />Rendered here.</h3>
          <p class="mt-3 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">Each drop is extracted from a free, open-source project and rebuilt inside this site — with the source named on its card.</p>
          <router-link to="/shop" class="mt-5 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Explore</router-link>
        </div>
        <div class="lg:col-span-8 grid sm:grid-cols-3 gap-4">
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
            <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">1</div>
            <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Discover</div>
            <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Filter by craft, price or rating.</div>
          </div>
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
            <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">2</div>
            <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Add — ₹0</div>
            <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Cart and checkout are demos; totals stay ₹0.</div>
          </div>
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
            <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">3</div>
            <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Build</div>
            <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Copy snippets from each product page.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRESH -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Fresh in the lab</h2>
        <router-link to="/shop?sort=newest" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">Newest →</router-link>
      </div>
      <div class="mt-5 grid md:grid-cols-4 gap-5">
        <ProductCard v-for="p in recent" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="rounded-[16px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] py-14 px-6 text-center">
        <h2 class="font-display text-2xl lg:text-3xl font-semibold tracking-tight text-[hsl(var(--ink))]" style="text-wrap: balance">Start building — everything is ₹0.</h2>
        <p class="mt-3 text-sm text-[hsl(var(--ink-muted))]">14 open-source drops · extracted · rendered in this page · not for sale</p>
        <router-link to="/shop" class="mt-6 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Browse the catalog</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const base = import.meta.env.BASE_URL
const cart = useCartStore()
const featured = computed(() => products.filter(p => p.featured))
const recent = computed(() => [...products].sort((a, b) => b.id - a.id).slice(0, 4))
const sources = ['shadcn/ui', 'Radix', 'Heroicons', 'Lucide', 'Flowbite', 'daisyUI', 'AstroWind', 'Vercel', 'Cruip', 'Uiverse', 'CSS Loaders', 'LottieFiles', 'Motion', 'View Transitions']

function count(catId) {
  return catId === 'all' ? products.length : products.filter(p => p.category === catId).length
}
</script>
