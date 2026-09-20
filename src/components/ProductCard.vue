<template>
  <div class="group relative bg-white rounded-[20px] border border-zinc-100 overflow-hidden hover:shadow-soft transition flex flex-col">
    <!-- image -->
    <router-link :to="`/product/${product.id}`" class="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" @error="onImgError" />
      <div class="absolute top-3 left-3 flex gap-2">
        <span v-if="product.badge" class="text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-zinc-900 text-white">{{ product.badge }}</span>
        <span v-if="product.physical" class="text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-white border border-zinc-200">PHYSICAL</span>
      </div>
      <button @click.prevent="toggleWish" class="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-zinc-100 shadow-sm hover:bg-white transition">
        <svg class="w-4 h-4" :class="isWished ? 'fill-zinc-900 stroke-zinc-900' : 'fill-none stroke-zinc-700'" stroke-width="1.7" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z"/>
        </svg>
      </button>
      <div class="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-white/60">{{ product.category }}</span>
        <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-900 text-white hidden sm:inline-flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>{{ product.sales.toLocaleString() }} sales
        </span>
      </div>
    </router-link>

    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-2">
        <router-link :to="`/product/${product.id}`" class="font-semibold leading-tight line-clamp-2 hover:underline">{{ product.name }}</router-link>
        <span class="shrink-0 text-sm font-bold">${{ product.price }}</span>
      </div>
      <div class="mt-1 text-xs text-zinc-500">by {{ product.author }} • <span class="inline-flex items-center gap-1"><span class="text-amber-500">★</span> {{ product.rating }} ({{ product.reviews }})</span></div>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span v-for="t in product.tags.slice(0,3)" :key="t" class="text-[11px] px-2 py-1 rounded-full bg-zinc-50 border border-zinc-100">{{ t }}</span>
      </div>
      <div class="mt-4 flex gap-2">
        <button @click="$emit('add', product)" class="flex-1 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-black transition">Add to cart</button>
        <router-link :to="`/product/${product.id}`" class="px-4 py-2.5 rounded-full border border-zinc-200 text-sm font-medium hover:bg-zinc-50">View</router-link>
      </div>
      <div v-if="product.originalPrice" class="mt-2 text-xs text-zinc-400 line-through text-center">was ${{ product.originalPrice }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '../stores/wishlist'
const props = defineProps({ product: Object })
defineEmits(['add'])
const wish = useWishlistStore()
const isWished = computed(() => wish.has(props.product.id))
function toggleWish(){ wish.toggle(props.product.id) }
function onImgError(e){
  if(props.product.fallback) e.target.src = props.product.fallback
}
</script>
