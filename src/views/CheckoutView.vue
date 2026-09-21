<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="font-display text-3xl font-semibold">Checkout</h1>
    <div v-if="success" class="mt-6 card p-10 text-center">
      <div class="w-16 h-16 mx-auto grid place-items-center rounded-full bg-green-50 text-2xl">✓</div>
      <h2 class="mt-4 text-2xl font-semibold">Order confirmed!</h2>
      <p class="mt-2 text-[hsl(var(--ink-muted))]">We’ve sent your receipt and download links to <b>{{ form.email }}</b>. Order #NG-{{ orderId }}</p>
      <div class="mt-6 flex justify-center gap-2">
        <router-link to="/dashboard" class="btn-primary">Go to dashboard</router-link>
        <router-link to="/shop" class="btn-ghost">Continue shopping</router-link>
      </div>
      <div class="mt-6 text-xs text-[hsl(var(--ink-subtle))]">Digital items are available instantly. Physical items ship in 3–5 days.</div>
    </div>

    <div v-else class="mt-6 grid lg:grid-cols-12 gap-6">
      <form @submit.prevent="placeOrder" class="lg:col-span-7 space-y-4">
        <div class="card p-6">
          <h3 class="font-semibold">Contact</h3>
          <div class="mt-4 grid sm:grid-cols-2 gap-3">
            <input v-model="form.email" required type="email" placeholder="Email *" class="px-4 py-3 rounded-xl border text-sm" />
            <input v-model="form.name" required placeholder="Full name *" class="px-4 py-3 rounded-xl border text-sm" />
          </div>
          <p class="mt-2 text-xs text-[hsl(var(--ink-subtle))]">We’ll auto-create your N-GELO account and email your login.</p>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold">Payment</h3>
          <div class="mt-3 flex gap-2">
            <button type="button" @click="method='card'" :class="['flex-1 py-3 rounded-xl border font-medium text-sm', method==='card' ? 'bg-[#5e6ad2] text-white border-transparent' : 'bg-[hsl(var(--card))]']">Card (Stripe)</button>
            <button type="button" @click="method='paypal'" :class="['flex-1 py-3 rounded-xl border font-medium text-sm', method==='paypal' ? 'bg-[#5e6ad2] text-white border-transparent' : 'bg-[hsl(var(--card))]']">PayPal</button>
          </div>
          <div v-if="method==='card'" class="mt-4 grid gap-3">
            <input required placeholder="Card number — 4242 4242 4242 4242" class="px-4 py-3 rounded-xl border text-sm" />
            <div class="grid grid-cols-2 gap-3">
              <input required placeholder="MM / YY" class="px-4 py-3 rounded-xl border text-sm" />
              <input required placeholder="CVC" class="px-4 py-3 rounded-xl border text-sm" />
            </div>
          </div>
          <div v-else class="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-900">You’ll be redirected to PayPal to complete payment.</div>
          <label class="mt-4 flex gap-2 text-sm"><input type="checkbox" required /> I agree to the license and refund policy</label>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold">Billing address</h3>
          <div class="mt-3 grid gap-3">
            <input v-model="form.address" placeholder="Address" class="px-4 py-3 rounded-xl border text-sm" />
            <div class="grid grid-cols-2 gap-3">
              <input placeholder="City" class="px-4 py-3 rounded-xl border text-sm" />
              <input placeholder="ZIP" class="px-4 py-3 rounded-xl border text-sm" />
            </div>
          </div>
        </div>

        <button type="submit" :disabled="!cart.items.length" class="w-full btn-primary py-4 text-base">Complete order — ₹0 demo</button>
        <p class="text-xs text-center text-[hsl(var(--ink-subtle))]">Secure 256-bit SSL • Instant download after payment</p>
      </form>

      <div class="lg:col-span-5">
        <div class="card p-6 sticky top-[80px]">
          <h3 class="font-semibold">Order summary</h3>
          <div class="mt-4 space-y-3">
            <div v-for="i in cart.items" :key="i.id" class="flex gap-3">
              <img :src="i.image" class="w-14 h-14 rounded-xl object-cover border" />
              <div class="flex-1"><div class="text-sm font-medium leading-tight">{{ i.name }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Qty {{ i.qty }} • ₹{{ i.price.toLocaleString('en-IN') }}</div></div>
              <div class="text-sm font-semibold">₹{{ (i.price * i.qty).toLocaleString('en-IN') }}</div>
            </div>
          </div>
          <div class="mt-4 border-t pt-4 space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-[hsl(var(--ink-subtle))]">Subtotal</span><span>₹{{ cart.subtotal.toLocaleString('en-IN') }}</span></div>
            <div v-if="cart.discount" class="flex justify-between text-[#5e6ad2]"><span>Discount</span><span>−₹{{ cart.discount.toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{{ cart.total.toLocaleString('en-IN') }}</span></div>
          </div>
          <div class="mt-4 p-3 rounded-xl bg-[hsl(var(--surface-1))] border text-xs text-[hsl(var(--ink-muted))]">Digital delivery is instant. Physical footwear ships tracked — you’ll get a DHL link.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const method = ref('card')
const success = ref(false)
const orderId = ref(Math.floor(100000 + Math.random()*900000))
const form = reactive({ email:'', name:'', address:'' })
function placeOrder(){
  if(!cart.items.length) return
  success.value = true
  // simulate save to dashboard
  const orders = JSON.parse(localStorage.getItem('ngelo-orders')||'[]')
  orders.push({ id: orderId.value, date: new Date().toISOString(), items: [...cart.items], total: cart.total, email: form.email })
  localStorage.setItem('ngelo-orders', JSON.stringify(orders))
  cart.clear()
}
</script>
