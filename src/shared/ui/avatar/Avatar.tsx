import { forwardRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import styles from './Avatar.module.css'
export type AvatarVariant = 'solid' | 'soft' | 'outline'
export type AvatarSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type AvatarColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'info'
export type AvatarRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: AvatarVariant
  size?: AvatarSize
  color?: AvatarColor
  radius?: AvatarRadius
  src?: string
  alt?: string
  fallback: ReactNode
}
const sizeMap: Record<AvatarSize, string> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
  '4': styles.size4,
  '5': styles.size5,
  '6': styles.size6,
  '7': styles.size7,
  '8': styles.size8,
  '9': styles.size9,
}
const radiusMap: Record<AvatarRadius, string> = {
  none: styles.radiusNone,
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  full: styles.radiusFull,
}
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      variant = 'soft',
      size = '3',
      color = 'primary',
      radius = 'full',
      src,
      alt,
      fallback,
      className,
      ...rest
    },
    ref,
  ) => {
    const [hasError, setHasError] = useState(false)
    const avatarClass = cx(
      styles.avatar,
      styles[variant],
      styles[color],
      sizeMap[size],
      radiusMap[radius],
      className,
    )
    return (
      <span ref={ref} className={avatarClass} {...rest}>
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || ''}
            className={styles.image}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className={styles.fallback}>{fallback}</span>
        )}
      </span>
    )
  },
)
Avatar.displayName = 'Avatar'
