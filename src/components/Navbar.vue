<template>
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-[#fcfcf9]/80 border-b border-zinc-100">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-[64px] items-center justify-between gap-6">
        <!-- logo -->
        <router-link to="/" class="flex items-center gap-3 shrink-0">
          <div class="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-display font-extrabold text-sm tracking-widest">NG</div>
          <div class="leading-none">
            <div class="font-display font-bold text-[17px] tracking-tight">N-GELO</div>
            <div class="text-[11px] tracking-[0.18em] font-medium text-zinc-500 -mt-0.5">DIGITAL MARKET</div>
          </div>
        </router-link>

        <!-- desktop nav -->
        <nav class="hidden lg:flex items-center gap-1 text-sm font-medium">
          <router-link to="/shop" class="px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition" active-class="bg-zinc-900 text-white">Shop</router-link>
          <router-link to="/about" class="px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition">About</router-link>
          <a href="#faq" @click.prevent="goFaq" class="px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition">FAQ</a>
          <span class="mx-2 h-4 w-px bg-zinc-200"></span>
          <span class="text-xs tracking-widest text-zinc-500">BUILT FOR CREATORS</span>
        </nav>

        <!-- search desktop -->
        <div class="hidden md:flex flex-1 max-w-[420px] items-center">
          <div class="relative w-full">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keydown.enter="$emit('search')" placeholder="Search UI kits, templates, courses…" class="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-zinc-200 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition" />
          </div>
        </div>

        <!-- actions -->
        <div class="flex items-center gap-1.5">
          <router-link to="/wishlist" class="relative w-10 h-10 grid place-items-center rounded-full bg-white border border-zinc-200 hover:border-zinc-300 transition">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z"/></svg>
            <span v-if="wishlistIds.length" class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center bg-zinc-900 text-white text-[11px] font-bold rounded-full">{{ wishlistIds.length }}</span>
          </router-link>
          <button @click="cart.isDrawerOpen = true" class="relative w-10 h-10 grid place-items-center rounded-full bg-zinc-900 text-white hover:bg-black transition">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 7h14l-1 11H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
            <span v-if="cart.count" class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center bg-white text-zinc-900 text-[11px] font-bold rounded-full border border-zinc-900">{{ cart.count }}</span>
          </button>
          <router-link to="/dashboard" class="hidden sm:inline-flex ml-1 btn-primary !py-2.5 !px-5">Dashboard</router-link>
          <button @click="mobileOpen = !mobileOpen" class="lg:hidden w-10 h-10 grid place-items-center rounded-full bg-white border border-zinc-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>

      <!-- mobile search -->
      <div class="md:hidden pb-3">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Search products…" class="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900" />
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <div v-if="mobileOpen" class="lg:hidden border-t border-zinc-100 bg-white px-4 py-4 space-y-2">
      <router-link @click="mobileOpen=false" to="/shop" class="block px-4 py-3 rounded-xl bg-zinc-50 font-medium">Shop</router-link>
      <router-link @click="mobileOpen=false" to="/about" class="block px-4 py-3 rounded-xl bg-zinc-50 font-medium">About</router-link>
      <router-link @click="mobileOpen=false" to="/dashboard" class="block px-4 py-3 rounded-xl bg-zinc-900 text-white font-medium">Dashboard</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

defineProps({ modelValue: String, wishlistIds: { type: Array, default: () => [] } })
defineEmits(['update:modelValue','search'])
const cart = useCartStore()
const wishlist = useWishlistStore()
const wishlistIds = wishlist.ids
const mobileOpen = ref(false)
const router = useRouter()
function goFaq(){
  router.push('/about')
  setTimeout(()=> document.getElementById('faq')?.scrollIntoView({behavior:'smooth'}), 300)
}
</script>
