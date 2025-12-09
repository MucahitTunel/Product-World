import { Product } from '@/types/product'
import { Rating } from '@kolking/react-native-rating'
import { Image } from 'expo-image'
import React, { memo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import AppText from '../AppText'

type Props = {
    product: Product
    onPress: (productId: string) => void
}

const ProductCard = ({ product, onPress }: Props) => {
    return (
        <Pressable
            className='w-36 h-60 bg-white dark:bg-gray-800 rounded-lg p-sm mr-sm'
            onPress={() => onPress(product.id)}
        >
            {product.images && product.images.length > 0 && (
                <Image
                    source={product.images[0]}
                    style={styles.image}
                    contentFit='contain'
                    placeholder={'blur'}
                />
            )}
            <AppText
                weight='semibold'
                variant='xs'
                numberOfLines={2}
                ellipsizeMode='tail'
            >
                {product.title}
                <AppText
                    variant='xs'
                    weight='regular'
                    color='muted'>
                    {` ${product.description}`}
                </AppText>
            </AppText>
            <View className='flex-row items-center gap-1'>
                <Rating 
                    size={12}
                    rating={product.rating}
                />
                <AppText variant='xs' weight='regular' color='muted'>
                    ({product.reviews.length})
                </AppText>
            </View>
            <AppText variant='sm' color='default' weight='bold'>
                ${product.price.toFixed(2)}
            </AppText>
        </Pressable>
    )
}

export default memo(ProductCard)

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8
    }
})