"use client"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopInner />
    </Suspense>
  )
}

function ShopInner() {
  const params = useSearchParams()
  const [category, setCategory] = useState(params.get("cat") || "all")
  const [search, setSearch] = useState(params.get("q") || "")
  const [priceMax, setPriceMax] = useState(6000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  // sync from URL (navbar search / category links while already on /shop)
  useEffect(() => {
    const q = params.get("q") || ""
    if (q !== search) setSearch(q)
    const cat = params.get("cat") || "all"
    if (cat !== category) setCategory(cat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

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
    <div className="bg-[hsl(var(--canvas))] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Shop</h1>
            <p className="text-sm text-[hsl(var(--ink-subtle))] mt-1">{filtered.length} free drops · {categories.find((c) => c.id === category)?.label} · {sortLabel}</p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-9 px-4 pr-8 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm text-[hsl(var(--ink))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2]" aria-label="Sort products">
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="newest">Newest</option>
            </select>
            <Button variant="outline" className="lg:hidden rounded-[8px] h-9 border-[hsl(var(--hairline))]" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>Filters</Button>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-3 space-y-4`}>
            <Card className="p-5 rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] shadow-none">
              <div className="font-medium text-sm text-[hsl(var(--ink))]">Categories</div>
              <div className="mt-3 space-y-1">
                {categories.map((c) => (
                  <button key={c.id} onClick={() => setCategory(c.id)} className={`w-full text-left px-3 py-2.5 rounded-[8px] text-sm flex justify-between items-center transition ${category === c.id ? "bg-[#5e6ad2] text-white" : "hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] border border-transparent"}`}>
                    <span>{c.label}</span><span className="text-xs opacity-60">{c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] shadow-none">
              <div className="font-medium text-sm text-[hsl(var(--ink))]">Price</div>
              <div className="mt-3 flex items-center gap-3">
                <input type="range" min={0} max={6000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="flex-1 accent-[#5e6ad2] h-1" aria-label="Filter by reference value" />
                <span className="text-sm font-medium tabular-nums shrink-0 text-[hsl(var(--ink))]">≤ ₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-2 text-xs text-[hsl(var(--ink-subtle))]">Estimates — every item is ₹0</div>
            </Card>

            <Card className="p-5 rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] shadow-none">
              <div className="font-medium text-sm text-[hsl(var(--ink))]">Rating</div>
              <div className="mt-3 space-y-2">
                {[4.5, 4, 0].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-[#5e6ad2]" />
                    <span>{r === 0 ? "Any rating" : `${r}+ stars`}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Button variant="outline" className="w-full rounded-[8px] h-9 border-[hsl(var(--hairline))]" onClick={reset}>Reset filters</Button>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-subtle))]" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, tags, authors…" className="w-full pl-10 pr-4 h-11 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2]" aria-label="Search products" />
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {category !== "all" && <Badge className="bg-[#5e6ad2] text-white rounded-full px-3 py-1.5 hover:bg-[#5e6ad2]">{categories.find((c) => c.id === category)?.label} <button onClick={() => setCategory("all")} className="ml-1 w-4 h-4 grid place-items-center rounded-full bg-white/20" aria-label="Clear category">×</button></Badge>}
                {search && <Badge variant="outline" className="bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] rounded-full px-3 py-1.5">“{search}” <button onClick={() => setSearch("")} className="ml-1" aria-label="Clear search">×</button></Badge>}
              </div>
            </div>

            {filtered.length === 0 ? (
              <Card className="p-10 text-center rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] shadow-none">
                <div className="text-lg font-medium text-[hsl(var(--ink))]">No drops found</div>
                <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1">Try adjusting filters or search.</div>
                <Button onClick={reset} className="mt-4 bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-[8px]">Clear filters</Button>
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
