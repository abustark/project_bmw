<script setup>
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        pill: "border-transparent bg-zinc-900 text-white text-[11px] tracking-widest font-bold",
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
