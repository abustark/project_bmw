"use client"
import Link from "next/link"
import { products, categories } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-store"

export default function Home() {
  const cart = useCart()
  const featured = products.filter((p) => p.featured)
  const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 4)

  return (
    <div className="bg-[hsl(var(--canvas))]">
      {/* HERO — Linear dark-first */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex flex-wrap items-center gap-2 self-start">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink-subtle))]">
                <span className="w-2 h-2 rounded-full bg-[#5e6ad2]" />
                Reference · 14 free
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#5e6ad2] text-white text-[11px] tracking-widest font-medium">MIT · ISC · FREE</span>
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--ink-subtle))]"><span className="line-through opacity-60">₹4,999</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span></span>
            </div>

            <h1 className="font-semibold text-[36px] sm:text-[48px] lg:text-[56px] leading-[0.95] tracking-[-1.4px] lg:tracking-[-1.8px] text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>
              Digital products<br />
              <span className="font-light text-[hsl(var(--ink-muted))]">that ship</span> faster.
            </h1>

            <p className="text-[16px] lg:text-[17px] leading-7 text-[hsl(var(--ink-muted))] max-w-[560px]" style={{ textWrap: "pretty" as any }}>
              <span className="font-medium text-[hsl(var(--ink))]">N-GELO</span> — 14 free & open-source drops from{" "}
              <span translate="no">shadcn/ui, Radix, Vercel</span> · extracted & rendered here · <span className="line-through opacity-60">₹4,999</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span> demo.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/shop">
                <Button className="h-9 px-5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white">Explore references →</Button>
              </Link>
              <a href="#how">
                <Button variant="outline" className="h-9 px-5 rounded-[8px] border-[hsl(var(--hairline))]">How it works</Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-[hsl(var(--hairline))] mt-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[11, 12, 13].map((i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-[hsl(var(--canvas))] object-cover" />
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="font-medium text-[hsl(var(--ink))]">4.9/5 average</div>
                  <div className="text-xs text-[hsl(var(--ink-subtle))]">12k+ sales · 4,500+ builders</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-[hsl(var(--hairline))]">
                <span className="text-xs tracking-widest font-medium text-[hsl(var(--ink-subtle))]">SYSTEM</span>
                <span className="text-sm font-medium text-[hsl(var(--ink))]">Dark · Light · Auto</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[16px] overflow-hidden bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero-reference.png" alt="Reference preview — extracted components" width={900} height={675} className="w-full aspect-[4/3] object-cover rounded-[12px] border border-[hsl(var(--hairline))]" />
              <div className="absolute bottom-3 left-3 right-3 bg-[hsl(var(--card))]/90 backdrop-blur rounded-[12px] border border-[hsl(var(--hairline))] p-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/100?img=12" alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-none truncate text-[hsl(var(--ink))]">shadcn/ui — extracted</div>
                  <div className="text-xs text-[hsl(var(--ink-subtle))]">MIT · rendered here</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#5e6ad2] shrink-0" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#5e6ad2]" /> 14 reference</span>
              <span className="tabular-nums">₹0 · free</span>
              <span className="hidden sm:inline">No outbound</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]">
              <span className="w-6 h-6 rounded-[6px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">14</span>
              <span className="font-medium text-[hsl(var(--ink))]">Reference</span> curated
            </span>
            <span className="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]">
              <span className="w-6 h-6 rounded-[6px] bg-[#5e6ad2] text-white grid place-items-center text-xs">₹</span>
              <span className="font-medium text-[hsl(var(--ink))]">₹0</span> free
            </span>
            <span className="inline-flex items-center gap-2 text-[hsl(var(--ink-subtle))]">
              <span className="w-6 h-6 rounded-[6px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-xs text-[#5e6ad2]">★</span>
              <span className="font-medium text-[hsl(var(--ink))]">4.9</span> avg
            </span>
          </div>
          <div className="text-xs tracking-widest font-medium text-[hsl(var(--ink-subtle))]">LINEAR-INSPIRED · DARK FIRST · SYSTEM</div>
        </div>
      </section>

      {/* REFERENCE EXPLAINER — subtle */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="lg:w-[36%]">
              <div className="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">REFERENCE</div>
              <h2 className="mt-2 text-xl font-semibold leading-tight text-[hsl(var(--ink))]" style={{ textWrap: "balance" as any }}>
                14 free drops · <span className="line-through opacity-60 text-[hsl(var(--ink-subtle))]">₹4,999</span> → <span className="text-[hsl(var(--ink))]">₹0</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">
                Free & open-source · <span className="font-medium text-[hsl(var(--ink))]">MIT / ISC / Free</span> · no charge · extracted & rendered here · source on card.
              </p>
            </div>
            <div className="flex-1 grid sm:grid-cols-3 gap-3 w-full">
              <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
                <div className="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">1</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Source on card</div>
                <div className="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Name only · no link · stays here</div>
              </div>
              <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
                <div className="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">2</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Rendered here</div>
                <div className="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Extracted UI in page</div>
              </div>
              <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4">
                <div className="w-7 h-7 rounded-[6px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-xs font-medium text-[hsl(var(--ink))]">3</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Attribution</div>
                <div className="text-xs text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Rights remain originals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-semibold text-xl text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Browse by craft</h2>
          <Link href="/shop" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] underline decoration-[hsl(var(--hairline))] underline-offset-4">View all →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link key={c.id} href={`/shop?cat=${c.id}`} className="group rounded-[12px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] p-4 hover:bg-[hsl(var(--surface-2))] transition flex flex-col gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] grid place-items-center text-sm text-[hsl(var(--ink))]">⧉</div>
              <div>
                <div className="font-medium text-sm leading-none text-[hsl(var(--ink))] group-hover:underline underline-offset-4">{c.label}</div>
                <div className="text-xs text-[hsl(var(--ink-subtle))] mt-1">{products.filter((p) => c.id === "all" || p.category === c.id).length} · ₹0</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-semibold text-xl text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Featured <span className="text-[hsl(var(--ink-subtle))] font-normal text-sm">· staff picks · free</span></h2>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-6 lg:p-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="text-xs tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">HOW IT WORKS</div>
              <h3 className="mt-2 text-2xl font-semibold leading-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Sellers upload.<br />Builders ship.</h3>
              <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ink-muted))]">Payouts 14th & 21st · reports · FAQs · Linear-inspired dark-first.</p>
              <Link href="/shop" className="mt-5 inline-flex h-9 px-5 rounded-[8px] bg-[#5e6ad2] text-white text-sm font-medium hover:bg-[#828fff] items-center justify-center">Explore</Link>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
              <Card className="p-5 bg-[hsl(var(--canvas))] border-[hsl(var(--hairline))] rounded-[12px] shadow-none">
                <div className="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">1</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Discover</div>
                <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Category · price · rating · no account.</div>
              </Card>
              <Card className="p-5 bg-[hsl(var(--canvas))] border-[hsl(var(--hairline))] rounded-[12px] shadow-none">
                <div className="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">2</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Add · ₹0</div>
                <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Cart demo · total <span className="font-medium text-[hsl(var(--ink))]">₹0</span> always.</div>
              </Card>
              <Card className="p-5 bg-[hsl(var(--canvas))] border-[hsl(var(--hairline))] rounded-[12px] shadow-none">
                <div className="w-9 h-9 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] grid place-items-center text-sm font-medium text-[hsl(var(--ink))]">3</div>
                <div className="mt-3 font-medium text-sm text-[hsl(var(--ink))]">Build</div>
                <div className="text-sm text-[hsl(var(--ink-subtle))] mt-1 leading-relaxed">Copy code · preview here · dashboard.</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FRESH */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-semibold text-xl text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Fresh in lab</h2>
          <Link href="/shop?sort=newest" className="text-sm font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] underline decoration-[hsl(var(--hairline))] underline-offset-4">Newest</Link>
        </div>
        <div className="mt-4 grid md:grid-cols-4 gap-5">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Card className="mt-8 grid lg:grid-cols-12 gap-6 items-center p-6 lg:p-8 rounded-[12px] bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] shadow-none">
          <div className="lg:col-span-7">
            <Badge className="bg-[#5e6ad2] text-white hover:bg-[#5e6ad2]">COMPONENT LAB</Badge>
            <h3 className="mt-3 text-2xl font-semibold text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>From Figma to code.</h3>
            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--ink-muted))] max-w-[560px]">Tailwind · shadcn · Motion · dark + light · extracted here.</p>
            <pre className="mt-4 rounded-[8px] bg-[#010102] text-[#f7f8f8] border border-[#23252a] p-4 text-xs font-mono leading-relaxed overflow-auto">{`<Button variant="pill" size="lg">\n  Ship faster →\n</Button>`}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/shop?cat=components">
                <Button className="bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-[8px]">Explore components</Button>
              </Link>
              <span className="self-center text-xs text-[hsl(var(--ink-subtle))]">Vue · React · Tailwind</span>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
              <div className="font-semibold text-lg text-[hsl(var(--ink))]">120</div><div className="text-xs text-[hsl(var(--ink-subtle))]">Buttons</div>
            </div>
            <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
              <div className="font-semibold text-lg text-[hsl(var(--ink))]">60</div><div className="text-xs text-[hsl(var(--ink-subtle))]">Loaders</div>
            </div>
            <div className="rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-4 text-center">
              <div className="font-semibold text-lg text-[hsl(var(--ink))]">45</div><div className="text-xs text-[hsl(var(--ink-subtle))]">Motions</div>
            </div>
            <div className="col-span-3 rounded-[12px] bg-[hsl(var(--canvas))] border border-[hsl(var(--hairline))] p-3 text-xs leading-relaxed text-[hsl(var(--ink-subtle))]">
              <span className="font-medium text-[hsl(var(--ink))]">Free · MIT/ISC:</span> source on card · no outbound.
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
