"use client"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <footer className="mt-16 border-t border-zinc-100 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-bold text-sm tracking-widest">NG</div>
              <div className="font-bold text-lg leading-none">N-GELO <span className="text-xs font-normal text-zinc-500">NEXT</span></div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">React + Next.js + shadcn rebuild. Same BCA spec — seller/buyer/admin, Stripe/PayPal, 14th/21st payouts — now with shadcn copy-paste speed.</p>
            <div className="mt-4 flex gap-2">
              <span className="w-9 h-9 grid place-items-center rounded-full bg-zinc-900 text-white text-xs">𝕏</span>
              <span className="w-9 h-9 grid place-items-center rounded-full border border-zinc-200">●</span>
              <span className="w-9 h-9 grid place-items-center rounded-full border border-zinc-200">◎</span>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm">Marketplace</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li><Link href="/shop" className="hover:text-zinc-900">All products</Link></li>
              <li><span className="hover:text-zinc-900">Sell on N-GELO</span></li>
              <li><span className="hover:text-zinc-900">Licenses</span></li>
              <li><span className="hover:text-zinc-900">Refunds</span></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm">Resources</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li><span>Documentation</span></li>
              <li><span>Changelog</span></li>
              <li><Link href="/about" className="hover:text-zinc-900">About & FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm">Newsletter</div>
            <p className="mt-3 text-sm text-zinc-500">Get drops, 20% off code, and seller tips.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true)}} className="mt-3 flex gap-2">
              <Input required type="email" placeholder="you@email.com" className="flex-1 rounded-full" />
              <Button type="submit" className="rounded-full">Join</Button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-green-600">Thanks! CODE: WELCOME20</p>}
            <p className="mt-4 text-xs text-zinc-400">© {new Date().getFullYear()} N-GELO Next. Ported for portfolio.</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500">
          <div className="flex gap-4">
            <span>Pay via <b className="text-zinc-700">Stripe</b> • <b className="text-zinc-700">PayPal</b></span>
            <span className="hidden sm:inline">•</span>
            <span>Next.js 16 • shadcn/ui</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
