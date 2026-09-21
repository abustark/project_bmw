<template>
  <!-- Linear: surface-1, hairline, 12px, no amber warming -->
  <Card class="group relative overflow-hidden flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] rounded-[12px] hover:border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-1))] transition">
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden bg-[hsl(var(--surface-1))]">
      <img :src="product.image" :alt="product.name" width="800" height="600" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.02] transition-[transform] duration-300" @error="onImgError" />
      <div class="absolute top-3 left-3 flex gap-2">
        <Badge v-if="product.isReference" class="text-[11px] tracking-widest bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] px-2.5 py-1 font-medium">REFERENCE</Badge>
        <Badge variant="secondary" class="bg-[hsl(var(--card))]/90 backdrop-blur text-xs font-medium border border-[hsl(var(--hairline))] px-2.5 py-1 text-[hsl(var(--ink-subtle))]">{{ product.category }}</Badge>
      </div>
      <Button
        @click.prevent="toggleWish"
        :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWished"
        variant="outline"
        size="icon"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[hsl(var(--card))]/90 backdrop-blur border border-[hsl(var(--hairline))] shadow-none hover:bg-[hsl(var(--card))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
      >
        <svg aria-hidden="true" class="w-4 h-4" :class="isWished ? 'fill-[#5e6ad2] stroke-[#5e6ad2]' : 'fill-none stroke-[hsl(var(--ink-subtle))]' " stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
        </svg>
      </Button>
    </router-link>

    <CardContent class="p-4 flex flex-col flex-1 gap-3">
      <router-link :to="`/product/${product.id}`" class="font-semibold leading-tight line-clamp-2 hover:underline underline-offset-4 text-[15px] text-[hsl(var(--ink))]" style="text-wrap: balance">{{ product.name }}</router-link>

      <div class="flex items-center gap-2 text-xs text-[hsl(var(--ink-subtle))]">
        <span class="truncate" translate="no">{{ product.author }}</span>
        <span class="w-1 h-1 bg-[hsl(var(--hairline))] rounded-full shrink-0" aria-hidden="true"></span>
        <span class="inline-flex items-center gap-1 shrink-0"><span class="text-[#5e6ad2]" aria-hidden="true">·</span> {{ product.rating }} <span class="opacity-60">({{ product.reviews }})</span></span>
      </div>

      <!-- price — subtle, tabular, no warming amber -->
      <div class="flex items-baseline gap-2">
        <template v-if="product.isReference">
          <span class="text-lg font-semibold tabular-nums text-[hsl(var(--ink))] tracking-tight">₹0</span>
          <span class="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
          <span class="ml-auto text-[11px] font-medium tracking-widest text-[hsl(var(--ink-subtle))] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] px-2 py-1 rounded-full">FREE</span>
        </template>
        <template v-else>
          <span class="text-lg font-semibold tabular-nums text-[hsl(var(--ink))]">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
          <span v-if="product.originalPrice" class="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
        </template>
      </div>

      <div v-if="product.isReference" class="text-xs text-[hsl(var(--ink-subtle))] truncate" translate="no">{{ product.referenceName }} · {{ product.license }} · extracted</div>

      <div class="flex flex-wrap gap-1.5">
        <Badge v-for="t in product.tags.slice(0, 2)" :key="t" variant="secondary" class="text-[11px] bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] font-normal">{{ t }}</Badge>
      </div>

      <div class="mt-auto flex gap-2 pt-2">
        <Button @click="$emit('add', product)" class="flex-1 h-8 text-sm font-medium bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-[8px] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Add · ₹0</Button>
        <router-link :to="`/product/${product.id}`" class="px-4 h-8 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm font-medium inline-flex items-center justify-center hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2] text-[hsl(var(--ink))]">View</router-link>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Badge from '@/components/ui/badge.vue'
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
