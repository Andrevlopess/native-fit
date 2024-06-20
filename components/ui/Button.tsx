import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import React, { ForwardedRef, forwardRef } from 'react';
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type Size = 'small' | 'medium' | 'large';

type VariantStyles =
    Record<Variant,
        { container: StyleProp<ViewStyle>, text: StyleProp<TextStyle> }>;

interface IButton extends TouchableOpacityProps {
    text?: string;
    isLoading?: boolean;
    variant?: Variant;
    size?: Size;
    rounded?: boolean;
    textStyles?: StyleProp<TextStyle>
}

function Button({ text, isLoading, textStyles, size = 'medium', variant = 'primary', rounded = false, ...props }: IButton,
    ref: ForwardedRef<TouchableOpacity>) {

    const disabled = props.disabled;

    const paddingBySize: Record<Size, StyleProp<ViewStyle>[]> = {
        small: [s.p12],
        medium: [s.p16],
        large: [s.p18]
    }

    const textStylesBySize: Record<Size, StyleProp<TextStyle>[]> = {
        small: [s.textSM, s.semibold],
        medium: [s.textLG, s.bold],
        large: [s.textXL, s.extrabold]
    }

    const variantStyles: VariantStyles = {
        primary: {
            container: [
                disabled ? s.bgGray300 : s.bgIndigo600,
                paddingBySize[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,
                s.flexRow,
            ],
            text: [textStylesBySize[size], s.textWhite, s.px12]
        },
        secondary: {
            container: [
                disabled ? s.bgGray50 : s.bgBlack,
                paddingBySize[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,

            ],
            text: [disabled ? s.textStone400 : s.textWhite, textStylesBySize[size], s.px12]
        },
        tertiary: {
            container: [
                disabled ? s.bgGray50 : s.bgGray100,
                paddingBySize[size],
                rounded ? s.radiusFull : s.radius12,
                s.itemsCenter,
                s.justifyCenter,

            ],
            text: [disabled ? s.textStone400 : s.textGray500, textStylesBySize[size]]
        },
        ghost: {
            container: [
                paddingBySize[size],
                // s.py8,
                s.itemsCenter,
                s.justifyCenter,
            ],
            text: [textStylesBySize[size], s.px12, disabled ? s.textStone400 : s.textIndigo600]
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
            {props.children && props.children}
            {text &&
                isLoading
                ? <ActivityIndicator color={COLORS.white} size={28} />
                : <Text style={[variantStyles[variant].text, textStyles]}>
                    {text}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default forwardRef(Button)