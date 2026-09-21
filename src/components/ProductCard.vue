<template>
  <!-- shadcn Card + Badge + Button — premium reference variant per Taste Skill + Vercel -->
  <Card class="group relative overflow-hidden flex flex-col border-zinc-100 rounded-[20px] hover:shadow-soft transition focus-within:ring-2 focus-within:ring-zinc-900/20">
    <!-- image -->
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
      <img :src="product.image" :alt="product.name" width="800" height="600" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-[transform] duration-500" @error="onImgError" />
      <div class="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[70%]">
        <Badge v-if="product.badge" variant="pill" class="text-[11px] tracking-widest px-2.5 py-1 bg-zinc-900 text-white border-0">{{ product.badge }}</Badge>
        <Badge v-if="product.isReference" variant="outline" class="text-[11px] tracking-widest bg-amber-50 border-amber-200 text-amber-900">REFERENCE</Badge>
        <Badge v-if="product.physical" variant="outline" class="bg-white text-[11px] tracking-widest">PHYSICAL</Badge>
      </div>
      <Button @click.prevent="toggleWish" :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'" :aria-pressed="String(isWished)" variant="outline" size="icon" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border-zinc-100 shadow-sm hover:bg-white focus-visible:ring-2 focus-visible:ring-zinc-900">
        <svg aria-hidden="true" class="w-4 h-4" :class="isWished ? 'fill-zinc-900 stroke-zinc-900' : 'fill-none stroke-zinc-700'" stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z"/>
        </svg>
      </Button>
      <div class="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <Badge variant="secondary" class="bg-white/90 backdrop-blur text-xs font-medium border-0">{{ product.category }}</Badge>
        <Badge class="hidden sm:inline-flex items-center gap-1 bg-zinc-900 text-white border-0 tabular-nums">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true"></span>{{ product.sales.toLocaleString() }} sales
        </Badge>
      </div>
    </router-link>

    <CardContent class="p-4 flex flex-col flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2 min-w-0">
        <router-link :to="`/product/${product.id}`" class="font-semibold leading-tight line-clamp-2 hover:underline text-pretty min-w-0" style="text-wrap: balance">{{ product.name }}</router-link>
        <span v-if="product.isReference" class="shrink-0 flex flex-col items-end tabular-nums">
          <span class="text-sm font-bold text-emerald-700">₹0</span>
          <span class="text-xs text-zinc-400 line-through">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span>
        </span>
        <span v-else class="shrink-0 text-sm font-bold tabular-nums">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
      </div>
      <div class="mt-1 text-xs text-muted-foreground truncate">by <span translate="no">{{ product.author }}</span> • <span class="inline-flex items-center gap-1"><span class="text-amber-500" aria-hidden="true">★</span> {{ product.rating }} ({{ product.reviews }})</span></div>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <Badge v-for="t in product.tags.slice(0,3)" :key="t" variant="secondary" class="text-[11px] bg-zinc-50 border-zinc-100">{{ t }}</Badge>
        <Badge v-if="product.isReference" variant="outline" class="text-[11px] bg-white border-amber-200 text-zinc-600">View Source ↗</Badge>
      </div>
      <div v-if="product.isReference" class="mt-2 text-xs">
        <a :href="product.referenceUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 underline-offset-2 hover:underline line-clamp-1" :title="product.referenceUrl">{{ product.referenceName }}</a>
      </div>
      <div class="mt-4 flex gap-2">
        <Button @click="$emit('add', product)" variant="pill" size="pill" class="flex-1 focus-visible:ring-2 focus-visible:ring-zinc-900">Add to cart</Button>
        <router-link :to="`/product/${product.id}`" class="px-4 py-2.5 rounded-full border border-input bg-background text-sm font-medium hover:bg-accent inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2">View</router-link>
      </div>
      <div v-if="product.isReference" class="mt-2 text-xs text-center text-zinc-500"><span class="line-through decoration-zinc-400">₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</span> <span class="mx-1">→</span> <span class="font-semibold text-emerald-700">₹0</span> <span class="ml-1">Reference only</span></div>
      <div v-else-if="product.originalPrice" class="mt-2 text-xs text-muted-foreground line-through text-center tabular-nums">was ₹{{ Number(product.originalPrice).toLocaleString('en-IN') }}</div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import Card from "@/components/ui/card.vue"
import CardContent from "@/components/ui/card-content.vue"
import Badge from "@/components/ui/badge.vue"
import Button from "@/components/ui/button.vue"

const props = defineProps({ product: Object })
defineEmits(['add'])
const wish = useWishlistStore()
const isWished = computed(() => wish.has(props.product.id))
function toggleWish(){ wish.toggle(props.product.id) }
function onImgError(e){
  if(props.product.fallback) e.target.src = props.product.fallback
}
</script>
