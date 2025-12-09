// ...existing code...
import React from 'react'
import { Text, TextProps } from 'react-native'

type TypographyVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'
type ColorToken = 'default' | 'muted' | 'inverse' | 'primary' | 'secondary'

const variantClasses: Record<TypographyVariant, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

const weightClasses: Record<FontWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses: Record<ColorToken, string> = {
  default: 'text-text dark:text-text-dark',
  muted: 'text-text-muted dark:text-text-dark-muted',
  inverse: 'text-text-inverse dark:text-text-dark-inverse',
  primary: 'text-primary dark:text-primary-foreground',
  secondary: 'text-secondary dark:text-secondary-foreground',
}

type Props = TextProps & {
  variant?: TypographyVariant
  weight?: FontWeight
  color?: ColorToken
  className?: string
}

const AppText = ({
  variant = 'base',
  weight = 'regular',
  color = 'default',
  className = '',
  ...rest
}: Props) => {
  const composedClassName = `${variantClasses[variant]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`.trim()

  return <Text className={composedClassName} {...rest} />
}

export default AppText