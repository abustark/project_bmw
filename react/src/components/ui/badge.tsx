import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#5e6ad2] text-white",
        secondary: "border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] text-[hsl(var(--ink-subtle))]",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground bg-[hsl(var(--card))]",
        pill: "border-transparent bg-[hsl(var(--surface-1))] border-[hsl(var(--hairline))] text-[hsl(var(--ink-subtle))] text-[11px] tracking-widest font-bold",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
