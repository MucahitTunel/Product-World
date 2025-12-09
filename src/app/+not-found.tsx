import AppText from '@/components/AppText'
import BaseView from '@/components/BaseView'
import React from 'react'
import { View } from 'react-native'

type Props = {}

const NotFoundPage = (props: Props) => {
    return (
        <BaseView>
            <View className='flex-1 justify-center items-center p-md bg-background dark:bg-background-dark'>
                <AppText>Page Not Found</AppText>
            </View>
        </BaseView>
    )
}

export default NotFoundPage