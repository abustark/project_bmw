"use client"
import Link from "next/link"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const cart = useCart()
  const [coupon, setCoupon] = useState(cart.coupon)
  const [msg, setMsg] = useState<{ok:boolean,text:string}|null>(null)

  function apply() {
    const code = coupon.trim().toUpperCase()
    if (["WELCOME20","NGELO10"].includes(code)) { cart.applyCoupon(code); setMsg({ok:true,text:`Applied ${code}`})}
    else setMsg({ok:false,text:"Invalid code — try WELCOME20"})
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="font-semibold text-3xl" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Cart</h1>
      <p className="text-sm text-[hsl(var(--ink-subtle))]">{cart.items.reduce((n,i)=>n+i.qty,0)} items</p>

      {cart.items.length===0 ? (
        <Card className="mt-8 p-10 text-center rounded-[12px]">
          <div className="text-lg font-semibold">Your cart is empty</div>
          <Link href="/shop" className="mt-4 inline-flex"><Button variant="pill" size="pill">Continue shopping</Button></Link>
        </Card>
      ) : (
        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-3">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-4 flex gap-4 rounded-[12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} className="w-24 h-24 rounded-xl object-cover border bg-[hsl(var(--surface-1))]" alt="" />
                <div className="flex-1">
                  <Link href={`/product/${item.id}`} className="font-medium hover:underline">{item.name}</Link>
                  <div className="text-xs text-[hsl(var(--ink-subtle))]">{item.author} • {item.category}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={()=>cart.setQty(item.id, item.qty-1)}><Minus className="w-3 h-3" /></Button>
                    <span className="w-8 text-center font-semibold">{item.qty}</span>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full" onClick={()=>cart.setQty(item.id, item.qty+1)}><Plus className="w-3 h-3" /></Button>
                    <span className="ml-auto font-semibold">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <Button variant="outline" className="self-start rounded-full text-xs" onClick={()=>cart.remove(item.id)}><Trash2 className="w-3 h-3 mr-1" />Remove</Button>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-4">
            <Card className="p-6 sticky top-[80px] rounded-[12px]">
              <div className="font-semibold">Order summary</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[hsl(var(--ink-subtle))]">Subtotal</span><span>₹{cart.subtotal().toLocaleString("en-IN")}</span></div>
                {cart.discount()>0 && <div className="flex justify-between text-[#5e6ad2]"><span>Discount ({cart.coupon})</span><span>−₹{cart.discount().toLocaleString("en-IN")}</span></div>}
                <div className="flex justify-between font-semibold text-lg border-t pt-3"><span>Total</span><span>₹{cart.total().toLocaleString("en-IN")}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="Coupon" className="flex-1 rounded-full" />
                <Button onClick={apply} className="rounded-full">Apply</Button>
              </div>
              {msg && <div className={`mt-2 text-xs ${msg.ok?'text-[#5e6ad2]':'text-red-600'}`}>{msg.text}</div>}
              <Link href="/checkout" className="mt-4 block"><Button variant="pill" size="pill" className="w-full py-6">Proceed to checkout</Button></Link>
              <Link href="/shop" className="mt-2 block"><Button variant="outline" className="w-full rounded-full">Continue shopping</Button></Link>
              <p className="mt-3 text-xs text-[hsl(var(--ink-subtle))] text-center">Secure checkout • Instant downloads</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
