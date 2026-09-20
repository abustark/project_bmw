import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('ngelo-cart') || '[]'))
  const coupon = ref(localStorage.getItem('ngelo-coupon') || '')
  const isDrawerOpen = ref(false)

  watch(items, v => localStorage.setItem('ngelo-cart', JSON.stringify(v)), { deep: true })
  watch(coupon, v => localStorage.setItem('ngelo-coupon', v))

  const count = computed(() => items.value.reduce((n,i) => n + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((n,i) => n + i.price * i.qty, 0))
  const discount = computed(() => {
    if (coupon.value.toUpperCase() === 'WELCOME20') return Math.round(subtotal.value * 0.2)
    if (coupon.value.toUpperCase() === 'NGELO10') return Math.round(subtotal.value * 0.1)
    return 0
  })
  const total = computed(() => Math.max(0, subtotal.value - discount.value))

  function add(product, qty=1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty += qty
    else items.value.push({ ...product, qty })
    isDrawerOpen.value = true
  }
  function remove(id) { items.value = items.value.filter(i => i.id !== id) }
  function setQty(id, qty) {
    const it = items.value.find(i=>i.id===id)
    if (!it) return
    if (qty <= 0) remove(id)
    else it.qty = qty
  }
  function clear(){ items.value=[]; coupon.value='' }
  function applyCoupon(code){ coupon.value = code.trim() }

  return { items, coupon, isDrawerOpen, count, subtotal, discount, total, add, remove, setQty, clear, applyCoupon }
})
