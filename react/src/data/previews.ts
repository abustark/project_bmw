// N-GELO preview library — vendored open-source snippets (MIT / ISC / Free).
// Single source of truth: the SAME html/css shown in the Code tab is what renders live.
// All previews are pure HTML + CSS (native inputs for interaction) — no framework needed,
// which is why they render identically in the Vue and React apps via v-html / innerHTML.
// Heavy libraries (Lottie, Motion) load at runtime from CDN — nothing downloaded.

export const LOTTIE_SRC = 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie'
export const LOTTIE_CDN = 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm'
export const MOTION_CDN = 'https://esm.sh/motion'

export type PreviewKind =
  | 'shadcn-buttons' | 'radix-tabs' | 'heroicon-grid' | 'lucide-draw'
  | 'flowbite-alert' | 'daisy-toggle' | 'astrowind-hero' | 'commerce-card'
  | 'cruip-pricing' | 'uiverse-glow' | 'css-loaders' | 'lottie-cdn'
  | 'motion-spring' | 'view-transition'

export type PreviewDef = { label: string; html: string; css: string; react: string }

export const PREVIEWS: Record<PreviewKind, PreviewDef> = {
  'shadcn-buttons': {
    label: 'shadcn/ui — buttons',
    html: `<div class="pv-srow">
  <button class="pv-sbtn pv-sbtn-default">Default</button>
  <button class="pv-sbtn pv-sbtn-secondary">Secondary</button>
  <button class="pv-sbtn pv-sbtn-outline">Outline</button>
  <button class="pv-sbtn pv-sbtn-ghost">Ghost</button>
</div>`,
    css: `.pv-srow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}
.pv-sbtn{height:36px;padding:0 16px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;border:1px solid transparent;transition:all .15s;font-family:inherit}
.pv-sbtn-default{background:hsl(var(--ink));color:hsl(var(--canvas))}
.pv-sbtn-default:hover{opacity:.88}
.pv-sbtn-secondary{background:hsl(var(--surface-2));color:hsl(var(--ink));border-color:hsl(var(--hairline))}
.pv-sbtn-secondary:hover{background:hsl(var(--surface-1))}
.pv-sbtn-outline{background:transparent;color:hsl(var(--ink));border-color:hsl(var(--hairline))}
.pv-sbtn-outline:hover{background:hsl(var(--surface-1))}
.pv-sbtn-ghost{background:transparent;color:hsl(var(--ink-muted))}
.pv-sbtn-ghost:hover{background:hsl(var(--surface-1));color:hsl(var(--ink))}
.pv-sbtn:active{transform:scale(.97)}`,
    react: `import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`,
  },

  'radix-tabs': {
    label: 'Radix — tabs',
    html: `<div class="pv-tabs">
  <input type="radio" name="pv-tabs" id="pv-tab-a" checked>
  <label for="pv-tab-a">Account</label>
  <input type="radio" name="pv-tabs" id="pv-tab-b">
  <label for="pv-tab-b">Password</label>
  <input type="radio" name="pv-tabs" id="pv-tab-c">
  <label for="pv-tab-c">Settings</label>
  <div class="pv-tab-panels">
    <p class="pv-panel pv-panel-a">Make changes to your account here.</p>
    <p class="pv-panel pv-panel-b">Change your password here.</p>
    <p class="pv-panel pv-panel-c">Manage your preferences.</p>
  </div>
</div>`,
    css: `.pv-tabs{width:100%;max-width:260px}
.pv-tabs input{position:absolute;opacity:0;pointer-events:none}
.pv-tabs label{display:inline-block;padding:6px 14px;font-size:13px;font-weight:500;color:hsl(var(--ink-subtle));cursor:pointer;border-radius:6px;transition:all .15s}
.pv-tabs label:hover{color:hsl(var(--ink))}
.pv-tabs input:checked + label{background:hsl(var(--surface-2));color:hsl(var(--ink))}
.pv-tabs input:focus-visible + label{outline:2px solid #5e6ad2;outline-offset:2px}
.pv-tab-panels{margin-top:14px;padding:14px;border:1px solid hsl(var(--hairline));border-radius:8px;background:hsl(var(--card))}
.pv-tab-panels .pv-panel{display:none;font-size:13px;color:hsl(var(--ink-muted));animation:pv-fade .25s ease}
#pv-tab-a:checked ~ .pv-tab-panels .pv-panel-a{display:block}
#pv-tab-b:checked ~ .pv-tab-panels .pv-panel-b{display:block}
#pv-tab-c:checked ~ .pv-tab-panels .pv-panel-c{display:block}
@keyframes pv-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`,
    react: `import * as Tabs from "@radix-ui/react-tabs"

export function Demo() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Make changes here.</Tabs.Content>
    </Tabs.Root>
  )
}`,
  },

  'heroicon-grid': {
    label: 'Heroicons — set',
    html: `<div class="pv-ico">
  <svg viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>
  <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>
  <svg viewBox="0 0 24 24"><path d="M12 3l2.4 5.4L20 9.6l-4.4 4 1.2 5.9L12 16.5 7.2 19.5l1.2-5.9-4.4-4 5.6-1.2z"/></svg>
  <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.3-9.3-8.6A5.4 5.4 0 0 1 12 6.5a5.4 5.4 0 0 1 9.3 5.9C19 16.7 12 21 12 21z"/></svg>
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>
  <svg viewBox="0 0 24 24"><path d="M20 7 9 18l-5-5"/></svg>
  <svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19"/><circle cx="12" cy="12" r="3.5"/></svg>
</div>`,
    css: `.pv-ico{display:grid;grid-template-columns:repeat(4,44px);gap:6px}
.pv-ico svg{width:44px;height:44px;padding:10px;box-sizing:border-box;fill:none;stroke:hsl(var(--ink-subtle));stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;border:1px solid hsl(var(--hairline));border-radius:8px;background:hsl(var(--card));cursor:pointer;transition:all .2s}
.pv-ico svg:hover{stroke:#828fff;border-color:#5e6ad2;transform:translateY(-2px)}`,
    react: `import { BoltIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export function Demo() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <BoltIcon className="w-6 h-6" />
      <CheckCircleIcon className="w-6 h-6" />
    </div>
  )
}`,
  },

  'lucide-draw': {
    label: 'Lucide — stroke draw',
    html: `<div class="pv-draw">
  <span><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></span>
  <span><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.3-9.3-8.6A5.4 5.4 0 0 1 12 6.5a5.4 5.4 0 0 1 9.3 5.9C19 16.7 12 21 12 21z"/></svg></span>
  <span><svg viewBox="0 0 24 24"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/></svg></span>
  <span><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-5 8-5s6.5 1 8 5"/></svg></span>
  <span><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span>
</div>`,
    css: `.pv-draw{display:flex;gap:8px}
.pv-draw span{width:44px;height:44px;display:grid;place-items:center;border:1px solid hsl(var(--hairline));border-radius:8px;background:hsl(var(--card));cursor:pointer;transition:border-color .2s}
.pv-draw svg{width:22px;height:22px;fill:none;stroke:hsl(var(--ink-subtle));stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.pv-draw span:hover{border-color:#5e6ad2}
.pv-draw span:hover svg{stroke:#828fff;animation:pv-draw .8s ease forwards}
@keyframes pv-draw{from{stroke-dasharray:80;stroke-dashoffset:80}to{stroke-dasharray:80;stroke-dashoffset:0}}`,
    react: `import { Search, Heart, Zap, User, Menu } from "lucide-react"

export function Demo() {
  return <Search className="w-5 h-5 hover:animate-pulse" />
}`,
  },

  'flowbite-alert': {
    label: 'Flowbite — alert + progress',
    html: `<div class="pv-fa">
  <div class="pv-fa-head">
    <span class="pv-fa-i">i</span>
    <div><b>Terms accepted</b><small>Updated just now</small></div>
  </div>
  <div class="pv-fa-bar"><span></span></div>
  <button class="pv-fa-btn">Confirm</button>
</div>`,
    css: `.pv-fa{width:220px;padding:14px;border:1px solid hsl(var(--hairline));border-radius:10px;background:hsl(var(--card))}
.pv-fa-head{display:flex;gap:10px;align-items:center}
.pv-fa-i{width:28px;height:28px;flex:none;border-radius:8px;background:#5e6ad2;color:#fff;display:grid;place-items:center;font-style:italic;font-weight:700;font-size:14px;font-family:Georgia,serif}
.pv-fa b{display:block;font-size:13px;color:hsl(var(--ink))}
.pv-fa small{font-size:11px;color:hsl(var(--ink-subtle))}
.pv-fa-bar{height:4px;margin:12px 0;border-radius:99px;background:hsl(var(--surface-2));overflow:hidden}
.pv-fa-bar span{display:block;height:100%;width:40%;border-radius:99px;background:#5e6ad2;animation:pv-bar 2.4s ease-in-out infinite}
@keyframes pv-bar{0%{width:8%}60%{width:92%}100%{width:8%}}
.pv-fa-btn{width:100%;height:32px;border:none;border-radius:8px;background:hsl(var(--surface-2));border:1px solid hsl(var(--hairline));color:hsl(var(--ink));font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.pv-fa-btn:hover{background:#5e6ad2;color:#fff;border-color:transparent}`,
    react: `import { Alert, Button, Progress } from "flowbite-react"

export function Demo() {
  return (
    <Alert color="indigo" onDismiss={() => {}}>
      <Progress progress={45} color="indigo" />
      <Button>Confirm</Button>
    </Alert>
  )
}`,
  },

  'daisy-toggle': {
    label: 'daisyUI — toggles',
    html: `<div class="pv-tg">
  <label class="pv-tg-row"><span>Notifications</span><input type="checkbox" checked><i></i></label>
  <label class="pv-tg-row"><span>Auto-save</span><input type="checkbox"><i></i></label>
  <label class="pv-tg-row pv-tg-dis"><span>Beta channel</span><input type="checkbox" disabled><i></i></label>
</div>`,
    css: `.pv-tg{display:flex;flex-direction:column;gap:12px;width:200px}
.pv-tg-row{display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:13px;color:hsl(var(--ink-muted))}
.pv-tg-row:hover span{color:hsl(var(--ink))}
.pv-tg input{position:absolute;opacity:0;pointer-events:none}
.pv-tg i{position:relative;width:36px;height:20px;flex:none;border-radius:99px;background:hsl(var(--surface-2));border:1px solid hsl(var(--hairline));transition:background .2s}
.pv-tg i::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:99px;background:hsl(var(--ink-subtle));transition:all .2s}
.pv-tg input:checked + i{background:#5e6ad2;border-color:transparent}
.pv-tg input:checked + i::after{left:18px;background:#fff}
.pv-tg input:focus-visible + i{outline:2px solid #5e6ad2;outline-offset:2px}
.pv-tg-dis{opacity:.45;pointer-events:none}`,
    react: `export function Demo() {
  return <input type="checkbox" className="toggle toggle-primary" defaultChecked />
}`,
  },

  'astrowind-hero': {
    label: 'AstroWind — hero',
    html: `<div class="pv-hero">
  <span class="pv-hero-badge">&#10022; New release</span>
  <h4 class="pv-hero-title">Ship faster</h4>
  <p class="pv-hero-sub">Astro + Tailwind landing template</p>
  <div class="pv-hero-cta">
    <button class="pv-hero-btn">Get started</button>
    <button class="pv-hero-btn-o">Docs</button>
  </div>
</div>`,
    css: `.pv-hero{text-align:center;max-width:280px;padding:8px}
.pv-hero-badge{display:inline-block;padding:4px 12px;border-radius:99px;border:1px solid hsl(var(--hairline));background:hsl(var(--surface-1));font-size:11px;color:hsl(var(--ink-subtle))}
.pv-hero-title{margin:14px 0 6px;font-size:30px;line-height:1.1;font-weight:700;letter-spacing:-.8px;background:linear-gradient(90deg,hsl(var(--ink)) 20%,#828fff 50%,hsl(var(--ink)) 80%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:pv-grad 3.5s linear infinite}
@keyframes pv-grad{to{background-position:-200% 0}}
.pv-hero-sub{font-size:13px;color:hsl(var(--ink-subtle));margin:0 0 16px}
.pv-hero-cta{display:flex;gap:8px;justify-content:center}
.pv-hero-btn{height:36px;padding:0 18px;border:none;border-radius:8px;background:#5e6ad2;color:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
.pv-hero-btn:hover{background:#828fff}
.pv-hero-btn-o{height:36px;padding:0 18px;border:1px solid hsl(var(--hairline));border-radius:8px;background:transparent;color:hsl(var(--ink));font-size:13px;font-weight:500;cursor:pointer;font-family:inherit}
.pv-hero-btn-o:hover{background:hsl(var(--surface-1))}`,
    react: `import { Hero, CallToAction } from "astrowind:components"

export function Demo() {
  return <Hero title="Ship faster" tagline="Astro + Tailwind">
    <CallToAction text="Get started" />
  </Hero>
}`,
  },

  'commerce-card': {
    label: 'Vercel Commerce — card',
    html: `<div class="pv-cc">
  <div class="pv-cc-img"></div>
  <div class="pv-cc-body">
    <b>Acme Hoodie</b><span>₹0</span>
  </div>
  <button class="pv-cc-add">Add to cart</button>
</div>`,
    css: `.pv-cc{position:relative;width:170px;border:1px solid hsl(var(--hairline));border-radius:12px;background:hsl(var(--card));overflow:hidden;transition:transform .2s,border-color .2s}
.pv-cc:hover{transform:translateY(-3px);border-color:#5e6ad2}
.pv-cc-img{aspect-ratio:4/3;background:radial-gradient(120px 80px at 70% 30%,rgba(94,106,210,.35),transparent),linear-gradient(135deg,hsl(var(--surface-2)),hsl(var(--surface-1)))}
.pv-cc-body{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;font-size:13px}
.pv-cc-body b{color:hsl(var(--ink));font-weight:500}
.pv-cc-body span{color:hsl(var(--ink-subtle));font-variant-numeric:tabular-nums}
.pv-cc-add{position:absolute;left:10px;right:10px;bottom:44px;height:32px;border:none;border-radius:8px;background:hsl(var(--ink));color:hsl(var(--canvas));font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transform:translateY(8px);opacity:0;transition:all .2s}
.pv-cc:hover .pv-cc-add{transform:none;opacity:1}`,
    react: `import { ProductCard } from "components/product"

export function Demo() {
  return <ProductCard product={product} label="Add to cart" />
}`,
  },

  'cruip-pricing': {
    label: 'Cruip — pricing card',
    html: `<div class="pv-price">
  <span class="pv-price-plan">Pro</span>
  <div class="pv-price-amt">₹0<small>/forever</small></div>
  <ul>
    <li>Unlimited projects</li>
    <li>All components</li>
    <li>Lifetime updates</li>
  </ul>
  <button>Purchase</button>
</div>`,
    css: `.pv-price{width:180px;padding:18px 16px;text-align:center;border:1px solid hsl(var(--hairline));border-radius:12px;background:hsl(var(--card));transition:all .2s}
.pv-price:hover{transform:translateY(-3px);border-color:#5e6ad2}
.pv-price-plan{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:hsl(var(--ink-subtle))}
.pv-price-amt{margin:8px 0 12px;font-size:26px;font-weight:700;color:hsl(var(--ink));font-variant-numeric:tabular-nums}
.pv-price-amt small{font-size:11px;font-weight:400;color:hsl(var(--ink-subtle))}
.pv-price ul{list-style:none;margin:0 0 14px;padding:0;text-align:left;font-size:12px;color:hsl(var(--ink-muted))}
.pv-price li{padding:3px 0 3px 20px;position:relative}
.pv-price li::before{content:"✓";position:absolute;left:0;color:#5e6ad2}
.pv-price button{width:100%;height:34px;border:none;border-radius:8px;background:#5e6ad2;color:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
.pv-price button:hover{background:#828fff}`,
    react: `export function Demo() {
  return (
    <div className="rounded-xl border p-6 text-center hover:-translate-y-1 transition">
      <p className="text-xs uppercase tracking-widest">Pro</p>
      <p className="text-3xl font-bold">₹0</p>
    </div>
  )
}`,
  },

  'uiverse-glow': {
    label: 'Uiverse — glow buttons',
    html: `<div class="pv-ug">
  <button class="pv-ug-glow">Hover me</button>
  <button class="pv-ug-slide">Border slide</button>
</div>`,
    css: `.pv-ug{display:flex;flex-direction:column;gap:14px;align-items:center}
.pv-ug-glow{height:40px;padding:0 22px;border:none;border-radius:8px;background:linear-gradient(135deg,#5e6ad2,#828fff);color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;animation:pv-glow 2.2s ease-in-out infinite;transition:transform .15s}
.pv-ug-glow:hover{transform:scale(1.06);animation:none;box-shadow:0 0 34px rgba(94,106,210,.75)}
@keyframes pv-glow{0%,100%{box-shadow:0 0 10px rgba(94,106,210,.35)}50%{box-shadow:0 0 24px rgba(94,106,210,.6)}}
.pv-ug-slide{position:relative;height:40px;padding:0 22px;border:1px solid hsl(var(--hairline));border-radius:8px;background:transparent;color:hsl(var(--ink-subtle));font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:color .2s,border-color .2s}
.pv-ug-slide::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;border-radius:2px;background:linear-gradient(90deg,#5e6ad2,#828fff);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.pv-ug-slide:hover{color:hsl(var(--ink));border-color:#5e6ad2}
.pv-ug-slide:hover::after{transform:scaleX(1)}`,
    react: `export function Demo() {
  return (
    <button className="rounded-lg bg-gradient-to-br from-[#5e6ad2] to-[#828fff] px-5 py-2 text-white shadow-[0_0_24px_rgba(94,106,210,.5)]">
      Hover me
    </button>
  )
}`,
  },

  'css-loaders': {
    label: 'CSS Loaders — three',
    html: `<div class="pv-ld">
  <span class="pv-ld-ring"></span>
  <span class="pv-ld-dots"><i></i><i></i><i></i></span>
  <span class="pv-ld-bars"><i></i><i></i><i></i><i></i><i></i></span>
</div>`,
    css: `.pv-ld{display:flex;gap:26px;align-items:center}
.pv-ld-ring{width:28px;height:28px;border-radius:99px;border:2.5px solid hsl(var(--hairline));border-top-color:#5e6ad2;animation:pv-spin .8s linear infinite}
@keyframes pv-spin{to{transform:rotate(1turn)}}
.pv-ld-dots{display:flex;gap:5px}
.pv-ld-dots i{width:8px;height:8px;border-radius:99px;background:#5e6ad2;animation:pv-bnc 1s ease-in-out infinite}
.pv-ld-dots i:nth-child(2){animation-delay:.15s}
.pv-ld-dots i:nth-child(3){animation-delay:.3s}
@keyframes pv-bnc{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-9px);opacity:1}}
.pv-ld-bars{display:flex;gap:3px;align-items:flex-end;height:24px}
.pv-ld-bars i{width:4px;height:100%;border-radius:2px;background:#5e6ad2;transform-origin:bottom;animation:pv-eq .9s ease-in-out infinite}
.pv-ld-bars i:nth-child(2){animation-delay:.1s}
.pv-ld-bars i:nth-child(3){animation-delay:.2s}
.pv-ld-bars i:nth-child(4){animation-delay:.3s}
.pv-ld-bars i:nth-child(5){animation-delay:.4s}
@keyframes pv-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}`,
    react: `export function Demo() {
  return (
    <div className="size-7 animate-spin rounded-full border-2 border-zinc-700 border-t-[#5e6ad2]" />
  )
}`,
  },

  'lottie-cdn': {
    label: 'Lottie — runtime CDN',
    html: `<canvas class="pv-lottie-canvas" width="120" height="120"></canvas>
<div class="pv-lottie-fb"><span></span><small>Lottie · runtime CDN</small></div>`,
    css: `.pv-lottie-canvas{max-width:120px;max-height:120px}
.pv-lottie-fb{display:none;flex-direction:column;align-items:center;gap:8px}
.pv-lottie-fb span{width:44px;height:44px;border-radius:99px;border:2px solid hsl(var(--hairline));border-top-color:#5e6ad2;animation:pv-spin .9s linear infinite}
.pv-lottie-fb small{font-size:10px;color:hsl(var(--ink-subtle))}
.pv-stage.pv-failed .pv-lottie-canvas{display:none}
.pv-stage.pv-failed .pv-lottie-fb{display:flex}`,
    react: `import { DotLottie } from "@lottiefiles/dotlottie-web"

// runtime CDN — nothing downloaded into the repo:
const dotLottie = new DotLottie({
  canvas: document.querySelector("canvas"),
  src: "https://lottie.host/…/anim.lottie",
  autoplay: true,
  loop: true,
})`,
  },

  'motion-spring': {
    label: 'Motion — spring loop',
    html: `<div class="pv-motion"><div class="pv-motion-box">spring</div></div>`,
    css: `.pv-motion{display:flex}
.pv-motion-box{width:70px;height:44px;display:grid;place-items:center;border-radius:10px;background:#5e6ad2;color:#fff;font-size:12px;font-weight:600;cursor:pointer}
.pv-stage.pv-failed .pv-motion-box{animation:pv-spring 1.6s ease-in-out infinite}
@keyframes pv-spring{0%,100%{transform:translateX(-40px)}50%{transform:translateX(40px) scale(1.06)}}`,
    react: `import { animate } from "motion"

// runtime CDN via esm.sh — nothing downloaded into the repo:
animate(el, { x: [-40, 40] }, { duration: 1.2, repeat: Infinity, repeatType: "mirror" })`,
  },

  'view-transition': {
    label: 'View Transitions — pages',
    html: `<div class="pv-vt">
  <input type="checkbox" id="pv-vt-c">
  <div class="pv-vt-stage">
    <div class="pv-vt-page pv-vt-a"><b>Page A</b><small>click “Transition”</small></div>
    <div class="pv-vt-page pv-vt-b"><b>Page B</b><small>native view transition</small></div>
  </div>
  <label for="pv-vt-c" class="pv-vt-btn">Transition</label>
</div>`,
    css: `.pv-vt{display:flex;flex-direction:column;gap:10px;align-items:center}
.pv-vt input{position:absolute;opacity:0;pointer-events:none}
.pv-vt-stage{position:relative;width:210px;height:84px;overflow:hidden;border:1px solid hsl(var(--hairline));border-radius:10px;background:hsl(var(--card))}
.pv-vt-page{position:absolute;inset:0;display:flex;flex-direction:column;gap:2px;align-items:center;justify-content:center;transition:transform .45s cubic-bezier(.22,.61,.36,1),opacity .45s}
.pv-vt-page b{font-size:13px;color:hsl(var(--ink))}
.pv-vt-page small{font-size:11px;color:hsl(var(--ink-subtle))}
.pv-vt-b{transform:translateX(100%)}
.pv-vt input:checked ~ .pv-vt-stage .pv-vt-a{transform:translateX(-100%);opacity:0}
.pv-vt input:checked ~ .pv-vt-stage .pv-vt-b{transform:none}
.pv-vt-btn{height:32px;padding:0 16px;border:1px solid hsl(var(--hairline));border-radius:8px;background:hsl(var(--surface-1));color:hsl(var(--ink));font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.pv-vt-btn:hover{border-color:#5e6ad2;color:#828fff}`,
    react: `import { useState, startTransition } from "react"

export function Demo() {
  const [page, setPage] = useState("a")
  return <button onClick={() => document.startViewTransition(() => setPage("b"))}>Transition</button>
}`,
  },
}

