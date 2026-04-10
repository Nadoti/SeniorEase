import { forwardRef, useCallback, useState } from 'react'
import type { ButtonHTMLAttributes, ChangeEvent } from 'react'
import { cx } from '@/shared/lib'
import styles from './Switch.module.css'
export type SwitchVariant = 'surface' | 'soft' | 'classic'
export type SwitchSize = '1' | '2' | '3'
export type SwitchColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'info'
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  variant?: SwitchVariant
  size?: SwitchSize
  color?: SwitchColor
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    name?: string
    value?: string
    'aria-label'?: string
}
const sizeClassMap: Record<SwitchSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      variant = 'surface',
      size = '2',
      color = 'primary',
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      name,
      value = 'on',
      disabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isChecked = isControlled ? controlledChecked : internalChecked
    const handleClick = useCallback(() => {
      if (disabled) return
      const next = !isChecked
      if (!isControlled) {
        setInternalChecked(next)
      }
      onCheckedChange?.(next)
    }, [disabled, isChecked, isControlled, onCheckedChange])
    const state = isChecked ? 'checked' : 'unchecked'
    const switchClass = cx(
      styles.switch,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      className,
    )
    return (
      <>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          data-state={state}
          disabled={disabled}
          className={switchClass}
          onClick={handleClick}
          {...rest}
        >
          <span className={styles.thumb} />
        </button>
        {name && (
          <input
            type="checkbox"
            aria-hidden="true"
            tabIndex={-1}
            name={name}
            value={value}
            checked={isChecked}
            onChange={(e: ChangeEvent<HTMLInputElement>) => e.stopPropagation()}
            className={styles.input}
          />
        )}
      </>
    )
  },
)
Switch.displayName = 'Switch'
