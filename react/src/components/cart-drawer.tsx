"use client"
import Link from "next/link"
import { X, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function CartDrawer() {
  const cart = useCart()
  const [couponInput, setCouponInput] = useState(cart.coupon)
  const [msg, setMsg] = useState<{ok:boolean,text:string}|null>(null)

  if (!cart.isDrawerOpen) return null

  function apply() {
    const code = couponInput.trim().toUpperCase()
    if (!code) { setMsg({ok:false,text:"Enter a code"}); return }
    if (["WELCOME20","NGELO10"].includes(code)) {
      cart.applyCoupon(code)
      const disc = code==="WELCOME20" ? Math.round(cart.subtotal()*0.2) : Math.round(cart.subtotal()*0.1)
      setMsg({ok:true,text:`Applied ${code} — demo, total stays ₹0!`})
    } else setMsg({ok:false,text:"Invalid code"})
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={() => cart.setDrawer(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-[420px] bg-[hsl(var(--card))] h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[hsl(var(--hairline))] flex items-center justify-between">
          <div>
            <div className="font-semibold text-xl" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Your cart</div>
            <div className="text-xs text-[hsl(var(--ink-subtle))]">{cart.items.reduce((n,i)=>n+i.qty,0)} items • {cart.items.length} products</div>
          </div>
          <button onClick={() => cart.setDrawer(false)} className="w-9 h-9 grid place-items-center rounded-full border border-[hsl(var(--hairline))] hover:bg-[hsl(var(--surface-1))]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {cart.items.length===0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto grid place-items-center rounded-2xl bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-xl">🛒</div>
              <div className="mt-4 font-semibold">Your cart is empty</div>
              <div className="text-sm text-[hsl(var(--ink-subtle))]">Add some digital goodies and they’ll appear here.</div>
              <Link onClick={() => cart.setDrawer(false)} href="/shop" className="mt-4 inline-flex"><Button variant="pill" size="pill">Browse shop</Button></Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-2xl border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium leading-tight line-clamp-2">{item.name}</div>
                    <div className="text-xs text-[hsl(var(--ink-subtle))]">{item.author}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => cart.setQty(item.id, item.qty-1)} className="w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                      <button onClick={() => cart.setQty(item.id, item.qty+1)} className="w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))]"><Plus className="w-3 h-3" /></button>
                      <span className="ml-auto text-sm font-semibold">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <button onClick={() => cart.remove(item.id)} className="self-start w-7 h-7 grid place-items-center rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--hairline))] hover:border-red-200 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="pt-2">
                <div className="flex gap-2">
                  <Input value={couponInput} onChange={(e)=>setCouponInput(e.target.value)} placeholder="Coupon code" className="flex-1 rounded-full" />
                  <Button onClick={apply} className="rounded-full">Apply</Button>
                </div>
                {msg && <div className={`mt-2 text-xs ${msg.ok ? 'text-[#5e6ad2]':'text-red-600'}`}>{msg.text}</div>}
                <div className="mt-2 text-xs text-[hsl(var(--ink-subtle))]">Try <b>WELCOME20</b> for 20% off or <b>NGELO10</b></div>
              </div>
            </div>

            <div className="p-6 border-t border-[hsl(var(--hairline))] bg-[hsl(var(--card))] space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[hsl(var(--ink-subtle))]">Subtotal</span><span className="font-medium tabular-nums">₹{cart.subtotal().toLocaleString("en-IN")}</span></div>
              {cart.discount()>0 && <div className="flex justify-between text-sm text-[#5e6ad2]"><span>Discount</span><span className="tabular-nums">−₹{cart.discount().toLocaleString("en-IN")}</span></div>}
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span className="tabular-nums">₹{cart.total().toLocaleString("en-IN")}</span></div>
              <p className="text-xs text-[hsl(var(--ink-subtle))]">Instant access · reference demo · total ₹0</p>
              <Link onClick={() => cart.setDrawer(false)} href="/checkout" className="block"><Button variant="pill" size="pill" className="w-full py-6 text-base">Checkout — ₹0</Button></Link>
              <Link onClick={() => cart.setDrawer(false)} href="/cart" className="block"><Button variant="outline" className="w-full rounded-full">View full cart</Button></Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
