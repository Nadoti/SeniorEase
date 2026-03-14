import { forwardRef, memo } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cx } from '@/shared/lib'
import styles from './Button.module.css'

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'
export type ButtonSize = '1' | '2' | '3'
export type ButtonColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
export type ButtonRadius = 'sm' | 'md' | 'lg' | 'full'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  radius?: ButtonRadius
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const sizeClassMap: Record<ButtonSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}

const radiusClassMap: Record<ButtonRadius, string> = {
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
    <circle
      opacity="0.25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      opacity="0.75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
))

Spinner.displayName = 'Spinner'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = '2',
      color = 'primary',
      radius,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
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
      styles.button,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      radius && radiusClassMap[radius],
      fullWidth && styles.fullWidth,
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
        </span>
      </button>
    )
  },
)

Button.displayName = 'Button'
