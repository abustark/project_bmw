<template>
  <div>
    <!-- hero -->
    <section class="relative overflow-hidden">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            Reference Catalog • 14 open-source products → <span class="font-bold text-emerald-700">₹0 — not for sale</span>
            <span class="hidden sm:inline-flex ml-2 px-2 py-0.5 rounded-full bg-zinc-900 text-white text-[11px] tracking-widest">MIT / ISC / FREE</span>
          </div>
          <h1 class="mt-4 font-display font-bold text-[42px] sm:text-[52px] leading-[0.95] tracking-[-1.8px] sm:tracking-[-2.4px]" style="text-wrap: balance">
            Digital products<br/>
            <span class="font-light italic">that ship</span> faster.
          </h1>
          <p class="mt-4 text-[17px] leading-relaxed text-zinc-600 max-w-[560px]">N-GELO is a <span class="font-semibold text-zinc-900">reference showcase</span> — 14 free & open-source drops curated from shadcn/ui, Radix, Tailwind Labs, Vercel & more. Prices are estimates <span class="line-through">₹4,999</span> → <span class="font-bold text-emerald-700">₹0</span> • Not for sale. Built for the BCA project, now production-grade.</p>

          <div class="mt-6 flex flex-wrap gap-3">
            <router-link to="/shop" class="btn-primary px-8 py-3.5 text-base">Explore references →</router-link>
            <a href="#how" class="btn-ghost">How references work</a>
          </div>

          <div class="mt-6 flex items-center gap-6 text-sm">
            <div class="flex -space-x-2">
              <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/100?img=${10+i}`" class="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <div class="leading-tight">
              <div class="font-semibold">Trusted by 4,500+ buyers</div>
              <div class="text-zinc-500 text-xs">4.9/5 average rating • 12k+ sales</div>
            </div>
            <div class="hidden sm:flex items-center gap-2 ml-4 pl-6 border-l border-zinc-200">
              <span class="text-xs tracking-widest font-semibold">PAY WITH</span>
              <span class="px-2 py-1 rounded bg-white border text-xs font-bold">Stripe</span>
              <span class="px-2 py-1 rounded bg-white border text-xs font-bold">PayPal</span>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-4 max-w-[520px]">
            <div class="card p-4 rounded-[12px] border-zinc-200 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
              <div class="text-xs tracking-widest text-zinc-500">REFERENCE DROPS</div>
              <div class="font-bold text-xl tabular-nums">14</div>
              <div class="text-xs text-zinc-500">curated • MIT etc.</div>
            </div>
            <div class="card p-4 rounded-[12px] border-zinc-200 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
              <div class="text-xs tracking-widest text-zinc-500">PRICE NOW</div>
              <div class="font-bold text-xl text-emerald-700 tabular-nums">₹0</div>
              <div class="text-xs text-zinc-500 line-through">was ₹4,999</div>
            </div>
            <div class="card p-4 rounded-[12px] border-zinc-200 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
              <div class="text-xs tracking-widest text-zinc-500">AVG RATING</div>
              <div class="font-bold text-xl tabular-nums">4.9 ★</div>
              <div class="text-xs text-zinc-500">open-source avg</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-[28px] overflow-hidden bg-zinc-900 p-3 shadow-2xl">
            <img :src="`${base}hero-reference.png`" alt="Reference marketplace preview — shadcn components and code" width="900" height="675" class="rounded-[20px] w-full aspect-[4/3] object-cover" @error="e=> e.target.src='https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop'" />
            <div class="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-soft">
              <img src="https://i.pravatar.cc/100?img=12" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="text-sm font-semibold">Aarav viewed shadcn/ui</div>
                <div class="text-xs text-zinc-500">just now • reference • MIT</div>
              </div>
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <div class="absolute top-6 right-6 bg-white rounded-full px-3 py-1.5 text-xs font-bold shadow">⚡ Instant download</div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="rounded-2xl overflow-hidden border border-zinc-200">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop" class="w-full h-32 object-cover" />
            </div>
            <div class="rounded-2xl overflow-hidden border border-zinc-200 bg-white p-3 flex flex-col justify-center">
              <div class="text-xs tracking-widest">FEATURED SELLER</div>
              <div class="font-semibold">Studio Forma</div>
              <div class="text-sm text-zinc-500">€47k earned this term</div>
              <div class="mt-2 w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden"><div class="h-full w-[72%] bg-zinc-900"></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- reference explainer — Vercel canvas-soft + amber, Taste Skill spacious, not slop -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="rounded-[16px] border border-amber-200 bg-amber-50 p-6 lg:p-7 grid lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-5">
          <div class="text-xs tracking-[0.2em] text-amber-800 font-semibold">REFERENCE SHOWCASE</div>
          <h2 class="mt-2 text-2xl font-bold tracking-tight" style="text-wrap: balance">14 free drops • <span class="line-through decoration-zinc-400">₹4,999</span> → <span class="text-emerald-700">₹0</span> — not for sale.</h2>
          <p class="mt-2 text-sm text-amber-900 leading-relaxed">Every product is <span class="font-semibold">free & open-source</span> from its original author (MIT / ISC / Free). Estimated prices are shown for reference, strikethrough to <span class="font-bold text-emerald-700">₹0</span>. Nothing is charged. All rights remain with the originals — tap “View Source” to visit them.</p>
          <div class="mt-3 flex gap-2">
            <span class="px-2.5 py-1 rounded-full bg-white border border-amber-200 text-xs font-medium">MIT</span>
            <span class="px-2.5 py-1 rounded-full bg-white border border-amber-200 text-xs font-medium">ISC</span>
            <span class="px-2.5 py-1 rounded-full bg-white border border-amber-200 text-xs font-medium">Free</span>
          </div>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-3 gap-3">
          <div class="rounded-[12px] bg-white border border-amber-200 p-4 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
            <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">1</div>
            <div class="mt-3 font-semibold text-sm leading-tight">View Source → original</div>
            <div class="text-xs text-zinc-600 mt-1 leading-relaxed">Each card links to the official site or GitHub. We mirror nothing paywalled — just reference.</div>
          </div>
          <div class="rounded-[12px] bg-white border border-amber-200 p-4 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
            <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">2</div>
            <div class="mt-3 font-semibold text-sm leading-tight">₹0 checkout</div>
            <div class="text-xs text-zinc-600 mt-1 leading-relaxed">Add to cart for demo flow — total is always <span class="font-bold text-emerald-700">₹0</span>. No payment collected.</div>
          </div>
          <div class="rounded-[12px] bg-white border border-amber-200 p-4 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
            <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">3</div>
            <div class="mt-3 font-semibold text-sm leading-tight">Attribution • MIT</div>
            <div class="text-xs text-zinc-600 mt-1 leading-relaxed">All credit to original authors. License on product page — MIT, ISC, or Free.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- categories -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="font-display text-2xl font-bold">Browse by craft</h2>
        <router-link to="/shop" class="text-sm font-medium underline">View all</router-link>
      </div>
      <div class="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        <router-link v-for="c in categories" :key="c.id" :to="`/shop?cat=${c.id}`" class="group card p-4 hover:shadow-lift transition flex flex-col gap-2">
          <div class="w-10 h-10 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">⧉</div>
          <div class="font-semibold text-sm">{{ c.label }}</div>
          <div class="text-xs text-zinc-500">{{ products.filter(p=> c.id==='all' || p.category===c.id).length }} products</div>
        </router-link>
      </div>
    </section>

    <!-- featured -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div class="flex items-end justify-between gap-4">
        <h2 class="font-display text-2xl font-bold leading-none">Featured drops <span class="text-zinc-400 font-normal text-base">— staff picks</span></h2>
        <div class="hidden sm:flex gap-2">
          <button @click="scrollFeatured(-1)" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 bg-white">‹</button>
          <button @click="scrollFeatured(1)" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 bg-white">›</button>
        </div>
      </div>
      <div ref="featuredRef" class="mt-4 grid md:grid-cols-3 gap-5">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
    </section>

    <!-- how it works -->
    <section id="how" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="rounded-[28px] bg-zinc-900 text-white p-6 sm:p-10 grid lg:grid-cols-3 gap-8">
        <div>
          <div class="text-xs tracking-[0.2em] text-zinc-400">HOW IT WORKS</div>
          <h3 class="mt-2 font-display text-3xl font-bold leading-tight">Sellers upload.<br/>Buyers build faster.</h3>
          <p class="mt-3 text-zinc-400 text-sm leading-relaxed">Admins review reports, answer FAQs, and process payouts on the 14th & 21st — exactly as specced in the original project.</p>
          <router-link to="/shop" class="mt-6 inline-flex btn-primary !bg-white !text-zinc-900">Start selling today</router-link>
        </div>
        <div class="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          <div class="rounded-2xl bg-white text-zinc-900 p-5">
            <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">1</div>
            <div class="mt-3 font-semibold">Buyer discovers</div>
            <div class="text-sm text-zinc-600 mt-1">Search, filter by category / price / rating. No registration needed to browse.</div>
          </div>
          <div class="rounded-2xl bg-white text-zinc-900 p-5">
            <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">2</div>
            <div class="mt-3 font-semibold">Instant checkout</div>
            <div class="text-sm text-zinc-600 mt-1">Stripe / PayPal, auto-generated account via email, instant download.</div>
          </div>
          <div class="rounded-2xl bg-white text-zinc-900 p-5">
            <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">3</div>
            <div class="mt-3 font-semibold">Seller payout</div>
            <div class="text-sm text-zinc-600 mt-1">Dashboard analytics, edit/delete products, track traffic & sales.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- recent & footwear lab -->
    <section class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 class="font-display text-2xl font-bold">Fresh in the lab</h2>
      <div class="mt-4 grid md:grid-cols-4 gap-5">
        <ProductCard v-for="p in recent" :key="p.id" :product="p" @add="cart.add($event)" />
      </div>
      <div class="mt-10 rounded-[24px] overflow-hidden border border-zinc-200 bg-white grid md:grid-cols-2">
        <div class="bg-zinc-900 p-6 sm:p-8 flex flex-col justify-center text-white min-h-[320px]">
          <div class="inline-flex self-start px-3 py-1 rounded-full bg-white text-zinc-900 text-xs tracking-widest font-bold">COMPONENT LAB — CODE</div>
          <h3 class="mt-3 font-display text-3xl font-bold">From Figma to code.</h3>
          <p class="mt-2 text-zinc-400">Copy-paste production code — Tailwind, shadcn, Framer Motion. Dark mode, a11y, typed.</p>
          <pre class="mt-4 rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-xs font-mono leading-relaxed overflow-auto text-emerald-300">&lt;Button variant="pill" size="lg"&gt;
  Ship faster →
&lt;/Button&gt;

&lt;Loader variant="skeleton" /&gt;</pre>
          <div class="mt-4 flex gap-2">
            <router-link to="/shop?cat=components" class="btn-primary !bg-white !text-zinc-900">Explore References</router-link>
            <span class="text-xs text-zinc-500 self-center">Vue + React • shadcn</span>
          </div>
        </div>
        <div class="p-8 flex flex-col justify-center bg-white">
          <div class="text-xs tracking-widest text-zinc-500 font-semibold">WHAT YOU GET</div>
          <ul class="mt-3 space-y-2 text-sm text-zinc-700">
            <li class="flex gap-2"><span class="text-zinc-900">↗</span> Instant download — Figma, TSX, Vue SFC, tokens</li>
            <li class="flex gap-2"><span class="text-zinc-900">↗</span> Live preview URL + snippet copy</li>
            <li class="flex gap-2"><span class="text-zinc-900">↗</span> Stack: Next.js / Vue, Tailwind, Framer Motion</li>
            <li class="flex gap-2"><span class="text-zinc-900">↗</span> Seller dashboard, admin reports & payouts 14th/21st</li>
          </ul>
          <div class="mt-6 grid grid-cols-3 gap-3">
            <div class="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
              <div class="font-bold">120</div><div class="text-xs text-zinc-500">Buttons</div>
            </div>
            <div class="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
              <div class="font-bold">60</div><div class="text-xs text-zinc-500">Loaders</div>
            </div>
            <div class="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
              <div class="font-bold">45</div><div class="text-xs text-zinc-500">Motions</div>
            </div>
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
const featured = computed(()=> products.filter(p=>p.featured))
const recent = computed(()=> [...products].sort((a,b)=> b.id - a.id).slice(0,4))
const featuredRef = ref(null)
function scrollFeatured(dir){
  featuredRef.value?.scrollBy({ left: dir*320, behavior:'smooth' })
}
</script>
