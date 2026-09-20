"use client"
import Link from "next/link"
import { products } from "@/data/products"
import { useWishlist } from "@/lib/cart-store"
import { ProductCard } from "@/components/product-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const wish = useWishlist()
  const items = products.filter((p) => wish.ids.includes(p.id))
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="font-bold text-3xl" style={{fontFamily: "var(--font-playfair)"}}>Wishlist</h1>
      <p className="text-sm text-zinc-500">{wish.ids.length} saved items • shadcn Badge + Heart</p>

      {items.length===0 ? (
        <Card className="mt-8 p-10 text-center rounded-[20px]">
          <div className="text-lg font-semibold">Nothing saved yet</div>
          <p className="text-sm text-zinc-500">Tap the heart on any product to save it.</p>
          <Link href="/shop" className="mt-4 inline-flex"><Button variant="pill" size="pill">Explore shop</Button></Link>
        </Card>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
