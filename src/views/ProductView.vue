<template>
  <div v-if="product" class="bg-[hsl(var(--canvas))] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- breadcrumb -->
      <div class="text-xs text-[hsl(var(--ink-subtle))]"><router-link to="/shop" class="hover:text-[hsl(var(--ink))] hover:underline underline-offset-4">Shop</router-link> <span class="mx-1 opacity-40" aria-hidden="true">/</span> {{ product.category }}</div>

      <div class="mt-4 grid lg:grid-cols-12 gap-8">
        <!-- gallery -->
        <div class="lg:col-span-7">
          <div class="rounded-[16px] overflow-hidden bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-2">
            <img :src="activeImage" :alt="product.name" width="800" height="600" class="w-full aspect-[4/3] object-cover rounded-[12px]" @error="e => product.fallback && (e.target.src = product.fallback)" />
          </div>
          <div class="mt-3 flex gap-2 overflow-auto pb-1">
            <button v-for="(img, i) in gallery" :key="i" @click="activeImage = img" :aria-label="`View image ${i + 1}`" :class="['w-20 h-20 rounded-[12px] overflow-hidden border shrink-0 transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', activeImage === img ? 'border-[#5e6ad2]' : 'border-[hsl(var(--hairline))] opacity-60 hover:opacity-100']">
              <img :src="img" :alt="`${product.name} preview ${i + 1}`" width="80" height="80" class="w-full h-full object-cover" loading="lazy" />
            </button>
          </div>

          <!-- reference line under gallery — quiet -->
          <div v-if="product.isReference" class="mt-4 rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] px-4 py-3 flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shrink-0" aria-hidden="true"></span>
            <p class="text-xs leading-relaxed text-[hsl(var(--ink-subtle))]">
              Reference · not for sale · <span class="font-medium text-[hsl(var(--ink))]" translate="no">{{ product.referenceName }}</span> ({{ product.license }}) · estimated <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-medium text-[hsl(var(--ink))]">₹0</span> · rendered here
            </p>
          </div>
        </div>

        <!-- info -->
        <div class="lg:col-span-5">
          <div class="flex gap-2 flex-wrap">
            <span v-if="product.isReference" class="px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[11px] font-medium tracking-widest text-[hsl(var(--ink-subtle))]">REFERENCE · FREE</span>
            <span class="px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs text-[hsl(var(--ink-subtle))]" translate="no">{{ product.category }}</span>
          </div>
          <h1 class="mt-3 text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-[hsl(var(--ink))]" style="text-wrap: balance">{{ product.name }}</h1>
          <div class="mt-2 flex items-center gap-3 text-sm flex-wrap text-[hsl(var(--ink-subtle))]">
            <span class="inline-flex items-center gap-1"><span class="text-[#5e6ad2]" aria-hidden="true">★</span> {{ product.rating }} · {{ product.reviews }} reviews</span>
            <span class="w-1 h-1 bg-[hsl(var(--hairline))] rounded-full" aria-hidden="true"></span>
            <span class="tabular-nums">{{ product.sales.toLocaleString() }} sales</span>
            <span class="w-1 h-1 bg-[hsl(var(--hairline))] rounded-full" aria-hidden="true"></span>
            <span translate="no">by {{ product.author }}</span>
          </div>
          <p class="mt-4 text-[15px] leading-relaxed text-[hsl(var(--ink-muted))] text-pretty">{{ product.description }}</p>

          <div class="mt-6 rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div v-if="product.isReference" class="flex items-baseline gap-3 flex-wrap">
              <span class="text-2xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹0</span>
              <span class="text-sm text-[hsl(var(--ink-subtle))] line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
              <span class="ml-auto px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] text-[11px] font-medium tracking-widest">FREE</span>
            </div>
            <div v-else class="flex items-baseline gap-3">
              <span class="text-2xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
              <span v-if="product.originalPrice" class="text-sm text-[hsl(var(--ink-subtle))] line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
            </div>
            <div class="mt-1 text-xs text-[hsl(var(--ink-subtle))]">{{ product.delivery }} · <span translate="no">{{ product.license }}</span></div>

            <div class="mt-4 flex items-center gap-2">
              <span class="text-sm font-medium text-[hsl(var(--ink))]">Qty</span>
              <button @click="qty = Math.max(1, qty - 1)" aria-label="Decrease quantity" class="w-9 h-9 grid place-items-center rounded-[8px] border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2] text-[hsl(var(--ink))]">−</button>
              <span class="w-8 text-center font-medium tabular-nums text-[hsl(var(--ink))]">{{ qty }}</span>
              <button @click="qty++" aria-label="Increase quantity" class="w-9 h-9 grid place-items-center rounded-[8px] border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2] text-[hsl(var(--ink))]">+</button>
              <span class="ml-auto text-xs text-[hsl(var(--ink-subtle))]">Reference — not shipped</span>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-2">
              <button @click="addToCart" class="col-span-2 h-11 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Add to cart — ₹{{ (product.price * qty).toLocaleString('en-IN') }}</button>
              <button @click="wish.toggle(product.id)" :aria-label="wish.has(product.id) ? 'Remove from wishlist' : 'Save to wishlist'" :class="['h-11 rounded-[8px] border font-medium text-sm flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', wish.has(product.id) ? 'bg-[hsl(var(--surface-2))] border-[hsl(var(--hairline))] text-[hsl(var(--ink))]' : 'bg-transparent border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))]']">
                <span aria-hidden="true">♥</span> {{ wish.has(product.id) ? 'Saved' : 'Save' }}
              </button>
            </div>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in product.tags" :key="t" class="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">{{ t }}</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div class="font-medium text-[hsl(var(--ink))]">✓ Open</div><div class="text-[hsl(var(--ink-subtle))]">MIT / ISC / Free</div></div>
            <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div class="font-medium text-[hsl(var(--ink))]">↻ Extracted</div><div class="text-[hsl(var(--ink-subtle))]">Shown here</div></div>
            <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div class="font-medium text-[hsl(var(--ink))]">₹0 demo</div><div class="text-[hsl(var(--ink-subtle))]">No payment</div></div>
          </div>
        </div>
      </div>

      <!-- details — tabs -->
      <div class="mt-8 grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div class="flex gap-1 border-b border-[hsl(var(--hairline))]">
            <button v-for="tab in ['Overview', 'Reviews', 'FAQ']" :key="tab" @click="activeTab = tab" :class="['px-4 py-3 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', activeTab === tab ? 'border-[#5e6ad2] text-[hsl(var(--ink))]' : 'border-transparent text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']">{{ tab }}</button>
          </div>
          <div class="py-6">
            <div v-if="activeTab === 'Overview'" class="space-y-4 text-sm leading-relaxed">
              <h3 class="font-semibold text-[hsl(var(--ink))]">What’s inside</h3>
              <ul class="list-disc pl-5 space-y-1 text-[hsl(var(--ink-muted))]">
                <li v-for="f in (product.files || ['Figma', 'Tokens', 'Icons'])" :key="f">{{ f }}</li>
                <li>Documentation & changelog</li>
                <li>Stack: {{ (product.stack || []).join(', ') }}</li>
                <li v-if="product.isReference">Source: <span class="font-medium text-[hsl(var(--ink))]" translate="no">{{ product.referenceName }}</span> — {{ product.license }} (extracted)</li>
              </ul>
              <div v-if="product.snippet" class="mt-4">
                <h4 class="font-semibold text-sm text-[hsl(var(--ink))]">Code snippet — copy-paste</h4>
                <pre class="mt-2 rounded-[8px] bg-[#010102] text-[#f7f8f8] border border-[#23252a] p-4 text-xs font-mono overflow-auto">{{ product.snippet }}</pre>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button @click="navigator.clipboard?.writeText(product.snippet)" class="text-xs px-3 py-1.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Copy snippet</button>
                  <span class="text-xs px-3 py-1.5 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">Source: <span translate="no">{{ product.referenceName }}</span></span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="s in product.stack" :key="s" class="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">{{ s }}</span>
              </div>
              <h3 class="mt-6 font-semibold text-[hsl(var(--ink))]">License</h3>
              <p class="text-[hsl(var(--ink-muted))]">{{ product.license }} — <span v-if="product.isReference">open-source, free. Estimated <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> → <span class="font-medium text-[hsl(var(--ink))]">₹0</span> here. Not for sale.</span><span v-else>use in unlimited projects. Resale not allowed.</span></p>
            </div>
            <div v-if="activeTab === 'Reviews'">
              <div class="flex items-center gap-4">
                <div class="text-4xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">{{ product.rating }}</div>
                <div><div class="text-[#5e6ad2]">★ ★ ★ ★ ★</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Based on {{ product.reviews }} reviews</div></div>
              </div>
              <div class="mt-6 space-y-3">
                <div v-for="r in sampleReviews" :key="r.name" class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4">
                  <div class="flex items-center gap-3"><img :src="r.avatar" :alt="r.name" width="32" height="32" class="w-8 h-8 rounded-full" loading="lazy" /><div><div class="text-sm font-medium text-[hsl(var(--ink))]">{{ r.name }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">{{ r.time }}</div></div><div class="ml-auto text-[#5e6ad2] text-sm">★ {{ r.rating }}</div></div>
                  <p class="mt-2 text-sm text-[hsl(var(--ink-muted))]">{{ r.text }}</p>
                </div>
              </div>
            </div>
            <div v-if="activeTab === 'FAQ'" class="space-y-3">
              <details class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary class="font-medium cursor-pointer text-[hsl(var(--ink))]">How do I download?</summary><p class="mt-2 text-sm text-[hsl(var(--ink-muted))]">Reference items are free — Source: <span translate="no">{{ product.referenceName }}</span> (extracted). Cart is demo (₹0).</p></details>
              <details class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary class="font-medium cursor-pointer text-[hsl(var(--ink))]">Can I use for client work?</summary><p class="mt-2 text-sm text-[hsl(var(--ink-muted))]">Yes — {{ product.license }}. Check product page.</p></details>
              <details class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary class="font-medium cursor-pointer text-[hsl(var(--ink))]">Why ₹0?</summary><p class="mt-2 text-sm text-[hsl(var(--ink-muted))]">Reference showcase — estimates shown, strikethrough to ₹0, no payment. All rights with originals.</p></details>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-4">
          <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div class="font-medium text-sm text-[hsl(var(--ink))]">About {{ product.author }}</div>
            <p class="mt-2 text-sm text-[hsl(var(--ink-muted))]">Creator of <span class="font-medium text-[hsl(var(--ink))]" translate="no">{{ product.referenceName }}</span> · {{ product.license }} · extracted.</p>
          </div>
          <div class="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-5">
            <div class="font-medium text-sm text-[hsl(var(--ink))]">More from reference</div>
            <div class="mt-3 space-y-3">
              <router-link v-for="p in moreFromAuthor" :key="p.id" :to="`/product/${p.id}`" class="flex gap-3 hover:bg-[hsl(var(--surface-1))] -mx-2 px-2 py-2 rounded-[8px] transition">
                <img :src="p.image" :alt="p.name" width="56" height="56" class="w-14 h-14 rounded-[8px] object-cover border border-[hsl(var(--hairline))]" loading="lazy" />
                <div><div class="text-sm font-medium leading-tight line-clamp-2 text-[hsl(var(--ink))]">{{ p.name }}</div><div class="text-xs text-[hsl(var(--ink-subtle))] mt-1">₹0 <span class="line-through">₹{{ Number(p.originalPrice).toLocaleString('en-IN') }}</span> · ★ {{ p.rating }}</div></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-[1280px] mx-auto px-4 py-20 text-center bg-[hsl(var(--canvas))]">
    <div class="text-lg font-medium text-[hsl(var(--ink))]">Product not found</div>
    <router-link to="/shop" class="mt-4 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Back to shop</router-link>
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
