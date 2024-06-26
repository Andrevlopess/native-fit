import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import React, { ForwardedRef, forwardRef } from 'react';
import { ActivityIndicator, ColorValue, StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type Size = 'small' | 'medium' | 'large';

type VariantStyles =
    Record<Variant,
        {
            container: StyleProp<ViewStyle>,
            text: StyleProp<TextStyle>
            activityIndicator: { color: ColorValue | undefined }
        }>;

interface IButton extends TouchableOpacityProps {
    text?: string;
    isLoading?: boolean;
    variant?: Variant;
    size?: Size;
    rounded?: boolean;
    textStyles?: StyleProp<TextStyle>;
}

function Button({ text, isLoading, textStyles, size = 'medium', variant = 'primary', rounded = false, ...props }: IButton,
    ref: ForwardedRef<TouchableOpacity>) {

    const disabled = props.disabled;

    const sizedStyles: Record<Size, StyleProp<ViewStyle>[]> = {
        small: [s.px12, s.py10],
        medium: [s.p16],
        large: [s.p18]
    }

    const textStylesBySize: Record<Size, StyleProp<TextStyle>[]> = {
        small: [s.textBase, s.semibold],
        medium: [s.textLG, s.bold],
        large: [s.textXL, s.bold]
    }

    const activityIndicatorSizes: Record<Size, number> = {
        large: 32,
        medium: 28,
        small: 24
    }

    const variantStyles: VariantStyles = {
        primary: {
            container: [
                disabled ? s.bgGray300 : s.bgIndigo600,
                sizedStyles[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,
                s.flexRow,
            ],
            text: [textStylesBySize[size], s.textWhite, s.px12],
            activityIndicator: { color: COLORS.white }
        },
        secondary: {
            container: [
                disabled ? s.bgGray50 : s.bgBlack,
                sizedStyles[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,

            ],
            text: [disabled ? s.textStone400 : s.textWhite, textStylesBySize[size], s.px12],
            activityIndicator: { color: COLORS.white }
        },
        tertiary: {
            container: [
                disabled ? s.bgGray50 : s.bgGray100,
                sizedStyles[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,

            ],
            text: [disabled ? s.textStone400 : s.textGray500, textStylesBySize[size]],
            activityIndicator: { color: COLORS.textGray }
        },
        ghost: {
            container: [
                sizedStyles[size],
                // s.py8,
                s.itemsCenter,
                s.justifyCenter,
            ],
            text: [textStylesBySize[size], s.px12, disabled ? s.textStone400 : s.textIndigo600],
            activityIndicator: { color: COLORS.indigo }
        }
    }



    return (
        <TouchableOpacity
            {...props}
            ref={ref}
            disabled={isLoading}
            activeOpacity={0.8}
            style={[
                variantStyles[variant].container,
                props.style
            ]}>
            {props.children
                ? props.children
                : text &&
                    isLoading
                    ? <ActivityIndicator 
                    color={variantStyles[variant].activityIndicator.color} 
                    size={activityIndicatorSizes[size]} />
                    : <Text style={[variantStyles[variant].text, textStyles]}>
                        {text}
                    </Text>}
            {
            }
        </TouchableOpacity>
    )
}

export default forwardRef(Button)