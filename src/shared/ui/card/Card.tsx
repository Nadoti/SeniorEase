import { forwardRef, isValidElement, cloneElement } from 'react'
import type { HTMLAttributes, ReactElement } from 'react'

import { cx } from '@/shared/lib'
import styles from './Card.module.css'

export type CardVariant = 'surface' | 'classic' | 'ghost' | 'outline'
export type CardSize = '1' | '2' | '3'
export type CardColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'info' | 'dark'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  size?: CardSize
  color?: CardColor
  interactive?: boolean
  /** Renderiza como o elemento filho ao invés de <div> */
  asChild?: boolean
}

const sizeClassMap: Record<CardSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}



export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'surface',
      size = '2',
      color,
      interactive = false,
      asChild = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const cardClass = cx(
      styles.card,
      styles[variant],
      sizeClassMap[size],
      color && styles[color],
      (interactive || asChild) && styles.interactive,
      className,
    )

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<Record<string, unknown>>, {
        ref,
        className: cx(cardClass, (children.props as { className?: string }).className),
        ...rest,
      })
    }

    return (
      <div ref={ref} className={cardClass} {...rest}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
