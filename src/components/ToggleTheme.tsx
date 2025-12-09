import { useTheme } from '@/hooks/useTheme'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { View } from 'react-native'
import { AppButton } from './Buttons'

type Props = {}

const ToggleTheme = (props: Props) => {

  const { colorScheme, setTheme, theme } = useTheme()

  const activeThemeButtonStyle = 'border-2 bg-gray-300 dark:bg-gray-700 border-blue-500'

  return (
    <View className='flex-row justify-around mb-md'>
      <AppButton
        onPress={() => { setTheme('dark') }}
        title='Dark'
        variant='secondary'
        className={theme === 'dark' ? activeThemeButtonStyle : ''}
        icon={
          <Ionicons
            name='moon'
            size={20}
            color={theme === 'dark' ? '#000' : '#fff'}
          />
        }
      />
      <AppButton
        onPress={() => { setTheme('light') }}
        title='Light'
        variant='secondary'
        className={theme === 'light' ? activeThemeButtonStyle : ''}
        icon={
          <Ionicons
            name='sunny'
            size={20}
            color={theme === 'light' ? '#000' : '#fff'}
          />
        }
      />
      <AppButton
        onPress={() => { setTheme('system') }}
        title='System'
        variant='secondary'
        className={theme === 'system' ? activeThemeButtonStyle : ''}
        icon={
          <Ionicons
            name='contrast'
            size={20}
            color={theme === 'system' ? '#000' : '#fff'}
          />
        }
      />
    </View>
  )
}

export default ToggleTheme