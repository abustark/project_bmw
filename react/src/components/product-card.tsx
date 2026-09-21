"use client"
import Link from "next/link"
import { products } from "@/data/products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart, useWishlist } from "@/lib/cart-store"

type Product = (typeof products)[number]

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist()
  const cart = useCart()
  const isWished = wishlist.has(product.id)

  return (
    <Card className="group flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] rounded-[12px] hover:border-[#34343a] transition shadow-none">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden rounded-t-[12px] bg-[hsl(var(--surface-1))]">
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
        <Button
          onClick={(e) => {
            e.preventDefault()
            wishlist.toggle(product.id)
          }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWished}
          variant="outline"
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[hsl(var(--card))]/90 backdrop-blur border border-[hsl(var(--hairline))] shadow-none hover:bg-[hsl(var(--card))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
        >
          <svg aria-hidden="true" className={`w-4 h-4 ${isWished ? "fill-[#5e6ad2] stroke-[#5e6ad2]" : "fill-none stroke-[hsl(var(--ink-subtle))]"}`} strokeWidth={1.7} viewBox="0 0 24 24">
            <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
          </svg>
        </Button>
      </Link>

      <CardContent className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-widest font-medium text-[hsl(var(--ink-subtle))]">{product.category.toUpperCase()}</span>
          <span className="text-xs text-[hsl(var(--ink-subtle))] tabular-nums">★ {product.rating}</span>
        </div>

        <Link href={`/product/${product.id}`} className="font-medium leading-snug line-clamp-2 hover:underline underline-offset-4 text-[15px] text-[hsl(var(--ink))]" style={{ textWrap: "balance" as any }}>
          {product.name}
        </Link>

        <div className="text-xs text-[hsl(var(--ink-subtle))] truncate" translate="no">{product.referenceName || product.author}</div>

        <div className="mt-auto pt-1.5 flex items-baseline gap-2">
          {product.isReference ? (
            <>
              <span className="text-lg font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹0</span>
              <span className="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
            </>
          ) : (
            <>
              <span className="text-lg font-semibold tabular-nums tracking-tight text-[hsl(var(--ink))]">₹{Number(product.price).toLocaleString("en-IN")}</span>
              {product.originalPrice && <span className="text-xs line-through tabular-nums text-[hsl(var(--ink-subtle))]">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>}
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => cart.add(product, 1)} className="flex-1 h-8 text-sm font-medium bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-[8px] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Add to cart</Button>
          <Link href={`/product/${product.id}`} className="px-4 h-8 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium inline-flex items-center justify-center hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2] text-[hsl(var(--ink))]">View</Link>
        </div>
      </CardContent>
    </Card>
  )
}
