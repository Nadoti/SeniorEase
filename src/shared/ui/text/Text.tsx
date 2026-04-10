import { forwardRef } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { cx } from '@/shared/lib/cx'
import styles from './Text.module.css'
export type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'default' | 'muted' | 'white' | 'primary' | 'danger' | 'success' | 'warning' | 'inherit' | 'lightGray'
export type TextAlign = 'left' | 'center' | 'right'
export type TextAs = 'p' | 'span' | 'label' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  align?: TextAlign
  truncate?: boolean
  italic?: boolean
}
const sizeMap: Record<TextSize, string> = {
  '1': styles.size1, '2': styles.size2, '3': styles.size3,
  '4': styles.size4, '5': styles.size5, '6': styles.size6,
  '7': styles.size7, '8': styles.size8, '9': styles.size9,
}
const weightMap: Record<TextWeight, string> = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
}
const colorMap: Record<TextColor, string> = {
  default: styles.colorDefault,
  muted: styles.colorMuted,
  white: styles.colorWhite,
  primary: styles.colorPrimary,
  danger: styles.colorDanger,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  inherit: styles.colorInherit,
  lightGray: styles.colorLightGray,
}
const alignMap: Record<TextAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
}
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'span',
      size = '3',
      weight = 'regular',
      color = 'default',
      align,
      truncate = false,
      italic = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const Component = as as ElementType
    return (
      <Component
        ref={ref}
        className={cx(
          styles.text,
          sizeMap[size],
          weightMap[weight],
          colorMap[color],
          align && alignMap[align],
          truncate && styles.truncate,
          italic && styles.italic,
          className,
        )}
        {...rest}
      />
    )
  },
)
Text.displayName = 'Text'