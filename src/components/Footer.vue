<template>
  <footer class="mt-12 border-t border-zinc-100 bg-white">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- top grid — 3 cols, not 4 crowded -->
      <div class="grid md:grid-cols-12 gap-8">
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-display font-extrabold text-sm tracking-widest">NG</div>
            <div class="font-display font-bold text-lg leading-none">N-GELO</div>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-zinc-600 max-w-[420px]">Reference showcase — 14 free & open-source drops (MIT / ISC / Free) with attribution. Estimated <span class="line-through">₹4,999</span> → <span class="font-bold text-emerald-700">₹0</span> • Not for sale. Extracted components rendered here — source name on card, no outbound link.</p>
        </div>
        <div class="md:col-span-3">
          <div class="font-semibold text-sm">Marketplace</div>
          <ul class="mt-3 space-y-2.5 text-sm text-zinc-600">
            <li><router-link to="/shop" class="hover:text-zinc-900 hover:underline underline-offset-4">All products — ₹0</router-link></li>
            <li><router-link to="/about" class="hover:text-zinc-900">About & FAQ</router-link></li>
            <li><span class="text-zinc-400">Licenses — on product page</span></li>
          </ul>
        </div>
        <div class="md:col-span-4">
          <div class="font-semibold text-sm">Get updates</div>
          <p class="mt-3 text-sm text-zinc-500">Drops, seller tips, no spam.</p>
          <form @submit.prevent="subscribed = true" class="mt-3 flex gap-2">
            <input required type="email" placeholder="you@email.com" class="flex-1 h-10 px-4 rounded-full border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900" aria-label="Email for newsletter" />
            <button class="h-10 px-5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-black focus-visible:ring-2 focus-visible:ring-zinc-900">Join</button>
          </form>
          <p v-if="subscribed" class="mt-2 text-xs text-emerald-600">Thanks! Check your inbox.</p>
          <p class="mt-3 text-xs text-zinc-400">© {{ new Date().getFullYear() }} N-GELO — portfolio demo</p>
        </div>
      </div>

      <!-- attribution — clean, not wall-of-text, 2 lines max -->
      <div class="mt-8 rounded-[12px] border border-amber-200 bg-amber-50 p-4">
        <div class="text-xs font-semibold tracking-widest text-amber-900">REFERENCE ATTRIBUTION — NOT FOR SALE • ₹0</div>
        <p class="mt-1.5 text-xs leading-relaxed text-amber-800">
          14 products curated from free & open-source. Estimated <span class="line-through">₹4,999</span> → <span class="font-bold text-emerald-700">₹0</span> •
          <span translate="no">shadcn/ui (MIT)</span> •
          <span translate="no">Radix (MIT)</span> •
          <span translate="no">Heroicons (MIT)</span> •
          <span translate="no">Lucide (ISC)</span> •
          <span translate="no">Flowbite (MIT)</span> •
          <span translate="no">daisyUI (MIT)</span> •
          <span translate="no">AstroWind (MIT)</span> •
          <span translate="no">Vercel Commerce (MIT)</span> •
          <span translate="no">Cruip Tasty (Free)</span> •
          <span translate="no">Uiverse (MIT)</span> •
          <span translate="no">CSS Loaders (Free)</span> •
          <span translate="no">LottieFiles (Free)</span> •
          <span translate="no">Motion (MIT)</span> •
          <span translate="no">View Transitions (Free)</span> — all rights original authors.
        </p>
      </div>

      <div class="mt-6 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-zinc-500">
        <span>Reference demo • ₹0 • no payment • extracted • shown here</span>
        <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span> All systems operational</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const subscribed = ref(false)
</script>
