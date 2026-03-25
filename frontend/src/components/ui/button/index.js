import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border text-sm font-semibold tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none aria-busy:opacity-70 data-[loading=true]:pointer-events-none data-[loading=true]:opacity-70',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-primary/95 active:bg-primary/90',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/95 active:bg-secondary/90',
        outline:
          'border-border bg-card text-foreground hover:border-primary/35 hover:bg-accent/70 active:bg-accent',
        ghost:
          'border-transparent bg-transparent text-primary hover:bg-accent/80 active:bg-accent',
        link:
          'border-transparent bg-transparent text-primary underline-offset-4 hover:underline active:text-primary/80'
      },
      size: {
        default: 'min-h-11 px-4',
        sm: 'min-h-11 px-3.5 text-[0.92rem]',
        lg: 'min-h-12 px-5 text-base',
        icon: 'size-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
