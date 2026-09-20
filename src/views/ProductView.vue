<template>
  <div v-if="product" class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="text-xs tracking-widest text-zinc-500"><router-link to="/shop" class="hover:underline">SHOP</router-link> / {{ product.category.toUpperCase() }}</div>
    <div class="mt-4 grid lg:grid-cols-12 gap-8">
      <!-- gallery -->
      <div class="lg:col-span-7">
        <div class="rounded-[24px] overflow-hidden bg-white border border-zinc-100">
          <img :src="activeImage" :alt="product.name" class="w-full aspect-[4/3] object-cover" @error="e=> product.fallback && (e.target.src=product.fallback)" />
        </div>
        <div class="mt-3 flex gap-2">
          <button v-for="(img,i) in gallery" :key="i" @click="activeImage=img" :class="['w-20 h-20 rounded-xl overflow-hidden border', activeImage===img ? 'border-zinc-900' : 'border-zinc-200']">
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- info -->
      <div class="lg:col-span-5">
        <div class="flex gap-2">
          <span v-if="product.badge" class="chip">{{ product.badge }}</span>
          <span class="px-3 py-1 rounded-full bg-zinc-50 border text-xs">{{ product.category }}</span>
        </div>
        <h1 class="mt-3 font-display text-3xl font-bold leading-tight">{{ product.name }}</h1>
        <div class="mt-2 flex items-center gap-3 text-sm">
          <span class="inline-flex items-center gap-1"><span class="text-amber-500">★</span> {{ product.rating }} • {{ product.reviews }} reviews</span>
          <span class="w-1 h-1 bg-zinc-300 rounded-full"></span>
          <span class="text-zinc-500">{{ product.sales.toLocaleString() }} sales</span>
          <span class="w-1 h-1 bg-zinc-300 rounded-full"></span>
          <span class="text-zinc-500">by {{ product.author }}</span>
        </div>
        <p class="mt-4 text-zinc-600 leading-relaxed">{{ product.description }}</p>

        <div class="mt-6 card p-5">
          <div class="flex items-baseline gap-3">
            <span class="text-3xl font-bold">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-zinc-400 line-through">${{ product.originalPrice }}</span>
            <span v-if="product.originalPrice" class="ml-auto px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">{{ Math.round((1-product.price/product.originalPrice)*100) }}% OFF</span>
          </div>
          <div class="mt-2 text-xs text-zinc-500">{{ product.delivery }} • {{ product.license }} license</div>
          <div class="mt-4">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Qty</span>
              <button @click="qty=Math.max(1,qty-1)" class="w-8 h-8 grid place-items-center rounded-full border">−</button>
              <span class="w-8 text-center font-semibold">{{ qty }}</span>
              <button @click="qty++" class="w-8 h-8 grid place-items-center rounded-full border">+</button>
              <span class="ml-auto text-xs text-zinc-500">Instant download</span>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            <button @click="addToCart" class="col-span-2 btn-primary py-3.5">Add to cart — ${{ product.price * qty }}</button>
            <button @click="wish.toggle(product.id)" :class="['rounded-full border font-medium text-sm flex items-center justify-center gap-1', wish.has(product.id) ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white']">
              <span>♥</span> {{ wish.has(product.id) ? 'Saved' : 'Save' }}
            </button>
          </div>
          <button @click="buyNow" class="mt-2 w-full btn-ghost justify-center">Buy now with Stripe</button>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="t in product.tags" :key="t" class="text-xs px-2.5 py-1 rounded-full bg-zinc-50 border">{{ t }}</span>
          </div>
        </div>

        <!-- trust -->
        <div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div class="card p-3"><div class="font-semibold">✓ Secure</div><div class="text-zinc-500">Stripe & PayPal</div></div>
          <div class="card p-3"><div class="font-semibold">↻ Updates</div><div class="text-zinc-500">Free for 12 months</div></div>
          <div class="card p-3"><div class="font-semibold">◐ Support</div><div class="text-zinc-500">Chat with seller</div></div>
        </div>
      </div>
    </div>

    <!-- details tabs -->
    <div class="mt-10 grid lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8">
        <div class="flex gap-2 border-b border-zinc-100">
          <button v-for="tab in ['Overview','Reviews','FAQ']" :key="tab" @click="activeTab=tab" :class="['px-4 py-3 text-sm font-medium border-b-2', activeTab===tab ? 'border-zinc-900' : 'border-transparent text-zinc-500']">{{ tab }}</button>
        </div>
        <div class="py-6">
          <div v-if="activeTab==='Overview'" class="prose prose-zinc max-w-none text-sm leading-relaxed">
            <h3 class="font-semibold">What’s inside</h3>
            <ul class="list-disc pl-5 space-y-1 text-zinc-600">
              <li>Figma file with auto-layout, variables, dark mode</li>
              <li>Design tokens JSON + Style Dictionary config</li>
              <li>Documentation & changelog</li>
              <li v-if="product.physical">Ships with dust bag, extra laces, and QR for digital twin</li>
            </ul>
            <h3 class="mt-6 font-semibold">License</h3>
            <p class="text-zinc-600">{{ product.license }} — use in unlimited projects. Resale of source not allowed. <a href="#" class="underline">Read full license</a></p>
          </div>
          <div v-if="activeTab==='Reviews'">
            <div class="flex items-center gap-4">
              <div class="text-4xl font-bold">{{ product.rating }}</div>
              <div><div>★ ★ ★ ★ ★</div><div class="text-xs text-zinc-500">Based on {{ product.reviews }} reviews</div></div>
            </div>
            <div class="mt-6 space-y-4">
              <div v-for="r in sampleReviews" :key="r.name" class="card p-4">
                <div class="flex items-center gap-3"><img :src="r.avatar" class="w-8 h-8 rounded-full" /><div><div class="text-sm font-medium">{{ r.name }}</div><div class="text-xs text-zinc-500">{{ r.time }}</div></div><div class="ml-auto text-amber-500 text-sm">★ {{ r.rating }}</div></div>
                <p class="mt-2 text-sm text-zinc-600">{{ r.text }}</p>
              </div>
            </div>
          </div>
          <div v-if="activeTab==='FAQ'" class="space-y-3">
            <details class="card p-4"><summary class="font-medium cursor-pointer">How do I download after purchase?</summary><p class="mt-2 text-sm text-zinc-600">Instant download from your dashboard. Physical items show tracking.</p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">Can I use this for client work?</summary><p class="mt-2 text-sm text-zinc-600">Yes — commercial license included. Check license type on each product.</p></details>
            <details class="card p-4"><summary class="font-medium cursor-pointer">What about refunds?</summary><p class="mt-2 text-sm text-zinc-600">Digital: 14-day if not downloaded. Physical: 30-day returns.</p></details>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="card p-5">
          <div class="font-semibold">About {{ product.author }}</div>
          <p class="mt-2 text-sm text-zinc-600">Top seller on N-GELO. 12 products, 4.9 avg rating, 24h response time.</p>
          <button class="mt-4 w-full btn-ghost">Message seller</button>
        </div>
        <div class="mt-4 card p-5">
          <div class="font-semibold text-sm">More from {{ product.author }}</div>
          <div class="mt-3 space-y-3">
            <router-link v-for="p in moreFromAuthor" :key="p.id" :to="`/product/${p.id}`" class="flex gap-3">
              <img :src="p.image" class="w-14 h-14 rounded-xl object-cover border" />
              <div><div class="text-sm font-medium leading-tight">{{ p.name }}</div><div class="text-xs text-zinc-500">${{ p.price }} • ★ {{ p.rating }}</div></div>
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
