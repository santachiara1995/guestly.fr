import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.9rem] border text-sm font-semibold tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none aria-busy:opacity-70 data-[loading=true]:pointer-events-none data-[loading=true]:opacity-70',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground shadow-[0_12px_24px_rgb(1_87_213_/_0.18)] hover:border-primary hover:bg-[#0f62df] active:bg-[#004cb7]',
        secondary:
          'border-border bg-white text-foreground hover:border-primary/30 hover:bg-muted/70 active:bg-muted/90',
        outline:
          'border-border bg-white text-foreground hover:border-primary/38 hover:bg-[#f4f7fd] active:bg-muted/80',
        ghost:
          'border-transparent bg-transparent text-foreground hover:border-border/60 hover:bg-muted/45 active:bg-muted/75',
        link:
          'border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:text-secondary hover:underline active:text-secondary'
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
