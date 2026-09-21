<template>
  <!-- Uiverse-style: live preview + hover actions + minimal meta -->
  <div class="group relative flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] rounded-[12px] hover:border-[#34343a] transition">
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden rounded-t-[12px] bg-[hsl(var(--surface-1))]" :aria-label="product.name">
      <LivePreview :kind="product.preview || 'shadcn-buttons'" />
      <!-- hover actions (uiverse: Get code / Link) -->
      <div class="absolute inset-0 flex items-end justify-center gap-2 pb-3 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/40 to-transparent">
        <span class="h-8 px-4 inline-flex items-center rounded-[8px] bg-[hsl(var(--card))]/95 border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink))]">Get code →</span>
        <button
          @click.prevent="cart.add(product)"
          aria-label="Add to cart"
          class="w-8 h-8 grid place-items-center rounded-[8px] bg-[#5e6ad2] text-white hover:bg-[#828fff] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h14l-1 11H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
        </button>
        <button
          @click.prevent="toggleWish"
          :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
          :aria-pressed="isWished"
          class="w-8 h-8 grid place-items-center rounded-[8px] bg-[hsl(var(--card))]/95 border border-[hsl(var(--hairline))] hover:border-[#34343a] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
        >
          <svg aria-hidden="true" class="w-4 h-4" :class="isWished ? 'fill-[#5e6ad2] stroke-[#5e6ad2]' : 'fill-none stroke-[hsl(var(--ink-subtle))]'" stroke-width="1.7" viewBox="0 0 24 24">
            <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
          </svg>
        </button>
      </div>
    </router-link>

    <div class="p-3 flex flex-col gap-1">
      <router-link :to="`/product/${product.id}`" class="text-[13px] font-medium text-[hsl(var(--ink))] truncate hover:underline underline-offset-4">{{ product.name }}</router-link>
      <div class="text-[11px] text-[hsl(var(--ink-subtle))] truncate" translate="no">{{ product.author }}</div>
      <div class="mt-0.5 flex items-center justify-between text-[11px] text-[hsl(var(--ink-subtle))]">
        <span class="tabular-nums">★ {{ product.rating }} · {{ formatUses(product.sales) }} uses</span>
        <span class="tabular-nums"><span class="font-semibold text-[hsl(var(--ink))]">₹0</span> <span class="line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import LivePreview from './LivePreview.vue'

const props = defineProps({ product: Object })
const wish = useWishlistStore()
const cart = useCartStore()
const isWished = computed(() => wish.has(props.product.id))
function toggleWish() {
  wish.toggle(props.product.id)
}
function formatUses(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
}
</script>
