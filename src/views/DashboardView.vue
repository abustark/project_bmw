<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-wrap gap-3 items-center justify-between">
      <div>
        <h1 class="font-display text-3xl font-bold">Dashboard</h1>
        <p class="text-sm text-zinc-500">Buyer & seller views — as per the original spec.</p>
      </div>
      <div class="flex gap-2">
        <button @click="role='buyer'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='buyer' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white']">Buyer</button>
        <button @click="role='seller'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='seller' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white']">Seller</button>
        <button @click="role='admin'" :class="['px-5 py-2.5 rounded-full text-sm font-medium border', role==='admin' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white']">Admin</button>
      </div>
    </div>

    <!-- buyer -->
    <div v-if="role==='buyer'" class="mt-6 space-y-6">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">ORDERS</div><div class="text-2xl font-bold">{{ orders.length }}</div><div class="text-xs text-zinc-500">All time</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">SPENT</div><div class="text-2xl font-bold">${{ orders.reduce((n,o)=> n+o.total,0) }}</div><div class="text-xs text-zinc-500">Digital + physical</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">DOWNLOADS</div><div class="text-2xl font-bold">{{ orders.reduce((n,o)=> n+o.items.length,0) }}</div><div class="text-xs text-green-600">Instant access</div></div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between"><h3 class="font-semibold">Your purchases</h3><span class="text-xs text-zinc-500">Auto-generated ID • emailed after first checkout</span></div>
        <div v-if="!orders.length" class="mt-6 text-center py-10">
          <div class="text-zinc-500 text-sm">No purchases yet. Complete a checkout to see orders here.</div>
          <router-link to="/shop" class="mt-3 inline-flex btn-primary">Shop now</router-link>
        </div>
        <div v-else class="mt-4 space-y-4">
          <div v-for="o in orders" :key="o.id" class="rounded-2xl border border-zinc-100 p-4">
            <div class="flex items-center justify-between text-sm"><span class="font-semibold">Order #NG-{{ o.id }}</span><span class="text-zinc-500">{{ new Date(o.date).toLocaleDateString() }} • ${{ o.total }}</span></div>
            <div class="mt-3 grid sm:grid-cols-2 gap-2">
              <div v-for="it in o.items" :key="it.id" class="flex gap-3 p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                <img :src="it.image" class="w-12 h-12 rounded-lg object-cover" />
                <div class="flex-1 min-w-0"><div class="text-sm font-medium truncate">{{ it.name }}</div><div class="text-xs text-zinc-500">Qty {{ it.qty }}</div></div>
                <button class="self-center text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-white">Download</button>
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
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">REVENUE</div><div class="text-2xl font-bold">$8,420</div><div class="text-xs text-green-600">+12% vs last month</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">SALES</div><div class="text-2xl font-bold">312</div><div class="text-xs text-zinc-500">Avg $27</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">VISITS</div><div class="text-2xl font-bold">4.2k</div><div class="text-xs text-zinc-500">Profile + product</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">NEXT PAYOUT</div><div class="text-2xl font-bold">21st</div><div class="text-xs text-zinc-500">Via Stripe Connect</div></div>
      </div>

      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 card p-6">
          <div class="flex items-center justify-between"><h3 class="font-semibold">Your products</h3><button class="btn-primary !py-2 !px-4 text-sm">+ Add product</button></div>
          <div class="mt-4 space-y-3">
            <div v-for="p in sellerProducts" :key="p.id" class="flex gap-3 p-3 rounded-2xl border border-zinc-100">
              <img :src="p.image" class="w-16 h-16 rounded-xl object-cover" />
              <div class="flex-1"><div class="font-medium text-sm">{{ p.name }}</div><div class="text-xs text-zinc-500">${{ p.price }} • {{ p.sales }} sales • ★ {{ p.rating }}</div><div class="mt-1 w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden"><div class="h-full bg-zinc-900" :style="{width: Math.min(100, p.sales/20)+'%'}"></div></div></div>
              <div class="flex flex-col gap-1"><button class="text-xs px-3 py-1.5 rounded-full border">Edit</button><button class="text-xs px-3 py-1.5 rounded-full border text-red-600">Delete</button></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-4">
          <div class="card p-6">
            <h4 class="font-semibold text-sm">Traffic analytics</h4>
            <div class="mt-3 space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-zinc-500">Product views</span><span class="font-medium">3,420</span></div>
              <div class="flex justify-between"><span class="text-zinc-500">Profile visits</span><span class="font-medium">820</span></div>
              <div class="flex justify-between"><span class="text-zinc-500">Conversion</span><span class="font-medium">7.4%</span></div>
            </div>
            <div class="mt-4 h-24 flex items-end gap-1">
              <div v-for="i in 12" :key="i" class="flex-1 bg-zinc-900 rounded-t" :style="{height: (20+Math.random()*80)+'%'}"></div>
            </div>
          </div>
          <div class="card p-6">
            <h4 class="font-semibold text-sm">Payout schedule</h4>
            <p class="mt-2 text-xs text-zinc-500">Sellers receive payments on the 14th and 21st of every month. Next: <b class="text-zinc-900">21 Sep 2026 — $1,240</b></p>
          </div>
        </div>
      </div>
    </div>

    <!-- admin -->
    <div v-if="role==='admin'" class="mt-6 space-y-6">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">OPEN REPORTS</div><div class="text-2xl font-bold">3</div><div class="text-xs text-amber-600">Needs review</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">FAQ QUEUE</div><div class="text-2xl font-bold">5</div><div class="text-xs text-zinc-500">Unanswered</div></div>
        <div class="card p-5"><div class="text-xs tracking-widest text-zinc-500">ADMINS</div><div class="text-2xl font-bold">4</div><div class="text-xs text-zinc-500">1 super-admin</div></div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold">Reports — spam / stolen content</h3>
        <div class="mt-4 space-y-3">
          <div v-for="r in adminReports" :key="r.id" class="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50">
            <div class="flex items-center justify-between"><span class="font-medium text-sm">{{ r.product }}</span><span class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">{{ r.status }}</span></div>
            <div class="text-xs text-zinc-500 mt-1">Reported by {{ r.by }} • {{ r.reason }}</div>
            <div class="mt-3 flex gap-2"><button class="text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-white">Take action</button><button class="text-xs px-3 py-1.5 rounded-full border bg-white">Dismiss</button></div>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold">FAQ — user questions</h3>
        <div class="mt-4 space-y-3">
          <div v-for="q in adminFaq" :key="q.id" class="p-4 rounded-2xl border">
            <div class="text-sm font-medium">{{ q.q }}</div>
            <div class="text-xs text-zinc-500">From {{ q.from }}</div>
            <div class="mt-2 flex gap-2"><input placeholder="Type answer…" class="flex-1 px-3 py-2 rounded-full border text-sm" /><button class="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs">Answer</button></div>
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
