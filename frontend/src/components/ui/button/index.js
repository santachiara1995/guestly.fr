import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'btn-soft-glow border border-primary/80 bg-primary text-primary-foreground shadow-lg shadow-primary/22 hover:-translate-y-0.5 hover:bg-primary/95',
        secondary:
          'border border-secondary/65 bg-secondary text-secondary-foreground shadow-lg shadow-secondary/18 hover:-translate-y-0.5 hover:bg-secondary/95',
        outline:
          'border border-primary/60 bg-white/94 text-primary backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/80 hover:bg-primary/5',
        ghost: 'text-primary hover:bg-primary/6',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-12 rounded-2xl px-6 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
