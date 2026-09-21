"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { useCart, useWishlist } from "@/lib/cart-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const cart = useCart()
  const wish = useWishlist()
  const count = cart.items.reduce((n, i) => n + i.qty, 0)

  function onSearch(e?: React.FormEvent) {
    e?.preventDefault()
    router.push(`/shop${q ? `?q=${encodeURIComponent(q)}` : ""}`)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-[#fcfcf9]/90 backdrop-blur-xl border-b border-zinc-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="N-GELO home">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-extrabold text-sm tracking-widest" style={{ fontFamily: "var(--font-playfair)" }}>NG</div>
            <div className="leading-none hidden sm:block">
              <div className="font-bold text-[17px] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>N-GELO</div>
              <div className="text-[11px] tracking-[0.16em] font-medium text-zinc-500 -mt-0.5">DIGITAL MARKET • NEXT</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link href="/shop" className="px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition">Shop</Link>
            <Link href="/about" className="px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition">About</Link>
          </nav>

          <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-[380px] items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-zinc-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components, templates…" className="pl-10 pr-4 h-10 rounded-full bg-white" aria-label="Search products" />
          </form>

          <div className="flex items-center gap-1.5">
            <Link href="/wishlist" className="relative w-10 h-10 grid place-items-center rounded-full bg-white border border-zinc-200 hover:border-zinc-300 transition focus-visible:ring-2 focus-visible:ring-zinc-900" aria-label="Wishlist">
              <Heart className="w-4 h-4" />
              {wish.ids.length > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center bg-zinc-900 text-white text-[11px] font-bold rounded-full">{wish.ids.length}</span>}
            </Link>
            <button onClick={() => cart.setDrawer(true)} className="relative w-10 h-10 grid place-items-center rounded-full bg-zinc-900 text-white hover:bg-black transition focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2" aria-label="Open cart">
              <ShoppingBag className="w-4 h-4" />
              {count > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center bg-white text-zinc-900 text-[11px] font-bold rounded-full border border-zinc-900">{count}</span>}
            </button>
            <Link href="/dashboard" className="hidden sm:inline-flex ml-1">
              <Button variant="pill" size="pill" className="h-10">Dashboard</Button>
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full bg-white border border-zinc-200 focus-visible:ring-2 focus-visible:ring-zinc-900" aria-expanded={mobileOpen} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={onSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components…" className="pl-10 pr-4 h-11 rounded-full bg-white" aria-label="Search products mobile" />
          </form>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 py-3 space-y-2">
            <Link onClick={() => setMobileOpen(false)} href="/shop" className="block px-4 py-3 rounded-xl bg-zinc-900 text-white font-medium">Shop — ₹0 references</Link>
            <Link onClick={() => setMobileOpen(false)} href="/about" className="block px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 font-medium">About & FAQ</Link>
            <Link onClick={() => setMobileOpen(false)} href="/dashboard" className="block px-4 py-3 rounded-xl border border-zinc-200 font-medium">Dashboard</Link>
            <div className="pt-2 text-xs text-zinc-500">Reference showcase — 14 drops • ₹0 demo — source name on card, no outbound link</div>
          </div>
        </div>
      )}
    </header>
  )
}
