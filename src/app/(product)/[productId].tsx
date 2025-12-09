import BaseView from '@/components/BaseView'
import { DeleteButton } from '@/components/Buttons'
import CustomHeader from '@/components/CustomHeader'
import { FullPageLoading } from '@/components/Loading'
import AnimatedImagePager from '@/components/product/AnimatedImagePager'
import { useFetchProductByIdQuery } from '@/services/api/productApi'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'

type Props = {}

const ProductDetail = (props: Props) => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () =>
                <CustomHeader 
                    headerRightComponent={<DeleteButton onPress={() => {}} />}
                />
        })
    }, [navigation]);

    const params = useLocalSearchParams();
    const productId = params.productId as string;

    const { data, error, isLoading } = useFetchProductByIdQuery(productId);

    if (isLoading) return <FullPageLoading />;

    return (
        <BaseView>
            {/* Render Image */}
            <View>
                {/* Placeholder for product image */}
                <AnimatedImagePager
                    images={data ? data.images : []}
                />
            </View>
            {/* Render Product Details */}
            <View>
                {/* Placeholder for product details */}
            </View>

        </BaseView>
    )
}

export default ProductDetail