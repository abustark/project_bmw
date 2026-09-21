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
      <div className="mt-4 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Card className="overflow-hidden rounded-[24px] p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeImage} alt={product.name} className="w-full aspect-[4/3] object-cover" onError={(e) => { if(product.fallback) (e.target as HTMLImageElement).src = product.fallback!}} />
          </Card>
          <div className="mt-3 flex gap-2">
            {gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(img)} className={`w-20 h-20 rounded-xl overflow-hidden border ${activeImage===img ? 'border-zinc-900':'border-zinc-200'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex gap-2">
            {product.badge && <Badge variant="pill">{product.badge}</Badge>}
            <Badge variant="outline" className="bg-zinc-50">{product.category}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight" style={{fontFamily: "var(--font-playfair)"}}>{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1"><span className="text-amber-500">★</span> {product.rating} • {product.reviews} reviews</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
            <span className="text-zinc-500">{product.sales.toLocaleString()} sales</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
            <span className="text-zinc-500">by {product.author}</span>
          </div>
          <p className="mt-4 text-zinc-600 leading-relaxed">{product.description}</p>

          <Card className="mt-6 p-5 rounded-[20px]">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && <span className="text-zinc-400 line-through">${product.originalPrice}</span>}
              {product.originalPrice && <span className="ml-auto px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">{Math.round((1-product.price/product.originalPrice)*100)}% OFF</span>}
            </div>
            <div className="mt-2 text-xs text-zinc-500">{product.delivery} • {product.license} license</div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium">Qty</span>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={() => setQty(Math.max(1, qty-1))}>−</Button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={() => setQty(qty+1)}>+</Button>
              <span className="ml-auto text-xs text-zinc-500">Instant download</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button onClick={() => cart.add(product, qty)} variant="pill" size="pill" className="col-span-2 py-6">Add to cart — ${product.price * qty}</Button>
              <Button onClick={() => wish.toggle(product.id)} variant={wish.has(product.id) ? "default" : "outline"} className="rounded-full"><Heart className={`w-4 h-4 ${wish.has(product.id) ? 'fill-white':''}`} /> {wish.has(product.id) ? 'Saved':'Save'}</Button>
            </div>
            <Button onClick={() => { cart.add(product, qty); router.push("/checkout")}} variant="outline" className="mt-2 w-full rounded-full">Buy now with Stripe</Button>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.map((t) => <Badge key={t} variant="secondary" className="bg-zinc-50">{t}</Badge>)}
            </div>
          </Card>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <Card className="p-3 rounded-xl"><div className="font-semibold">✓ Secure</div><div className="text-zinc-500">Stripe & PayPal</div></Card>
            <Card className="p-3 rounded-xl"><div className="font-semibold">↻ Updates</div><div className="text-zinc-500">Free 12 mo</div></Card>
            <Card className="p-3 rounded-xl"><div className="font-semibold">◐ Support</div><div className="text-zinc-500">Chat seller</div></Card>
          </div>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex gap-2 border-b border-zinc-100">
            {["Overview","Reviews","FAQ"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 ${tab===t ? 'border-zinc-900':'border-transparent text-zinc-500'}`}>{t}</button>
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
                </ul>
                {product.snippet && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm">Code snippet — copy-paste</h4>
                    <pre className="mt-2 rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-auto">{product.snippet}</pre>
                    <div className="mt-2 flex gap-2">
                      <Button variant="default" className="rounded-full text-xs h-8" onClick={()=> navigator.clipboard?.writeText(product.snippet!)}>Copy snippet</Button>
                      {product.previewUrl && <a href={product.previewUrl} target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border inline-flex items-center">Live preview ↗</a>}
                    </div>
                  </div>
                )}
                {product.previewUrl && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="font-semibold">Preview:</span>
                    <a href={product.previewUrl} target="_blank" rel="noopener" className="underline text-zinc-600">{product.previewUrl}</a>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(product.stack||[]).map((s:string)=> <Badge key={s} className="bg-zinc-900 text-white">{s}</Badge>)}
                </div>
                <h3 className="mt-6 font-semibold">License</h3>
                <p className="text-zinc-600">{product.license} — use in unlimited projects. Resale of source not allowed.</p>
              </div>
            )}
            {tab==="Reviews" && (
              <div>
                <div className="flex items-center gap-4"><div className="text-4xl font-bold">{product.rating}</div><div><div>★ ★ ★ ★ ★</div><div className="text-xs text-zinc-500">Based on {product.reviews} reviews</div></div></div>
                <div className="mt-6 space-y-4">
                  {[
                    {name:"Aarav S.", time:"2 days ago", rating:5, text:"Insane quality. Saved 40 hours.", avatar:"https://i.pravatar.cc/100?img=15"},
                    {name:"Sofia M.", time:"1 week ago", rating:5, text:"Docs make sense. Dark mode chef’s kiss.", avatar:"https://i.pravatar.cc/100?img=16"},
                  ].map((r) => (
                    <Card key={r.name} className="p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.avatar} alt="" className="w-8 h-8 rounded-full" />
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
                <Card className="p-4 rounded-xl"><div className="font-medium">How do I download after purchase?</div><p className="mt-2 text-sm text-zinc-600">Instant download from dashboard — files: {(product.files||[]).join(", ")}. No shipping.</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">Can I use for client work?</div><p className="mt-2 text-sm text-zinc-600">Yes — {product.license} license for client projects. Resale not allowed.</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">What about refunds?</div><p className="mt-2 text-sm text-zinc-600">Digital: 14-day if not downloaded. Instant access.</p></Card>
                <Card className="p-4 rounded-xl"><div className="font-medium">Which stack?</div><p className="mt-2 text-sm text-zinc-600">{(product.stack||[]).join(", ")} — Vue SFC & React TSX, Tailwind, shadcn.</p></Card>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold">About {product.author}</div>
            <p className="mt-2 text-sm text-zinc-600">Top seller on N-GELO. 12 products, 4.9 avg, 24h response.</p>
            <Button variant="outline" className="mt-4 w-full rounded-full">Message seller</Button>
          </Card>
          <Card className="p-5 rounded-[20px]">
            <div className="font-semibold text-sm">More from {product.author}</div>
            <div className="mt-3 space-y-3">
              {moreFromAuthor.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} className="w-14 h-14 rounded-xl object-cover border" alt="" />
                  <div><div className="text-sm font-medium leading-tight">{p.name}</div><div className="text-xs text-zinc-500">${p.price} • ★ {p.rating}</div></div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
