<template>
  <teleport to="body">
    <div v-if="cart.isDrawerOpen" class="fixed inset-0 z-50 flex justify-end">
      <div @click="cart.isDrawerOpen=false" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-[420px] bg-[hsl(var(--card))] h-full shadow-2xl flex flex-col animate-slide-up">
        <div class="p-6 border-b border-[hsl(var(--hairline))] flex items-center justify-between">
          <div>
            <div class="font-display text-xl font-semibold">Your cart</div>
            <div class="text-xs text-[hsl(var(--ink-subtle))]">{{ cart.count }} items • {{ cart.items.length }} products</div>
          </div>
          <button @click="cart.isDrawerOpen=false" class="w-9 h-9 grid place-items-center rounded-full border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-1))]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div v-if="!cart.items.length" class="flex-1 grid place-items-center p-8 text-center">
          <div>
            <div class="w-16 h-16 mx-auto grid place-items-center rounded-2xl bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xl">🛒</div>
            <div class="mt-4 font-semibold">Your cart is empty</div>
            <div class="text-sm text-[hsl(var(--ink-subtle))]">Add some digital goodies and they’ll appear here.</div>
            <router-link @click="cart.isDrawerOpen=false" to="/shop" class="mt-4 inline-flex btn-primary">Browse shop</router-link>
          </div>
        </div>

        <div v-else class="flex-1 overflow-auto p-4 space-y-3">
          <div v-for="item in cart.items" :key="item.id" class="flex gap-3 p-3 rounded-2xl border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/50">
            <img :src="item.image" class="w-16 h-16 rounded-xl object-cover bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium leading-tight line-clamp-2">{{ item.name }}</div>
              <div class="text-xs text-[hsl(var(--ink-subtle))]">{{ item.author }}</div>
              <div class="mt-2 flex items-center gap-2">
                <button @click="cart.setQty(item.id, item.qty-1)" class="w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]">−</button>
                <span class="text-sm font-semibold w-6 text-center">{{ item.qty }}</span>
                <button @click="cart.setQty(item.id, item.qty+1)" class="w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]">+</button>
                <span class="ml-auto text-sm font-semibold">₹{{ (item.price * item.qty).toLocaleString('en-IN') }}</span>
              </div>
            </div>
            <button @click="cart.remove(item.id)" class="self-start w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] hover:border-red-200 hover:text-red-600">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="pt-2">
            <div class="flex gap-2">
              <input v-model="couponInput" placeholder="Coupon code" class="flex-1 px-4 py-2.5 rounded-full border border-[hsl(var(--hairline))] text-sm" />
              <button @click="apply" class="px-5 py-2.5 rounded-full bg-[#5e6ad2] text-white text-sm font-medium">Apply</button>
            </div>
            <div v-if="couponMsg" class="mt-2 text-xs" :class="couponMsg.ok ? 'text-[#5e6ad2]' : 'text-red-600'">{{ couponMsg.text }}</div>
            <div class="mt-2 text-xs text-[hsl(var(--ink-subtle))]">Try <b>WELCOME20</b> for 20% off or <b>NGELO10</b></div>
          </div>
        </div>

        <div v-if="cart.items.length" class="p-6 border-t border-[hsl(var(--hairline))] bg-[hsl(var(--card))] space-y-3">
          <div class="flex justify-between text-sm"><span class="text-[hsl(var(--ink-subtle))]">Subtotal</span><span class="font-medium">₹{{ cart.subtotal.toLocaleString('en-IN') }}</span></div>
          <div v-if="cart.discount" class="flex justify-between text-sm text-[#5e6ad2]"><span>Discount</span><span>−₹{{ cart.discount.toLocaleString('en-IN') }}</span></div>
          <div class="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{{ cart.total.toLocaleString('en-IN') }}</span></div>
          <p class="text-xs text-[hsl(var(--ink-subtle))]">Instant access · reference demo · total ₹0</p>
          <router-link @click="cart.isDrawerOpen=false" to="/checkout" class="w-full btn-primary justify-center">Checkout — ₹{{ cart.total.toLocaleString('en-IN') }}</router-link>
          <router-link @click="cart.isDrawerOpen=false" to="/cart" class="w-full btn-ghost justify-center">View full cart</router-link>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const couponInput = ref(cart.coupon)
const couponMsg = ref(null)
function apply(){
  const code = couponInput.value.trim().toUpperCase()
  if(!code){ couponMsg.value={ok:false,text:'Enter a code'}; return }
  if(['WELCOME20','NGELO10'].includes(code)){
    cart.applyCoupon(code)
    couponMsg.value={ok:true,text:`Applied ${code} — demo, total stays ₹0!`}
  } else {
    couponMsg.value={ok:false,text:'Invalid code'}
  }
}
</script>
