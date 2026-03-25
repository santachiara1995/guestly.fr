import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-primary/18 bg-primary/[0.045] text-foreground',
        secondary: 'border-secondary/20 bg-secondary/[0.06] text-foreground',
        outline: 'border-border bg-white text-muted-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
