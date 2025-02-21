import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-light-btn-primary dark:bg-dark-btn-primary text-light-btn-primary-text dark:text-dark-btn-primary-text shadow hover:bg-light-btn-primary-hover dark:hover:bg-dark-btn-primary-hover disabled:bg-light-btn-primary-disabled dark:disabled:bg-dark-btn-primary-disabled gap-2",
        destructive:
          "bg-light-btn-destructive dark:bg-dark-btn-destructive text-light-btn-destructive-text dark:text-dark-btn-destructive-text shadow-sm hover:bg-light-btn-destructive-hover dark:hover:bg-dark-btn-destructive-hover disabled:bg-light-btn-destructive-disabled dark:disabled:bg-dark-btn-destructive-disabled",
        secondary:
          "bg-light-btn-secondary dark:bg-dark-btn-secondary text-light-btn-secondary-text dark:text-dark-btn-secondary-text shadow-sm hover:bg-light-btn-secondary-hover dark:hover:bg-dark-btn-secondary-hover disabled:bg-light-btn-secondary-disabled dark:disabled:bg-dark-btn-secondary-disabled",
        tertiary:
          "bg-light-btn-tertiary dark:bg-dark-btn-tertiary text-light-btn-tertiary-text dark:text-dark-btn-tertiary-text shadow-sm hover:bg-light-btn-tertiary-hover dark:hover:bg-dark-btn-tertiary-hover disabled:bg-light-btn-tertiary-disabled dark:disabled:bg-dark-btn-tertiary-disabled",
        outline:
          "border border-light-border-default dark:border-dark-border-default bg-light-bg-container dark:bg-dark-bg-container text-light-text-primary dark:text-dark-text-primary shadow-sm hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover hover:text-light-text-primary dark:hover:text-dark-text-primary",
        ghost:
          "text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover hover:text-light-text-primary dark:hover:text-dark-text-primary",
        link:
          "text-light-btn-primary dark:text-dark-btn-primary underline-offset-4 hover:underline hover:text-light-btn-primary-hover dark:hover:text-dark-btn-primary-hover",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-0",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
