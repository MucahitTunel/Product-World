import React from 'react'
import { View } from 'react-native'

type Props = {
  children?: React.ReactNode
}

const BaseView = (props: Props) => {
  return (
    <View
      className='flex-1 p-md bg-background dark:bg-background-dark'
    >
      {props.children}
    </View>
  )
}

export default BaseView