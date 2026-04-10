import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cx } from '@/shared/lib'
import styles from './LinkButton.module.css'
export type LinkButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'
export type LinkButtonSize = '1' | '2' | '3'
export type LinkButtonColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
export type LinkButtonRadius = 'sm' | 'md' | 'lg' | 'full'
export interface LinkButtonProps extends Omit<LinkProps, 'to'> {
  variant?: LinkButtonVariant
  size?: LinkButtonSize
  color?: LinkButtonColor
  radius?: LinkButtonRadius
  href: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}
const sizeClassMap: Record<LinkButtonSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}
const radiusClassMap: Record<LinkButtonRadius, string> = {
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  full: styles.radiusFull,
}
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      variant = 'solid',
      size = '2',
      color = 'primary',
      radius,
      href,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const linkClass = cx(
      styles.linkButton,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      radius && radiusClassMap[radius],
      fullWidth && styles.fullWidth,
      className,
    )
    return (
      <Link ref={ref} to={href} className={linkClass} {...rest}>
        {leftIcon && (
          <span className={styles.iconWrapper} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={styles.iconWrapper} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Link>
    )
  },
)
LinkButton.displayName = 'LinkButton'
