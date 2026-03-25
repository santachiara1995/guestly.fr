import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-primary/35 bg-gradient-to-r from-primary/10 via-white to-primary/4 text-foreground',
        secondary: 'border-secondary/45 bg-secondary/10 text-secondary',
        outline: 'border-primary/35 bg-white/88 text-primary'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
