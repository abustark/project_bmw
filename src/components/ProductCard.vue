<template>
  <!-- Linear product-screenshot card: image, eyebrow, name, source, one-line price -->
  <Card class="group flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] rounded-[12px] hover:border-[#34343a] transition">
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden rounded-t-[12px] bg-[hsl(var(--surface-1))]">
      <img :src="product.image" :alt="product.name" width="800" height="600" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.02] transition-[transform] duration-300" @error="onImgError" />
      <Button
        @click.prevent="toggleWish"
        :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWished"
        variant="outline"
        size="icon"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[hsl(var(--card))]/90 backdrop-blur border border-[hsl(var(--hairline))] shadow-none hover:bg-[hsl(var(--card))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
      >
        <svg aria-hidden="true" class="w-4 h-4" :class="isWished ? 'fill-[#5e6ad2] stroke-[#5e6ad2]' : 'fill-none stroke-[hsl(var(--ink-subtle))]'" stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
        </svg>
      </Button>
    </router-link>

    <CardContent class="p-4 flex flex-col flex-1 gap-2">
      <div class="flex items-center justify-between">
        <span class="text-[11px] tracking-widest font-medium text-[hsl(var(--ink-subtle))]">{{ product.category.toUpperCase() }}</span>
        <span class="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">★ {{ product.rating }}</span>
      </div>

      <router-link :to="`/product/${product.id}`" class="font-medium leading-snug line-clamp-2 hover:underline underline-offset-4 text-[15px] text-[hsl(var(--ink))]" style="text-wrap: balance">{{ product.name }}</router-link>

      <div class="text-xs text-[hsl(var(--ink-subtle))] truncate" translate="no">{{ product.referenceName || product.author }}</div>

      <!-- price: one quiet line — ₹0 + strikethrough estimate, nothing else -->
      <div class="mt-auto pt-1.5 flex items-baseline gap-2">
        <template v-if="product.isReference">
          <span class="text-lg font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹0</span>
          <span class="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
        </template>
        <template v-else>
          <span class="text-lg font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
          <span v-if="product.originalPrice" class="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
        </template>
      </div>

      <div class="flex gap-2">
        <Button @click="$emit('add', product)" class="flex-1 h-8 text-sm font-medium bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-[8px] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Add to cart</Button>
        <router-link :to="`/product/${product.id}`" class="px-4 h-8 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium inline-flex items-center justify-center hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2] text-[hsl(var(--ink))]">View</router-link>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'

const props = defineProps({ product: Object })
defineEmits(['add'])
const wish = useWishlistStore()
const isWished = computed(() => wish.has(props.product.id))
function toggleWish() {
  wish.toggle(props.product.id)
}
function onImgError(e) {
  if (props.product.fallback) e.target.src = props.product.fallback
}
</script>
