"use client"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"
import { useCart, useWishlist } from "@/lib/cart-store"

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart()
  const wish = useWishlist()
  const isWished = wish.has(product.id)

  return (
    <Card className="group relative overflow-hidden flex flex-col border-zinc-100 rounded-[20px] hover:shadow-lg transition focus-within:ring-2 focus-within:ring-zinc-900/20">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} width={800} height={600} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-[transform] duration-500" onError={(e) => { if(product.fallback) (e.target as HTMLImageElement).src = product.fallback!}} />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[70%]">
          {product.badge && <Badge variant="pill" className="text-[11px] tracking-widest px-2.5 py-1 bg-zinc-900 text-white border-0">{product.badge}</Badge>}
          {product.isReference && <Badge variant="outline" className="text-[11px] tracking-widest bg-amber-50 border-amber-200 text-amber-900">REFERENCE</Badge>}
          {product.physical && <Badge variant="outline" className="bg-white text-[11px] tracking-widest">PHYSICAL</Badge>}
        </div>
        <button
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWished}
          onClick={(e) => { e.preventDefault(); wish.toggle(product.id)}}
          className={`absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-zinc-100 shadow-sm hover:bg-white transition focus-visible:ring-2 focus-visible:ring-zinc-900 ${isWished ? 'text-zinc-900' : 'text-zinc-700'}`}>
          <Heart aria-hidden="true" className={`w-4 h-4 ${isWished ? 'fill-zinc-900' : 'fill-none'}`} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-xs border-0">{product.category}</Badge>
          <Badge className="hidden sm:inline-flex items-center gap-1 bg-zinc-900 text-white border-0 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />{product.sales.toLocaleString()} sales
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4 flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <Link href={`/product/${product.id}`} className="font-semibold leading-tight line-clamp-2 hover:underline min-w-0" style={{ textWrap: "balance" as any }}>{product.name}</Link>
          {product.isReference ? (
            <span className="shrink-0 flex flex-col items-end tabular-nums">
              <span className="text-sm font-bold text-emerald-700">₹0</span>
              <span className="text-xs text-zinc-400 line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
            </span>
          ) : (
            <span className="shrink-0 text-sm font-bold tabular-nums">₹{Number(product.price).toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground truncate">by <span translate="no">{product.author}</span> • <span className="inline-flex items-center gap-1"><span className="text-amber-500" aria-hidden="true">★</span> {product.rating} ({product.reviews})</span></div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.tags.slice(0,3).map((t) => <Badge key={t} variant="secondary" className="text-[11px] bg-zinc-50 border-zinc-100">{t}</Badge>)}
          {product.isReference && <Badge variant="outline" className="text-[11px] bg-white border-amber-200 text-zinc-600">View Source ↗</Badge>}
        </div>
        {product.isReference && (
          <div className="mt-2 text-xs">
            <a href={product.referenceUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 underline-offset-2 hover:underline line-clamp-1" title={product.referenceUrl}>{product.referenceName}</a>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button onClick={() => cart.add(product)} variant="pill" size="pill" className="flex-1 focus-visible:ring-2 focus-visible:ring-zinc-900">Add to cart</Button>
          <Link href={`/product/${product.id}`} className="px-4 py-2.5 rounded-full border border-input bg-background text-sm font-medium hover:bg-accent inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2">View</Link>
        </div>
        {product.isReference ? (
          <div className="mt-2 text-xs text-center text-zinc-500"><span className="line-through decoration-zinc-400">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span> <span className="mx-1">→</span> <span className="font-semibold text-emerald-700">₹0</span> <span className="ml-1">Reference only</span></div>
        ) : (
          product.originalPrice && <div className="mt-2 text-xs text-muted-foreground line-through text-center tabular-nums">was ₹{Number(product.originalPrice).toLocaleString('en-IN')}</div>
        )}
      </CardContent>
    </Card>
  )
}
