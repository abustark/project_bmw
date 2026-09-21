<template>
  <div class="bg-[hsl(var(--canvas))]">
    <!-- HERO — Linear: dark canvas, surface-1 screenshot, no amber -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-7 flex flex-col gap-5">
          <div class="inline-flex flex-wrap items-center gap-2 self-start">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink-subtle))]">
              <span class="w-2 h-2 rounded-full bg-[#5e6ad2]"></span>
              Reference · 14 free
            </span>
            <span class="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#5e6ad2] text-white text-[11px] tracking-widest font-medium">MIT · ISC · FREE</span>
            <span class="inline-flex items-center gap-1 text-xs text-[hsl(var(--ink-subtle))]"><span class="line-through opacity-60">₹4,999</span> → <span class="font-medium text-[hsl(var(--ink))]">₹0</span></span>
          </div>

          <h1 class="font-display font-semibold text-[36px] sm:text-[48px] lg:text-[56px] leading-[0.95] tracking-[-1.4px] lg:tracking-[-1.8px] text-[hsl(var(--ink))]" style="text-wrap: balance">
            Digital products<br />
            <span class="font-light text-[hsl(var(--ink-muted))]">that ship</span> faster.
          </h1>

          <p class="text-[16px] lg:text-[17px] leading-7 text-[hsl(var(--ink-muted))] max-w-[560px] text-pretty">
            <span class="font-medium text-[hsl(var(--ink))]">N-GELO</span> — 14 free & open-source drops from
            <span translate="no">shadcn/ui, Radix, Vercel</span> · extracted & rendered here ·
            <span class="line-through opacity-60">₹4,999</span> → <span class="font-medium text-[hsl(var(--ink))]">₹0</span> demo.
          </p>

          <div class="flex flex-wrap gap-3 pt-1">
            <router-link to="/shop" class="inline-flex items-center justify-center h-9 px-5 rounded-[8px] bg-[#5e6ad2] text-white text-sm font-medium hover:bg-[#828fff] transition">Explore references →</router-link>
            <a href="#how" class="inline-flex items-center justify-center h-9 px-5 rounded-[8px] border border-[hsl(var(--hairline))] bg-transparent text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">How it works</a>
          </div>

          <div class="flex flex-wrap gap-6 pt-4 border-t border-[hsl(var(--hairline))] mt-2 text-sm">
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2">
                <img v-for="i in 3" :key="i" :src="`https://i.pravatar.cc/100?img=${10 + i}`" :alt="`Buyer ${i}`" width="32" height="32" class="w-8 h-8 rounded-full border-2 border-[hsl(var(--canvas))] object-cover" loading="lazy" />
              </div>
              <div class="leading-tight">
                <div class="font-medium text-[hsl(var(--ink))]">4.9/5 average</div>
                <div class="text-xs text-[hsl(var(--ink-subtle))]">12k+ sales · 4,500+ builders</div>
              </div>
            </div>
            <div class="hidden sm:flex items-center gap-3 pl-6 border-l border-[hsl(var(--hairline))]">
              <span class="text-xs tracking-widest font-medium text-[hsl(var(--ink-subtle))]">SYSTEM</span>
              <span class="text-sm font-medium text-[hsl(var(--ink))]">Dark · Light · Auto</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <!-- Linear product screenshot card -->
          <div class="relative rounded-[16px] overflow-hidden bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-3">
            <img :src="`${base}hero-reference.png`" alt="Reference preview — extracted components" width="900" height="675" class="w-full aspect-[4/3] object-cover rounded-[12px] border border-[hsl(var(--hairline))]" @error="e => (e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop')" loading="eager" />
            <div class="absolute bottom-3 left-3 right-3 bg-[hsl(var(--card))]/90 backdrop-blur rounded-[12px] border border-[hsl(var(--hairline))] p-3 flex items-center gap-3">
              <img src="https://i.pravatar.cc/100?img=12" alt="" width="36" height="36" class="w-9 h-9 rounded-full object-cover" />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium leading-none truncate text-[hsl(var(--ink))]">shadcn/ui — extracted</div>
                <div class="text-xs text-[hsl(var(--ink-subtle))]">MIT · rendered here</div>
              </div>
              <span class="w-2 h-2 rounded-full bg-[#5e6ad2] shrink-0" aria-hidden="true"></span>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
            <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#5e6ad2]"></span> 14 reference</span>
            <span class="tabular-nums">₹0 · free</span>
            <span class="hidden sm:inline">No outbound</span>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BAR — Linear surface-1, hairline -->
    <section class="border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-between">
        <div class="flex flex-wrap gap-6 text-sm">
          <span class="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]"><span class="w-6 h-6 rounded-[6px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">14</span> <span class="font-medium text-[hsl(var(--ink))]">Reference</span> curated</span>
          <span class="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]"><span class="w-6 h-6 rounded-[6px] bg-[#5e6ad2] text-white grid place-items-center text-xs">₹</span> <span class="font-medium text-[hsl(var(--ink))]">₹0</span> free</span>
          <span class="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]"><span class="w-6 h-6 rounded-[6px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-xs text-[#5e6ad2]">★</span> <span class="font-medium text-[hsl(var(--ink))]">4.9</span> avg</span>
        </div>
        <div class="text-xs tracking-widest font-medium text-[hsl(var(--ink-subtle))]">LINEAR-INSPIRED · DARK FIRST · SYSTEM</div>
      </div>
    </section>

    <!-- REFERENCE EXPLAINER — subtle, not amber warming -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-7">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <div class="lg:w-[36%]">
            <div class="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">REFERENCE</div>
            <h2 class="mt-2 text-xl font-semibold leading-tight text-[hsl(var(--ink))]" style="text-wrap: balance">14 free drops · <span class="line-through opacity-60 text-[hsl(var(--ink-subtle))]">₹4,999</span> → <span class="text-[hsl(var(--ink))]">₹0</span></h2>
            <p class="mt-2 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">Free & open-source · <span class="font-medium text-[hsl(var(--ink))]">MIT / ISC / Free</span> · no charge · extracted & rendered here · source on card.</p>
          </div>
          <div class="flex-1 grid sm:grid-cols-3 gap-3 w-full">
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
              <div class="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">1</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Source on card</div>
              <div class="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Name only · no link · stays here</div>
            </div>
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
              <div class="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">2</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Rendered here</div>
              <div class="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Extracted UI in page</div>
            </div>
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
              <div class="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">3</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Attribution</div>
              <div class="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Rights remain originals</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Browse by craft</h2>
        <router-link to="/shop" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] underline decoration-[hsl(var(--hairline))] underline-offset-4">View all →</router-link>
      </div>
      <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <router-link v-for="c in categories" :key="c.id" :to="`/shop?cat=${c.id}`" class="group rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-4 hover:bg-[hsl(var(--surface-2))] transition flex flex-col gap-3">
          <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-sm text-[hsl(var(--ink))]">⧉</div>
          <div>
            <div class="font-medium text-sm leading-none text-[hsl(var(--ink))] group-hover:underline underline-offset-4">{{ c.label }}</div>
            <div class="text-xs text-[hsl(var(--ink-subtle))] mt-1">{{ products.filter(p => (c.id === 'all' || p.category === c.id)).length }} · ₹0</div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Featured <span class="text-[hsl(var(--ink-subtle))] font-normal text-sm">· staff picks · free</span></h2>
      </div>
      <div ref="featuredRef" class="mt-4 grid md:grid-cols-3 gap-5">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
    </section>

    <!-- HOW IT WORKS — Linear surface -->
    <section id="how" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-8">
        <div class="grid lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4">
            <div class="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">HOW IT WORKS</div>
            <h3 class="mt-2 font-display text-2xl font-semibold leading-tight text-[hsl(var(--ink))]">Sellers upload.<br />Builders ship.</h3>
            <p class="mt-3 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">Payouts 14th & 21st · reports · FAQs · Linear-inspired dark-first.</p>
            <router-link to="/shop" class="mt-5 inline-flex h-9 px-5 rounded-[8px] bg-[#5e6ad2] text-white text-sm font-medium hover:bg-[#828fff]">Explore</router-link>
          </div>
          <div class="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
              <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">1</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Discover</div>
              <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Category · price · rating · no account to browse.</div>
            </div>
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
              <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">2</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Add · ₹0</div>
              <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Cart demo · total <span class="font-medium text-[hsl(var(--ink))]">₹0</span> always.</div>
            </div>
            <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
              <div class="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">3</div>
              <div class="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Build</div>
              <div class="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Copy code · preview here · dashboard.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRESH -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-semibold text-[hsl(var(--ink))]">Fresh in lab</h2>
        <router-link to="/shop?sort=newest" class="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] underline decoration-[hsl(var(--hairline))] underline-offset-4">Newest</router-link>
      </div>
      <div class="mt-4 grid md:grid-cols-4 gap-5">
        <ProductCard v-for="p in recent" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>

      <div class="mt-8 rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-8 grid lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-7">
          <div class="inline-flex px-3 py-1 rounded-full bg-[#5e6ad2] text-white text-xs tracking-widest font-medium">COMPONENT LAB</div>
          <h3 class="mt-3 font-display text-2xl font-semibold text-[hsl(var(--ink))]">From Figma to code.</h3>
          <p class="mt-2 text-sm leading-relaxed text-[hsl(var(--ink-muted))] max-w-[560px]">Tailwind · shadcn · Motion · dark + light · extracted here.</p>
          <pre class="mt-4 rounded-[8px] bg-[#010102] text-[#f7f8f8] border border-[#23252a] p-4 text-xs font-mono leading-relaxed overflow-auto">&lt;Button variant="pill" size="lg"&gt;
  Ship faster →
