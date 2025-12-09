import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable } from 'react-native'
import AppText from './AppText'

type DeleteButtonProps = {
    onPress: () => void
}

export const DeleteButton = ({ onPress }: DeleteButtonProps) => {
    return (
        <Pressable className='p-2' onPress={onPress}>
            <Ionicons
                className='text-red-600'
                color={'#DC2626'}
                name='trash'
                size={24}
            />
        </Pressable>
    )
}

type AppButtonProps = {
    onPress: () => void
    title?: string
    rightIcon?: React.ReactNode
    leftIcon?: React.ReactNode
    icon?: React.ReactNode
    variant?: ButtonVariants
    className?: string
}

type ButtonVariants = 'primary' | 'secondary' | 'tertiary'

export const AppButton = ({
    onPress,
    title,
    rightIcon,
    leftIcon,
    icon,
    variant = 'primary',
    className,
}: AppButtonProps) => {

    const buttonStyles = {
        primary: 'bg-blue-600 dark:bg-blue-500 p-3 rounded-lg flex-row items-center justify-center',
        secondary: 'bg-gray-200 dark:bg-gray-700 p-3 rounded-lg flex-row items-center justify-center',
        tertiary: 'bg-transparent p-3 rounded-lg flex-row items-center justify-center'
    }

    return (
        <Pressable onPress={onPress} className={`${buttonStyles[variant]} ${className}`}>
            {leftIcon ? leftIcon : null}
            {icon ? icon :
                <AppText variant='base'>{title}</AppText>
            }
            {rightIcon ? rightIcon : null}
        </Pressable>
    )
}