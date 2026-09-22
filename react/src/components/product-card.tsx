"use client"
import Link from "next/link"
import { products } from "@/data/products"
import { LivePreview } from "@/components/live-preview"
import { useCart, useWishlist } from "@/lib/cart-store"

type Product = (typeof products)[number]

function formatUses(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n)
}

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist()
  const cart = useCart()
  const isWished = wishlist.has(product.id)

  return (
    <div className="group relative flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] rounded-[12px] hover:border-[#34343a] transition">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden rounded-t-[12px] bg-[hsl(var(--surface-1))]" aria-label={product.name}>
        <LivePreview kind={product.preview || "shadcn-buttons"} />
        {/* hover actions (uiverse: Get code / Link) */}
        <div className="absolute inset-0 flex items-end justify-center gap-2 pb-3 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/40 to-transparent">
          <span className="h-8 px-4 inline-flex items-center rounded-[8px] bg-[hsl(var(--card))]/95 border border-[hsl(var(--hairline))] text-xs font-medium text-[hsl(var(--ink))]">Get code →</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              cart.add(product, 1)
            }}
            aria-label="Add to cart"
            className="w-8 h-8 grid place-items-center rounded-[8px] bg-[#5e6ad2] text-white hover:bg-[#828fff] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h14l-1 11H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              wishlist.toggle(product.id)
            }}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWished}
            className="w-8 h-8 grid place-items-center rounded-[8px] bg-[hsl(var(--card))]/95 border border-[hsl(var(--hairline))] hover:border-[#34343a] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]"
          >
            <svg aria-hidden="true" className={`w-4 h-4 ${isWished ? "fill-[#5e6ad2] stroke-[#5e6ad2]" : "fill-none stroke-[hsl(var(--ink-subtle))]"}`} strokeWidth={1.7} viewBox="0 0 24 24">
              <path d="M12 21s-6.5-4.2-8.7-8.1A4.8 4.8 0 0 1 12 7.1a4.8 4.8 0 0 1 8.7 5.8C18.5 16.8 12 21 12 21Z" />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-1">
        <Link href={`/product/${product.id}`} className="text-[13px] font-medium text-[hsl(var(--ink))] truncate hover:underline underline-offset-4">{product.name}</Link>
        <div className="text-[11px] text-[hsl(var(--ink-subtle))] truncate" translate="no">{product.author}</div>
        <div className="mt-0.5 flex items-center justify-between text-[11px] text-[hsl(var(--ink-subtle))]">
          <span className="tabular-nums">★ {product.rating} · {formatUses(product.sales)} uses</span>
          <span className="tabular-nums"><span className="font-semibold text-[hsl(var(--ink))]">₹0</span> <span className="line-through">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span></span>
        </div>
      </div>
    </div>
  )
}
