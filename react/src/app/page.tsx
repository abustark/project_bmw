"use client"
import { useState } from "react"
import Link from "next/link"
import { products, categories } from "@/data/products"
import { MOSAIC, SHOP_TAGS } from "@/data/previews"
import { ProductCard } from "@/components/product-card"
import { LivePreview } from "@/components/live-preview"

const TABS = [
  { id: "featured", label: "Featured" },
  { id: "trending", label: "Trending" },
  { id: "recent", label: "Recent" },
] as const

export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("featured")

  const tabProducts =
    activeTab === "trending"
      ? [...products].sort((a, b) => b.sales - a.sales).slice(0, 8)
      : activeTab === "recent"
        ? [...products].sort((a, b) => b.id - a.id).slice(0, 8)
        : [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)].slice(0, 8)

  const count = (catId: string) => (catId === "all" ? products.length : products.filter((p) => p.category === catId).length)
  const marqueeTags = [...SHOP_TAGS, ...SHOP_TAGS]

  return (
    <div className="bg-[hsl(var(--canvas))]">
      {/* HERO — one line each + live mosaic */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-4">
          <h1 className="font-semibold text-[38px] sm:text-[48px] leading-[1.05] tracking-[-1.5px] text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>
            The living library of <span className="font-light text-[hsl(var(--ink-muted))]">free UI</span>
          </h1>
          <p className="text-base text-[hsl(var(--ink-muted))] max-w-[460px]">Open-source components, extracted and rendered live in this page. Copy the code — free.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/shop" className="h-9 px-5 inline-flex items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition">Browse components</Link>
            <Link href="/about" className="h-9 px-5 inline-flex items-center justify-center rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">What is this?</Link>
          </div>
          {/* stat chips (professional info, no prose) */}
          <div className="flex flex-wrap gap-2 justify-center text-[11px] text-[hsl(var(--ink-subtle))]">
            <span className="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b className="text-[hsl(var(--ink))] tabular-nums">14</b> components</span>
            <span className="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b className="text-[hsl(var(--ink))]">100%</b> free</span>
            <span className="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]"><b className="text-[hsl(var(--ink))]">MIT / ISC</b> licensed</span>
            <span className="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] tabular-nums"><b className="text-[hsl(var(--ink))]">₹0</b> forever</span>
          </div>
        </div>

        {/* live mosaic — real components playing, not a screenshot */}
        <div className="max-w-[1040px] mx-auto mt-10">
          <div className="rounded-[16px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MOSAIC.map((k) => (
                <div key={k} className="aspect-[4/3] rounded-[10px] border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))] overflow-hidden">
                  <LivePreview kind={k} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
            <span>Live — hover, click and toggle every one</span>
            <span className="tabular-nums">rendered in-page · no iframes</span>
          </div>
        </div>
      </section>

      {/* CATEGORY CHIPS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.filter((c) => c.id !== "all").map((c) => (
            <Link key={c.id} href={`/shop?cat=${c.id}`} className="group flex items-center justify-between h-12 px-4 rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-2))] transition">
              <span className="text-sm font-medium text-[hsl(var(--ink))]">{c.label}</span>
              <span className="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">{count(c.id)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TABBED GRID — Featured / Trending / Recent (ui8) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16 pb-14">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1 bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] rounded-[10px] p-1">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`h-8 px-4 rounded-[8px] text-sm font-medium transition ${activeTab === t.id ? "bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink))]" : "text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>{t.label}</button>
            ))}
          </div>
          <Link href="/shop" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">All →</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {tabProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TAG MARQUEE (uiverse) */}
      <section className="border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/40 py-4 overflow-hidden">
        <div className="marquee flex gap-2 w-max">
          {marqueeTags.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-xs text-[hsl(var(--ink-subtle))] whitespace-nowrap">#{t}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
