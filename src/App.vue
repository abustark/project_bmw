<template>
  <div class="min-h-screen flex flex-col">
    <Navbar v-model="search" @search="onSearch" />
    <ReferenceBanner />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
    <CartDrawer />
    <!-- toast -->
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div v-if="toast" class="pointer-events-auto bg-[hsl(var(--surface-2))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink))] px-5 py-3 rounded-full shadow-xl text-sm font-medium animate-slide-up flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#5e6ad2]"></span>{{ toast }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'
import ReferenceBanner from './components/ReferenceBanner.vue'
import { useCartStore } from './stores/cart'

const search = ref('')
const router = useRouter()
const cart = useCartStore()

function onSearch(){
  router.push({ name: 'shop', query: { q: search.value || undefined } })
}

// simple toast on add
import { storeToRefs } from 'pinia'
const { count } = storeToRefs(cart)
let toast = ref('')
let prev = count.value
watch(count, (n, o) => {
  if(n > o){
    toast.value = 'Added to cart • ' + n + ' items'
    setTimeout(()=> toast.value='', 1800)
  }
  prev = n
})
</script>
