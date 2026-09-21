"use client"
import Link from "next/link"

const SOURCES = ["shadcn/ui", "Radix", "Heroicons", "Lucide", "Flowbite", "daisyUI", "AstroWind", "Vercel Commerce", "Cruip", "Uiverse", "CSS Loaders", "LottieFiles", "Motion", "View Transitions"]

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* brand */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px]">N</div>
              <div className="font-semibold text-[15px] tracking-tight text-[hsl(var(--ink))] leading-none">N-GELO</div>
            </div>
            <p className="mt-3 text-xs text-[hsl(var(--ink-subtle))] leading-relaxed max-w-[380px]">A reference showcase of 14 free, open-source components — extracted and rendered in this page. Not for sale.</p>
          </div>
          {/* marketplace */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">MARKETPLACE</div>
            <ul className="mt-3 space-y-2 text-sm text-[hsl(var(--ink-muted))]">
              <li><Link href="/shop" className="hover:text-[hsl(var(--ink))]">All components — ₹0</Link></li>
              <li><Link href="/shop?cat=buttons" className="hover:text-[hsl(var(--ink))]">Buttons</Link></li>
              <li><Link href="/shop?cat=loaders" className="hover:text-[hsl(var(--ink))]">Loaders</Link></li>
              <li><Link href="/about" className="hover:text-[hsl(var(--ink))]">About & FAQ</Link></li>
            </ul>
          </div>
          {/* account */}
          <div className="md:col-span-4">
            <div className="text-[11px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">ACCOUNT</div>
            <ul className="mt-3 space-y-2 text-sm text-[hsl(var(--ink-muted))]">
              <li><Link href="/dashboard" className="hover:text-[hsl(var(--ink))]">Dashboard</Link></li>
              <li><Link href="/wishlist" className="hover:text-[hsl(var(--ink))]">Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-[hsl(var(--ink))]">Cart — ₹0</Link></li>
            </ul>
          </div>
        </div>

        {/* sources row */}
        <div className="mt-8 pt-5 border-t border-[hsl(var(--hairline))]">
          <p className="text-[11px] text-[hsl(var(--ink-subtle))] font-mono leading-relaxed">
            {SOURCES.map((s, i) => (
              <span key={s}>
                <span translate="no">{s}</span>
                {i < SOURCES.length - 1 && <span className="opacity-40"> · </span>}
              </span>
            ))}
          </p>
        </div>

        {/* credit row */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-end justify-between text-[11px] text-[hsl(var(--ink-subtle))]">
          <div className="leading-relaxed">
            <p>© 2026 ABu. All rights reserved.</p>
            <p>Created by <span className="font-medium text-[hsl(var(--ink))]">Basith Muthu Wasim</span>. Maintained by me.</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5">
            <p className="text-[hsl(var(--ink-muted))]">Copy · Paste · Ship — free UI, extracted &amp; rendered live.</p>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-end"><span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" /> Reference demo · ₹0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
