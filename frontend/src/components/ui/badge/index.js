import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/8 text-foreground',
        secondary: 'border-secondary/40 bg-secondary text-secondary-foreground',
        outline: 'border-primary/25 bg-white/80 text-primary'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
