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
    <div className="bg-[#fcfcf9]">
      {/* HERO — clean 2-col */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex flex-wrap items-center gap-2 self-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Reference Catalog — 14 drops • <span className="font-bold text-emerald-700">₹0</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-zinc-900 text-white text-[11px] tracking-widest font-semibold">MIT • ISC • FREE</span>
            </div>

            <h1 className="font-bold text-[36px] sm:text-[46px] lg:text-[52px] leading-[0.95] tracking-[-1.6px] lg:tracking-[-2.2px] text-zinc-900" style={{ fontFamily: "var(--font-playfair)", textWrap: "balance" as any }}>
              Digital products<br />
              <span className="font-light italic text-zinc-800">that ship</span> faster.
            </h1>

            <p className="text-[16px] lg:text-[17px] leading-7 text-zinc-600 max-w-[560px]" style={{ textWrap: "pretty" as any }}>
              <span className="font-semibold text-zinc-900">N-GELO</span> is a reference showcase — 14 free & open-source drops from{" "}
              <span translate="no">shadcn/ui, Radix, Tailwind Labs, Vercel</span> & more. Estimated <span className="line-through">₹4,999</span> →{" "}
              <span className="font-bold text-emerald-700">₹0</span> • Not for sale. Extracted components are rendered here — source name on card, no outbound link.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/shop">
                <Button variant="pill" size="pill" className="px-7 py-3.5 text-[15px] h-auto">
                  Explore references →
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" className="rounded-full px-7 py-3.5 text-[15px] h-auto">
                  How it works
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-100 mt-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[11, 12, 13].map((i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="font-semibold">4.9/5 average</div>
                  <div className="text-xs text-zinc-500">12k+ sales • 4,500+ buyers</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-zinc-100">
                <span className="text-xs tracking-widest font-semibold text-zinc-500">PAYOUTS</span>
                <span className="text-sm font-medium">14th & 21st</span>
                <span className="text-xs text-zinc-400">• Stripe / PayPal (demo)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[20px] overflow-hidden bg-white border border-zinc-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero-reference.png" alt="Reference marketplace preview — extracted components shown here" width={900} height={675} className="w-full aspect-[4/3] object-cover" />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-2xl border border-zinc-100 p-3 flex items-center gap-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/100?img=12" alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold leading-none truncate">Aarav viewed shadcn/ui — extracted</div>
                  <div className="text-xs text-zinc-500">Source: shadcn/ui (MIT) • just now</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-900" /> 14 reference drops</span>
              <span className="tabular-nums">₹0 • demo • no payment</span>
              <span className="hidden sm:inline">Source name on card — no link</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-zinc-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-zinc-900 text-white grid place-items-center text-xs font-bold">14</span>
              <span className="font-medium">Reference drops</span> <span className="text-zinc-400">curated</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white grid place-items-center text-xs font-bold">₹</span>
              <span className="font-medium text-emerald-700">₹0 demo</span> <span className="text-zinc-400 line-through">₹4,999</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs">★</span>
              <span className="font-medium">4.9 avg rating</span> <span className="text-zinc-400">open-source</span>
            </span>
          </div>
          <div className="text-xs tracking-widest font-semibold text-zinc-500">EXTRACTED • SHOWN HERE • NO OUTBOUND</div>
        </div>
      </section>

      {/* REFERENCE EXPLAINER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-[16px] border border-amber-200 bg-amber-50/70 p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="lg:w-[36%]">
              <div className="text-xs tracking-[0.18em] font-semibold text-amber-800">REFERENCE SHOWCASE</div>
              <h2 className="mt-2 text-xl font-bold leading-tight" style={{ textWrap: "balance" as any }}>
                14 free drops — <span className="line-through decoration-zinc-400">₹4,999</span> → <span className="text-emerald-700">₹0</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-amber-900">
                Every product is <span className="font-semibold">free & open-source</span> (MIT / ISC / Free). Estimated prices strikethrough to <span className="font-bold text-emerald-700">₹0</span>. Nothing is charged. Extracted UI is rendered directly in our pages — source name on card only.
              </p>
            </div>
            <div className="flex-1 grid sm:grid-cols-3 gap-3 w-full">
              <div className="rounded-[12px] bg-white border border-amber-200 p-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">1</div>
                <div className="mt-3 font-semibold text-sm">Source name only</div>
                <div className="text-xs text-zinc-600 mt-1 leading-relaxed">Card shows <span translate="no">shadcn/ui (MIT)</span> — extracted, no link.</div>
              </div>
              <div className="rounded-[12px] bg-white border border-amber-200 p-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">2</div>
                <div className="mt-3 font-semibold text-sm">Rendered here</div>
                <div className="text-xs text-zinc-600 mt-1 leading-relaxed">Components, code & animation are embedded in our pages — not outbound.</div>
              </div>
              <div className="rounded-[12px] bg-white border border-amber-200 p-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white grid place-items-center text-xs font-bold">3</div>
                <div className="mt-3 font-semibold text-sm">Attribution • MIT</div>
                <div className="text-xs text-zinc-600 mt-1 leading-relaxed">License on product page. All rights with original authors.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>Browse by craft</h2>
          <Link href="/shop" className="text-sm font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">View all →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link key={c.id} href={`/shop?cat=${c.id}`} className="group rounded-[16px] bg-white border border-zinc-200 p-4 hover:border-zinc-300 hover:shadow-sm transition flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">⧉</div>
              <div>
                <div className="font-semibold text-sm leading-none group-hover:underline underline-offset-4">{c.label}</div>
                <div className="text-xs text-zinc-500 mt-1">{products.filter((p) => c.id === "all" || p.category === c.id).length} drops • ₹0</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>Featured drops <span className="text-zinc-400 font-normal text-sm">— staff picks • ₹0</span></h2>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — light */}
      <section id="how" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-[20px] border border-zinc-200 bg-white p-6 lg:p-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="text-xs tracking-[0.18em] font-semibold text-zinc-500">HOW IT WORKS • REACT</div>
              <h3 className="mt-2 text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>Sellers upload.<br />Buyers build faster.</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">Same BCA spec: Admins review reports, answer FAQs, payouts 14th & 21st. Now with Next.js + shadcn.</p>
              <Link href="/shop" className="mt-5 inline-flex">
                <Button variant="pill" className="rounded-full px-6">Start exploring</Button>
              </Link>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
              <Card className="p-5 bg-zinc-50 border-zinc-100 rounded-2xl shadow-none">
                <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">1</div>
                <div className="mt-3 font-semibold text-sm">Discover</div>
                <div className="text-sm text-zinc-600 mt-1 leading-relaxed">Filter by category • price (₹0) • rating. No account to browse.</div>
              </Card>
              <Card className="p-5 bg-zinc-50 border-zinc-100 rounded-2xl shadow-none">
                <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">2</div>
                <div className="mt-3 font-semibold text-sm">Add demo • ₹0</div>
                <div className="text-sm text-zinc-600 mt-1 leading-relaxed">Cart & checkout are demo — total always <span className="font-bold text-emerald-700">₹0</span>.</div>
              </Card>
              <Card className="p-5 bg-zinc-50 border-zinc-100 rounded-2xl shadow-none">
                <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 grid place-items-center text-sm font-bold">3</div>
                <div className="mt-3 font-semibold text-sm">Build faster</div>
                <div className="text-sm text-zinc-600 mt-1 leading-relaxed">Copy extracted code, preview in page, track sales in dashboard.</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FRESH */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>Fresh in the lab</h2>
          <Link href="/shop?sort=newest" className="text-sm font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900">Newest first</Link>
        </div>
        <div className="mt-4 grid md:grid-cols-4 gap-5">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Card className="mt-8 grid lg:grid-cols-12 gap-6 items-center p-6 lg:p-8 rounded-[20px]">
          <div className="lg:col-span-7">
            <Badge variant="pill" className="bg-zinc-900 text-white">COMPONENT LAB — CODE</Badge>
            <h3 className="mt-3 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>From Figma to code.</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 max-w-[560px]">Copy-paste production code — Tailwind, shadcn, Framer Motion. Dark mode, a11y, typed. Extracted & shown here.</p>
            <pre className="mt-4 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono leading-relaxed overflow-auto">{`<Button variant=\"pill\" size=\"lg\">\n  Ship faster →\n</Button>`}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/shop?cat=components">
                <Button variant="pill" className="bg-zinc-900 text-white">Explore components</Button>
              </Link>
              <span className="self-center text-xs text-zinc-500">Vue SFC • React TSX • Tailwind</span>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
              <div className="font-bold text-lg">120</div><div className="text-xs text-zinc-500">Buttons</div>
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
              <div className="font-bold text-lg">60</div><div className="text-xs text-zinc-500">Loaders</div>
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-center">
              <div className="font-bold text-lg">45</div><div className="text-xs text-zinc-500">Motions</div>
            </div>
            <div className="col-span-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-800">
              <span className="font-semibold">Reference only:</span> All are free & open-source (MIT/ISC/Free). Source name on card — no outbound link.
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
