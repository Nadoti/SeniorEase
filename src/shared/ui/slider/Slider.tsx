import { forwardRef, useCallback, useRef, useState } from 'react'
import type { HTMLAttributes, PointerEvent as ReactPointerEvent } from 'react'

import { cx } from '@/shared/lib'
import styles from './Slider.module.css'

export type SliderVariant = 'surface' | 'soft' | 'classic'
export type SliderSize = '1' | '2' | '3'
export type SliderColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning'

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant?: SliderVariant
  size?: SliderSize
  color?: SliderColor
  /** Controlled value */
  value?: number
  /** Uncontrolled initial value */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Called when value changes */
  onValueChange?: (value: number) => void
  /** Called when user finishes dragging */
  onValueCommit?: (value: number) => void
  /** Name for hidden input (form support) */
  name?: string
  disabled?: boolean
  'aria-label'?: string
  /** Texto que aparece acima do slider */
  label?: string
  /** Unidade de medida (ex: px, em) */
  unit?: string
  /** Mostra os limites mínimo e máximo abaixo do slider */
  showLimits?: boolean
}

const sizeClassMap: Record<SliderSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function snapToStep(val: number, min: number, step: number) {
  const steps = Math.round((val - min) / step)
  return min + steps * step
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      variant = 'surface',
      size = '2',
      color = 'primary',
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      onValueCommit,
      name,
      disabled = false,
      className,
      label,
      unit = '',
      showLimits = false,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? min)
    const currentValue = isControlled ? controlledValue : internalValue

    const trackRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)

    const getValueFromPosition = useCallback(
      (clientX: number) => {
        const track = trackRef.current
        if (!track) return currentValue

        const rect = track.getBoundingClientRect()
        const percent = clamp((clientX - rect.left) / rect.width, 0, 1)
        const raw = min + percent * (max - min)
        return snapToStep(clamp(raw, min, max), min, step)
      },
      [currentValue, min, max, step],
    )

    const updateValue = useCallback(
      (newValue: number) => {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isControlled, onValueChange],
    )

    const handlePointerDown = useCallback(
      (e: ReactPointerEvent) => {
        if (disabled) return
        e.preventDefault()

        isDragging.current = true
        const newValue = getValueFromPosition(e.clientX)
        updateValue(newValue)

        const target = e.currentTarget as HTMLElement
        target.setPointerCapture(e.pointerId)
      },
      [disabled, getValueFromPosition, updateValue],
    )

    const handlePointerMove = useCallback(
      (e: ReactPointerEvent) => {
        if (!isDragging.current || disabled) return

        const newValue = getValueFromPosition(e.clientX)
        updateValue(newValue)
      },
      [disabled, getValueFromPosition, updateValue],
    )

    const handlePointerUp = useCallback(() => {
      if (!isDragging.current) return
      isDragging.current = false
      onValueCommit?.(currentValue)
    }, [currentValue, onValueCommit])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return

        let newValue = currentValue
        const bigStep = step * 10

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = clamp(currentValue + step, min, max)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = clamp(currentValue - step, min, max)
            break
          case 'PageUp':
            newValue = clamp(currentValue + bigStep, min, max)
            break
          case 'PageDown':
            newValue = clamp(currentValue - bigStep, min, max)
            break
          case 'Home':
            newValue = min
            break
          case 'End':
            newValue = max
            break
          default:
            return
        }

        e.preventDefault()
        updateValue(newValue)
        onValueCommit?.(newValue)
      },
      [disabled, currentValue, step, min, max, updateValue, onValueCommit],
    )

    const percent = ((currentValue - min) / (max - min)) * 100

    const sliderClass = cx(
      styles.slider,
      styles[variant],
      styles[color],
      sizeClassMap[size],
      disabled && styles.disabled,
      className,
    )

    return (
      <div ref={ref} className={sliderClass} {...rest}>

        {label && (
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            <span className={styles.valueBadge}>
              {currentValue}{unit}
            </span>
          </div>
        )}

        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className={styles.range}
            style={{ width: `${percent}%` }}
          />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-disabled={disabled || undefined}
            className={styles.thumb}
            style={{ left: `${percent}%` }}
            onKeyDown={handleKeyDown}
          />
        </div>

        {showLimits && (
          <div className={styles.footer}>
            <span className={styles.limitText}>{min}{unit}</span>
            <span className={styles.limitText}>{max}{unit}</span>
          </div>
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue}
            className={styles.input}
          />
        )}
      </div>
    )
  },
)

Slider.displayName = 'Slider'
