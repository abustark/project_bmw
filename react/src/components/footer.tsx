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
              <div className="font-brand font-semibold text-[16px] tracking-tight text-[hsl(var(--ink))] leading-none">N-GELO</div>
              <span className="font-brand font-bold text-[10px] tracking-[0.14em] leading-none px-2 py-1 rounded-[6px] bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 text-[#5e6ad2] dark:text-[#828fff]">B·M·W</span>
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

        {/* credit row — serif brand font, BMW initials bold + portfolio CTA (right) */}
        <div className="mt-4 font-brand text-xs text-[hsl(var(--ink-subtle))] leading-relaxed flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p>© 2026 ABu. All rights reserved.</p>
            <p className="mt-0.5">Created by <span className="text-[hsl(var(--ink))]"><span className="font-bold">B</span>asith <span className="font-bold">M</span>uthu <span className="font-bold">W</span>asim</span>. Maintained by me.</p>
            <p className="mt-1.5">Copy · Paste · Ship — free UI, extracted &amp; rendered live.</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="https://abufolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open my portfolio at abufolio.vercel.app"
              className="group sm:text-right inline-flex flex-col sm:items-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e6ad2]"
            >
              <span className="text-[10px] tracking-[0.16em] uppercase text-[hsl(var(--ink-subtle))]">Like this build? There&apos;s more of my work</span>
              <span className="mt-1 text-[hsl(var(--ink))] underline decoration-[#5e6ad2]/40 underline-offset-4 transition-colors group-hover:text-[#5e6ad2] group-hover:decoration-[#5e6ad2] dark:group-hover:text-[#828fff]">Open my portfolio <span aria-hidden="true">↗</span></span>
            </a>
            <a
              href="https://ecom-react-self.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See this same site rebuilt with React at ecom-react-self.vercel.app"
              className="group sm:text-right inline-flex flex-col sm:items-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e6ad2]"
            >
              <span className="text-[10px] tracking-[0.16em] uppercase text-[hsl(var(--ink-subtle))]">Same site, different stack</span>
              <span className="mt-1 text-[hsl(var(--ink))] underline decoration-[#5e6ad2]/40 underline-offset-4 transition-colors group-hover:text-[#5e6ad2] group-hover:decoration-[#5e6ad2] dark:group-hover:text-[#828fff]">See it built with React <span aria-hidden="true">↗</span></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
