"use client"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { products, categories } from "@/data/products"
import { SHOP_TAGS } from "@/data/previews"
import { ProductCard } from "@/components/product-card"

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
  const [q, setQ] = useState(params.get("q") || "")
  const [tag, setTag] = useState("")
  const [priceMax, setPriceMax] = useState(6000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // sync from URL (category links while already on /shop)
  useEffect(() => {
    const cat = params.get("cat") || "all"
    setCategory(cat)
    setQ(params.get("q") || "")
  }, [params])

  function reset() {
    setCategory("all"); setTag(""); setPriceMax(6000); setMinRating(0); setSortBy("popular"); setQ("")
  }

  const count = (catId: string) => (catId === "all" ? products.length : products.filter((p) => p.category === catId).length)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== "all") list = list.filter((p) => p.category === category)
    if (tag) list = list.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
    if (q) {
      const needle = q.toLowerCase()
      list = list.filter((p) => [p.name, p.author, p.description, p.category, ...(p.tags || [])].join(" ").toLowerCase().includes(needle))
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
  }, [category, tag, priceMax, minRating, sortBy, q])

  return (
    <div className="bg-[hsl(var(--canvas))] min-h-screen">
      {/* sticky control bar (uiverse /elements) */}
      <div className="sticky top-14 z-30 bg-[hsl(var(--canvas))]/90 backdrop-blur-xl border-b border-[hsl(var(--hairline))]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* row 1: categories */}
          <div className="flex items-center gap-2 h-12 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`h-8 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap border transition ${category === c.id ? "bg-[#5e6ad2] border-transparent text-white" : "bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>
                {c.label} <span className="ml-1 opacity-60 tabular-nums">{count(c.id)}</span>
              </button>
            ))}
          </div>
          {/* row 2: tags + sort + filters */}
          <div className="flex items-center gap-2 h-11 overflow-x-auto no-scrollbar">
            {SHOP_TAGS.map((t) => (
              <button key={t} onClick={() => setTag(tag === t ? "" : t)} aria-pressed={tag === t} className={`h-7 px-3 rounded-full text-xs whitespace-nowrap border transition ${tag === t ? "bg-[hsl(var(--ink))] border-transparent text-[hsl(var(--canvas))]" : "border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>#{t}</button>
            ))}
            <div className="flex-1 min-w-4" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-8 px-3 pr-7 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs text-[hsl(var(--ink))] focus:outline-none focus:border-[#5e6ad2]" aria-label="Sort">
              <option value="popular">Popular</option>
              <option value="rating">Top rated</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
            <button onClick={() => setFiltersOpen(true)} className="h-8 px-3.5 rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Filters</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* result line */}
        <div className="flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
          <span><span className="text-[hsl(var(--ink))] font-medium tabular-nums">{filtered.length}</span> free components · every item ₹0</span>
          {q && <span className="inline-flex items-center gap-1.5">&ldquo;{q}&rdquo; <button onClick={() => setQ("")} className="hover:text-[hsl(var(--ink))] underline underline-offset-4" aria-label="Clear search">×</button></span>}
          {(tag || minRating > 0 || priceMax < 6000 || q) && <button onClick={reset} className="hover:text-[hsl(var(--ink))] underline underline-offset-4">Reset</button>}
        </div>

        {/* dense grid */}
        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-12 text-center">
            <div className="text-base font-medium text-[hsl(var(--ink))]">No components found</div>
            <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1">Try a different tag or clear filters.</div>
            <button onClick={reset} className="mt-4 h-9 px-5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Clear filters</button>
          </div>
        )}
      </div>

      {/* filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[300px] bg-[hsl(var(--card))] border-l border-[hsl(var(--hairline))] p-5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[hsl(var(--ink))]">Filters</span>
              <button onClick={() => setFiltersOpen(false)} className="w-8 h-8 grid place-items-center rounded-[8px] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]" aria-label="Close filters">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div>
              <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">PRICE (ESTIMATE)</div>
              <input type="range" min={0} max={6000} step={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#5e6ad2] h-1" aria-label="Max price" />
              <div className="mt-2 flex justify-between text-xs text-[hsl(var(--ink-subtle))] tabular-nums">
                <span>₹0</span><span className="text-[hsl(var(--ink))] font-medium">≤ ₹{priceMax.toLocaleString("en-IN")}</span>
              </div>
              <p className="mt-2 text-[11px] text-[hsl(var(--ink-subtle))]">Estimates — every item is ₹0</p>
            </div>
            <div>
              <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">RATING</div>
              <div className="space-y-1.5">
                {[0, 4, 4.5].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm text-[hsl(var(--ink-muted))] cursor-pointer hover:text-[hsl(var(--ink))]">
                    <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-[#5e6ad2]" />
                    <span>{r === 0 ? "Any rating" : `${r}+ stars`}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                reset()
                setFiltersOpen(false)
              }}
              className="mt-auto h-9 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium"
            >
              Apply &amp; reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
