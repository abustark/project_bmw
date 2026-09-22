<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-wrap gap-3 items-center justify-between">
      <div>
        <h1 class="font-display text-3xl font-semibold">Dashboard</h1>
        <p class="text-sm text-[hsl(var(--ink-subtle))]">Buyer & seller views — as per the original spec.</p>
      </div>
      <div class="flex gap-2">
        <button @click="role='buyer'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='buyer' ? 'bg-[#5e6ad2] text-white border-transparent' : 'bg-[hsl(var(--card))]']">Buyer</button>
        <button @click="role='seller'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='seller' ? 'bg-[#5e6ad2] text-white border-transparent' : 'bg-[hsl(var(--card))]']">Seller</button>
        <button @click="role='admin'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='admin' ? 'bg-[#5e6ad2] text-white border-transparent' : 'bg-[hsl(var(--card))]']">Admin</button>
      </div>
    </div>

    <!-- buyer -->
    <div v-if="role==='buyer'" class="mt-6 space-y-6">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">ORDERS</div><div class="text-2xl font-semibold">{{ orders.length }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">All time</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">SPENT</div><div class="text-2xl font-semibold">${{ orders.reduce((n,o)=> n+o.total,0) }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Digital + physical</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">DOWNLOADS</div><div class="text-2xl font-semibold">{{ orders.reduce((n,o)=> n+o.items.length,0) }}</div><div class="text-xs text-[#5e6ad2]">Instant access</div></div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between"><h3 class="font-semibold">Your purchases</h3><span class="text-xs text-[hsl(var(--ink-subtle))]">Auto-generated ID • emailed after first checkout</span></div>
        <div v-if="!orders.length" class="mt-6 text-center py-10">
          <div class="text-[hsl(var(--ink-subtle))] text-sm">No purchases yet. Complete a checkout to see orders here.</div>
          <router-link to="/shop" class="mt-3 inline-flex btn-primary">Shop now</router-link>
        </div>
        <div v-else class="mt-4 space-y-4">
          <div v-for="o in orders" :key="o.id" class="rounded-2xl border border-[hsl(var(--hairline))] p-4">
            <div class="flex items-center justify-between text-sm"><span class="font-semibold">Order #NG-{{ o.id }}</span><span class="text-[hsl(var(--ink-subtle))]">{{ new Date(o.date).toLocaleDateString() }} • ${{ o.total }}</span></div>
            <div class="mt-3 grid sm:grid-cols-2 gap-2">
              <div v-for="it in o.items" :key="it.id" class="flex gap-3 p-2 rounded-xl bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))]">
                <img :src="it.image" class="w-12 h-12 rounded-lg object-cover" />
                <div class="flex-1 min-w-0"><div class="text-sm font-medium truncate">{{ it.name }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Qty {{ it.qty }}</div></div>
                <button class="self-center text-xs px-3 py-1.5 rounded-full bg-[#5e6ad2] text-white">Download</button>
              </div>
            </div>
            <div class="mt-3 flex gap-2">
              <button class="text-xs px-3 py-1.5 rounded-full border">Rate product ★</button>
              <button class="text-xs px-3 py-1.5 rounded-full border">Report issue</button>
              <button class="text-xs px-3 py-1.5 rounded-full border">Chat with seller</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- seller -->
    <div v-if="role==='seller'" class="mt-6 space-y-6">
      <div class="grid md:grid-cols-4 gap-4">
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">REVENUE</div><div class="text-2xl font-semibold">₹8,420</div><div class="text-xs text-[#5e6ad2]">+12% vs last month</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">SALES</div><div class="text-2xl font-semibold">312</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Avg ₹27</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">VISITS</div><div class="text-2xl font-semibold">4.2k</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Profile + product</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">NEXT PAYOUT</div><div class="text-2xl font-semibold">21st</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Via Stripe Connect</div></div>
      </div>

      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 card p-6">
          <div class="flex items-center justify-between"><h3 class="font-semibold">Your products</h3><button class="btn-primary !py-2 !px-4 text-sm">+ Add product</button></div>
          <div class="mt-4 space-y-3">
            <div v-for="p in sellerProducts" :key="p.id" class="flex gap-3 p-3 rounded-2xl border border-[hsl(var(--hairline))]">
              <img :src="p.image" class="w-16 h-16 rounded-xl object-cover" />
              <div class="flex-1"><div class="font-medium text-sm">{{ p.name }}</div><div class="text-xs text-[hsl(var(--ink-subtle))]">${{ p.price }} • {{ p.sales }} sales • ★ {{ p.rating }}</div><div class="mt-1 w-full h-1.5 bg-[hsl(var(--surface-1))] rounded-full overflow-hidden"><div class="h-full bg-[#5e6ad2]" :style="{width: Math.min(100, p.sales/20)+'%'}"></div></div></div>
              <div class="flex flex-col gap-1"><button class="text-xs px-3 py-1.5 rounded-full border">Edit</button><button class="text-xs px-3 py-1.5 rounded-full border text-red-600">Delete</button></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-4">
          <div class="card p-6">
            <h4 class="font-semibold text-sm">Traffic analytics</h4>
            <div class="mt-3 space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-[hsl(var(--ink-subtle))]">Product views</span><span class="font-medium">3,420</span></div>
              <div class="flex justify-between"><span class="text-[hsl(var(--ink-subtle))]">Profile visits</span><span class="font-medium">820</span></div>
              <div class="flex justify-between"><span class="text-[hsl(var(--ink-subtle))]">Conversion</span><span class="font-medium">7.4%</span></div>
            </div>
            <div class="mt-4 h-24 flex items-end gap-1">
              <div v-for="i in 12" :key="i" class="flex-1 bg-[#5e6ad2] rounded-t" :style="{height: (20+Math.random()*80)+'%'}"></div>
            </div>
          </div>
          <div class="card p-6">
            <h4 class="font-semibold text-sm">Payout schedule</h4>
            <p class="mt-2 text-xs text-[hsl(var(--ink-subtle))]">Sellers receive payments on the 14th and 21st of every month. Next: <b class="text-[hsl(var(--ink))]">21 Sep 2026 — ₹1,240</b></p>
          </div>
        </div>
      </div>
    </div>

    <!-- admin -->
    <div v-if="role==='admin'" class="mt-6 space-y-6">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">OPEN REPORTS</div><div class="text-2xl font-semibold">3</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Needs review</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">FAQ QUEUE</div><div class="text-2xl font-semibold">5</div><div class="text-xs text-[hsl(var(--ink-subtle))]">Unanswered</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-[hsl(var(--ink-subtle))]">ADMINS</div><div class="text-2xl font-semibold">4</div><div class="text-xs text-[hsl(var(--ink-subtle))]">1 super-admin</div></div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold">Reports — spam / stolen content</h3>
        <div class="mt-4 space-y-3">
          <div v-for="r in adminReports" :key="r.id" class="p-4 rounded-2xl border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/50">
            <div class="flex items-center justify-between"><span class="font-medium text-sm">{{ r.product }}</span><span class="text-xs px-2 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">{{ r.status }}</span></div>
            <div class="text-xs text-[hsl(var(--ink-subtle))] mt-1">Reported by {{ r.by }} • {{ r.reason }}</div>
            <div class="mt-3 flex gap-2"><button class="text-xs px-3 py-1.5 rounded-full bg-[#5e6ad2] text-white">Take action</button><button class="text-xs px-3 py-1.5 rounded-full border bg-[hsl(var(--card))]">Dismiss</button></div>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold">FAQ — user questions</h3>
        <div class="mt-4 space-y-3">
          <div v-for="q in adminFaq" :key="q.id" class="p-4 rounded-2xl border">
            <div class="text-sm font-medium">{{ q.q }}</div>
            <div class="text-xs text-[hsl(var(--ink-subtle))]">From {{ q.from }}</div>
            <div class="mt-2 flex gap-2"><input placeholder="Type answer…" class="flex-1 px-3 py-2 rounded-full border text-sm" /><button class="px-4 py-2 rounded-full bg-[#5e6ad2] text-white text-xs">Answer</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from '../data/products'
const role = ref('buyer')
const orders = ref(JSON.parse(localStorage.getItem('ngelo-orders')||'[]'))
const sellerProducts = computed(()=> products.slice(0,4))
const adminReports = [
  { id:1, product:'Hues 3D Vol II', by:'buyer #182', reason:'Possibly stolen from Gumroad', status:'Open' },
  { id:2, product:'Form Resume Kit', by:'buyer #204', reason:'Spam — duplicate listing', status:'Open' },
  { id:3, product:'Apex Dashboard', by:'buyer #191', reason:'Broken download link', status:'Investigating' },
]
const adminFaq = [
  { id:1, q:'Can I resell the templates to my clients?', from:'alex@email.com' },
  { id:2, q:'Do fonts come with web license?', from:'priya@email.com' },
]
</script>
