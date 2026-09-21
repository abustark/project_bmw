<template>
  <div class="bg-[#fcfcf9]">
    <!-- HERO — clean 2-col, generous whitespace, no nested chaos -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-14 lg:pb-16">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- left: headline + copy -->
        <div class="lg:col-span-7 flex flex-col gap-5">
          <!-- badge: single line, not crowded -->
          <div class="inline-flex flex-wrap items-center gap-2 self-start">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              Reference Catalog — 14 drops • <span class="font-bold text-emerald-700">₹0</span>
            </span>
            <span class="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-zinc-900 text-white text-[11px] tracking-widest font-semibold">MIT • ISC • FREE</span>
          </div>

          <h1 class="font-display font-bold text-[36px] sm:text-[46px] lg:text-[52px] leading-[0.95] tracking-[-1.6px] lg:tracking-[-2.2px] text-zinc-900" style="text-wrap: balance">
            Digital products<br />
            <span class="font-light italic text-zinc-800">that ship</span> faster.
          </h1>

          <p class="text-[16px] lg:text-[17px] leading-7 text-zinc-600 max-w-[560px] text-pretty">
            <span class="font-semibold text-zinc-900">N-GELO</span> is a reference showcase — 14 free & open-source drops from
            <span translate="no">shadcn/ui, Radix, Tailwind Labs, Vercel</span> & more.
            Estimated <span class="line-through">₹4,999</span>
            → <span class="font-bold text-emerald-700">₹0</span>
            • Not for sale. Extracted components are rendered here — source name on card, no outbound link.
          </p>

          <div class="flex flex-wrap gap-3 pt-1">
            <router-link to="/shop" class="btn-primary px-7 py-3.5 text-[15px]">Explore references →</router-link>
            <a href="#how" class="btn-ghost px-7 py-3.5 text-[15px]">How it works</a>
          </div>

          <!-- trust — single row, not 3 cards, not crowded -->
          <div class="flex flex-wrap gap-6 pt-4 border-t border-zinc-100 mt-2 text-sm">
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2">
                <img v-for="i in 3" :key="i" :src="`https://i.pravatar.cc/100?img=${10 + i}`" :alt="`Buyer ${i}`" width="32" height="32" class="w-8 h-8 rounded-full border-2 border-white object-cover" loading="lazy" />
              </div>
              <div class="leading-tight">
                <div class="font-semibold">4.9/5 average</div>
                <div class="text-xs text-zinc-500">12k+ sales • 4,500+ buyers</div>
              </div>
            </div>
            <div class="hidden sm:flex items-center gap-3 pl-6 border-l border-zinc-100">
              <span class="text-xs tracking-widest font-semibold text-zinc-500">PAYOUTS</span>
              <span class="text-sm font-medium">14th & 21st</span>
              <span class="text-xs text-zinc-400">• Stripe / PayPal (demo)</span>
            </div>
          </div>
        </div>

        <!-- right: single hero visual — no stacked chaos below -->
        <div class="lg:col-span-5">
          <div class="relative rounded-[20px] overflow-hidden bg-white border border-zinc-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <img :src="`${base}hero-reference.png`" alt="Reference marketplace preview — extracted components shown here" width="900" height="675" class="w-full aspect-[4/3] object-cover" @error="e => (e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop')" loading="eager" />
            <!-- subtle overlay card — one, not two -->
            <div class="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-2xl border border-zinc-100 p-3 flex items-center gap-3 shadow-sm">
              <img src="https://i.pravatar.cc/100?img=12" alt="" width="36" height="36" class="w-9 h-9 rounded-full object-cover" />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold leading-none truncate">Aarav viewed shadcn/ui — extracted</div>
                <div class="text-xs text-zinc-500">Source: shadcn/ui (MIT) • just now</div>
              </div>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden="true"></span>
            </div>
          </div>
          <!-- single meta row below hero — not 2 cards -->
          <div class="mt-3 flex items-center justify-between text-xs text-zinc-500">
            <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-zinc-900"></span> 14 reference drops</span>
            <span class="tabular-nums">₹0 • demo • no payment</span>
            <span class="hidden sm:inline">Source name on card — no link</span>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BAR — thin, not 3 cards, clear differentiation -->
    <section class="border-y border-zinc-100 bg-white">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-between">
        <div class="flex flex-wrap gap-6 text-sm">
          <span class="inline-flex items-center gap-2"><span class="w-7 h-7 rounded-full bg-zinc-900 text-white grid place-items-center text-xs font-bold">14</span> <span class="font-medium">Reference drops</span> <span class="text-zinc-400">curated</span></span>
          <span class="inline-flex items-center gap-2"><span class="w-7 h-7 rounded-full bg-emerald-600 text-white grid place-items-center text-xs font-bold">₹</span> <span class="font-medium text-emerald-700">₹0 demo</span> <span class="text-zinc-400 line-through">₹4,999</span></span>
          <span class="inline-flex items-center gap-2"><span class="w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs">★</span> <span class="font-medium">4.9 avg rating</span> <span class="text-zinc-400">open-source</span></span>
        </div>
        <div class="text-xs tracking-widest font-semibold text-zinc-500">EXTRACTED • SHOWN HERE • NO OUTBOUND</div>
      </div>
    </section>

    <!-- REFERENCE EXPLAINER — 3 steps, airy, not heavy -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="rounded-[16px] border border-amber-200 bg-amber-50/70 p-6 lg:p-7">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <div class="lg:w-[36%]">
            <div class="text-xs tracking-[0.18em] font-semibold text-amber-800">REFERENCE SHOWCASE</div>
            <h2 class="mt-2 text-xl font-bold leading-tight" style="text-wrap: balance">14 free drops — <span class="line-through decoration-zinc-400">₹4,999</span> → <span class="text-emerald-700">₹0</span></h2>
            <p class="mt-2 text-sm leading-relaxed text-amber-900">Every product is <span class="font-semibold">free & open-source</span> (MIT / ISC / Free). Estimated prices strikethrough to <span class="font-bold text-emerald-700">₹0</span>. Nothing is charged. Extracted UI is rendered directly in our pages — source name on card only.</p>
          </div>
          <div class="flex-1 grid sm:grid-cols-3 gap-3 w-full">
            <div class="rounded-[12px] bg-white border border-amber-200 p-4">
              <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">1</div>
              <div class="mt-3 font-semibold text-sm">Source name only</div>
              <div class="text-xs text-zinc-600 mt-1 leading-relaxed">Card shows <span translate="no">shadcn/ui (MIT)</span> — extracted, no link. Stays on site.</div>
            </div>
            <div class="rounded-[12px] bg-white border border-amber-200 p-4">
              <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">2</div>
              <div class="mt-3 font-semibold text-sm">Rendered here</div>
              <div class="text-xs text-zinc-600 mt-1 leading-relaxed">Components, code & animation are embedded in our pages — not outbound.</div>
            </div>
            <div class="rounded-[12px] bg-white border border-amber-200 p-4">
              <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">3</div>
              <div class="mt-3 font-semibold text-sm">Attribution • MIT</div>
              <div class="text-xs text-zinc-600 mt-1 leading-relaxed">License on product page. All rights with original authors.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES — 4 on desktop, 2 on mobile, minimal cards -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-bold">Browse by craft</h2>
        <router-link to="/shop" class="text-sm font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">View all →</router-link>
      </div>
      <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <router-link v-for="c in categories" :key="c.id" :to="`/shop?cat=${c.id}`" class="group rounded-[16px] bg-white border border-zinc-200 p-4 hover:border-zinc-300 hover:shadow-sm transition flex flex-col gap-3">
          <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">⧉</div>
          <div>
            <div class="font-semibold text-sm leading-none group-hover:underline underline-offset-4">{{ c.label }}</div>
            <div class="text-xs text-zinc-500 mt-1">{{ products.filter(p => (c.id === 'all' || p.category === c.id)).length }} drops • ₹0</div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- FEATURED — 3 cols desktop, 1 mobile, generous gap -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-bold">Featured drops <span class="text-zinc-400 font-normal text-sm">— staff picks • ₹0</span></h2>
        <div class="hidden sm:flex gap-2">
          <button @click="scrollFeatured(-1)" aria-label="Scroll featured left" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50">‹</button>
          <button @click="scrollFeatured(1)" aria-label="Scroll featured right" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50">›</button>
        </div>
      </div>
      <div ref="featuredRef" class="mt-4 grid md:grid-cols-3 gap-5">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
    </section>

    <!-- HOW IT WORKS — light, not dark heavy 3-white-in-black -->
    <section id="how" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="rounded-[20px] border border-zinc-200 bg-white p-6 lg:p-8">
        <div class="grid lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4">
            <div class="text-xs tracking-[0.18em] font-semibold text-zinc-500">HOW IT WORKS</div>
            <h3 class="mt-2 font-display text-2xl font-bold leading-tight">Sellers upload.<br />Buyers build faster.</h3>
            <p class="mt-3 text-sm leading-relaxed text-zinc-600">Admins review reports, answer FAQs and process payouts on the 14th & 21st — exactly as in the original spec.</p>
            <router-link to="/shop" class="mt-5 inline-flex btn-primary">Start exploring</router-link>
          </div>
          <div class="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            <div class="rounded-2xl bg-zinc-50 border border-zinc-100 p-5">
              <div class="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">1</div>
              <div class="mt-3 font-semibold text-sm">Discover</div>
              <div class="text-sm text-zinc-600 mt-1 leading-relaxed">Filter by category • price (₹0) • rating. No account to browse.</div>
            </div>
            <div class="rounded-2xl bg-zinc-50 border border-zinc-100 p-5">
              <div class="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">2</div>
              <div class="mt-3 font-semibold text-sm">Add demo • ₹0</div>
              <div class="text-sm text-zinc-600 mt-1 leading-relaxed">Cart & checkout are demo — total always <span class="font-bold text-emerald-700">₹0</span>.</div>
            </div>
            <div class="rounded-2xl bg-zinc-50 border border-zinc-100 p-5">
              <div class="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">3</div>
              <div class="mt-3 font-semibold text-sm">Build faster</div>
              <div class="text-sm text-zinc-600 mt-1 leading-relaxed">Copy extracted code, preview in page, track sales in dashboard.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRESH — 4-col grid + single clean CTA card (not 2-col dark/light split) -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-display text-xl font-bold">Fresh in the lab</h2>
        <router-link to="/shop?sort=newest" class="text-sm font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">Newest first</router-link>
      </div>
      <div class="mt-4 grid md:grid-cols-4 gap-5">
        <ProductCard v-for="p in recent" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>

      <!-- single lab CTA — clean, not chaotic 2-tone -->
      <div class="mt-8 rounded-[20px] border border-zinc-200 bg-white p-6 lg:p-8 grid lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-7">
          <div class="inline-flex px-3 py-1 rounded-full bg-zinc-900 text-white text-xs tracking-widest font-bold">COMPONENT LAB — CODE</div>
          <h3 class="mt-3 font-display text-2xl font-bold">From Figma to code.</h3>
          <p class="mt-2 text-sm leading-relaxed text-zinc-600 max-w-[560px]">Copy-paste production code — Tailwind, shadcn, Framer Motion. Dark mode, a11y, typed. Extracted & shown here.</p>
          <pre class="mt-4 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono leading-relaxed overflow-auto">&lt;Button variant="pill" size="lg"&gt;
  Ship faster →
&lt;/Button&gt;</pre>
          <div class="mt-4 flex flex-wrap gap-3">
            <router-link to="/shop?cat=components" class="btn-primary">Explore components</router-link>
            <span class="self-center text-xs text-zinc-500">Vue SFC • React TSX • Tailwind</span>
          </div>
        </div>
        <div class="lg:col-span-5 grid grid-cols-3 gap-3">
          <div class="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
            <div class="font-bold text-lg">120</div><div class="text-xs text-zinc-500">Buttons</div>
          </div>
          <div class="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
            <div class="font-bold text-lg">60</div><div class="text-xs text-zinc-500">Loaders</div>
          </div>
          <div class="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
            <div class="font-bold text-lg">45</div><div class="text-xs text-zinc-500">Motions</div>
          </div>
          <div class="col-span-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-800">
            <span class="font-semibold">Reference only:</span> All are free & open-source (MIT/ISC/Free). Source name on card — no outbound link.
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
