"use client"
import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CheckoutPage() {
  const cart = useCart()
  const [method, setMethod] = useState("card")
  const [success, setSuccess] = useState(false)
  const [orderId] = useState(() => Math.floor(100000 + Math.random()*900000))
  const [form, setForm] = useState({ email:"", name:"", address:"" })

  function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    if(!cart.items.length) return
    setSuccess(true)
    const orders = JSON.parse(localStorage.getItem("ngelo-orders-react")||"[]")
    orders.push({ id: orderId, date: new Date().toISOString(), items: [...cart.items], total: cart.total(), email: form.email })
    localStorage.setItem("ngelo-orders-react", JSON.stringify(orders))
    cart.clear()
  }

  if (success) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mt-6 p-10 text-center rounded-[12px]">
          <div className="w-16 h-16 mx-auto grid place-items-center rounded-full bg-green-50 text-2xl">✓</div>
          <h2 className="mt-4 text-2xl font-semibold">Order confirmed!</h2>
          <p className="mt-2 text-[hsl(var(--ink-muted))]">We’ve sent your receipt and download links to <b>{form.email}</b>. Order #NG-{orderId}</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link href="/dashboard"><Button variant="pill" size="pill">Go to dashboard</Button></Link>
            <Link href="/shop"><Button variant="outline" className="rounded-full">Continue shopping</Button></Link>
          </div>
          <div className="mt-6 text-xs text-[hsl(var(--ink-subtle))]">Digital items are available instantly. Physical items ship in 3–5 days.</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="font-semibold text-3xl" style={{ fontFamily: "Geist, Inter, sans-serif" }}>Checkout</h1>
      <div className="mt-6 grid lg:grid-cols-12 gap-6">
        <form onSubmit={placeOrder} className="lg:col-span-7 space-y-4">
          <Card className="p-6 rounded-[12px]">
            <h3 className="font-semibold">Contact</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <Input required type="email" placeholder="Email *" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="rounded-xl" />
              <Input required placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="rounded-xl" />
            </div>
            <p className="mt-2 text-xs text-[hsl(var(--ink-subtle))]">We’ll auto-create your N-GELO account and email your login.</p>
          </Card>

          <Card className="p-6 rounded-[12px]">
            <h3 className="font-semibold">Payment</h3>
            <div className="mt-3 flex gap-2">
              <Button type="button" onClick={()=>setMethod('card')} variant={method==='card'?'default':'outline'} className="flex-1 rounded-xl">Card (Stripe)</Button>
              <Button type="button" onClick={()=>setMethod('paypal')} variant={method==='paypal'?'default':'outline'} className="flex-1 rounded-xl">PayPal</Button>
            </div>
            {method==='card' ? (
              <div className="mt-4 grid gap-3">
                <Input required placeholder="Card number — 4242 4242 4242 4242" className="rounded-xl" />
                <div className="grid grid-cols-2 gap-3">
                  <Input required placeholder="MM / YY" className="rounded-xl" />
                  <Input required placeholder="CVC" className="rounded-xl" />
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-900">You’ll be redirected to PayPal to complete payment.</div>
            )}
            <label className="mt-4 flex gap-2 text-sm"><input type="checkbox" required /> I agree to the license and refund policy</label>
          </Card>

          <Card className="p-6 rounded-[12px]">
            <h3 className="font-semibold">Billing address</h3>
            <div className="mt-3 grid gap-3">
              <Input placeholder="Address" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="rounded-xl" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="City" className="rounded-xl" />
                <Input placeholder="ZIP" className="rounded-xl" />
              </div>
            </div>
          </Card>

          <Button type="submit" disabled={!cart.items.length} variant="pill" size="pill" className="w-full py-6 text-base">Complete order — ₹0 demo</Button>
          <p className="text-xs text-center text-[hsl(var(--ink-subtle))]">Secure 256-bit SSL • Instant download after payment</p>
        </form>

        <div className="lg:col-span-5">
          <Card className="p-6 sticky top-[80px] rounded-[12px]">
            <h3 className="font-semibold">Order summary</h3>
            <div className="mt-4 space-y-3">
              {cart.items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.image} className="w-14 h-14 rounded-xl object-cover border" alt="" />
                  <div className="flex-1"><div className="text-sm font-medium leading-tight">{i.name}</div><div className="text-xs text-[hsl(var(--ink-subtle))]">Qty {i.qty} • ₹{i.price.toLocaleString("en-IN")}</div></div>
                  <div className="text-sm font-semibold">${i.price * i.qty}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[hsl(var(--ink-subtle))]">Subtotal</span><span>₹{cart.subtotal().toLocaleString("en-IN")}</span></div>
              {cart.discount()>0 && <div className="flex justify-between text-[#5e6ad2]"><span>Discount</span><span>−₹{cart.discount().toLocaleString("en-IN")}</span></div>}
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>₹{cart.total().toLocaleString("en-IN")}</span></div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-[hsl(var(--surface-1))] border text-xs text-[hsl(var(--ink-muted))]">Digital delivery is instant. Physical footwear ships tracked — you’ll get a DHL link.</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
