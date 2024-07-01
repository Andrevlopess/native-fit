import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import React from 'react';
import { ListRenderItem, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - PADDING * 4

const SectionIndicatorComponent = ({ inputRange, scrollX }: { inputRange: number[], scrollX: SharedValue<number>; }) => {

    const stepsIndicatorsAnimation = useAnimatedStyle(() => {
        return {
            width: interpolate(scrollX.value, inputRange, [6, 24, 6], Extrapolation.CLAMP),
            // height: interpolate(scrollX.value, inputRange, [6, 8, 6], Extrapolation.CLAMP),
            backgroundColor: interpolateColor(scrollX.value, inputRange, [
                `${COLORS.indigo}50`, `${COLORS.indigo}`, `${COLORS.indigo}50`
            ])
        };
    });


    return <Animated.View style={[
        s.bgIndigo500,
        s.radiusFull,
        stepsIndicatorsAnimation, { height: 6 }]} />

}

interface CarouselListProps {
    data: ArrayLike<any>,
    renderItem: ListRenderItem<any>,
    itemWidth?: number;
    gapBetweenItems?: number
}

export function CarouselList({ data, renderItem, itemWidth = CARD_WIDTH, gapBetweenItems = PADDING }: CarouselListProps) {

    const { offset, scrollHandler } = useScrollValue('x')

    return (
        <View style={[s.flex1]}>
            <Animated.FlatList
                onScroll={scrollHandler}
                // ref={animatedRef}
                scrollEventThrottle={16}
                snapToInterval={itemWidth + gapBetweenItems}
                decelerationRate={'fast'}
                contentContainerStyle={[
                    s.gap12,
                    s.p12,
                    { paddingHorizontal: gapBetweenItems * 2 }]}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                renderItem={renderItem}
            />

            <View style={[s.mxAuto, s.flexRow, s.gap4, s.itemsCenter, { paddingBottom: 12 }]}>
                {Array.from({ length: data.length }).map((_, index) => {

                    const inputRange = [
                        (index - 1) * itemWidth,
                        index * itemWidth,
                        (index + 1) * itemWidth,
                    ];

                    return <SectionIndicatorComponent
                        key={index}
                        inputRange={inputRange}
                        scrollX={offset}
                    />
                })}
            </View>
        </View>
    )
}