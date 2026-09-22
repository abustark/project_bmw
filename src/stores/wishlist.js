import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const ids = ref(JSON.parse(localStorage.getItem('ngelo-wish') || '[]'))
  watch(ids, v => localStorage.setItem('ngelo-wish', JSON.stringify(v)), { deep: true })
  function toggle(id){
    if(ids.value.includes(id)) ids.value = ids.value.filter(x=>x!==id)
    else ids.value.push(id)
  }
  function has(id){ return ids.value.includes(id) }
  return { ids, toggle, has }
})
