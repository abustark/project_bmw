"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Heart, ShoppingBag, Menu, X, Monitor, Sun, Moon } from "lucide-react"
import { useCart, useWishlist } from "@/lib/cart-store"
import { useTheme } from "@/lib/theme"

export function Navbar() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const cart = useCart()
  const wishlist = useWishlist()
  const { theme, setTheme } = useTheme()

  function submitSearch() {
    router.push(`/shop?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-[hsl(var(--canvas))]/80 backdrop-blur-xl border-b border-[hsl(var(--hairline))]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-3">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="N-GELO home">
            <div className="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px] tracking-tight">N</div>
            <div className="leading-none hidden sm:block">
              <div className="font-semibold text-[15px] tracking-tight text-[hsl(var(--ink))]">N-GELO</div>
              <div className="text-[10px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mt-0.5">REFERENCE · FREE</div>
            </div>
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link href="/shop" className="px-3.5 py-1.5 rounded-[8px] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">Shop</Link>
            <Link href="/about" className="px-3.5 py-1.5 rounded-[8px] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">About</Link>
          </nav>

          {/* search — desktop */}
          <div className="hidden md:flex flex-1 max-w-[340px] items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search components…"
                className="w-full pl-9 pr-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2] transition"
                aria-label="Search products"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:block text-[10px] text-[hsl(var(--ink-subtle))] border border-[hsl(var(--hairline))] rounded-[4px] px-1.5 py-0.5">↵</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* theme — system default, Linear segmented */}
            <div className="flex items-center rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-0.5" role="group" aria-label="Theme">
              <button onClick={() => setTheme("system")} className={`w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${theme === "system" ? "bg-[hsl(var(--card))] text-[hsl(var(--ink))]" : "text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`} aria-pressed={theme === "system"} title="System theme" aria-label="System theme">
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setTheme("light")} className={`w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${theme === "light" ? "bg-[hsl(var(--card))] text-[hsl(var(--ink))]" : "text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`} aria-pressed={theme === "light"} title="Light theme" aria-label="Light theme">
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setTheme("dark")} className={`w-7 h-7 grid place-items-center rounded-[6px] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${theme === "dark" ? "bg-[hsl(var(--card))] text-[hsl(var(--ink))]" : "text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`} aria-pressed={theme === "dark"} title="Dark theme" aria-label="Dark theme">
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link href="/wishlist" className="relative w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:border-[#34343a] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" aria-label="Wishlist">
              <Heart className="w-4 h-4 text-[hsl(var(--ink-subtle))]" />
              {wishlist.ids.length > 0 && <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 grid place-items-center bg-[#5e6ad2] text-white text-[10px] font-semibold rounded-full">{wishlist.ids.length}</span>}
            </Link>
            <button onClick={() => cart.setDrawer(true)} className="relative w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:border-[#34343a] transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" aria-label="Open cart">
              <ShoppingBag className="w-4 h-4 text-[hsl(var(--ink-subtle))]" />
              {cart.count() > 0 && <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 grid place-items-center bg-[#5e6ad2] text-white text-[10px] font-semibold rounded-full">{cart.count()}</span>}
            </button>
            <Link href="/dashboard" className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Dashboard</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 grid place-items-center rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]" aria-expanded={mobileOpen} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-4 h-4 text-[hsl(var(--ink-subtle))]" /> : <Menu className="w-4 h-4 text-[hsl(var(--ink-subtle))]" />}
            </button>
          </div>
        </div>

        {/* mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
              placeholder="Search components…"
              className="w-full pl-9 pr-4 h-10 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2]"
              aria-label="Search products mobile"
            />
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
          <div className="max-w-[1280px] mx-auto px-4 py-3 space-y-1.5">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">Shop — 14 free · ₹0</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">About & FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] font-medium text-sm text-[hsl(var(--ink))]">Dashboard</Link>
            <div className="flex items-center gap-2 px-1 pt-2 text-xs text-[hsl(var(--ink-subtle))]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" /> Reference · source on card · no outbound
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
