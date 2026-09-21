"use client"
import Link from "next/link"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-store"

const SOURCES = ["shadcn/ui", "Radix", "Heroicons", "Lucide", "Flowbite", "daisyUI", "AstroWind", "Vercel", "Cruip", "Uiverse", "CSS Loaders", "LottieFiles", "Motion", "View Transitions"]

export default function Home() {
  const cart = useCart()
  const featured = products.filter((p) => p.featured)
  const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 4)
  const count = (catId: string) => (catId === "all" ? products.length : products.filter((p) => p.category === catId).length)

  return (
    <div className="bg-[hsl(var(--canvas))]">
      {/* HERO — Linear: centered, single accent, screenshot protagonist */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20">
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-5">
          <Link href="/about" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] transition">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" aria-hidden="true" />
            Reference — 14 open-source drops
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </Link>

          <h1 className="font-semibold text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.02] tracking-[-1.6px] lg:tracking-[-2px] text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>
            Digital products<br />
            <span className="font-light text-[hsl(var(--ink-muted))]">that ship faster.</span>
          </h1>

          <p className="text-base lg:text-lg leading-relaxed text-[hsl(var(--ink-muted))] max-w-[520px]" style={{ textWrap: "pretty" as any }}>
            A curated showcase of free, open-source UI — extracted and rendered in this page. Every drop is ₹0.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/shop" className="inline-flex items-center justify-center h-9 px-5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium transition">Explore the catalog</Link>
            <a href="#how" className="inline-flex items-center justify-center h-9 px-5 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] transition">How it works</a>
          </div>
        </div>

        {/* product screenshot panel with faux chrome */}
        <div className="max-w-[1040px] mx-auto mt-10 lg:mt-14">
          <div className="rounded-[16px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-2">
            <div className="rounded-[10px] overflow-hidden border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
              <div className="flex items-center gap-1.5 h-9 px-3 border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="mx-auto text-[10px] font-mono text-[hsl(var(--ink-subtle))] tracking-wide">n-gelo.shop</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero-reference.png" alt="N-GELO catalog — extracted open-source components" width={1040} height={585} className="w-full aspect-[16/9] object-cover" loading="eager" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
            <span>The catalog — every card extracted from open source</span>
            <span className="tabular-nums">14 · ₹0</span>
          </div>
        </div>
      </section>

      {/* SOURCES STRIP — Linear logo-strip pattern, doubles as attribution */}
      <section className="mt-14 lg:mt-20 border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <p className="text-center text-[11px] tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">CURATED FROM OPEN SOURCE</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-[880px] mx-auto">
            {SOURCES.map((s) => (
              <span key={s} className="text-sm text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] transition" translate="no">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Browse by craft</h2>
          <Link href="/shop" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">View all →</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link key={c.id} href={`/shop?cat=${c.id}`} className="group rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-4 hover:bg-[hsl(var(--surface-2))] transition">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[hsl(var(--ink))]">{c.label}</span>
                <span className="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">{count(c.id)}</span>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
                <span>₹0 · free</span>
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Featured</h2>
          <Link href="/shop" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">All drops →</Link>
        </div>
        <div className="mt-5 grid md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16 scroll-mt-20">
        <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">HOW IT WORKS</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Found in the open.<br />Rendered here.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">Each drop is extracted from a free, open-source project and rebuilt inside this site — with the source named on its card.</p>
            <Link href="/shop" className="mt-5 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Explore</Link>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            {[
              { n: "1", t: "Discover", d: "Filter by craft, price or rating." },
              { n: "2", t: "Add — ₹0", d: "Cart and checkout are demos; totals stay ₹0." },
              { n: "3", t: "Build", d: "Copy snippets from each product page." },
            ].map((s) => (
              <div key={s.n} className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-5">
                <div className="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">{s.n}</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">{s.t}</div>
                <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRESH */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Fresh in the lab</h2>
          <Link href="/shop?sort=newest" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">Newest →</Link>
        </div>
        <div className="mt-5 grid md:grid-cols-4 gap-5">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[16px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] py-14 px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>Start building — everything is ₹0.</h2>
          <p className="mt-3 text-sm text-[hsl(var(--ink-muted))]">14 open-source drops · extracted · rendered in this page · not for sale</p>
          <Link href="/shop" className="mt-6 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Browse the catalog</Link>
        </div>
      </section>
    </div>
  )
}
