import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

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
        pill: "bg-[#5e6ad2] text-white rounded-[8px] px-6 py-3 hover:bg-[#828fff] shadow-none h-auto",
        pillOutline: "bg-transparent border border-[hsl(var(--hairline))] rounded-[8px] px-6 py-3 hover:bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))] h-auto",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[8px] px-3",
        lg: "h-11 rounded-[8px] px-8",
        icon: "h-10 w-10",
        pill: "px-6 py-3 h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
