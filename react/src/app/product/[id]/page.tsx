"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { products } from "@/data/products"
import { useCart, useWishlist } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
    <div className="bg-[#fcfcf9] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-xs tracking-widest text-zinc-500"><Link href="/shop" className="hover:underline underline-offset-4">SHOP</Link> <span aria-hidden="true">/</span> {product.category.toUpperCase()}</div>

        {product.isReference && (
          <div className="mt-4 rounded-[12px] border border-amber-200 bg-amber-50 p-4 flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-xs font-bold" aria-hidden="true">!</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-amber-900">Reference — not for sale • ₹0</div>
              <p className="text-sm text-amber-800 leading-relaxed mt-1">From <span className="font-medium" translate="no">{product.referenceName}</span> ({product.license}) — estimated <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span>. Extracted & shown here — source name only, no outbound link.</p>
            </div>
          </div>
        )}

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Card className="overflow-hidden rounded-[16px] p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeImage} alt={product.name} width={800} height={600} className="w-full aspect-[4/3] object-cover" onError={(e) => { if(product.fallback) (e.target as HTMLImageElement).src = product.fallback!}} />
            </Card>
            <div className="mt-3 flex gap-2 overflow-auto pb-1">
              {gallery.map((img, i) => (
                <button key={i} aria-label={`View image ${i+1}`} onClick={() => setActiveImage(img)} className={`w-20 h-20 rounded-xl overflow-hidden border shrink-0 focus-visible:ring-2 focus-visible:ring-zinc-900 ${activeImage===img ? 'border-zinc-900':'border-zinc-200'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} preview ${i+1}`} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex gap-2 flex-wrap">
              {product.badge && <Badge variant="pill" className="bg-zinc-900 text-white">{product.badge}</Badge>}
              {product.isReference && <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-900">REFERENCE • ₹0</Badge>}
              <Badge variant="outline" className="bg-white border-zinc-200">{product.category}</Badge>
            </div>
            <h1 className="mt-3 text-2xl lg:text-3xl font-bold leading-tight" style={{fontFamily: "var(--font-playfair)", textWrap: "balance" as any}}>{product.name}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm flex-wrap text-zinc-600">
              <span className="inline-flex items-center gap-1"><span className="text-amber-500" aria-hidden="true">★</span> {product.rating} • {product.reviews} reviews</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true" />
              <span className="tabular-nums">{product.sales.toLocaleString()} sales</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full" aria-hidden="true" />
              <span translate="no">by {product.author}</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600" style={{ textWrap: "pretty" as any }}>{product.description}</p>

            <Card className="mt-6 p-5 rounded-[16px]">
              {product.isReference ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl font-bold tabular-nums text-emerald-700">₹0</span>
                  <span className="text-sm text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                  <span className="ml-auto px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">100% OFF</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold tabular-nums">₹{Number(product.price).toLocaleString('en-IN')}</span>
                  {product.originalPrice && <span className="text-sm text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>}
                </div>
              )}
              <div className="mt-1 text-xs text-zinc-500">{product.delivery} • <span translate="no">{product.license}</span> {product.isReference && <>• <span translate="no">{product.referenceName}</span></>}</div>
              {product.isReference && <div className="mt-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs leading-relaxed text-zinc-600">Estimated <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span> — demo, no payment. Add to cart for preview.</div>}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium">Qty</span>
                <Button variant="outline" size="icon" aria-label="Decrease quantity" className="w-9 h-9 rounded-full" onClick={() => setQty(Math.max(1, qty-1))}>−</Button>
                <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                <Button variant="outline" size="icon" aria-label="Increase quantity" className="w-9 h-9 rounded-full" onClick={() => setQty(qty+1)}>+</Button>
                <span className="ml-auto text-xs text-zinc-500">Reference — not shipped</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button onClick={() => cart.add(product, qty)} variant="pill" size="pill" className="col-span-2 h-11">Add to cart — ₹{(product.price * qty).toLocaleString('en-IN')}</Button>
                <Button onClick={() => wish.toggle(product.id)} aria-label={wish.has(product.id) ? "Remove from wishlist" : "Save to wishlist"} variant={wish.has(product.id) ? "default" : "outline"} className="rounded-full h-11"><Heart className={`w-4 h-4 ${wish.has(product.id) ? 'fill-white':''}`} aria-hidden="true" /> {wish.has(product.id) ? 'Saved':'Save'}</Button>
              </div>
              {product.isReference && <span className="mt-3 w-full inline-flex justify-center px-4 py-2.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-sm font-medium">Source: <span translate="no">{product.referenceName}</span> — extracted</span>}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.tags.map((t) => <Badge key={t} variant="secondary" className="bg-zinc-50 text-zinc-600 font-normal">{t}</Badge>)}
              </div>
            </Card>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <Card className="p-3 rounded-xl shadow-none border-zinc-200"><div className="font-semibold">✓ Open</div><div className="text-zinc-500">MIT / ISC / Free</div></Card>
              <Card className="p-3 rounded-xl shadow-none border-zinc-200"><div className="font-semibold">↻ Extracted</div><div className="text-zinc-500">Shown here</div></Card>
              <Card className="p-3 rounded-xl shadow-none border-zinc-200"><div className="font-semibold">₹0 demo</div><div className="text-zinc-500">No payment</div></Card>
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex gap-1 border-b border-zinc-200">
              {["Overview","Reviews","FAQ"].map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-zinc-900 ${tab===t ? 'border-zinc-900 text-zinc-900':'border-transparent text-zinc-500 hover:text-zinc-700'}`}>{t}</button>
              ))}
            </div>
            <div className="py-6">
              {tab==="Overview" && (
                <div className="space-y-4 text-sm leading-relaxed">
                  <h3 className="font-semibold text-zinc-900">What’s inside</h3>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                    {(product.files || ["Figma","Tokens","Icons"]).map((f:string)=> <li key={f}>{f}</li>)}
                    <li>Documentation & changelog</li>
                    <li>Stack: {(product.stack || []).join(", ")}</li>
                    {product.isReference && <li>Source: <span className="font-medium" translate="no">{product.referenceName}</span> — {product.license} (extracted)</li>}
                  </ul>
                  {product.snippet && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-zinc-900">Code snippet — copy-paste</h4>
                      <pre className="mt-2 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-auto">{product.snippet}</pre>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button className="rounded-full text-xs h-8" onClick={()=> navigator.clipboard?.writeText(product.snippet!)}>Copy snippet</Button>
                        {product.isReference && <span className="text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 inline-flex items-center">Source: <span translate="no">{product.referenceName}</span></span>}
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(product.stack||[]).map((s:string)=> <Badge key={s} className="bg-zinc-900 text-white">{s}</Badge>)}
                  </div>
                  <h3 className="mt-6 font-semibold text-zinc-900">License</h3>
                  <p className="text-zinc-600">{product.license} — {product.isReference ? <>open-source, free. Estimated <span className="line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> → <span className="font-bold text-emerald-700">₹0</span> here. Not for sale.</> : <>use in unlimited projects.</>}</p>
                </div>
              )}
              {tab==="Reviews" && (
                <div>
                  <div className="flex items-center gap-4"><div className="text-4xl font-bold tabular-nums">{product.rating}</div><div><div className="text-amber-500">★ ★ ★ ★ ★</div><div className="text-xs text-zinc-500">Based on {product.reviews} reviews</div></div></div>
                  <div className="mt-6 space-y-3">
                    {[
                      {name:"Aarav S.", time:"2 days ago", rating:5, text:"Insane quality. Saved 40 hours.", avatar:"https://i.pravatar.cc/100?img=15"},
                      {name:"Sofia M.", time:"1 week ago", rating:5, text:"Docs make sense. Dark mode chef’s kiss.", avatar:"https://i.pravatar.cc/100?img=16"},
                    ].map((r) => (
                      <Card key={r.name} className="p-4 rounded-xl shadow-none border-zinc-200">
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
                  <Card className="p-4 rounded-xl shadow-none border-zinc-200"><div className="font-medium">How do I download?</div><p className="mt-2 text-sm text-zinc-600">Reference items are free — Source: <span translate="no">{product.referenceName}</span> (extracted). Cart is demo (₹0).</p></Card>
                  <Card className="p-4 rounded-xl shadow-none border-zinc-200"><div className="font-medium">Can I use for client work?</div><p className="mt-2 text-sm text-zinc-600">Yes — {product.license}. Check product page.</p></Card>
                  <Card className="p-4 rounded-xl shadow-none border-zinc-200"><div className="font-medium">Why ₹0?</div><p className="mt-2 text-sm text-zinc-600">Reference showcase — estimates shown, strikethrough to ₹0, no payment. All rights with originals.</p></Card>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 rounded-[16px] shadow-none border-zinc-200">
              <div className="font-semibold text-sm">About {product.author}</div>
              <p className="mt-2 text-sm text-zinc-600">Creator of <span className="font-medium" translate="no">{product.referenceName}</span> • {product.license} • extracted.</p>
              <span className="mt-4 w-full inline-flex justify-center px-4 py-2.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-sm font-medium">Source: <span translate="no">{product.referenceName}</span></span>
            </Card>
            <Card className="p-5 rounded-[16px] shadow-none border-zinc-200">
              <div className="font-semibold text-sm">More from reference</div>
              <div className="mt-3 space-y-3">
                {moreFromAuthor.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="flex gap-3 hover:bg-zinc-50 -mx-2 px-2 py-2 rounded-xl transition">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} className="w-14 h-14 rounded-xl object-cover border border-zinc-100" alt={p.name} width={56} height={56} loading="lazy" />
                    <div><div className="text-sm font-medium leading-tight line-clamp-2">{p.name}</div><div className="text-xs text-zinc-500 mt-1">₹0 <span className="line-through">₹{Number(p.originalPrice).toLocaleString('en-IN')}</span> • ★ {p.rating}</div></div>
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
