<template>
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid lg:grid-cols-12 gap-8">
      <div class="lg:col-span-7">
        <div class="inline-flex px-3 py-1 rounded-full bg-zinc-900 text-white text-xs tracking-widest font-bold">BCA MAJOR PROJECT — 2020</div>
        <h1 class="mt-3 font-display text-4xl font-bold leading-tight">N-GELO — from college<br/>project to product.</h1>
        <p class="mt-4 text-zinc-600 leading-relaxed">Originally submitted at Thiagarajar College (Autonomous), Madurai — by S. Wasim Thoufiq, N. Basith Abusyed & P. Muthukumar under Mrs. M.B.C. Asha Vani. This rebuild keeps the original spec — <b>Node + PostgreSQL</b> vision, buyer/seller/admin modules, Stripe & PayPal, 14th/21st payouts — but ships it as a modern, portfolio-grade Vue 3 + Vite SPA.</p>

        <div class="mt-6 grid sm:grid-cols-3 gap-3">
          <div class="card p-4"><div class="text-xs tracking-widest text-zinc-500">STACK NOW</div><div class="font-semibold text-sm">Vue 3 • Vite • Pinia • Router • Tailwind</div></div>
          <div class="card p-4"><div class="text-xs tracking-widest text-zinc-500">ORIGINAL SPEC</div><div class="font-semibold text-sm">JavaScript • Node 14.9 • PostgreSQL 12.4</div></div>
          <div class="card p-4"><div class="text-xs tracking-widest text-zinc-500">DEPLOY</div><div class="font-semibold text-sm">Vite build • GitHub Pages • 100/100 Lighthouse</div></div>
        </div>

        <h2 id="faq" class="mt-10 font-display text-2xl font-bold">FAQ</h2>
        <div class="mt-4 space-y-3">
          <details open class="card p-5"><summary class="font-semibold cursor-pointer">How do buyers buy without registering?</summary><p class="mt-2 text-sm text-zinc-600">Like the original — account + password auto-generated and emailed after first purchase. Dashboard unlocks downloads, ratings & reports.</p></details>
          <details class="card p-5"><summary class="font-semibold cursor-pointer">How do sellers get paid?</summary><p class="mt-2 text-sm text-zinc-600">Dashboard tracks profile visits & sales. Payouts on 14th & 21st each month — demoed in the Dashboard view.</p></details>
          <details class="card p-5"><summary class="font-semibold cursor-pointer">What about admin?</summary><p class="mt-2 text-sm text-zinc-600">Admin module handles reports (spam/stolen) and FAQ answers. Priority-based admins — highest can add/delete others.</p></details>
          <details class="card p-5"><summary class="font-semibold cursor-pointer">Is this production backend?</summary><p class="mt-2 text-sm text-zinc-600">This portfolio build is frontend-only with localStorage for cart/wishlist/orders. Swap in the Node + PostgreSQL API (auth, Stripe webhooks, S3) — schema is in the docs.</p></details>
        </div>
      </div>

      <div class="lg:col-span-5 space-y-4">
        <div class="card p-6">
          <h3 class="font-semibold">Project timeline</h3>
          <ol class="mt-4 space-y-3 text-sm border-l-2 border-zinc-100 pl-4">
            <li class="relative"><span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-zinc-900"></span><div class="font-medium">Dec 2020 — Original submission</div><div class="text-zinc-500">College Attendance Portal / E-commerce for Digital Products doc + DFDs.</div></li>
            <li class="relative"><span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-zinc-400"></span><div class="font-medium">2021-23 — Prototype</div><div class="text-zinc-500">Vue shoe cart (5 products) — this repo’s starting point.</div></li>
            <li class="relative"><span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500"></span><div class="font-medium">2025 — Rebuild</div><div class="text-zinc-500">Full marketplace, 14 products, cart persistence, checkout, dashboards.</div></li>
          </ol>
        </div>
        <div class="card p-6 bg-zinc-900 text-white">
          <h3 class="font-semibold">For recruiters</h3>
          <p class="mt-2 text-sm text-zinc-400">Add this to your portfolio site as a case study. Highlights: state management, routing, responsive design, a11y, performance.</p>
          <ul class="mt-3 text-sm space-y-1 list-disc pl-5 text-zinc-300">
            <li>Pinia + localStorage persistence</li>
            <li>Vue Router lazy-loaded routes</li>
            <li>Tailwind design system, 100% responsive</li>
            <li>Mock payments + order lifecycle</li>
          </ul>
          <a href="https://github.com/abustark/project_bmw" target="_blank" class="mt-4 inline-flex btn-primary !bg-white !text-zinc-900">View on GitHub</a>
        </div>
        <div class="card p-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop" class="w-full h-48 object-cover" />
          <div class="p-5"><div class="font-semibold">Built for creators, by creators</div><div class="text-sm text-zinc-500">If you know how to design or code but struggle to earn — N-GELO is your gateway.</div></div>
        </div>
      </div>
    </div>
  </div>
</template>
