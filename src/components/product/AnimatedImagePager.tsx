import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type Props = {
    images: string[];
}

type RenderItemProps = {
    item: string;
}

type RenderDotProps = {
    index: number;
    scrollX: SharedValue<number>;
}

const ScreenWidth = SCREEN_WIDTH - 32;

const RenderItem = memo(({ item }: RenderItemProps) => {
    return (
        <View
            style={{ width: ScreenWidth, height: 256 }}
            className='justify-center items-center bg-gray-200 dark:bg-gray-800'>
            <Image
                source={item}
                style={styles.image}
                contentFit='contain'
            />
        </View>
    )
})

const RenderDot = ({ index, scrollX }: RenderDotProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * ScreenWidth,
            index * ScreenWidth,
            (index + 1) * ScreenWidth
        ]

        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1.4, 0.8],
            Extrapolation.CLAMP
        )

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
        )

        return {
            transform: [{ scale }],
            opacity
        }
    })

    return (
        <Animated.View
            className={'mx-1 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full'}
            style={animatedStyle}
        />
    )
}

const AnimatedImagePager = (props: Props) => {
    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        }
    })

    return (
        <View className='w-full'>
            <View style={{ width: SCREEN_WIDTH - 32, height: 256 }}>
                <Animated.FlatList
                    data={props.images}
                    horizontal
                    pagingEnabled
                    keyExtractor={(_, index) => index.toString()}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <RenderItem item={item} />
                    )}
                />
            </View>
            <View className='flex-row justify-center items-center mt-lg'>
                {props.images.map((_, index) => (
                    <RenderDot key={index} index={index} scrollX={scrollX} />
                ))}
            </View>
        </View>
    )
}

export default AnimatedImagePager

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    }
})