// Home hero mosaic — the showcase six
export const MOSAIC: PreviewKind[] = ['shadcn-buttons', 'css-loaders', 'uiverse-glow', 'daisy-toggle', 'radix-tabs', 'lucide-draw']

// Curated shop tag filters
export const SHOP_TAGS: string[] = ['MIT', 'ISC', 'Free', 'CSS', 'Tailwind', 'React', 'SVG', 'Lottie', 'Motion', 'Landing']

export const previewCss = [
  `.pv-stage{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:0;padding:16px;box-sizing:border-box;font-family:inherit;line-height:1.4}
.pv-stage *{box-sizing:border-box}
.pv-stage--full{min-height:360px;flex:1}`,
  ...Object.values(PREVIEWS).map((p) => p.css),
].join('\n')

let installed = false
export function installPreviewStyles(): void {
  if (installed || typeof document === 'undefined') return
  installed = true
  if (!document.getElementById('pv-styles')) {
    const s = document.createElement('style')
    s.id = 'pv-styles'
    s.textContent = previewCss
    document.head.appendChild(s)
  }
}

// dynamic import of external URL — bypasses bundler analysis in Vite & Next (identical both stacks)
// eslint-disable-next-line @typescript-eslint/no-implied-eval
export function importUrl(url: string): Promise<any> {
  return new Function('u', 'return import(u)')(url)
}
