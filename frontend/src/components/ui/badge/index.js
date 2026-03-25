import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-primary/30 bg-gradient-to-r from-primary/18 to-secondary/14 text-foreground',
        secondary: 'border-secondary/35 bg-secondary/85 text-secondary-foreground',
        outline: 'border-border/85 bg-background/75 text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
