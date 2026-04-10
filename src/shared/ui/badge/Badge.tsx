import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cx } from '@/shared/lib'
import styles from './Badge.module.css'
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'surface'
export type BadgeSize = '1' | '2' | '3'
export type BadgeColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
export type BadgeRadius = 'sm' | 'md' | 'lg' | 'full'
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  radius?: BadgeRadius
}
const sizeClassMap: Record<BadgeSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}
const radiusClassMap: Record<BadgeRadius, string> = {
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  full: styles.radiusFull,
}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'soft',
      size = '1',
      color = 'neutral',
      radius,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const badgeClass = cx(
      styles.badge,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      radius && radiusClassMap[radius],
      className,
    )
    return (
      <span ref={ref} className={badgeClass} {...rest}>
        {children}
      </span>
    )
  },
)
Badge.displayName = 'Badge'
