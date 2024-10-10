import { s } from '@/styles/global';
import { device } from '@/utils/device';
import React from 'react';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';


interface AnimatedHeaderTitleProps {
    offset?: SharedValue<number>,
    title: string;
}

export default function AnimatedHeaderTitle({ offset, title }: AnimatedHeaderTitleProps) {


    const headerTitleAnimation = useAnimatedStyle(() => {

        if (!offset) return {}
        return {
            opacity: interpolate(offset.value, [30, 50], [0, 1]),
            transform: [
                {
                    translateY: interpolate(
                        offset.value,
                        [30, 50],
                        [-5, 0],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });


    return (
        <Animated.Text style={[s.bold, s.textLG, headerTitleAnimation]}>{title}</Animated.Text>
    )
}