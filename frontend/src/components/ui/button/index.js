import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border text-sm font-semibold tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none aria-busy:opacity-70 data-[loading=true]:pointer-events-none data-[loading=true]:opacity-70',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14)] hover:border-primary hover:bg-[#2f66ef] active:bg-primary/90',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] hover:border-secondary hover:bg-[#dc3557] active:bg-secondary/90',
        outline:
          'border-border bg-card/82 text-foreground hover:border-primary/40 hover:bg-accent/88 active:bg-accent',
        ghost:
          'border-transparent bg-transparent text-foreground hover:border-border/80 hover:bg-accent/68 active:bg-accent/82',
        link:
          'border-transparent bg-transparent text-foreground underline-offset-4 hover:text-primary-foreground hover:underline active:text-primary/80'
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
