import { s } from '@/styles/global';
import { device } from '@/utils/device';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';


interface AnimatedLargeTitleProps {
    offset: SharedValue<number>,
    title: string;
    style?: StyleProp<TextStyle>
}


export default function AnimatedLargeTitle({ offset, title, style }: AnimatedLargeTitleProps) {

    if (device.ios) return null;

    const largeTitleAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        offset.value,
                        [-5, -100],
                        [0, 35],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        offset.value,
                        [-5, -100],
                        [1, 1.2],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });


    return (
        <Animated.Text style={[s.bold, s.text3XL, s.bgWhite, largeTitleAnimation, style]}>
            {title}
        </Animated.Text>
    )
}