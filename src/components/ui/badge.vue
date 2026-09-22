<script setup>
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#5e6ad2] text-white",
        secondary: "border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] text-[hsl(var(--ink-subtle))]",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        pill: "border-transparent bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] text-[11px] tracking-widest font-bold",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const props = defineProps({
  variant: { type: String, default: "default" },
  class: String,
})
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
