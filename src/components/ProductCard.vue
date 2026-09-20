<template>
  <!-- shadcn Card + Badge + Button (A) — same data, upgraded UI -->
  <Card class="group relative overflow-hidden flex flex-col border-zinc-100 rounded-[20px] hover:shadow-soft transition">
    <!-- image -->
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" @error="onImgError" />
      <div class="absolute top-3 left-3 flex gap-2">
        <Badge v-if="product.badge" variant="pill" class="text-[11px] tracking-widest">{{ product.badge }}</Badge>
        <Badge v-if="product.physical" variant="outline" class="bg-white text-[11px] tracking-widest">PHYSICAL</Badge>
      </div>
      <Button @click.prevent="toggleWish" variant="outline" size="icon" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border-zinc-100 shadow-sm hover:bg-white">
        <svg class="w-4 h-4" :class="isWished ? 'fill-zinc-900 stroke-zinc-900' : 'fill-none stroke-zinc-700'" stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z"/>
        </svg>
      </Button>
      <div class="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <Badge variant="secondary" class="bg-white/90 backdrop-blur text-xs font-medium">{{ product.category }}</Badge>
        <Badge class="hidden sm:inline-flex items-center gap-1 bg-zinc-900 text-white">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>{{ product.sales.toLocaleString() }} sales
        </Badge>
      </div>
    </router-link>

    <CardContent class="p-4 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-2">
        <router-link :to="`/product/${product.id}`" class="font-semibold leading-tight line-clamp-2 hover:underline">{{ product.name }}</router-link>
        <span class="shrink-0 text-sm font-bold">${{ product.price }}</span>
      </div>
      <div class="mt-1 text-xs text-muted-foreground">by {{ product.author }} • <span class="inline-flex items-center gap-1"><span class="text-amber-500">★</span> {{ product.rating }} ({{ product.reviews }})</span></div>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <Badge v-for="t in product.tags.slice(0,3)" :key="t" variant="secondary" class="text-[11px] bg-zinc-50 border-zinc-100">{{ t }}</Badge>
      </div>
      <div class="mt-4 flex gap-2">
        <Button @click="$emit('add', product)" variant="pill" size="pill" class="flex-1">Add to cart</Button>
        <router-link :to="`/product/${product.id}`" class="px-4 py-2.5 rounded-full border border-input bg-background text-sm font-medium hover:bg-accent inline-flex items-center justify-center">View</router-link>
      </div>
      <div v-if="product.originalPrice" class="mt-2 text-xs text-muted-foreground line-through text-center">was ${{ product.originalPrice }}</div>
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
