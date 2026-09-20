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
  const [priceMax, setPriceMax] = useState(100)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [onlyPhysical, setOnlyPhysical] = useState(false)
  const [onlyDigital, setOnlyDigital] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== "all") list = list.filter((p) => p.category === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => [p.name, p.author, p.description, p.tags.join(" "), p.category].join(" ").toLowerCase().includes(q))
    }
    list = list.filter((p) => p.price <= priceMax)
    if (minRating) list = list.filter((p) => p.rating >= minRating)
    if (onlyPhysical) list = list.filter((p) => p.physical)
    if (onlyDigital) list = list.filter((p) => !p.physical)
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break
      case "price-desc": list.sort((a, b) => b.price - a.price); break
      case "rating": list.sort((a, b) => b.rating - a.rating); break
      case "newest": list.sort((a, b) => b.id - a.id); break
      default: list.sort((a, b) => b.sales - a.sales)
    }
    return list
  }, [category, search, priceMax, minRating, onlyPhysical, onlyDigital, sortBy])

  function reset() {
    setCategory("all"); setSearch(""); setPriceMax(100); setMinRating(0); setOnlyPhysical(false); setOnlyDigital(false); setSortBy("popular")
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap gap-4 items-end justify-between">
        <div>
          <h1 className="font-bold text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Shop</h1>
          <p className="text-sm text-zinc-500 mt-1">{filtered.length} products • {categories.find((c) => c.id === category)?.label} • sorted by {sortBy}</p>
        </div>
        <div className="flex gap-2 items-center">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 rounded-full border border-input bg-background text-sm">
            <option value="popular">Most popular</option>
            <option value="rating">Highest rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest</option>
          </select>
          <Button variant="outline" className="lg:hidden rounded-full" onClick={() => setShowFilters(!showFilters)}>Filters</Button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-12 gap-6">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-3 space-y-4`}>
          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold text-sm">Categories</div>
            <div className="mt-3 space-y-1">
              {categories.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)} className={`w-full text-left px-3 py-2 rounded-xl text-sm flex justify-between ${category === c.id ? "bg-zinc-900 text-white" : "hover:bg-zinc-50"}`}>
                  <span>{c.label}</span><span className="text-xs opacity-60">{c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold text-sm">Price range</div>
            <div className="mt-3 flex items-center gap-2">
              <input type="range" min={0} max={100} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="flex-1 accent-zinc-900" />
              <span className="text-sm font-medium">≤ ${priceMax}</span>
            </div>
          </Card>

          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold text-sm">Rating</div>
            <div className="mt-3 space-y-2">
              {[4.5, 4, 0].map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-zinc-900" />
                  <span>{r === 0 ? "Any rating" : `≥ ${r} ★`}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card className="p-5 rounded-[20px]">
            <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={onlyPhysical} onChange={(e) => setOnlyPhysical(e.target.checked)} className="accent-zinc-900" /> Only physical drops</label>
            <label className="flex items-center gap-2 text-sm font-medium mt-2"><input type="checkbox" checked={onlyDigital} onChange={(e) => setOnlyDigital(e.target.checked)} className="accent-zinc-900" /> Only digital</label>
          </Card>

          <Button variant="outline" className="w-full rounded-full" onClick={reset}>Reset filters</Button>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, tags, authors…" className="pl-10 pr-4 py-2.5 rounded-full" />
            </div>
            {category !== "all" && <Badge className="bg-zinc-900 text-white rounded-full">{categories.find((c) => c.id === category)?.label} <button onClick={() => setCategory("all")} className="ml-1">×</button></Badge>}
            {search && <Badge variant="outline" className="bg-white rounded-full">“{search}” <button onClick={() => setSearch("")} className="ml-1">×</button></Badge>}
          </div>

          {filtered.length === 0 ? (
            <Card className="p-10 text-center rounded-[20px]">
              <div className="text-lg font-semibold">No products found</div>
              <div className="text-sm text-zinc-500">Try adjusting filters or search.</div>
              <Button onClick={reset} variant="pill" size="pill" className="mt-4">Clear filters</Button>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
