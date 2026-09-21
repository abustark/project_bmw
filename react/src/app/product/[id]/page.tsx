"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { products } from "@/data/products"
import { useCart, useWishlist } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const product = products.find((p) => String(p.id) === String(id))
  const cart = useCart()
  const wish = useWishlist()
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(product?.image || "")
  const [tab, setTab] = useState("Overview")

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <div className="text-lg font-semibold">Product not found</div>
        <Link href="/shop" className="mt-4 inline-flex"><Button variant="pill" size="pill">Back to shop</Button></Link>
      </div>
    )
  }

  const gallery = [product.image, ...(product.gallery || [])].filter(Boolean)
  if (!activeImage) setActiveImage(product.image)

  const moreFromAuthor = products.filter((p) => p.author === product.author && p.id !== product.id).slice(0, 3)

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-xs tracking-widest text-zinc-500"><Link href="/shop" className="hover:underline">SHOP</Link> / {product.category.toUpperCase()}</div>

      {product.isReference && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs font-bold">!</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-amber-900">Reference — not for sale</div>
            <p className="text-sm text-amber-800 leading-relaxed">Curated from <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline font-medium">{product.referenceName}</a> ({product.license}) — estimated value <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span>. Visit source for original.</p>
            <div className="mt-2 flex gap-2">
              <a href={product.referenceUrl} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800">View Source ↗</a>
              {product.previewUrl && <a href={product.previewUrl} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-white border text-sm font-medium">Live preview</a>}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Card className="overflow-hidden rounded-[24px] p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeImage} alt={product.name} width={800} height={600} className="w-full aspect-[4/3] object-cover" onError={(e) => { if(product.fallback) (e.target as HTMLImageElement).src = product.fallback!}} />
          </Card>
          <div className="mt-3 flex gap-2">
            {gallery.map((img, i) => (
              <button key={i} aria-label={`View image ${i+1}`} onClick={() => setActiveImage(img)} className={`w-20 h-20 rounded-xl overflow-hidden border focus-visible:ring-2 focus-visible:ring-zinc-900 ${activeImage===img ? 'border-zinc-900':'border-zinc-200'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.name} preview ${i+1}`} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex gap-2 flex-wrap">
            {product.badge && <Badge variant="pill">{product.badge}</Badge>}
            {product.isReference && <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-900">REFERENCE • ₹0</Badge>}
            <Badge variant="outline" className="bg-zinc-50">{product.category}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight" style={{fontFamily: "var(--font-playfair)", textWrap: "balance" as any}}>{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm flex-wrap">
            <span className="inline-flex items-center gap-1"><span className="text-amber-500" aria-hidden="true">★</span> {product.rating} • {product.reviews} reviews</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true" />
            <span className="text-zinc-500 tabular-nums">{product.sales.toLocaleString()} sales</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true" />
            <span className="text-zinc-500" translate="no">by {product.author}</span>
          </div>
          <p className="mt-4 text-zinc-600 leading-relaxed" style={{ textWrap: "pretty" as any }}>{product.description}</p>

          <Card className="mt-6 p-5 rounded-[20px]">
            {product.isReference ? (
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold tabular-nums text-emerald-700">₹0</span>
                <span className="text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                <span className="ml-auto px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">REFERENCE — 100% OFF</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tabular-nums">₹{Number(product.price).toLocaleString('en-IN')}</span>
                {product.originalPrice && <span className="text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>}
                {product.originalPrice && !product.isReference && <span className="ml-auto px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">{Math.round((1-product.price/product.originalPrice)*100)}% OFF</span>}
              </div>
            )}
            <div className="mt-2 text-xs text-zinc-500">{product.delivery} • <span translate="no">{product.license}</span> license {product.isReference && <>• <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline">{product.referenceName}</a></>}</div>
            {product.isReference && <div className="mt-3 p-3 rounded-xl bg-zinc-50 border text-xs text-zinc-600">Estimated reference price <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span> — this demo does not process payments for reference items. Add to cart for preview.</div>}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium">Qty</span>
              <Button variant="outline" size="icon" aria-label="Decrease quantity" className="w-8 h-8 rounded-full" onClick={() => setQty(Math.max(1, qty-1))}>−</Button>
              <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
              <Button variant="outline" size="icon" aria-label="Increase quantity" className="w-8 h-8 rounded-full" onClick={() => setQty(qty+1)}>+</Button>
              <span className="ml-auto text-xs text-zinc-500">Reference — not shipped</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button onClick={() => cart.add(product, qty)} variant="pill" size="pill" className="col-span-2 py-6 focus-visible:ring-2 focus-visible:ring-zinc-900">Add to cart — ₹{(product.price * qty).toLocaleString('en-IN')}</Button>
              <Button onClick={() => wish.toggle(product.id)} aria-label={wish.has(product.id) ? "Remove from wishlist" : "Save to wishlist"} variant={wish.has(product.id) ? "default" : "outline"} className="rounded-full"><Heart className={`w-4 h-4 ${wish.has(product.id) ? 'fill-white':''}`} aria-hidden="true" /> {wish.has(product.id) ? 'Saved':'Save'}</Button>
            </div>
            {product.isReference ? (
              <a href={product.referenceUrl} target="_blank" rel="noopener" className="mt-2 w-full inline-flex justify-center px-4 py-2.5 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-sm font-medium">View Source ↗ — {product.referenceName}</a>
            ) : (
              <Button onClick={() => { cart.add(product, qty); router.push("/checkout")}} variant="outline" className="mt-2 w-full rounded-full">Buy now with Stripe</Button>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.map((t) => <Badge key={t} variant="secondary" className="bg-zinc-50">{t}</Badge>)}
            </div>
          </Card>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <Card className="p-3 rounded-xl"><div className="font-semibold">✓ Open</div><div className="text-zinc-500">MIT / ISC / Free</div></Card>
            <Card className="p-3 rounded-xl"><div className="font-semibold">↻ Reference</div><div className="text-zinc-500">View Source</div></Card>
            <Card className="p-3 rounded-xl"><div className="font-semibold">◐ Zero</div><div className="text-zinc-500">₹0 demo</div></Card>
          </div>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex gap-2 border-b border-zinc-100">
            {["Overview","Reviews","FAQ"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 focus-visible:ring-2 focus-visible:ring-zinc-900 ${tab===t ? 'border-zinc-900':'border-transparent text-zinc-500'}`}>{t}</button>
            ))}
          </div>
          <div className="py-6">
            {tab==="Overview" && (
              <div className="prose prose-zinc max-w-none text-sm leading-relaxed">
                <h3 className="font-semibold">What’s inside</h3>
                <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                  {(product.files || ["Figma","Tokens","Icons"]).map((f:string)=> <li key={f}>{f}</li>)}
                  <li>Documentation & changelog</li>
                  <li>Stack: {(product.stack || []).join(", ")}</li>
                  {product.isReference && <li>Source: <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline">{product.referenceName}</a> — {product.license}</li>}
                </ul>
                {product.snippet && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm">Code snippet — copy-paste</h4>
                    <pre className="mt-2 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-auto">{product.snippet}</pre>
                    <div className="mt-2 flex gap-2">
                      <Button variant="default" className="rounded-full text-xs h-8" onClick={()=> navigator.clipboard?.writeText(product.snippet!)}>Copy snippet</Button>
                      {product.previewUrl && <a href={product.previewUrl} target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border inline-flex items-center">Live preview ↗</a>}
                      {product.isReference && <a href={product.referenceUrl} target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 inline-flex items-center">View Source ↗</a>}
                    </div>
                  </div>
                )}
                {product.previewUrl && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="font-semibold">Preview:</span>
                    <a href={product.previewUrl} target="_blank" rel="noopener" className="underline text-zinc-600">{product.previewUrl}</a>
                  </div>
                )}
                {product.isReference && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="font-semibold">Reference:</span>
                    <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline text-zinc-600">{product.referenceUrl}</a>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(product.stack||[]).map((s:string)=> <Badge key={s} className="bg-zinc-900 text-white">{s}</Badge>)}
                </div>
                <h3 className="mt-6 font-semibold">License</h3>
                <p className="text-zinc-600">{product.license} — {product.isReference ? <>open-source, free to use. Estimated value <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span> here. Not for sale — visit source.</> : <>use in unlimited projects. Resale of source not allowed.</>}</p>
              </div>
            )}
            {tab==="Reviews" && (
              <div>
                <div className="flex items-center gap-4"><div className="text-4xl font-bold tabular-nums">{product.rating}</div><div><div>★ ★ ★ ★ ★</div><div className="text-xs text-zinc-500">Based on {product.reviews} reviews</div></div></div>
                <div className="mt-6 space-y-4">
                  {[
                    {name:"Aarav S.", time:"2 days ago", rating:5, text:"Insane quality. Saved 40 hours.", avatar:"https://i.pravatar.cc/100?img=15"},
                    {name:"Sofia M.", time:"1 week ago", rating:5, text:"Docs make sense. Dark mode chef’s kiss.", avatar:"https://i.pravatar.cc/100?img=16"},
                  ].map((r) => (
                    <Card key={r.name} className="p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.avatar} alt={r.name} width={32} height={32} className="w-8 h-8 rounded-full" loading="lazy" />
                        <div><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-zinc-500">{r.time}</div></div>
                        <div className="ml-auto text-amber-500 text-sm">★ {r.rating}</div>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600">{r.text}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {tab==="FAQ" && (
              <div className="space-y-3">
                <Card className="p-4 rounded-xl"><div className="font-medium">How do I download after purchase?</div><p className="mt-2 text-sm text-zinc-600">Reference items are free — <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline">View Source</a> to get it from the original. Cart is demo (₹0).</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">Can I use for client work?</div><p className="mt-2 text-sm text-zinc-600">Yes — {product.license}. Check source: <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline">{product.referenceName}</a></p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">What about refunds?</div><p className="mt-2 text-sm text-zinc-600">Reference catalog is free (₹0) — no payment. Estimated price <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> shown for reference only.</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">Which stack?</div><p className="mt-2 text-sm text-zinc-600">{(product.stack||[]).join(", ")} — Vue SFC & React TSX, Tailwind, shadcn.</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">Why ₹0?</div><p className="mt-2 text-sm text-zinc-600">This is a reference showcase — to demonstrate curation without selling. All rights belong to original authors. Prices are estimates, strikethrough to ₹0.</p></Card>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold">About {product.author}</div>
            <p className="mt-2 text-sm text-zinc-600">Creator of <a href={product.referenceUrl} target="_blank" rel="noopener" className="underline">{product.referenceName}</a>. Open-source, {product.license}.</p>
            <a href={product.referenceUrl} target="_blank" rel="noopener" className="mt-4 w-full inline-flex justify-center px-4 py-2 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-sm font-medium">View Source ↗</a>
          </Card>
          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold text-sm">More from reference</div>
            <div className="mt-3 space-y-3">
              {moreFromAuthor.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} className="w-14 h-14 rounded-xl object-cover border" alt={p.name} width={56} height={56} loading="lazy" />
                  <div><div className="text-sm font-medium leading-tight">{p.name}</div><div className="text-xs text-zinc-500">₹0 <span className="line-through">₹{Number(p.originalPrice).toLocaleString('en-IN')}</span> • ★ {p.rating}</div></div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
