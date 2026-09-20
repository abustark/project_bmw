import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Badge variant="pill">BCA MAJOR PROJECT — REACT PORT</Badge>
          <h1 className="mt-3 text-4xl font-bold leading-tight" style={{fontFamily: "var(--font-playfair)"}}>N-GELO — Next.js + shadcn.</h1>
          <p className="mt-4 text-zinc-600 leading-relaxed">Same BCA spec — by S. Wasim Thoufiq, N. Basith Abusyed & P. Muthukumar, Thiagarajar College. This is the <b>React port</b> of the Vue rebuild: Tailwind 4, shadcn/ui, Zustand, Next.js 16 App Router. Compare the two codebases — same product data, same business rules.</p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">STACK NOW</div><div className="font-semibold text-sm">Next.js 16 • shadcn • Zustand • Tailwind 4</div></Card>
            <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">VUE TWIN</div><div className="font-semibold text-sm">Vue 3 • Vite 5 • Pinia • shadcn-vue</div></Card>
            <Card className="p-4 rounded-[20px]"><div className="text-xs tracking-widest text-zinc-500">ORIGINAL</div><div className="font-semibold text-sm">Node 14.9 • PostgreSQL 12.4</div></Card>
          </div>

          <h2 id="faq" className="mt-10 text-2xl font-bold" style={{fontFamily: "var(--font-playfair)"}}>FAQ</h2>
          <div className="mt-4 space-y-3">
            <Card className="p-5 rounded-[20px]"><div className="font-semibold">Why two stacks?</div><p className="mt-2 text-sm text-zinc-600">Vue shows evolution (same stack), React shows hiring-ready (shadcn copy-paste). Put both on your site — 2 case studies, one spec.</p></Card>
            <Card className="p-5 rounded-[20px]"><div className="font-semibold">Free components?</div><p className="mt-2 text-sm text-zinc-600">This Next app uses shadcn/ui: Card, Button, Badge, Input. Run <code className="px-1 bg-zinc-100 rounded">npx shadcn add dialog</code> for any of 50+ blocks — dashboards, checkouts, tables.</p></Card>
            <Card className="p-5 rounded-[20px]"><div className="font-semibold">Deploy?</div><p className="mt-2 text-sm text-zinc-600">Vercel: <code className="px-1 bg-zinc-100 rounded">vercel --prod</code>. Or GitHub Pages via <code className="px-1 bg-zinc-100 rounded">next build && next export</code>.</p></Card>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 rounded-[20px]">
            <h3 className="font-semibold">Vue vs React — your choice</h3>
            <ul className="mt-3 text-sm space-y-1 list-disc pl-5 text-zinc-600">
              <li><b>Vue + shadcn-vue:</b> best story, same repo</li>
              <li><b>Next + shadcn:</b> best for jobs, more templates</li>
              <li>Both share <code className="px-1 bg-zinc-100 rounded">/static</code> assets + product data</li>
            </ul>
            <Link href="/" className="mt-4 inline-flex"><Button variant="pill" size="pill">Back to home</Button></Link>
          </Card>
          <Card className="p-6 bg-zinc-900 text-white rounded-[20px]">
            <h3 className="font-semibold">For recruiters</h3>
            <p className="mt-2 text-sm text-zinc-400">Add both to portfolio. One spec, two stacks → you prove adaptability.</p>
            <ul className="mt-3 text-sm space-y-1 list-disc pl-5 text-zinc-300">
              <li>Zustand + persist (React) vs Pinia (Vue)</li>
              <li>Next.js App Router, server components</li>
              <li>shadcn/ui copy-paste</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
