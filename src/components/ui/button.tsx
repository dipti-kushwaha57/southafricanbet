'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva('btn d-inline-flex align-items-center justify-content-center gap-2', {
  variants: {
    variant: {
      default: 'btn-sab-primary',
      destructive: 'btn-danger',
      outline: 'btn-sab-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-light',
      link: 'btn-link p-0',
    },
    size: {
      clear: '',
      default: 'px-4 py-2',
      sm: 'btn-sm',
      lg: 'btn-lg',
      icon: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
