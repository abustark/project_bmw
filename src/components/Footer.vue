<template>
  <footer class="mt-16 border-t border-zinc-100 bg-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-10">
        <div class="md:col-span-1">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-display font-extrabold text-sm tracking-widest">NG</div>
            <div class="font-display font-bold text-lg leading-none">N-GELO</div>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-zinc-500">Reference showcase — 14 free & open-source drops (MIT / ISC / Free) curated with attribution. Estimated prices <span class="line-through">₹4,999</span> → <span class="font-bold text-emerald-700">₹0</span> — not for sale. Built as BCA major project, now production-grade.</p>
          <div class="mt-4 flex gap-2">
            <a href="#" class="w-9 h-9 grid place-items-center rounded-full bg-zinc-900 text-white text-xs">𝕏</a>
            <a href="#" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200">●</a>
            <a href="#" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200">◎</a>
          </div>
        </div>
        <div>
          <div class="font-semibold text-sm">Marketplace</div>
          <ul class="mt-3 space-y-2 text-sm text-zinc-600">
            <li><router-link to="/shop" class="hover:text-zinc-900">All products</router-link></li>
            <li><a href="#" class="hover:text-zinc-900">Sell on N-GELO</a></li>
            <li><a href="#" class="hover:text-zinc-900">Licenses</a></li>
            <li><a href="#" class="hover:text-zinc-900">Refunds</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold text-sm">Resources</div>
          <ul class="mt-3 space-y-2 text-sm text-zinc-600">
            <li><a href="#" class="hover:text-zinc-900">Documentation</a></li>
            <li><a href="#" class="hover:text-zinc-900">Changelog</a></li>
            <li><router-link to="/about" class="hover:text-zinc-900">About & FAQ</router-link></li>
            <li><a href="#" class="hover:text-zinc-900">Contact</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold text-sm">Newsletter</div>
          <p class="mt-3 text-sm text-zinc-500">Get drops, 20% off code, and seller tips.</p>
          <form @submit.prevent="subscribed=true" class="mt-3 flex gap-2">
            <input required type="email" placeholder="you@email.com" class="flex-1 px-4 py-2.5 rounded-full border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900" />
            <button class="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium">Join</button>
          </form>
          <p v-if="subscribed" class="mt-2 text-xs text-green-600">Thanks! Check your inbox. CODE: WELCOME20</p>
          <p class="mt-4 text-xs text-zinc-400">© {{ new Date().getFullYear() }} N-GELO. Crafted for the portfolio.</p>
        </div>
      </div>

      <div class="mt-8 p-4 rounded-xl border border-amber-200 bg-amber-50">
        <div class="text-xs font-semibold tracking-widest text-amber-900">REFERENCE ATTRIBUTION — NOT FOR SALE</div>
        <p class="mt-1 text-xs leading-relaxed text-amber-800">All 14 products are curated from free & open-source sources. Estimated prices <span class="line-through">₹4,999</span> → <span class="font-bold text-emerald-700">₹0</span> • Not for sale.<br/>
        <span translate="no">shadcn/ui (MIT)</span> • <span translate="no">Radix UI (MIT)</span> • <span translate="no">Heroicons (MIT)</span> • <span translate="no">Lucide (ISC)</span> • <span translate="no">Flowbite (MIT)</span> • <span translate="no">daisyUI (MIT)</span> • <span translate="no">AstroWind (MIT)</span> • <span translate="no">Vercel Commerce (MIT)</span> • <span translate="no">Cruip Tasty (Free)</span> • <span translate="no">Uiverse (MIT)</span> • <span translate="no">CSS Loaders (Free)</span> • <span translate="no">LottieFiles (Free)</span> • <span translate="no">Motion (MIT)</span> • <span translate="no">View Transitions (Free)</span> — all rights belong to original authors. Tap “View Source” on any product.</p>
      </div>

      <div class="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500">
        <div class="flex gap-4">
          <span>Reference demo • <b class="text-zinc-700">₹0</b> • <span class="line-through">estimates</span> → no payment</span>
          <span class="hidden sm:inline">•</span>
          <span>Pay via <b class="text-zinc-700">Stripe</b> • <b class="text-zinc-700">PayPal</b> (demo)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> All systems operational
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const subscribed = ref(false)
</script>
