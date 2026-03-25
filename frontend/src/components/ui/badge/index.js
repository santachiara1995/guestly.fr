import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex min-h-8 items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold tracking-[0.06em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/20 bg-primary/[0.08] text-blue-eclipse',
        secondary: 'border-secondary/18 bg-secondary/[0.06] text-foreground',
        outline: 'border-border bg-white text-muted-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
