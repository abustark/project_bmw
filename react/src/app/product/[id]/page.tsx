"use client"
import { use, useMemo, useState } from "react"
import Link from "next/link"
import { products, categories } from "@/data/products"
import { PREVIEWS, type PreviewKind } from "@/data/previews"
import { ProductCard } from "@/components/product-card"
import { LivePreview } from "@/components/live-preview"
import { useCart, useWishlist } from "@/lib/cart-store"

function formatUses(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n)
}

const CODE_FILES = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "react", label: "React" },
] as const

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => String(p.id) === String(id))
  const cart = useCart()
  const wishlist = useWishlist()
  const [activeTab, setActiveTab] = useState("Preview")
  const [codeFile, setCodeFile] = useState<(typeof CODE_FILES)[number]["id"]>("html")
  const [copied, setCopied] = useState(false)

  const def = PREVIEWS[(product?.preview as PreviewKind) || "shadcn-buttons"]
  const activeCode = codeFile === "html" ? def?.html ?? "" : codeFile === "css" ? def?.css ?? "" : def?.react ?? ""
  const codeLines = activeCode.split("\n")

  const similar = useMemo(() => {
    if (!product) return []
    return products.filter((p) => p.id !== product.id && (p.category === product.category || p.tags.some((t) => product.tags.includes(t)))).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="max-w-[920px] mx-auto px-4 py-20 text-center bg-[hsl(var(--canvas))]">
        <div className="text-lg font-medium text-[hsl(var(--ink))]">Product not found</div>
        <Link href="/shop" className="mt-4 inline-flex h-9 px-5 items-center justify-center rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium">Back to shop</Link>
      </div>
    )
  }

  const isWished = wishlist.has(product.id)
  const categoryLabel = categories.find((c) => c.id === product.category)?.label || product.category

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="bg-[hsl(var(--canvas))] min-h-screen">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* breadcrumb */}
        <div className="text-xs text-[hsl(var(--ink-subtle))]">
          <Link href="/shop" className="hover:text-[hsl(var(--ink))]">Shop</Link>
          <span className="mx-1 opacity-40">/</span>
          <Link href={`/shop?cat=${product.category}`} className="hover:text-[hsl(var(--ink))]">{categoryLabel}</Link>
        </div>

        {/* title row (21st.dev) */}
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-[hsl(var(--ink))]" style={{ fontFamily: "Geist, Inter, sans-serif", textWrap: "balance" as any }}>{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[hsl(var(--ink-subtle))]">
              <span>by <span className="font-medium text-[hsl(var(--ink))]" translate="no">{product.author}</span></span>
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]" />
              <span className="tabular-nums">★ {product.rating}</span>
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]" />
              <span className="tabular-nums">{formatUses(product.sales)} uses</span>
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--hairline))]" />
              <span>updated {product.updated}</span>
              <span className="px-2 py-0.5 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] font-medium">{product.license}</span>
            </div>
          </div>
          {/* actions */}
          <div className="flex flex-wrap gap-2">
            <button onClick={copyCode} className="h-9 px-4 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
              {copied ? "Copied ✓" : "Copy code"}
            </button>
            <button onClick={() => wishlist.toggle(product.id)} aria-pressed={isWished} className="h-9 px-4 rounded-[8px] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-1))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
              {isWished ? "♥ Saved" : "♡ Save"}
            </button>
            <button onClick={() => cart.add(product, 1)} className="h-9 px-4 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm font-medium text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-2))] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">
              Add to cart · <span className="tabular-nums">₹0</span> <span className="line-through opacity-60">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
            </button>
          </div>
        </div>

        {/* tabs: Preview / Code / Info (21st.dev) */}
        <div className="mt-6 flex gap-1 border-b border-[hsl(var(--hairline))]">
          {["Preview", "Code", "Info"].map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px focus-visible:ring-2 focus-visible:ring-[#5e6ad2] ${activeTab === t ? "border-[#5e6ad2] text-[hsl(var(--ink))]" : "border-transparent text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>{t}</button>
          ))}
        </div>

        {/* PREVIEW */}
        {activeTab === "Preview" && (
          <div className="mt-5 rounded-[16px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-2">
            <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))] overflow-hidden">
              <div className="flex items-center gap-1.5 h-9 px-3 border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--hairline))]" />
                <span className="mx-auto text-[10px] font-mono text-[hsl(var(--ink-subtle))]">live · rendered in this page</span>
              </div>
              <div className="min-h-[360px] grid place-items-center p-6">
                <LivePreview kind={product.preview || "shadcn-buttons"} size="full" />
              </div>
            </div>
          </div>
        )}

        {/* CODE */}
        {activeTab === "Code" && (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              {CODE_FILES.map((f) => (
                <button key={f.id} onClick={() => setCodeFile(f.id)} className={`h-8 px-3.5 rounded-[8px] text-xs font-medium border transition ${codeFile === f.id ? "bg-[hsl(var(--ink))] border-transparent text-[hsl(var(--canvas))]" : "border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]"}`}>{f.label}</button>
              ))}
              <div className="flex-1" />
              <button onClick={copyCode} className="h-8 px-3.5 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">{copied ? "Copied ✓" : "Copy"}</button>
            </div>
            <pre className="rounded-[12px] bg-[#010102] border border-[#23252a] p-0 overflow-auto text-xs font-mono leading-relaxed">
              <code>
                {codeLines.map((line, i) => (
                  <span key={i} className="grid grid-cols-[3ch_1fr]">
                    <span className="pr-4 text-right select-none text-[#3e3e44]">{i + 1}</span>
                    <span className="text-[#f7f8f8] whitespace-pre">{line}</span>
                  </span>
                ))}
              </code>
            </pre>
            <p className="mt-3 text-xs text-[hsl(var(--ink-subtle))]">
              Extracted from <span className="font-medium text-[hsl(var(--ink))]" translate="no">{product.referenceName}</span> · {product.license} · rendered live in the Preview tab — the code you copy is the code you see.
            </p>
          </div>
        )}

        {/* INFO */}
        {activeTab === "Info" && (
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] p-5">
              <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">ABOUT</div>
              <p className="text-sm text-[hsl(var(--ink-muted))] leading-relaxed">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))]">#{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] p-5">
              <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))] mb-3">DETAILS</div>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">License</dt><dd className="font-medium text-[hsl(var(--ink))]">{product.license} — free for unlimited use</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">Delivery</dt><dd className="font-medium text-[hsl(var(--ink))] text-right">{product.delivery}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">Files</dt><dd className="font-medium text-[hsl(var(--ink))] text-right">{(product.files || []).join(" · ")}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">Stack</dt><dd className="font-medium text-[hsl(var(--ink))] text-right">{(product.stack || []).join(" · ")}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">Updated</dt><dd className="font-medium text-[hsl(var(--ink))]">{product.updated}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[hsl(var(--ink-subtle))]">Price</dt><dd className="font-medium text-[hsl(var(--ink))] tabular-nums">₹0 <span className="line-through opacity-60 font-normal">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span></dd></div>
              </dl>
              <p className="mt-4 text-xs text-[hsl(var(--ink-subtle))] leading-relaxed">Reference — not for sale. All rights remain with the original authors.</p>
            </div>
          </div>
        )}

        {/* similar drops (both sites have this rail) */}
        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-[hsl(var(--ink))]">Similar drops</h2>
            <Link href="/shop" className="text-xs font-medium text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))]">View all →</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
