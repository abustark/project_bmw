"use client"
import { useState, useEffect } from "react"
import { products } from "@/data/products"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [role, setRole] = useState<"buyer"|"seller"|"admin">("buyer")
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("ngelo-orders-react")||"[]"))
  }, [])

  const sellerProducts = products.slice(0,4)

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl" style={{fontFamily: "var(--font-playfair)"}}>Dashboard <span className="text-sm font-normal text-zinc-500">— React • shadcn</span></h1>
          <p className="text-sm text-zinc-500">Buyer & seller views — same BCA spec as Vue.</p>
        </div>
        <div className="flex gap-2">
          {(["buyer","seller","admin"] as const).map((r) => (
            <Button key={r} onClick={() => setRole(r)} variant={role===r?"default":"outline"} className="rounded-full capitalize">{r}</Button>
          ))}
        </div>
      </div>

      {role==="buyer" && (
        <div className="mt-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">ORDERS</div><div className="text-2xl font-bold">{orders.length}</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">SPENT</div><div className="text-2xl font-bold">${orders.reduce((n,o)=>n+o.total,0)}</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">DOWNLOADS</div><div className="text-2xl font-bold">{orders.reduce((n,o)=>n+o.items.length,0)}</div></Card>
          </div>
          <Card className="p-6 rounded-[20px]">
            <div className="flex items-center justify-between"><h3 className="font-semibold">Your purchases</h3><span className="text-xs text-zinc-500">React • localStorage</span></div>
            {orders.length===0 ? (
              <div className="mt-6 text-center py-10 text-sm text-zinc-500">No purchases yet. Complete a checkout to see orders here. <a href="/shop" className="underline">Shop now</a></div>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-zinc-100 p-4">
                    <div className="flex items-center justify-between text-sm"><span className="font-semibold">Order #NG-{o.id}</span><span className="text-zinc-500">{new Date(o.date).toLocaleDateString()} • ${o.total}</span></div>
                    <div className="mt-3 grid sm:grid-cols-2 gap-2">
                      {o.items.map((it:any) => (
                        <div key={it.id} className="flex gap-3 p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                          <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{it.name}</div><div className="text-xs text-zinc-500">Qty {it.qty}</div></div>
                          <Button variant="default" size="sm" className="self-center rounded-full text-xs">Download</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {role==="seller" && (
        <div className="mt-6 space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">REVENUE</div><div className="text-2xl font-bold">$8,420</div><div className="text-xs text-green-600">+12% vs last month</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">SALES</div><div className="text-2xl font-bold">312</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">VISITS</div><div className="text-2xl font-bold">4.2k</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">NEXT PAYOUT</div><div className="text-2xl font-bold">21st</div><div className="text-xs text-zinc-500">Via Stripe</div></Card>
          </div>
          <div className="grid lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8 p-6 rounded-[20px]">
              <div className="flex items-center justify-between"><h3 className="font-semibold">Your products</h3><Button variant="pill" size="pill">+ Add product</Button></div>
              <div className="mt-4 space-y-3">
                {sellerProducts.map((p) => (
                  <div key={p.id} className="flex gap-3 p-3 rounded-2xl border border-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex-1"><div className="font-medium text-sm">{p.name}</div><div className="text-xs text-zinc-500">${p.price} • {p.sales} sales • ★ {p.rating}</div></div>
                    <div className="flex flex-col gap-1"><Button variant="outline" size="sm" className="rounded-full">Edit</Button><Button variant="outline" size="sm" className="rounded-full text-red-600">Delete</Button></div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="lg:col-span-4 space-y-4">
              <Card className="p-6 rounded-[20px]">
                <h4 className="font-semibold text-sm">Traffic analytics</h4>
                <div className="mt-4 h-24 flex items-end gap-1">
                  {Array.from({length:12}).map((_,i)=> <div key={i} className="flex-1 bg-zinc-900 rounded-t" style={{height: `${20+Math.random()*80}%`}} />)}
                </div>
              </Card>
              <Card className="p-6 rounded-[20px]">
                <h4 className="font-semibold text-sm">Payout schedule</h4>
                <p className="mt-2 text-xs text-zinc-500">Sellers receive payments on the 14th and 21st. Next: <b className="text-zinc-900">21 Sep 2026 — $1,240</b></p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {role==="admin" && (
        <div className="mt-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">OPEN REPORTS</div><div className="text-2xl font-bold">3</div><div className="text-xs text-amber-600">Needs review</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">FAQ QUEUE</div><div className="text-2xl font-bold">5</div></Card>
            <Card className="p-5 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">ADMINS</div><div className="text-2xl font-bold">4</div></Card>
          </div>
          <Card className="p-6 rounded-[20px]">
            <h3 className="font-semibold">Reports — spam / stolen</h3>
            <div className="mt-4 space-y-3">
              {[
                {id:1, product:"Hues 3D Vol II", by:"buyer #182", reason:"Possibly stolen from Gumroad", status:"Open"},
                {id:2, product:"Form Resume Kit", by:"buyer #204", reason:"Spam — duplicate", status:"Open"},
              ].map((r) => (
                <div key={r.id} className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                  <div className="flex items-center justify-between"><span className="font-medium text-sm">{r.product}</span><Badge variant="secondary" className="bg-amber-100 text-amber-800">{r.status}</Badge></div>
                  <div className="text-xs text-zinc-500 mt-1">Reported by {r.by} • {r.reason}</div>
                  <div className="mt-3 flex gap-2"><Button size="sm" className="rounded-full">Take action</Button><Button variant="outline" size="sm" className="rounded-full bg-white">Dismiss</Button></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
