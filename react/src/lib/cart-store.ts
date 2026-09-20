"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/data/products"

export type CartItem = Product & { qty: number }

type CartState = {
  items: CartItem[]
  coupon: string
  isDrawerOpen: boolean
  add: (p: Product, qty?: number) => void
  remove: (id: number) => void
  setQty: (id: number, qty: number) => void
  clear: () => void
  applyCoupon: (code: string) => void
  setDrawer: (open: boolean) => void
  count: () => number
  subtotal: () => number
  discount: () => number
  total: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: "",
      isDrawerOpen: false,
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === p.id)
          if (existing) {
            return { items: s.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i)), isDrawerOpen: true }
          }
          return { items: [...s.items, { ...p, qty }], isDrawerOpen: true }
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => {
          if (qty <= 0) return { items: s.items.filter((i) => i.id !== id) }
          return { items: s.items.map((i) => (i.id === id ? { ...i, qty } : i)) }
        }),
      clear: () => set({ items: [], coupon: "" }),
      applyCoupon: (code) => set({ coupon: code.trim().toUpperCase() }),
      setDrawer: (open) => set({ isDrawerOpen: open }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.price * i.qty, 0),
      discount: () => {
        const c = get().coupon.toUpperCase()
        const sub = get().subtotal()
        if (c === "WELCOME20") return Math.round(sub * 0.2)
        if (c === "NGELO10") return Math.round(sub * 0.1)
        return 0
      },
      total: () => Math.max(0, get().subtotal() - get().discount()),
    }),
    {
      name: "ngelo-cart",
      partialize: (s) => ({ items: s.items, coupon: s.coupon }),
    }
  )
)

type WishState = {
  ids: number[]
  toggle: (id: number) => void
  has: (id: number) => boolean
}

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "ngelo-wish" }
  )
)
