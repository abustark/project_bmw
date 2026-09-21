<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="font-display text-3xl font-semibold">Cart</h1>
    <p class="text-sm text-[hsl(var(--ink-subtle))]">{{ cart.count }} items</p>

    <div v-if="!cart.items.length" class="mt-8 card p-10 text-center">
      <div class="text-lg font-semibold">Your cart is empty</div>
      <router-link to="/shop" class="mt-4 inline-flex btn-primary">Continue shopping</router-link>
    </div>

    <div v-else class="mt-6 grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 space-y-3">
        <div v-for="item in cart.items" :key="item.id" class="card p-4 flex gap-4">
          <img :src="item.image" class="w-24 h-24 rounded-xl object-cover border bg-[hsl(var(--surface-1))]" />
          <div class="flex-1">
            <router-link :to="`/product/${item.id}`" class="font-medium hover:underline">{{ item.name }}</router-link>
            <div class="text-xs text-[hsl(var(--ink-subtle))]">{{ item.author }} • {{ item.category }}</div>
            <div class="mt-3 flex items-center gap-2">
              <button @click="cart.setQty(item.id, item.qty-1)" class="w-8 h-8 rounded-full border grid place-items-center">−</button>
              <span class="w-8 text-center font-semibold">{{ item.qty }}</span>
              <button @click="cart.setQty(item.id, item.qty+1)" class="w-8 h-8 rounded-full border grid place-items-center">+</button>
              <span class="ml-auto font-semibold">₹{{ (item.price * item.qty).toLocaleString('en-IN') }}</span>
            </div>
          </div>
          <button @click="cart.remove(item.id)" class="self-start text-xs px-3 py-1.5 rounded-full border hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400">Remove</button>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="card p-6 sticky top-[80px]">
          <div class="font-semibold">Order summary</div>
          <div class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-[hsl(var(--ink-subtle))]">Subtotal</span><span>₹{{ cart.subtotal.toLocaleString('en-IN') }}</span></div>
            <div v-if="cart.discount" class="flex justify-between text-[#5e6ad2]"><span>Discount ({{ cart.coupon }})</span><span>−₹{{ cart.discount.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between font-semibold text-lg border-t pt-3"><span>Total</span><span>₹{{ cart.total.toLocaleString('en-IN') }}</span></div>
          </div>
          <div class="mt-4 flex gap-2">
            <input v-model="coupon" placeholder="Coupon" class="flex-1 px-4 py-2.5 rounded-full border text-sm" />
            <button @click="apply" class="px-5 py-2.5 rounded-full bg-[#5e6ad2] text-white text-sm">Apply</button>
          </div>
          <div v-if="msg" class="mt-2 text-xs" :class="msg.ok?'text-[#5e6ad2]':'text-red-600'">{{ msg.text }}</div>
          <router-link to="/checkout" class="mt-4 w-full btn-primary justify-center py-3.5">Proceed to checkout</router-link>
          <router-link to="/shop" class="mt-2 w-full btn-ghost justify-center">Continue shopping</router-link>
          <p class="mt-3 text-xs text-[hsl(var(--ink-subtle))] text-center">Secure checkout • Instant downloads</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const coupon = ref(cart.coupon)
const msg = ref(null)
function apply(){
  const code = coupon.value.trim().toUpperCase()
  if(['WELCOME20','NGELO10'].includes(code)){
    cart.applyCoupon(code); msg.value={ok:true,text:`Applied ${code}`}
  } else msg.value={ok:false,text:'Invalid code — try WELCOME20'}
}
</script>
