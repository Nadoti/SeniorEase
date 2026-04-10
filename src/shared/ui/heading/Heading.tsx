import { forwardRef } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { cx } from '@/shared/lib'
import styles from './Heading.module.css'
export type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | '600'
export type HeadingColor = 'default' | 'muted' | 'white' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'inherit'
export type HeadingAlign = 'left' | 'center' | 'right'
export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance'
export type HeadingTrim = 'normal' | 'start' | 'end' | 'both'
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingAs
  size?: HeadingSize
  weight?: HeadingWeight
  color?: HeadingColor
  align?: HeadingAlign
  truncate?: boolean
  wrap?: HeadingWrap
  trim?: HeadingTrim
}
const sizeMap: Record<HeadingSize, string> = {
  '1': styles.size1, '2': styles.size2, '3': styles.size3,
  '4': styles.size4, '5': styles.size5, '6': styles.size6,
  '7': styles.size7, '8': styles.size8, '9': styles.size9,
}
const weightMap: Record<HeadingWeight, string> = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemiBold,
  '600': styles.weightSemiBold,
  bold: styles.weightBold,
}
const colorMap: Record<HeadingColor, string> = {
  default: styles.colorDefault,
  muted: styles.colorMuted,
  white: styles.colorWhite,
  primary: styles.colorPrimary,
  danger: styles.colorDanger,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  info: styles.colorInfo,
  inherit: styles.colorInherit,
}
const alignMap: Record<HeadingAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
}
const wrapMap: Record<HeadingWrap, string> = {
  wrap: styles.wrapWrap,
  nowrap: styles.wrapNowrap,
  pretty: styles.wrapPretty,
  balance: styles.wrapBalance,
}
const trimMap: Record<HeadingTrim, string> = {
  normal: '',
  start: styles.trimStart,
  end: styles.trimEnd,
  both: styles.trimBoth,
}
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = 'h1',
      size = '6',
      weight = 'bold',
      color = 'default',
      align,
      truncate = false,
      wrap,
      trim,
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
          styles.heading,
          sizeMap[size],
          weightMap[weight],
          colorMap[color],
          align && alignMap[align],
          truncate && styles.truncate,
          wrap && wrapMap[wrap],
          trim && trim !== 'normal' && trimMap[trim],
          className,
        )}
        {...rest}
      />
    )
  },
)
Heading.displayName = 'Heading'
