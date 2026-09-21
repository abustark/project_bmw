<template>
  <header class="sticky top-0 z-40 bg-[hsl(var(--canvas))]/80 backdrop-blur-xl border-b border-[hsl(var(--hairline))]">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between gap-3">
        <!-- logo -->
        <router-link to="/" class="flex items-center gap-2.5 shrink-0" aria-label="N-GELO home">
          <div class="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px] tracking-tight">N</div>
          <div class="leading-none hidden sm:block">
            <div class="font-semibold text-[15px] tracking-tight text-[hsl(var(--ink))]">N-GELO</div>
            <div class="text-[10px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mt-0.5">REFERENCE · FREE</div>
          </div>
        </router-link>

        <!-- desktop nav -->
        <nav class="hidden lg:flex items-center gap-1 text-sm font-medium">
          <router-link to="/shop" class="px-3.5 py-1.5 rounded-[8px] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition" active-class="!bg-[hsl(var(--surface-1))] !text-[hsl(var(--ink))]">Shop</router-link>
          <router-link to="/about" class="px-3.5 py-1.5 rounded-[8px] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition" active-class="!bg-[hsl(var(--surface-1))] !text-[hsl(var(--ink))]">About</router-link>
        </nav>

        <!-- search — desktop -->
        <div class="hidden md:flex flex-1 max-w-[340px] items-center">
          <div class="relative w-full">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input ref="searchInput" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keydown.enter="$emit('search')" placeholder="Search components…" class="w-full pl-9 pr-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2] transition" aria-label="Search products" />
            <kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:block text-[10px] text-[hsl(var(--ink-subtle))] border border-[hsl(var(--hairline))] rounded-[4px] px-1.5 py-0.5">↵</kbd>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- theme — system default, Linear segmented -->
          <div class="flex items-center rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-0.5" role="group" aria-label="Theme">
            <button @click="setTheme('system')" :class="['w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', theme === 'system' ? 'bg-[hsl(var(--card))] text-[hsl(var(--ink))]' : 'text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']" :aria-pressed="theme === 'system'" title="System theme" aria-label="System theme">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </button>
            <button @click="setTheme('light')" :class="['w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', theme === 'light' ? 'bg-[hsl(var(--card))] text-[hsl(var(--ink))]' : 'text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']" :aria-pressed="theme === 'light'" title="Light theme" aria-label="Light theme">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            </button>
            <button @click="setTheme('dark')" :class="['w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]', theme === 'dark' ? 'bg-[hsl(var(--card))] text-[hsl(var(--ink))]' : 'text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]']" :aria-pressed="theme === 'dark'" title="Dark theme" aria-label="Dark theme">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
            </button>
          </div>

          <router-link to="/wishlist" class="relative w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:border-[#34343a] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" aria-label="Wishlist">
            <svg class="w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" /></svg>
            <span v-if="wishlistIds.length" class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 grid place-items-center bg-[#5e6ad2] text-white text-[10px] font-semibold rounded-full">{{ wishlistIds.length }}</span>
          </router-link>
          <button @click="cart.isDrawerOpen = true" class="relative w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:border-[#34343a] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" aria-label="Open cart">
            <svg class="w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h14l-1 11H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
            <span v-if="cart.count" class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 grid place-items-center bg-[#5e6ad2] text-white text-[10px] font-semibold rounded-full">{{ cart.count }}</span>
          </button>
          <router-link to="/dashboard" class="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Dashboard</router-link>
          <button @click="mobileOpen = !mobileOpen" class="lg:hidden w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" :aria-expanded="mobileOpen" aria-label="Toggle menu">
            <svg v-if="!mobileOpen" class="w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            <svg v-else class="w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      <!-- mobile search -->
      <div class="md:hidden pb-3">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keydown.enter="$emit('search')" placeholder="Search components…" class="w-full pl-9 pr-4 h-10 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2]" aria-label="Search products mobile" />
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <div v-if="mobileOpen" class="lg:hidden border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
      <div class="max-w-[1280px] mx-auto px-4 py-3 space-y-1.5">
        <router-link @click="mobileOpen = false" to="/shop" class="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">Shop — 14 free · ₹0</router-link>
        <router-link @click="mobileOpen = false" to="/about" class="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">About & FAQ</router-link>
        <router-link @click="mobileOpen = false" to="/dashboard" class="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">Dashboard</router-link>
        <div class="flex items-center gap-2 px-1 pt-2 text-xs text-[hsl(var(--ink-subtle))]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]"></span> Reference · source on card · no outbound
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useTheme } from '../composables/useTheme'

defineProps({ modelValue: String })
defineEmits(['update:modelValue', 'search'])
const cart = useCartStore()
const wishlist = useWishlistStore()
const wishlistIds = wishlist.ids
const mobileOpen = ref(false)
const { theme, setTheme } = useTheme()
const searchInput = ref(null)
function onKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchInput.value?.focus()
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
