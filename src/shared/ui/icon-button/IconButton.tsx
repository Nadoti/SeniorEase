import { forwardRef, memo } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cx } from '@/shared/lib'
import styles from './IconButton.module.css'

export type IconButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'
export type IconButtonSize = '1' | '2' | '3'
export type IconButtonColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
export type IconButtonRadius = 'sm' | 'md' | 'lg' | 'full'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  color?: IconButtonColor
  radius?: IconButtonRadius
  loading?: boolean
  'aria-label': string
  children: ReactNode
}

const sizeClassMap: Record<IconButtonSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}

const radiusClassMap: Record<IconButtonRadius, string> = {
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  full: styles.radiusFull,
}



const Spinner = memo(({ size = 16 }: { size?: number }) => (
  <svg
    className={styles.spinner}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
))

Spinner.displayName = 'Spinner'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'solid',
      size = '2',
      color = 'primary',
      radius,
      loading = false,
      disabled,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const buttonClass = cx(
      styles.iconButton,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      radius && radiusClassMap[radius],
      loading && styles.loading,
      className,
    )

    const spinnerSize = size === '1' ? 12 : size === '2' ? 14 : 18

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClass}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading && (
          <span className={styles.spinnerWrapper} aria-hidden="true">
            <Spinner size={spinnerSize} />
          </span>
        )}
        <span className={loading ? styles.loadingContent : undefined}>
          {children}
        </span>
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
