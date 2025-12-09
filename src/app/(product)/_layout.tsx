import CustomHeader from '@/components/CustomHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {}

const ProductLayout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        header: () => <CustomHeader title="Products" showBackButton={false} />
      }} />
      <Stack.Screen name="[productId]" options={{
        header: () => <CustomHeader title="Product Details" />
      }} />
    </Stack>
  )
}

export default ProductLayout

const styles = StyleSheet.create({})