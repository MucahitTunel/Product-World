import { Product } from '@/types/product'
import { FlashList } from '@shopify/flash-list'
import React, { memo } from 'react'
import { View } from 'react-native'
import ProductCard from './ProductCard'
import ProductHeader from './ProductHeader'

type Props = {
    category: string
    products: Product[]
    onPress: (productId: string) => void
}

const ProductCategoryList = (props: Props) => {
    return (
        <View className='mb-sm gap-sm'>
            <ProductHeader title={props.category} />
            <FlashList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={props.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={(productId: string) => props.onPress(productId)}
                    />
                )}
            />
        </View>
    )
}

export default memo(ProductCategoryList)