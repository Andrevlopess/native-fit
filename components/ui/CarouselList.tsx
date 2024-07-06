import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import React, { useState } from 'react';
import { FlatListProps, GestureResponderEvent, Pressable, PressableProps, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedRef, useAnimatedStyle } from 'react-native-reanimated';

const MARGIN_HORIZONTAL = 6;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
// const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
// const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2;


interface SectionIndicatorComponentProps extends PressableProps { inputRange: number[], scrollX: SharedValue<number> }
const SectionIndicatorComponent = ({ inputRange, scrollX, ...props }: SectionIndicatorComponentProps) => {

    const stepsIndicatorsAnimation = useAnimatedStyle(() => {
        return {
            width: interpolate(scrollX.value, inputRange, [6, 24, 6], Extrapolation.CLAMP),
            backgroundColor: interpolateColor(scrollX.value, inputRange, [
                `${COLORS.gray900}50`, `${COLORS.indigo}`, `${COLORS.indigo}50`
            ])
        };
    });

    return <Pressable
        {...props}
    >
        <Animated.View style={[s.bgIndigo500, s.radiusFull, stepsIndicatorsAnimation, { height: 6 }]} />
    </Pressable>
}

interface CarouselListProps<T> extends FlatListProps<T> {
    itemWidth?: number;
    marginHorizontal?: number
}

export function CarouselList<T>({
    itemWidth = ITEM_WIDTH,
    marginHorizontal = MARGIN_HORIZONTAL,
    ...props
}: CarouselListProps<T>) {

    const { offset, scrollHandler } = useScrollValue('x')

    const ITEM_FULL_WIDTH = itemWidth + marginHorizontal * 2;
    const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2;

    const flatlistRef = useAnimatedRef<Animated.FlatList<T>>()

    const handleScrollCarousel = (index: number) => flatlistRef.current?.scrollToIndex({ index: index })

    return (
        <View style={[s.flex1, s.gap24, s.py12]}>

            <Animated.FlatList
                ref={flatlistRef}

                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{ width: SPACER }}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ width: SPACER }}

                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={ITEM_FULL_WIDTH}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                horizontal

                {...props}
            />

            <View style={[s.mxAuto, s.flexRow, s.gap4, s.itemsCenter]}>
                {new Array(props.data?.length).fill(0).map((_, index) => {

                    const inputRange = [
                        (index - 1) * ITEM_FULL_WIDTH,
                        index * ITEM_FULL_WIDTH,
                        (index + 1) * ITEM_FULL_WIDTH,
                    ];

                    return <SectionIndicatorComponent
                        key={index}
                        onPress={() => handleScrollCarousel(index)}
                        inputRange={inputRange}
                        scrollX={offset}
                    />
                })}

            </View>
        </View>
    )
}