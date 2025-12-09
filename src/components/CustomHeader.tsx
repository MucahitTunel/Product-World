import { useTheme } from '@/hooks/useTheme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from './AppText'

type Props = {
    title?: string
    showBackButton?: boolean
    backButtonAction?: () => void
    headerRightComponent?: React.ReactNode
}

const CustomHeader = ({
    title = '',
    showBackButton = true,
    backButtonAction,
    headerRightComponent
}: Props) => {
    const { colorScheme } = useTheme()
    const router = useRouter();

    const handleBackPress = () => {
        if (backButtonAction) {
            backButtonAction()
        } else {
            router.back();
        }
    }

    return (
        <View className='p-sm h-20 bg-white dark:bg-gray-900 flex-row items-center justify-between'>
            {showBackButton && (
                <Pressable onPress={handleBackPress}>
                    <Ionicons
                        name='arrow-back'
                        size={24}
                        color={colorScheme === 'dark' ? '#fff' : '#000'}
                    />
                </Pressable>
            )}
            <AppText>{title ?? ''}</AppText>
            {headerRightComponent && (
                <View className='flex-row items-center'>
                    {headerRightComponent}
                </View>
            )}
        </View>
    )
}

export default CustomHeader