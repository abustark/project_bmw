"use client"
import { use, useState } from "react"
import Link from "next/link"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { useCart, useWishlist } from "@/lib/cart-store"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => String(p.id) === String(id))
  const cart = useCart()
  const wishlist = useWishlist()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState("Overview")
  const [activeImage, setActiveImage] = useState(product?.image ?? "")

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center bg-[hsl(var(--canvas))]">
        <div className="text-lg font-medium text-[hsl(var(--ink))]">Product not found</div>
        <Link href="/shop" className="mt-4 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Back to shop</Link>
      </div>
    )
  }

  const gallery = [product.image, ...(product.gallery || [])].filter(Boolean)
  const moreFromAuthor = products.filter((p) => p.author === product.author && p.id !== product.id).slice(0, 3)
  const isWished = wishlist.has(product.id)

  const sampleReviews = [
    { name: "Aarav S.", time: "2 days ago", rating: 5, text: "Insane quality. Saved me 40 hours on a client fintech app.", avatar: "https://i.pravatar.cc/100?img=15" },
    { name: "Sofia M.", time: "1 week ago", rating: 5, text: "Docs make sense. Dark mode variables are chef’s kiss.", avatar: "https://i.pravatar.cc/100?img=16" },
    { name: "Kenji T.", time: "2 weeks ago", rating: 4, text: "Great pack, wish more empty states. Still 5 stars.", avatar: "https://i.pravatar.cc/100?img=17" },
  ]

  return (
    <div className="bg-[hsl(var(--canvas))] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* breadcrumb */}
        <div className="text-xs text-[hsl(var(--ink-subtle))]">
          <Link href="/shop" className="hover:text-[hsl(var(--ink))] hover:underline underline-offset-4">Shop</Link>
          <span className="mx-1 opacity-40" aria-hidden="true">/</span> {product.category}
        </div>

        <div className="mt-4 grid lg:grid-cols-12 gap-8">
          {/* gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-[16px] overflow-hidden bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeImage} alt={product.name} width={800} height={600} className="w-full aspect-[4/3] object-cover rounded-[12px]" onError={(e) => { const t = e.currentTarget as HTMLImageElement; if (product.fallback) t.src = product.fallback }} />
            </div>
            <div className="mt-3 flex gap-2 overflow-auto pb-1">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(img)} aria-label={`View image ${i + 1}`} className={`w-20 h-20 rounded-[12px] overflow-hidden border shrink-0 transition focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${activeImage === img ? "border-[#5e6ad2]" : "border-[hsl(var(--hairline))] opacity-60 hover:opacity-100"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} preview ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {product.isReference && (
              <div className="mt-4 rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] px-4 py-3 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shrink-0" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-[hsl(var(--ink-subtle))]">
                  Reference · not for sale · <span className="font-medium text-[hsl(var(--ink))]" translate="no">{product.referenceName}</span> ({product.license}) · estimated <span className="line-through">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span> · rendered here
                </p>
              </div>
            )}
          </div>

          {/* info */}
          <div className="lg:col-span-5">
            <div className="flex gap-2 flex-wrap">
              {product.isReference && <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[11px] font-medium tracking-widest text-[hsl(var(--ink-subtle))]">REFERENCE · FREE</span>}
              <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xs text-[hsl(var(--ink-subtle))]" translate="no">{product.category}</span>
            </div>
            <h1 className="mt-3 text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>{product.name}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm flex-wrap text-[hsl(var(--ink-subtle))]">
              <span className="inline-flex items-center gap-1"><span className="text-[#5e6ad2]" aria-hidden="true">★</span> {product.rating} · {product.reviews} reviews</span>
              <span className="w-1 h-1 bg-[hsl(var(--hairline))] rounded-full" aria-hidden="true" />
              <span className="tabular-nums">{product.sales.toLocaleString()} sales</span>
              <span className="w-1 h-1 bg-[hsl(var(--hairline))] rounded-full" aria-hidden="true" />
              <span translate="no">by {product.author}</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-[hsl(var(--ink-muted))] text-pretty">{product.description}</p>

            <Card className="mt-6 rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] p-5 shadow-none">
              {product.isReference ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹0</span>
                  <span className="text-sm text-[hsl(var(--ink-subtle))] line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
                  <span className="ml-auto px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] text-[11px] font-medium tracking-widest">FREE</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹{Number(product.price).toLocaleString("en-IN")}</span>
                  {product.originalPrice && <span className="text-sm text-[hsl(var(--ink-subtle))] line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>}
                </div>
              )}
              <div className="mt-1 text-xs text-[hsl(var(--ink-subtle))]">{product.delivery} · <span translate="no">{product.license}</span></div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium text-[hsl(var(--ink))]">Qty</span>
                <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="w-9 h-9 rounded-[8px] border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))]">−</Button>
                <span className="w-8 text-center font-medium tabular-nums text-[hsl(var(--ink))]">{qty}</span>
                <Button variant="outline" size="icon" onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="w-9 h-9 rounded-[8px] border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))]">+</Button>
                <span className="ml-auto text-xs text-[hsl(var(--ink-subtle))]">Reference — not shipped</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button onClick={() => cart.add(product, qty)} className="col-span-2 h-11 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white">Add to cart — ₹{(product.price * qty).toLocaleString("en-IN")}</Button>
                <Button onClick={() => wishlist.toggle(product.id)} aria-label={isWished ? "Remove from wishlist" : "Save to wishlist"} className={`h-11 rounded-[8px] border font-medium text-sm gap-1 ${isWished ? "bg-[hsl(var(--surface-2))] border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-2))]" : "bg-transparent border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))]"}`}>
                  <Heart className={`w-4 h-4 ${isWished ? "fill-[#5e6ad2] stroke-[#5e6ad2]" : ""}`} /> {isWished ? "Saved" : "Save"}
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">{t}</span>
                ))}
              </div>
            </Card>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div className="font-medium text-[hsl(var(--ink))]">✓ Open</div><div className="text-[hsl(var(--ink-subtle))]">MIT / ISC / Free</div></div>
              <div className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div className="font-medium text-[hsl(var(--ink))]">↻ Extracted</div><div className="text-[hsl(var(--ink-subtle))]">Shown here</div></div>
              <div className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-3"><div className="font-medium text-[hsl(var(--ink))]">₹0 demo</div><div className="text-[hsl(var(--ink-subtle))]">No payment</div></div>
            </div>
          </div>
        </div>

        {/* details — tabs */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex gap-1 border-b border-[hsl(var(--hairline))]">
              {["Overview", "Reviews", "FAQ"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${activeTab === tab ? "border-[#5e6ad2] text-[hsl(var(--ink))]" : "border-transparent text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>{tab}</button>
              ))}
            </div>
            <div className="py-6">
              {activeTab === "Overview" && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <h3 className="font-semibold text-[hsl(var(--ink))]">What’s inside</h3>
                  <ul className="list-disc pl-5 space-y-1 text-[hsl(var(--ink-muted))]">
                    {(product.files || ["Figma", "Tokens", "Icons"]).map((f) => (<li key={f}>{f}</li>))}
                    <li>Documentation & changelog</li>
                    <li>Stack: {(product.stack || []).join(", ")}</li>
                    {product.isReference && (<li>Source: <span className="font-medium text-[hsl(var(--ink))]" translate="no">{product.referenceName}</span> — {product.license} (extracted)</li>)}
                  </ul>
                  {product.snippet && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-[hsl(var(--ink))]">Code snippet — copy-paste</h4>
                      <pre className="mt-2 rounded-[8px] bg-[#010102] text-[#f7f8f8] border border-[#23252a] p-4 text-xs font-mono overflow-auto">{product.snippet}</pre>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button onClick={() => product.snippet && navigator.clipboard?.writeText(product.snippet)} className="text-xs px-3 py-1.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Copy snippet</button>
                        <span className="text-xs px-3 py-1.5 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">Source: <span translate="no">{product.referenceName}</span></span>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(product.stack || []).map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">{s}</span>
                    ))}
                  </div>
                  <h3 className="mt-6 font-semibold text-[hsl(var(--ink))]">License</h3>
                  <p className="text-[hsl(var(--ink-muted))]">
                    {product.license} — {product.isReference ? (<span>open-source, free. Estimated <span className="line-through">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span> here. Not for sale.</span>) : (<>use in unlimited projects. Resale not allowed.</>)}
                  </p>
                </div>
              )}
              {activeTab === "Reviews" && (
                <div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">{product.rating}</div>
                    <div><div className="text-[#5e6ad2]">★ ★ ★ ★ ★</div><div className="text-xs text-[hsl(var(--ink-subtle))]">Based on {product.reviews} reviews</div></div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {sampleReviews.map((r) => (
                      <div key={r.name} className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.avatar} alt={r.name} width={32} height={32} className="w-8 h-8 rounded-full" loading="lazy" />
                          <div><div className="text-sm font-medium text-[hsl(var(--ink))]">{r.name}</div><div className="text-xs text-[hsl(var(--ink-subtle))]">{r.time}</div></div>
                          <div className="ml-auto text-[#5e6ad2] text-sm">★ {r.rating}</div>
                        </div>
                        <p className="mt-2 text-sm text-[hsl(var(--ink-muted))]">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "FAQ" && (
                <div className="space-y-3">
                  <details className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary className="font-medium cursor-pointer text-[hsl(var(--ink))]">How do I download?</summary><p className="mt-2 text-sm text-[hsl(var(--ink-muted))]">Reference items are free — Source: <span translate="no">{product.referenceName}</span> (extracted). Cart is demo (₹0).</p></details>
                  <details className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary className="font-medium cursor-pointer text-[hsl(var(--ink))]">Can I use for client work?</summary><p className="mt-2 text-sm text-[hsl(var(--ink-muted))]">Yes — {product.license}. Check product page.</p></details>
                  <details className="rounded-[12px] bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] p-4"><summary className="font-medium cursor-pointer text-[hsl(var(--ink))]">Why ₹0?</summary><p className="mt-2 text-sm text-[hsl(var(--ink-muted))]">Reference showcase — estimates shown, strikethrough to ₹0, no payment. All rights with originals.</p></details>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <Card className="rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] p-5 shadow-none">
              <div className="font-medium text-sm text-[hsl(var(--ink))]">About {product.author}</div>
              <p className="mt-2 text-sm text-[hsl(var(--ink-muted))]">Creator of <span className="font-medium text-[hsl(var(--ink))]" translate="no">{product.referenceName}</span> · {product.license} · extracted.</p>
            </Card>
            <Card className="rounded-[12px] bg-[hsl(var(--card))] border-[hsl(var(--hairline))] p-5 shadow-none">
              <div className="font-medium text-sm text-[hsl(var(--ink))]">More from reference</div>
              <div className="mt-3 space-y-3">
                {moreFromAuthor.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="flex gap-3 hover:bg-[hsl(var(--surface-1))] -mx-2 px-2 py-2 rounded-[8px] transition">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} width={56} height={56} className="w-14 h-14 rounded-[8px] object-cover border border-[hsl(var(--hairline))]" loading="lazy" />
                    <div><div className="text-sm font-medium leading-tight line-clamp-2 text-[hsl(var(--ink))]">{p.name}</div><div className="text-xs text-[hsl(var(--ink-subtle))] mt-1">₹0 <span className="line-through">₹{Number(p.originalPrice).toLocaleString("en-IN")}</span> · ★ {p.rating}</div></div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
