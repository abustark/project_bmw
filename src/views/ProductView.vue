<template>
  <div v-if="product" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="text-xs tracking-widest text-zinc-500"><router-link to="/shop" class="hover:underline">SHOP</router-link> / {{ product.category.toUpperCase() }}</div>
    <!-- reference notice -->
    <div v-if="product.isReference" class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
      <span class="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs font-bold">!</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-amber-900">Reference — not for sale</div>
        <p class="text-sm text-amber-800 leading-relaxed">Curated from <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline font-medium">{{ product.referenceName }}</a> ({{ product.license }}) — estimated value <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span>. Visit source for original.</p>
        <div class="mt-2 flex gap-2">
          <a :href="product.referenceUrl" target="_blank" rel="noopener" class="px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800">View Source ↗</a>
          <a :href="product.previewUrl" v-if="product.previewUrl" target="_blank" rel="noopener" class="px-4 py-2 rounded-full bg-white border text-sm font-medium">Live preview</a>
        </div>
      </div>
    </div>

    <div class="mt-4 grid lg:grid-cols-12 gap-8">
      <!-- gallery -->
      <div class="lg:col-span-7">
        <div class="rounded-[24px] overflow-hidden bg-white border border-zinc-100">
          <img :src="activeImage" :alt="product.name" width="800" height="600" class="w-full aspect-[4/3] object-cover" @error="e=> product.fallback && (e.target.src=product.fallback)" />
        </div>
        <div class="mt-3 flex gap-2">
          <button v-for="(img,i) in gallery" :key="i" @click="activeImage=img" :aria-label="`View image ${i+1}`" :class="['w-20 h-20 rounded-xl overflow-hidden border focus-visible:ring-2 focus-visible:ring-zinc-900', activeImage===img ? 'border-zinc-900' : 'border-zinc-200']">
            <img :src="img" :alt="`${product.name} preview ${i+1}`" width="80" height="80" class="w-full h-full object-cover" loading="lazy" />
          </button>
        </div>
      </div>

      <!-- info -->
      <div class="lg:col-span-5">
        <div class="flex gap-2 flex-wrap">
          <span v-if="product.badge" class="chip">{{ product.badge }}</span>
          <span v-if="product.isReference" class="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold tracking-widest text-amber-900">REFERENCE • ₹0</span>
          <span class="px-3 py-1 rounded-full bg-zinc-50 border text-xs" translate="no">{{ product.category }}</span>
        </div>
        <h1 class="mt-3 font-display text-3xl font-bold leading-tight" style="text-wrap: balance">{{ product.name }}</h1>
        <div class="mt-2 flex items-center gap-3 text-sm flex-wrap">
          <span class="inline-flex items-center gap-1"><span class="text-amber-500" aria-hidden="true">★</span> {{ product.rating }} • {{ product.reviews }} reviews</span>
          <span class="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true"></span>
          <span class="text-zinc-500 tabular-nums">{{ product.sales.toLocaleString() }} sales</span>
          <span class="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true"></span>
          <span class="text-zinc-500" translate="no">by {{ product.author }}</span>
        </div>
        <p class="mt-4 text-zinc-600 leading-relaxed text-pretty">{{ product.description }}</p>

        <div class="mt-6 card p-5">
          <div v-if="product.isReference" class="flex items-baseline gap-3 flex-wrap">
            <span class="text-3xl font-bold tabular-nums text-emerald-700">₹0</span>
            <span class="text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
            <span class="ml-auto px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">REFERENCE — 100% OFF</span>
          </div>
          <div v-else class="flex items-baseline gap-3">
            <span class="text-3xl font-bold tabular-nums">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
            <span v-if="product.originalPrice" class="text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
            <span v-if="product.originalPrice && !product.isReference" class="ml-auto px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">{{ Math.round((1-product.price/product.originalPrice)*100) }}% OFF</span>
          </div>
          <div class="mt-2 text-xs text-zinc-500">{{ product.delivery }} • <span translate="no">{{ product.license }}</span> license <span v-if="product.isReference">• <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline">{{ product.referenceName }}</a></span></div>
          <div v-if="product.isReference" class="mt-3 p-3 rounded-xl bg-zinc-50 border text-xs text-zinc-600">Estimated reference price <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span> — this demo does not process payments for reference items. Add to cart for preview.</div>
          <div class="mt-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Qty</span>
              <button @click="qty=Math.max(1,qty-1)" aria-label="Decrease quantity" class="w-8 h-8 grid place-items-center rounded-full border focus-visible:ring-2 focus-visible:ring-zinc-900">−</button>
              <span class="w-8 text-center font-semibold tabular-nums">{{ qty }}</span>
              <button @click="qty++" aria-label="Increase quantity" class="w-8 h-8 grid place-items-center rounded-full border focus-visible:ring-2 focus-visible:ring-zinc-900">+</button>
              <span class="ml-auto text-xs text-zinc-500">Reference — not shipped</span>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            <button @click="addToCart" class="col-span-2 btn-primary py-3.5 focus-visible:ring-2 focus-visible:ring-zinc-900">Add to cart — ₹{{ (product.price * qty).toLocaleString('en-IN') }}</button>
            <button @click="wish.toggle(product.id)" :aria-label="wish.has(product.id) ? 'Remove from wishlist' : 'Save to wishlist'" :class="['rounded-full border font-medium text-sm flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-zinc-900', wish.has(product.id) ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white']">
              <span aria-hidden="true">♥</span> {{ wish.has(product.id) ? 'Saved' : 'Save' }}
            </button>
          </div>
          <a v-if="product.isReference" :href="product.referenceUrl" target="_blank" rel="noopener" class="mt-2 w-full btn-ghost justify-center border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 flex">View Source ↗ — {{ product.referenceName }}</a>
          <button v-else @click="buyNow" class="mt-2 w-full btn-ghost justify-center">Buy now with Stripe</button>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="t in product.tags" :key="t" class="text-xs px-2.5 py-1 rounded-full bg-zinc-50 border">{{ t }}</span>
          </div>
        </div>

        <!-- trust -->
        <div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div class="card p-3"><div class="font-semibold">✓ Open</div><div class="text-zinc-500">MIT / ISC / Free</div></div>
          <div class="card p-3"><div class="font-semibold">↻ Reference</div><div class="text-zinc-500">View Source</div></div>
          <div class="card p-3"><div class="font-semibold">◐ Zero</div><div class="text-zinc-500">₹0 demo</div></div>
        </div>
      </div>
    </div>

    <!-- details tabs -->
    <div class="mt-10 grid lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8">
        <div class="flex gap-2 border-b border-zinc-100">
          <button v-for="tab in ['Overview','Reviews','FAQ']" :key="tab" @click="activeTab=tab" :class="['px-4 py-3 text-sm font-medium border-b-2 focus-visible:ring-2 focus-visible:ring-zinc-900', activeTab===tab ? 'border-zinc-900' : 'border-transparent text-zinc-500']">{{ tab }}</button>
        </div>
        <div class="py-6">
          <div v-if="activeTab==='Overview'" class="prose prose-zinc max-w-none text-sm leading-relaxed">
            <h3 class="font-semibold">What’s inside</h3>
            <ul class="list-disc pl-5 space-y-1 text-zinc-600">
              <li v-for="f in (product.files || ['Figma','Tokens','Icons'])" :key="f">{{ f }}</li>
              <li>Documentation & changelog</li>
              <li>Stack: {{ (product.stack || []).join(', ') }}</li>
              <li v-if="product.isReference">Source: <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline">{{ product.referenceName }}</a> — {{ product.license }}</li>
            </ul>
            <div v-if="product.snippet" class="mt-4">
              <h4 class="font-semibold text-sm">Code snippet — copy-paste</h4>
              <pre class="mt-2 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-auto">{{ product.snippet }}</pre>
              <div class="mt-2 flex gap-2">
                <button @click="navigator.clipboard?.writeText(product.snippet)" class="text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-white focus-visible:ring-2 focus-visible:ring-zinc-900">Copy snippet</button>
                <a v-if="product.previewUrl" :href="product.previewUrl" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-full border focus-visible:ring-2 focus-visible:ring-zinc-900">Live preview ↗</a>
                <a v-if="product.isReference" :href="product.referenceUrl" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900">View Source ↗</a>
              </div>
            </div>
            <div v-if="product.previewUrl" class="mt-4 flex items-center gap-2 text-xs">
              <span class="font-semibold">Preview:</span>
              <a :href="product.previewUrl" target="_blank" rel="noopener" class="underline text-zinc-600">{{ product.previewUrl }}</a>
            </div>
            <div v-if="product.isReference" class="mt-4 flex items-center gap-2 text-xs">
              <span class="font-semibold">Reference:</span>
              <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline text-zinc-600">{{ product.referenceUrl }}</a>
            </div>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span v-for="s in product.stack" :key="s" class="text-xs px-2.5 py-1 rounded-full bg-zinc-900 text-white">{{ s }}</span>
            </div>
            <h3 class="mt-6 font-semibold">License</h3>
            <p class="text-zinc-600">{{ product.license }} — <span v-if="product.isReference">open-source, free to use. Estimated value <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span> here. Not for sale — visit source.</span><span v-else>use in unlimited projects. Resale of source not allowed. <a href="#" class="underline">Read full license</a></span></p>
          </div>
          <div v-if="activeTab==='Reviews'">
            <div class="flex items-center gap-4">
              <div class="text-4xl font-bold tabular-nums">{{ product.rating }}</div>
              <div><div>★ ★ ★ ★ ★</div><div class="text-xs text-zinc-500">Based on {{ product.reviews }} reviews</div></div>
            </div>
            <div class="mt-6 space-y-4">
              <div v-for="r in sampleReviews" :key="r.name" class="card p-4">
                <div class="flex items-center gap-3"><img :src="r.avatar" :alt="r.name" width="32" height="32" class="w-8 h-8 rounded-full" loading="lazy" /><div><div class="text-sm font-medium">{{ r.name }}</div><div class="text-xs text-zinc-500">{{ r.time }}</div></div><div class="ml-auto text-amber-500 text-sm">★ {{ r.rating }}</div></div>
                <p class="mt-2 text-sm text-zinc-600">{{ r.text }}</p>
              </div>
            </div>
          </div>
          <div v-if="activeTab==='FAQ'" class="space-y-3">
            <details class="card p-4"><summary class="font-medium cursor-pointer">How do I download after purchase?</summary><p class="mt-2 text-sm text-zinc-600">Reference items are free — <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline">View Source</a> to get it from the original. Cart is demo (₹0).</p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">Can I use this for client work?</summary><p class="mt-2 text-sm text-zinc-600">Yes — {{ product.license }}. Check source: <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline">{{ product.referenceName }}</a></p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">What about refunds?</summary><p class="mt-2 text-sm text-zinc-600">Reference catalog is free (₹0) — no payment. Estimated price <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> shown for reference only.</p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">Which stack?</summary><p class="mt-2 text-sm text-zinc-600">{{ (product.stack||[]).join(', ') }} — Vue SFC & React TSX, Tailwind, shadcn variants.</p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">Why ₹0?</summary><p class="mt-2 text-sm text-zinc-600">This is a reference showcase per your request — to demonstrate curation without selling. All rights belong to original authors. Prices are estimates for display, strikethrough to ₹0.</p></details>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="card p-5">
          <div class="font-semibold">About {{ product.author }}</div>
          <p class="mt-2 text-sm text-zinc-600">Creator of <a :href="product.referenceUrl" target="_blank" rel="noopener" class="underline">{{ product.referenceName }}</a>. Open-source, {{ product.license }}.</p>
          <a :href="product.referenceUrl" target="_blank" rel="noopener" class="mt-4 w-full btn-ghost justify-center flex border-amber-200">View Source ↗</a>
        </div>
        <div class="mt-4 card p-5">
          <div class="font-semibold text-sm">More from reference</div>
          <div class="mt-3 space-y-3">
            <router-link v-for="p in moreFromAuthor" :key="p.id" :to="`/product/${p.id}`" class="flex gap-3">
              <img :src="p.image" :alt="p.name" width="56" height="56" class="w-14 h-14 rounded-xl object-cover border" loading="lazy" />
              <div><div class="text-sm font-medium leading-tight">{{ p.name }}</div><div class="text-xs text-zinc-500">₹0 <span class="line-through">₹{{ Number(p.originalPrice).toLocaleString('en-IN') }}</span> • ★ {{ p.rating }}</div></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-[1280px] mx-auto px-4 py-20 text-center">
    <div class="text-lg font-semibold">Product not found</div>
    <router-link to="/shop" class="mt-4 inline-flex btn-primary">Back to shop</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const wish = useWishlistStore()
