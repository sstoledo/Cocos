import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"


const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-none bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-none bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-none bg-light-status-error-bg dark:bg-dark-status-error-bg text-light-status-error-text dark:text-dark-status-error-text shadow hover:bg-light-status-error/90 dark:hover:bg-dark-status-error/90",
        outline: "text-foreground",
        success: "border-none bg-light-status-success dark:bg-dark-status-success text-light-status-success-text dark:text-dark-status-success-text shadow hover:bg-light-status-success/90 dark:hover:bg-dark-status-success/90",
        warning:
          "border-none bg-light-status-warning dark:bg-dark-status-warning text-light-status-warning-text dark:text-dark-status-warning-text shadow hover:bg-light-status-warning/90 dark:hover:bg-dark-status-warning/90",
        info:
          "border-none bg-light-status-info dark:bg-dark-status-info text-light-status-info-text dark:text-dark-status-info-text shadow hover:bg-light-status-info/90 dark:hover:bg-dark-status-info/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
