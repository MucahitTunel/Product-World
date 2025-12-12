import BaseView from '@/components/BaseView'
import ProductCategoryList from '@/components/product/ProductCategoryList'
import ToggleTheme from '@/components/ToggleTheme'
import { useFetchProductsQuery } from '@/services/api/productApi'
import { Product } from '@/types/product'
import { FlashList } from '@shopify/flash-list'
import { useNavigation, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

const Products = () => {
  const router = useRouter()
  const navigation = useNavigation()

  const { data, error, isLoading } = useFetchProductsQuery()

  const groupByCategoryProducts = useMemo(() => {
    if (!data) return []
    let group: Record<string, Product[]> = {}
    data.products.forEach((product) => {
      if (!group[product.category]) {
        group[product.category] = []
      }
      group[product.category].push(product)
    })

    return Object.entries(group).map(([category, products]) => ({
      category,
      products,
    }))
  }, [data])

  const handlePressProduct = useCallback((productId: string) => {
    router.push(`/${productId}`)
  }, [router])

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error fetching products</Text>

  return (
    <BaseView>
      <ToggleTheme />

      <FlashList
        showsVerticalScrollIndicator={false}
        data={groupByCategoryProducts}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <ProductCategoryList
            category={item.category}
            products={item.products}
            onPress={handlePressProduct}
          />
        )}
      />
    </BaseView>
  )
}

export default Products

const styles = StyleSheet.create({})