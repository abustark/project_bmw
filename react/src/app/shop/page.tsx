"use client"
import { useState, useMemo } from "react"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function ShopPage() {
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [priceMax, setPriceMax] = useState(6000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== "all") list = list.filter((p) => p.category === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => [p.name, p.author, p.description, p.tags.join(" "), p.category].join(" ").toLowerCase().includes(q))
    }
    list = list.filter((p) => (p.originalPrice ?? p.price) <= priceMax)
    if (minRating) list = list.filter((p) => p.rating >= minRating)
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break
      case "price-desc": list.sort((a, b) => b.price - a.price); break
      case "rating": list.sort((a, b) => b.rating - a.rating); break
      case "newest": list.sort((a, b) => b.id - a.id); break
      default: list.sort((a, b) => b.sales - a.sales)
    }
    return list
  }, [category, search, priceMax, minRating, sortBy])

  function reset() {
    setCategory("all"); setSearch(""); setPriceMax(6000); setMinRating(0); setSortBy("popular")
  }

  const sortLabel = { popular: "Most popular", rating: "Highest rated", "price-asc": "Low to high", "price-desc": "High to low", newest: "Newest" }[sortBy as string] ?? sortBy

  return (
    <div className="bg-[#fcfcf9] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl lg:text-3xl tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Shop <span className="text-sm font-normal text-amber-700 ml-2">— reference • ₹0</span></h1>
            <p className="text-sm text-zinc-500 mt-1">{filtered.length} drops • {categories.find((c) => c.id === category)?.label} • {sortLabel}</p>
            <p className="text-xs text-amber-700 mt-1">All are extracted components • Source name on card • no outbound link • ₹0 demo</p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-10 px-4 pr-8 rounded-full border border-zinc-200 bg-white text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900">
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="newest">Newest</option>
            </select>
            <Button variant="outline" className="lg:hidden rounded-full h-10" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>Filters</Button>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-3 space-y-4`}>
            <Card className="p-5 rounded-[16px]">
              <div className="font-semibold text-sm">Categories</div>
              <div className="mt-3 space-y-1">
                {categories.map((c) => (
                  <button key={c.id} onClick={() => setCategory(c.id)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex justify-between items-center transition ${category === c.id ? "bg-zinc-900 text-white" : "hover:bg-zinc-50 border border-transparent hover:border-zinc-100"}`}>
                    <span>{c.label}</span><span className="text-xs opacity-60">{c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-[16px]">
              <div className="font-semibold text-sm">Reference value</div>
              <div className="text-xs text-zinc-500 mt-1">Estimated → <span className="font-bold text-emerald-700">₹0</span> demo</div>
              <div className="mt-3 flex items-center gap-3">
                <input type="range" min={0} max={6000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="flex-1 accent-zinc-900 h-1" aria-label="Filter by reference value" />
                <span className="text-sm font-medium tabular-nums shrink-0">≤ ₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-2 text-xs text-zinc-400">Filters estimated value (₹0 in cart)</div>
            </Card>

            <Card className="p-5 rounded-[16px]">
              <div className="font-semibold text-sm">Rating</div>
              <div className="mt-3 space-y-2">
                {[4.5, 4, 0].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-zinc-900" />
                    <span>{r === 0 ? "Any rating" : `≥ ${r} ★`}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-[16px] border-amber-200 bg-amber-50">
              <div className="font-semibold text-sm text-amber-900">Reference • Not for sale</div>
              <div className="text-xs text-amber-800 mt-2 leading-relaxed">Extracted components rendered here. Source name on card only — no link, stays on site. Prices <span className="line-through">estimates</span> → <span className="font-bold text-emerald-700">₹0</span>.</div>
            </Card>

            <Button variant="outline" className="w-full rounded-full h-10" onClick={reset}>Reset filters</Button>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, tags, authors…" className="pl-10 pr-4 h-11 rounded-full bg-white" aria-label="Search products" />
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {category !== "all" && <Badge className="bg-zinc-900 text-white rounded-full px-3 py-1.5">{categories.find((c) => c.id === category)?.label} <button onClick={() => setCategory("all")} className="ml-1 w-4 h-4 grid place-items-center rounded-full bg-white/20" aria-label="Clear category">×</button></Badge>}
                {search && <Badge variant="outline" className="bg-white rounded-full px-3 py-1.5">“{search}” <button onClick={() => setSearch("")} className="ml-1" aria-label="Clear search">×</button></Badge>}
              </div>
            </div>

            {filtered.length === 0 ? (
              <Card className="p-10 text-center rounded-[16px]">
                <div className="text-lg font-semibold">No drops found</div>
                <div className="text-sm text-zinc-500 mt-1">Try adjusting filters or search.</div>
                <Button onClick={reset} variant="pill" size="pill" className="mt-4">Clear filters</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
