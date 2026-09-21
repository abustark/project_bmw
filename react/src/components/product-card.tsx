"use client"
import Link from "next/link"
import { products } from "@/data/products"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart, useWishlist } from "@/lib/cart-store"

type Product = (typeof products)[number]

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist()
  const cart = useCart()
  const isWished = wishlist.has(product.id)

  return (
    <Card className="group relative overflow-hidden flex flex-col border-zinc-200 rounded-[16px] hover:border-zinc-300 hover:shadow-sm transition bg-white shadow-none">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-[transform] duration-300"
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement
            if (product.fallback) t.src = product.fallback
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isReference && <Badge className="text-[11px] tracking-widest bg-amber-500 text-white border-0 px-2.5 py-1 hover:bg-amber-500">REFERENCE</Badge>}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-xs font-medium border border-zinc-100 px-2.5 py-1">{product.category}</Badge>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault()
            wishlist.toggle(product.id)
          }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWished}
          variant="outline"
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border-zinc-200 shadow-sm hover:bg-white focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <svg aria-hidden="true" className={`w-4 h-4 ${isWished ? "fill-zinc-900 stroke-zinc-900" : "fill-none stroke-zinc-700"}`} strokeWidth={1.7} viewBox="0 0 24 24">
            <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
          </svg>
        </Button>
      </Link>

      <CardContent className="p-4 flex flex-col flex-1 gap-3">
        <Link href={`/product/${product.id}`} className="font-semibold leading-tight line-clamp-2 hover:underline underline-offset-4 text-[15px] text-zinc-900" style={{ textWrap: "balance" as any }}>
          {product.name}
        </Link>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="truncate" translate="no">{product.author}</span>
          <span className="w-1 h-1 bg-zinc-300 rounded-full shrink-0" aria-hidden="true" />
          <span className="inline-flex items-center gap-1 shrink-0"><span className="text-amber-500" aria-hidden="true">★</span> {product.rating} <span className="text-zinc-400">({product.reviews})</span></span>
        </div>

        <div className="flex items-baseline gap-2">
          {product.isReference ? (
            <>
              <span className="text-lg font-bold text-emerald-700 tabular-nums">₹0</span>
              <span className="text-xs text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
              <span className="ml-auto text-[11px] font-semibold tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">₹0 • REFERENCE</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold tabular-nums">₹{Number(product.price).toLocaleString("en-IN")}</span>
              {product.originalPrice && <span className="text-xs text-zinc-400 line-through tabular-nums">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>}
            </>
          )}
        </div>

        {product.isReference && (
          <div className="text-xs text-zinc-500 truncate" translate="no">{product.referenceName} — extracted • {product.license}</div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="secondary" className="text-[11px] bg-zinc-50 border-zinc-200 text-zinc-600 font-normal">{t}</Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-2">
          <Button
            onClick={() => cart.add(product, 1)}
            variant="pill"
            size="pill"
            className="flex-1 h-9 text-sm font-medium focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            Add • ₹0
          </Button>
          <Link href={`/product/${product.id}`} className="px-4 h-9 rounded-full border border-zinc-200 bg-white text-sm font-medium inline-flex items-center justify-center hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-900">
            View
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}