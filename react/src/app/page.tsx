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
    <div>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              NEW — Hues 3D Vol II + Neo Fintech Kit
              <Badge variant="pill" className="hidden sm:inline-flex ml-2 text-[11px] tracking-widest">LIMITED</Badge>
            </div>
            <h1 className="mt-4 font-bold text-[42px] sm:text-[56px] leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Digital products <br />
              <span className="font-light italic">that ship</span> faster.
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-zinc-600 max-w-[560px]">
              N-GELO <span className="font-semibold text-zinc-900">React</span> — dev-only marketplace. Sell templates, landing pages, components, loaders, buttons, animations, transitions & icons — instant download, copy-paste code.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop"><Button variant="pill" size="pill" className="px-8 py-6 text-base">Shop the drop →</Button></Link>
              <a href="#how"><Button variant="outline" className="rounded-full px-6 py-6">How sellers earn</Button></a>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[11, 12, 13, 14].map((i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="leading-tight">
                <div className="font-semibold">Trusted by 4,500+ buyers</div>
                <div className="text-zinc-500 text-xs">4.9/5 average rating • 12k+ sales</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-4 pl-6 border-l border-zinc-200">
                <span className="text-xs tracking-widest font-semibold">PAY WITH</span>
                <span className="px-2 py-1 rounded bg-white border text-xs font-bold">Stripe</span>
                <span className="px-2 py-1 rounded bg-white border text-xs font-bold">PayPal</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-[520px]">
              <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">TOTAL SALES</div><div className="font-bold text-xl">€ 286k</div><div className="text-xs text-green-600">+18% this month</div></Card>
              <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">SELLERS</div><div className="font-bold text-xl">312</div><div className="text-xs text-zinc-500">14th / 21st payouts</div></Card>
              <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">AVG RATING</div><div className="font-bold text-xl">4.9 ★</div><div className="text-xs text-zinc-500">1.8k reviews</div></Card>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden bg-zinc-900 p-3 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop" className="rounded-[20px] w-full aspect-[4/3] object-cover" alt="" />
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full" alt="" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Miranda bought NEO Kit</div>
                  <div className="text-xs text-zinc-500">2 minutes ago • verified</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 bg-white rounded-full px-3 py-1.5 text-xs font-bold shadow">⚡ Instant download</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop" className="w-full h-32 object-cover" alt="" />
              </div>
              <Card className="p-3 flex flex-col justify-center rounded-2xl">
                <div className="text-xs tracking-widest">FEATURED SELLER</div>
                <div className="font-semibold">Studio Forma</div>
                <div className="text-sm text-zinc-500">€47k earned this term</div>
                <div className="mt-2 w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full w-[72%] bg-zinc-900" /></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>Browse by craft</h2>
          <Link href="/shop" className="text-sm font-medium underline">View all</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          {categories.map((c) => (
            <Link key={c.id} href={`/shop?cat=${c.id}`} className="group">
              <Card className="p-4 hover:shadow-lg transition flex flex-col gap-2 rounded-[20px]">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">⧉</div>
                <div className="font-semibold text-sm">{c.label}</div>
                <div className="text-xs text-zinc-500">{products.filter((p) => c.id === "all" || p.category === c.id).length} products</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-bold text-2xl leading-none" style={{ fontFamily: "var(--font-playfair)" }}>Featured drops <span className="text-zinc-400 font-normal text-base">— shadcn picks</span></h2>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* how */}
      <section id="how" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-[28px] bg-zinc-900 text-white p-6 sm:p-10 grid lg:grid-cols-3 gap-8">
          <div>
            <div className="text-xs tracking-[0.2em] text-zinc-400">HOW IT WORKS • REACT</div>
            <h3 className="mt-2 text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>Sellers upload.<br />Buyers build faster.</h3>
            <p className="mt-3 text-zinc-400 text-sm leading-relaxed">Same BCA spec: Admins review reports, answer FAQs, payouts 14th & 21st. Now with Next.js server actions + shadcn.</p>
            <Link href="/shop" className="mt-6 inline-flex"><Button variant="outline" className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full">Start selling today</Button></Link>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            <Card className="p-5 text-zinc-900">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">1</div>
              <div className="mt-3 font-semibold">Buyer discovers</div>
              <div className="text-sm text-zinc-600 mt-1">Search, filter by category / price / rating. No registration to browse.</div>
            </Card>
            <Card className="p-5 text-zinc-900">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">2</div>
              <div className="mt-3 font-semibold">Instant checkout</div>
              <div className="text-sm text-zinc-600 mt-1">Stripe / PayPal, auto-generated account via email, instant download.</div>
            </Card>
            <Card className="p-5 text-zinc-900">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">3</div>
              <div className="mt-3 font-semibold">Seller payout</div>
              <div className="text-sm text-zinc-600 mt-1">Dashboard analytics, edit/delete, track traffic & sales.</div>
            </Card>
          </div>
        </div>
      </section>

      {/* recent */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>Fresh in the lab</h2>
        <div className="mt-4 grid md:grid-cols-4 gap-5">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Card className="mt-10 overflow-hidden grid md:grid-cols-2 p-0 rounded-[24px]">
          <div className="bg-zinc-900 p-6 sm:p-8 flex flex-col justify-center text-white min-h-[320px]">
            <Badge variant="pill" className="self-start bg-white text-zinc-900">COMPONENT LAB — CODE</Badge>
            <h3 className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>From Figma to code.</h3>
            <p className="mt-2 text-zinc-400">Copy-paste production code — Tailwind, shadcn, Framer Motion. Dark mode, a11y, typed.</p>
            <pre className="mt-4 rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-xs font-mono leading-relaxed overflow-auto text-emerald-300">{`<Button variant="pill" size="lg">
  Ship faster →
</Button>

<Loader variant="skeleton" />`}</pre>
            <div className="mt-4 flex gap-2">
              <Link href="/shop?cat=components"><Button variant="pill" size="pill" className="bg-white text-zinc-900 hover:bg-zinc-100">Browse Components</Button></Link>
              <span className="text-xs text-zinc-500 self-center">Vue + React • shadcn</span>
            </div>
          </div>
          <CardContent className="p-8 flex flex-col justify-center bg-white">
            <div className="text-xs tracking-widest text-zinc-500 font-semibold">WHAT YOU GET</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li className="flex gap-2"><span className="text-zinc-900">↗</span> Instant download — Figma, TSX, Vue SFC, tokens</li>
              <li className="flex gap-2"><span className="text-zinc-900">↗</span> Live preview URL + snippet copy</li>
              <li className="flex gap-2"><span className="text-zinc-900">↗</span> Stack: Next.js / Vue, Tailwind, Framer Motion</li>
              <li className="flex gap-2"><span className="text-zinc-900">↗</span> Seller dashboard, admin reports & payouts 14th/21st</li>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
                <div className="font-bold">120</div><div className="text-xs text-zinc-500">Buttons</div>
              </div>
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
                <div className="font-bold">60</div><div className="text-xs text-zinc-500">Loaders</div>
              </div>
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-center">
                <div className="font-bold">45</div><div className="text-xs text-zinc-500">Motions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* shadcn proof */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Card className="p-6 bg-zinc-50 border-dashed">
          <div className="text-xs tracking-widest font-semibold">A) SHADCN-VUE UPGRADE — DONE</div>
          <div className="text-sm text-zinc-600 mt-1">Vue now uses <code className="px-1 py-0.5 bg-white border rounded">Button</code>, <code className="px-1 py-0.5 bg-white border rounded">Card</code>, <code className="px-1 py-0.5 bg-white border rounded">Badge</code>, <code className="px-1 py-0.5 bg-white border rounded">Input</code> from shadcn — same look, now copy-paste ready. This React app (B) is the full Next.js + shadcn clone at <code className="px-1 py-0.5 bg-white border rounded">/react</code>.</div>
        </Card>
      </section>
    </div>
  )
}
