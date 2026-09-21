<template>
  <!-- clean card — single purpose, not chaotic -->
  <Card class="group relative overflow-hidden flex flex-col border-zinc-200 rounded-[16px] hover:border-zinc-300 hover:shadow-sm transition bg-white">
    <!-- image -->
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
      <img :src="product.image" :alt="product.name" width="800" height="600" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.02] transition-[transform] duration-300" @error="onImgError" />
      <!-- minimal badges: reference + category only -->
      <div class="absolute top-3 left-3 flex gap-2">
        <Badge v-if="product.isReference" class="text-[11px] tracking-widest bg-amber-500 text-white border-0 px-2.5 py-1">REFERENCE</Badge>
        <Badge variant="secondary" class="bg-white/90 backdrop-blur text-xs font-medium border border-zinc-100 px-2.5 py-1">{{ product.category }}</Badge>
      </div>
      <!-- wishlist -->
      <Button
        @click.prevent="toggleWish"
        :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWished"
        variant="outline"
        size="icon"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border-zinc-200 shadow-sm hover:bg-white focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        <svg aria-hidden="true" class="w-4 h-4" :class="isWished ? 'fill-zinc-900 stroke-zinc-900' : 'fill-none stroke-zinc-700'" stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
        </svg>
      </Button>
    </router-link>

    <CardContent class="p-4 flex flex-col flex-1 gap-3">
      <!-- title -->
      <router-link :to="`/product/${product.id}`" class="font-semibold leading-tight line-clamp-2 hover:underline underline-offset-4 text-[15px] text-zinc-900" style="text-wrap: balance">{{ product.name }}</router-link>

      <!-- meta: author + rating — single line, not crowded -->
      <div class="flex items-center gap-2 text-xs text-zinc-500">
        <span class="truncate" translate="no">{{ product.author }}</span>
        <span class="w-1 h-1 bg-zinc-300 rounded-full shrink-0" aria-hidden="true"></span>
        <span class="inline-flex items-center gap-1 shrink-0"><span class="text-amber-500" aria-hidden="true">★</span> {{ product.rating }} <span class="text-zinc-400">({{ product.reviews }})</span></span>
      </div>

      <!-- price — single row, clear -->
      <div class="flex items-baseline gap-2">
        <template v-if="product.isReference">
          <span class="text-lg font-bold text-emerald-700 tabular-nums">₹0</span>
          <span class="text-xs text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
          <span class="ml-auto text-[11px] font-semibold tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">₹0 • REFERENCE</span>
        </template>
        <template v-else>
          <span class="text-lg font-bold tabular-nums">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
          <span v-if="product.originalPrice" class="text-xs text-zinc-400 line-through tabular-nums">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
        </template>
      </div>

      <!-- source — plain text, no link -->
      <div v-if="product.isReference" class="text-xs text-zinc-500 truncate" translate="no">{{ product.referenceName }} — extracted • {{ product.license }}</div>

      <!-- tags — max 2, not 3+ -->
      <div class="flex flex-wrap gap-1.5">
        <Badge v-for="t in product.tags.slice(0, 2)" :key="t" variant="secondary" class="text-[11px] bg-zinc-50 border-zinc-200 text-zinc-600 font-normal">{{ t }}</Badge>
      </div>

      <!-- actions — 2 buttons, clear differentiation -->
      <div class="mt-auto flex gap-2 pt-2">
        <Button @click="$emit('add', product)" variant="pill" size="pill" class="flex-1 h-9 text-sm font-medium focus-visible:ring-2 focus-visible:ring-zinc-900">Add • ₹0</Button>
        <router-link :to="`/product/${product.id}`" class="px-4 h-9 rounded-full border border-zinc-200 bg-white text-sm font-medium inline-flex items-center justify-center hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-900">View</router-link>
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
