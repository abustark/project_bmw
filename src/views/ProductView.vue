<template>
  <div v-if="product" class="bg-[#fcfcf9] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- breadcrumb -->
      <div class="text-xs tracking-widest text-zinc-500"><router-link to="/shop" class="hover:underline underline-offset-4">SHOP</router-link> <span aria-hidden="true">/</span> {{ product.category.toUpperCase() }}</div>

      <!-- reference notice — single, not heavy -->
      <div v-if="product.isReference" class="mt-4 rounded-[12px] border border-amber-200 bg-amber-50 p-4 flex gap-3">
        <span class="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs font-bold" aria-hidden="true">!</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-amber-900">Reference — not for sale • ₹0</div>
          <p class="text-sm text-amber-800 leading-relaxed mt-1">From <span class="font-medium" translate="no">{{ product.referenceName }}</span> ({{ product.license }}) — estimated <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span>. Extracted & shown here — source name only, no outbound link.</p>
        </div>
      </div>

      <div class="mt-6 grid lg:grid-cols-12 gap-8">
        <!-- gallery -->
        <div class="lg:col-span-7">
          <div class="rounded-[16px] overflow-hidden bg-white border border-zinc-200">
            <img :src="activeImage" :alt="product.name" width="800" height="600" class="w-full aspect-[4/3] object-cover" @error="e => product.fallback && (e.target.src = product.fallback)" />
          </div>
          <div class="mt-3 flex gap-2 overflow-auto pb-1">
            <button v-for="(img, i) in gallery" :key="i" @click="activeImage = img" :aria-label="`View image ${i + 1}`" :class="['w-20 h-20 rounded-xl overflow-hidden border shrink-0 focus-visible:ring-2 focus-visible:ring-zinc-900', activeImage === img ? 'border-zinc-900' : 'border-zinc-200']">
              <img :src="img" :alt="`${product.name} preview ${i + 1}`" width="80" height="80" class="w-full h-full object-cover" loading="lazy" />
            </button>
          </div>
        </div>

        <!-- info — clean card -->
        <div class="lg:col-span-5">
          <div class="flex gap-2 flex-wrap">
            <span v-if="product.badge" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 text-white">{{ product.badge }}</span>
            <span v-if="product.isReference" class="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold tracking-widest text-amber-900">REFERENCE • ₹0</span>
            <span class="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs" translate="no">{{ product.category }}</span>
          </div>
          <h1 class="mt-3 font-display text-2xl lg:text-3xl font-bold leading-tight" style="text-wrap: balance">{{ product.name }}</h1>
          <div class="mt-2 flex items-center gap-3 text-sm flex-wrap text-zinc-600">
            <span class="inline-flex items-center gap-1"><span class="text-amber-500" aria-hidden="true">★</span> {{ product.rating }} • {{ product.reviews }} reviews</span>
            <span class="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true"></span>
            <span class="tabular-nums">{{ product.sales.toLocaleString() }} sales</span>
            <span class="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true"></span>
            <span translate="no">by {{ product.author }}</span>
          </div>
          <p class="mt-4 text-[15px] leading-relaxed text-zinc-600 text-pretty">{{ product.description }}</p>

          <div class="mt-6 rounded-[16px] bg-white border border-zinc-200 p-5">
            <div v-if="product.isReference" class="flex items-baseline gap-3 flex-wrap">
              <span class="text-2xl font-bold tabular-nums text-emerald-700">₹0</span>
              <span class="text-sm text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
              <span class="ml-auto px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">100% OFF</span>
            </div>
            <div v-else class="flex items-baseline gap-3">
              <span class="text-2xl font-bold tabular-nums">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
              <span v-if="product.originalPrice" class="text-sm text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
            </div>
            <div class="mt-1 text-xs text-zinc-500">{{ product.delivery }} • <span translate="no">{{ product.license }}</span><span v-if="product.isReference"> • <span translate="no">{{ product.referenceName }}</span></span></div>
            <div v-if="product.isReference" class="mt-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs leading-relaxed text-zinc-600">Estimated <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span> — demo, no payment. Add to cart for preview.</div>

            <div class="mt-4 flex items-center gap-2">
              <span class="text-sm font-medium">Qty</span>
              <button @click="qty = Math.max(1, qty - 1)" aria-label="Decrease quantity" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-900">−</button>
              <span class="w-8 text-center font-semibold tabular-nums">{{ qty }}</span>
              <button @click="qty++" aria-label="Increase quantity" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-900">+</button>
              <span class="ml-auto text-xs text-zinc-500">Reference — not shipped</span>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-2">
              <button @click="addToCart" class="col-span-2 h-11 rounded-full bg-zinc-900 text-white font-medium hover:bg-black focus-visible:ring-2 focus-visible:ring-zinc-900">Add to cart — ₹{{ (product.price * qty).toLocaleString('en-IN') }}</button>
              <button @click="wish.toggle(product.id)" :aria-label="wish.has(product.id) ? 'Remove from wishlist' : 'Save to wishlist'" :class="['h-11 rounded-full border font-medium text-sm flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-zinc-900', wish.has(product.id) ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200']">
                <span aria-hidden="true">♥</span> {{ wish.has(product.id) ? 'Saved' : 'Save' }}
              </button>
            </div>
            <span v-if="product.isReference" class="mt-3 w-full h-11 rounded-full border border-amber-200 bg-amber-50 text-amber-900 font-medium text-sm flex items-center justify-center">Source: <span translate="no" class="ml-1">{{ product.referenceName }}</span> — extracted</span>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in product.tags" :key="t" class="text-xs px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100">{{ t }}</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div class="rounded-xl bg-white border border-zinc-200 p-3"><div class="font-semibold">✓ Open</div><div class="text-zinc-500">MIT / ISC / Free</div></div>
            <div class="rounded-xl bg-white border border-zinc-200 p-3"><div class="font-semibold">↻ Extracted</div><div class="text-zinc-500">Shown here</div></div>
            <div class="rounded-xl bg-white border border-zinc-200 p-3"><div class="font-semibold">₹0 demo</div><div class="text-zinc-500">No payment</div></div>
          </div>
        </div>
      </div>

      <!-- details — tabs cleaner -->
      <div class="mt-8 grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div class="flex gap-1 border-b border-zinc-200">
            <button v-for="tab in ['Overview', 'Reviews', 'FAQ']" :key="tab" @click="activeTab = tab" :class="['px-4 py-3 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-zinc-900', activeTab === tab ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700']">{{ tab }}</button>
          </div>
          <div class="py-6">
            <div v-if="activeTab === 'Overview'" class="space-y-4 text-sm leading-relaxed">
              <h3 class="font-semibold text-zinc-900">What’s inside</h3>
              <ul class="list-disc pl-5 space-y-1 text-zinc-600">
                <li v-for="f in (product.files || ['Figma', 'Tokens', 'Icons'])" :key="f">{{ f }}</li>
                <li>Documentation & changelog</li>
                <li>Stack: {{ (product.stack || []).join(', ') }}</li>
                <li v-if="product.isReference">Source: <span class="font-medium" translate="no">{{ product.referenceName }}</span> — {{ product.license }} (extracted)</li>
              </ul>
              <div v-if="product.snippet" class="mt-4">
                <h4 class="font-semibold text-sm text-zinc-900">Code snippet — copy-paste</h4>
                <pre class="mt-2 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-auto">{{ product.snippet }}</pre>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button @click="navigator.clipboard?.writeText(product.snippet)" class="text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-zinc-900">Copy snippet</button>
                  <span v-if="product.isReference" class="text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900">Source: <span translate="no">{{ product.referenceName }}</span></span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="s in product.stack" :key="s" class="text-xs px-2.5 py-1 rounded-full bg-zinc-900 text-white">{{ s }}</span>
              </div>
              <h3 class="mt-6 font-semibold text-zinc-900">License</h3>
              <p class="text-zinc-600">{{ product.license }} — <span v-if="product.isReference">open-source, free. Estimated <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-bold text-emerald-700">₹0</span> here. Not for sale.</span><span v-else>use in unlimited projects. Resale not allowed.</span></p>
            </div>
            <div v-if="activeTab === 'Reviews'">
              <div class="flex items-center gap-4">
                <div class="text-4xl font-bold tabular-nums">{{ product.rating }}</div>
                <div><div class="text-amber-500">★ ★ ★ ★ ★</div><div class="text-xs text-zinc-500">Based on {{ product.reviews }} reviews</div></div>
              </div>
              <div class="mt-6 space-y-3">
                <div v-for="r in sampleReviews" :key="r.name" class="rounded-[12px] bg-white border border-zinc-200 p-4">
                  <div class="flex items-center gap-3"><img :src="r.avatar" :alt="r.name" width="32" height="32" class="w-8 h-8 rounded-full" loading="lazy" /><div><div class="text-sm font-medium">{{ r.name }}</div><div class="text-xs text-zinc-500">{{ r.time }}</div></div><div class="ml-auto text-amber-500 text-sm">★ {{ r.rating }}</div></div>
                  <p class="mt-2 text-sm text-zinc-600">{{ r.text }}</p>
                </div>
              </div>
            </div>
            <div v-if="activeTab === 'FAQ'" class="space-y-3">
              <details class="rounded-[12px] bg-white border border-zinc-200 p-4"><summary class="font-medium cursor-pointer">How do I download?</summary><p class="mt-2 text-sm text-zinc-600">Reference items are free — Source: <span translate="no">{{ product.referenceName }}</span> (extracted). Cart is demo (₹0).</p></details>
              <details class="rounded-[12px] bg-white border border-zinc-200 p-4"><summary class="font-medium cursor-pointer">Can I use for client work?</summary><p class="mt-2 text-sm text-zinc-600">Yes — {{ product.license }}. Check product page.</p></details>
              <details class="rounded-[12px] bg-white border border-zinc-200 p-4"><summary class="font-medium cursor-pointer">Why ₹0?</summary><p class="mt-2 text-sm text-zinc-600">Reference showcase — estimates shown, strikethrough to ₹0, no payment. All rights with originals.</p></details>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-4">
          <div class="rounded-[16px] bg-white border border-zinc-200 p-5">
            <div class="font-semibold text-sm">About {{ product.author }}</div>
            <p class="mt-2 text-sm text-zinc-600">Creator of <span class="font-medium" translate="no">{{ product.referenceName }}</span> • {{ product.license }} • extracted.</p>
            <span class="mt-4 w-full h-10 rounded-full border border-amber-200 bg-amber-50 text-amber-900 font-medium text-sm flex items-center justify-center">Source: <span translate="no" class="ml-1">{{ product.referenceName }}</span></span>
          </div>
          <div class="rounded-[16px] bg-white border border-zinc-200 p-5">
            <div class="font-semibold text-sm">More from reference</div>
            <div class="mt-3 space-y-3">
              <router-link v-for="p in moreFromAuthor" :key="p.id" :to="`/product/${p.id}`" class="flex gap-3 hover:bg-zinc-50 -mx-2 px-2 py-2 rounded-xl transition">
                <img :src="p.image" :alt="p.name" width="56" height="56" class="w-14 h-14 rounded-xl object-cover border border-zinc-100" loading="lazy" />
                <div><div class="text-sm font-medium leading-tight line-clamp-2">{{ p.name }}</div><div class="text-xs text-zinc-500 mt-1">₹0 <span class="line-through">₹{{ Number(p.originalPrice).toLocaleString('en-IN') }}</span> • ★ {{ p.rating }}</div></div>
              </router-link>
            </div>
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
const product = computed(() => products.find(p => String(p.id) === String(route.params.id)))
const gallery = computed(() => product.value ? [product.value.image, ...(product.value.gallery || [])].filter(Boolean) : [])
const activeImage = ref('')
const qty = ref(1)
const activeTab = ref('Overview')
if (product.value) activeImage.value = product.value.image

const moreFromAuthor = computed(() => product.value ? products.filter(p => p.author === product.value.author && p.id !== product.value.id).slice(0, 3) : [])

function addToCart() { cart.add(product.value, qty.value) }
function buyNow() { cart.add(product.value, qty.value); router.push('/checkout') }

const sampleReviews = [
  { name: 'Aarav S.', time: '2 days ago', rating: 5, text: 'Insane quality. Saved me 40 hours on a client fintech app.', avatar: 'https://i.pravatar.cc/100?img=15' },
  { name: 'Sofia M.', time: '1 week ago', rating: 5, text: 'Docs make sense. Dark mode variables are chef’s kiss.', avatar: 'https://i.pravatar.cc/100?img=16' },
  { name: 'Kenji T.', time: '2 weeks ago', rating: 4, text: 'Great pack, wish more empty states. Still 5 stars.', avatar: 'https://i.pravatar.cc/100?img=17' },
]
</script>
