import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '@/shared/lib'
import styles from './RadioCard.module.css'
export type RadioCardVariant = 'surface' | 'classic' | 'ghost'
export type RadioCardSize = '1' | '2' | '3'
export type RadioCardColor = 'primary' | 'neutral' | 'info'
export interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: RadioCardVariant
  size?: RadioCardSize
  color?: RadioCardColor
  children: ReactNode
    contentClassName?: string
}
const sizeClassMap: Record<RadioCardSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  (
    {
      variant = 'surface',
      size = '2',
      color = 'info', 
      className,
      contentClassName,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const radioClass = cx(
      styles.label,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      disabled && styles.disabled,
      className,
    )
    return (
      <label
        className={radioClass}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            const input = e.currentTarget.querySelector('input')
            if (input && !disabled) {
              input.click()
            }
          }
        }}
      >
        <input
          type="radio"
          ref={ref}
          className={styles.input}
          disabled={disabled}
          tabIndex={-1} 
          {...rest}
        />
        <div className={cx(styles.content, contentClassName)}>
          {children}
        </div>
      </label>
    )
  },
)
RadioCard.displayName = 'RadioCard'