&lt;/Button&gt;</pre>
          <div class="mt-4 flex flex-wrap gap-3">
            <router-link to="/shop?cat=components" class="inline-flex h-9 px-5 rounded-[8px] bg-[#5e6ad2] text-white text-sm font-medium hover:bg-[#828fff]">Explore components</router-link>
            <span class="self-center text-xs text-[hsl(var(--ink-subtle))]">Vue · React · Tailwind</span>
          </div>
        </div>
        <div class="lg:col-span-5 grid grid-cols-3 gap-3">
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
            <div class="font-semibold text-lg text-[hsl(var(--ink))]">120</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Buttons</div>
          </div>
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
            <div class="font-semibold text-lg text-[hsl(var(--ink))]">60</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Loaders</div>
          </div>
          <div class="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
            <div class="font-semibold text-lg text-[hsl(var(--ink))]">45</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Motions</div>
          </div>
          <div class="col-span-3 rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-3 text-xs leading-relaxed text-[hsl(var(--ink-subtle))]">
            <span class="font-medium text-[hsl(var(--ink))]">Free · MIT/ISC:</span> source on card · no outbound.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'
const base = import.meta.env.BASE_URL
const cart = useCartStore()
const featured = computed(() => products.filter(p => p.featured))
const recent = computed(() => [...products].sort((a, b) => b.id - a.id).slice(0, 4))
const featuredRef = ref(null)
function scrollFeatured(dir) {
  featuredRef.value?.scrollBy({ left: dir * 320, behavior: 'smooth' })
}
</script>
