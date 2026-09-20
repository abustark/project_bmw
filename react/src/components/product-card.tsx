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
    <Card className="group relative overflow-hidden flex flex-col border-zinc-100 rounded-[20px] hover:shadow-lg transition">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" onError={(e) => { if(product.fallback) (e.target as HTMLImageElement).src = product.fallback!}} />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.badge && <Badge variant="pill" className="text-[11px] tracking-widest">{product.badge}</Badge>}
          {product.physical && <Badge variant="outline" className="bg-white text-[11px] tracking-widest">PHYSICAL</Badge>}
        </div>
        <button onClick={(e) => { e.preventDefault(); wish.toggle(product.id)}} className={`absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-zinc-100 shadow-sm hover:bg-white transition ${isWished ? 'text-zinc-900' : 'text-zinc-700'}`}>
          <Heart className={`w-4 h-4 ${isWished ? 'fill-zinc-900' : 'fill-none'}`} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-xs">{product.category}</Badge>
          <Badge className="hidden sm:inline-flex items-center gap-1 bg-zinc-900 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{product.sales.toLocaleString()} sales
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`} className="font-semibold leading-tight line-clamp-2 hover:underline">{product.name}</Link>
          <span className="shrink-0 text-sm font-bold">${product.price}</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">by {product.author} • <span className="inline-flex items-center gap-1"><span className="text-amber-500">★</span> {product.rating} ({product.reviews})</span></div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.tags.slice(0,3).map((t) => <Badge key={t} variant="secondary" className="text-[11px] bg-zinc-50 border-zinc-100">{t}</Badge>)}
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => cart.add(product)} variant="pill" size="pill" className="flex-1">Add to cart</Button>
          <Link href={`/product/${product.id}`} className="px-4 py-2.5 rounded-full border border-input bg-background text-sm font-medium hover:bg-accent inline-flex items-center justify-center">View</Link>
        </div>
        {product.originalPrice && <div className="mt-2 text-xs text-muted-foreground line-through text-center">was ${product.originalPrice}</div>}
      </CardContent>
    </Card>
  )
}
