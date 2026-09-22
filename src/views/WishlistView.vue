<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="font-display text-3xl font-semibold">Wishlist</h1>
    <p class="text-sm text-[hsl(var(--ink-subtle))]">{{ wishlist.ids.length }} saved items</p>

    <div v-if="!items.length" class="mt-8 card p-10 text-center">
      <div class="text-lg font-semibold">Nothing saved yet</div>
      <p class="text-sm text-[hsl(var(--ink-subtle))]">Tap the heart on any product to save it.</p>
      <router-link to="/shop" class="mt-4 inline-flex btn-primary">Explore shop</router-link>
    </div>

    <div v-else class="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <ProductCard v-for="p in items" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { products } from '../data/products'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'
const wishlist = useWishlistStore()
const cart = useCartStore()
const items = computed(()=> products.filter(p=> wishlist.ids.includes(p.id)))
</script>