const product = computed(()=> products.find(p=> String(p.id)===String(route.params.id)))
const gallery = computed(()=> product.value ? [product.value.image, ...(product.value.gallery||[])].filter(Boolean) : [])
const activeImage = ref('')
const qty = ref(1)
const activeTab = ref('Overview')
if(product.value) activeImage.value = product.value.image

const moreFromAuthor = computed(()=> product.value ? products.filter(p=>p.author===product.value.author && p.id!==product.value.id).slice(0,3) : [])

function addToCart(){ cart.add(product.value, qty.value) }
function buyNow(){ cart.add(product.value, qty.value); router.push('/checkout') }

const sampleReviews = [
  { name:'Aarav S.', time:'2 days ago', rating:5, text:'Insane quality. Saved me 40 hours on a client fintech app. Tokens are perfectly structured.', avatar:'https://i.pravatar.cc/100?img=15' },
  { name:'Sofia M.', time:'1 week ago', rating:5, text:'The docs actually make sense. Dark mode variables are chef’s kiss.', avatar:'https://i.pravatar.cc/100?img=16' },
  { name:'Kenji T.', time:'2 weeks ago', rating:4, text:'Great pack, wish there were more empty states. Still 5 stars for support speed.', avatar:'https://i.pravatar.cc/100?img=17' },
]
</script>
