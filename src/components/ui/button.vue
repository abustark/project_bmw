<script setup>
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#5e6ad2] text-white hover:bg-[#828fff] shadow-none",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-[hsl(var(--hairline))] bg-transparent hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))]",
        secondary: "bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface-2))]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        pill: "bg-[#5e6ad2] text-white rounded-[8px] px-6 py-3 hover:bg-[#828fff] shadow-none",
        pillOutline: "bg-transparent border border-[hsl(var(--hairline))] rounded-[8px] px-6 py-3 hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[8px] px-3",
        lg: "h-11 rounded-[8px] px-8",
        icon: "h-10 w-10",
        pill: "px-6 py-3 rounded-full h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const props = defineProps({
  variant: { type: String, default: "default" },
  size: { type: String, default: "default" },
  class: { type: String, default: "" },
  as: { type: String, default: "button" },
})
</script>

<template>
  <component :is="as" :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </component>
</template>
