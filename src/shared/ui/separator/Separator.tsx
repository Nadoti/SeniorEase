import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import styles from './Separator.module.css'

export type SeparatorOrientation = 'horizontal' | 'vertical'
export type SeparatorColor = 'neutral' | 'muted' | 'primary' | 'danger' | 'success' | 'warning'
export type SeparatorSpacing = 'sm' | 'md' | 'lg'

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: SeparatorOrientation
  color?: SeparatorColor
  spacing?: SeparatorSpacing
}

const spacingClassMap: Record<SeparatorSpacing, string> = {
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      color = 'neutral',
      spacing = 'md',
      className,
      ...rest
    },
    ref,
  ) => {
    const separatorClass = cx(
      styles.separator,
      styles[orientation],
      styles[color],
      spacingClassMap[spacing],
      className,
    )

    return (
      <hr
        ref={ref}
        className={separatorClass}
        role="separator"
        aria-orientation={orientation}
        {...rest}
      />
    )
  },
)

Separator.displayName = 'Separator'
