import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import React from 'react';
import { Dimensions, FlatListProps, ListRenderItemInfo, View } from 'react-native';
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const MARGIN_HORIZONTAL = 6;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
interface AnimatedProps {
    inputRange: number[];
    scrollX: SharedValue<number>;
}

interface CardProps extends AnimatedProps {
    children: React.ReactNode;
    marginHorizontal: number;
}

export const CardComponent = ({ inputRange, scrollX, marginHorizontal, children }: CardProps) => {

    const cardAnimationScale = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(scrollX.value, inputRange, [0.9, 1, 0.9]),
                },
                {
                    translateY: interpolate(scrollX.value, inputRange, [10, 0, 10]),
                },
            ],
        };
    });

    return (
        <Animated.View style={[{ marginHorizontal }, cardAnimationScale, s.flex1]}>
            {children}
        </Animated.View>
    );
};

export const SectionIndicatorComponent = ({ inputRange, scrollX }: AnimatedProps) => {

    const stepsIndicatorsAnimation = useAnimatedStyle(() => {
        return {
            width: interpolate(scrollX.value, inputRange, [6, 24, 6], Extrapolation.CLAMP),
            height: 6,
            backgroundColor: interpolateColor(scrollX.value, inputRange,
                [COLORS.gray, COLORS.indigo, `${COLORS.indigo}50`]),
        };
    });

    return <Animated.View style={[stepsIndicatorsAnimation, { borderRadius: 50, height: 6, width: 6 }]} />;
};

interface CarouselListProps<T> extends FlatListProps<T> {
    itemWidth?: number;
    marginHorizontal?: number;
}

export function CarouselList<T>({
    itemWidth = ITEM_WIDTH,
    marginHorizontal = MARGIN_HORIZONTAL,
    //CarouselComponent,
    renderItem,
    ...props
}: CarouselListProps<T>) {

    const ITEM_FULL_WIDTH = itemWidth + marginHorizontal * 2;
    const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2;

    const { offset, scrollHandler } = useScrollValue('x')

    const renderItemWrapper = (info: ListRenderItemInfo<T>) => {

        const inputRange = [
            (info.index - 1) * ITEM_FULL_WIDTH,
            info.index * ITEM_FULL_WIDTH,
            (info.index + 1) * ITEM_FULL_WIDTH,
        ];


        if (!renderItem) return null
        return (
            <CardComponent
                inputRange={inputRange}
                marginHorizontal={marginHorizontal}
                scrollX={offset}>
                {renderItem(info)}
            </CardComponent>
        )
    }



    return (
        <View style={[s.py12, s.gap24]}>
            <Animated.FlatList
                //data={data}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{ width: SPACER }}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ width: SPACER }}

                renderItem={renderItemWrapper}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={ITEM_FULL_WIDTH}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                horizontal

                {...props}
            />

            <View
                style={[s.mxAuto, s.flexRow, s.gap4, s.itemsCenter]}>
                {new Array(props.data?.length).fill(0).map((_, index) => {
                    const inputRange = [
                        (index - 1) * ITEM_FULL_WIDTH,
                        index * ITEM_FULL_WIDTH,
                        (index + 1) * ITEM_FULL_WIDTH,
                    ];

                    return <SectionIndicatorComponent key={index} inputRange={inputRange} scrollX={offset} />;
                })}
            </View>
        </View>
    );
}
