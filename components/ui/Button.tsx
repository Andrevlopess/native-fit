import COLORS from '@/constants/Colors';
import { s } from '@/styles/global';
import { ExpoRouter, Href, Link } from 'expo-router';
import { LinkComponent, LinkProps } from 'expo-router/build/link/Link';

import React, { Children, ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { ActivityIndicator, ColorValue, StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';


type Variant = 'primary' | 'secondary' | 'ghost';
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
    asLink?: Href<LinkProps<any>>
}

function Button({ text,
    isLoading,
    textStyles,
    asLink,
    size = 'medium',
    variant = 'primary',
    rounded = false,
    style,
    ...props
}: IButton,
    ref: ForwardedRef<TouchableOpacity>) {

    const disabled = props.disabled;

    const sizedStyles: Record<Size, StyleProp<ViewStyle>[]> = {
        small: [s.px8, s.py8],
        medium: [s.px12, s.py10],
        large: [s.p14]
    }

    const textStylesBySize: Record<Size, StyleProp<TextStyle>[]> = {
        small: [s.textSM, s.semibold],
        medium: [s.textBase, s.semibold],
        large: [s.textXL, s.bold]
    }

    const activityIndicatorSizes: Record<Size, number> = {
        large: 31,
        medium: 27,
        small: 22
    }

    const variantStyles: VariantStyles = {
        primary: {
            container: [
                disabled ? s.bgStone200 : s.bgBlack,
                rounded ? s.radiusFull : s.radius12,
                sizedStyles[size],
                s.flexRow,
                s.itemsCenter,
                s.justifyCenter,
            ],
            text: [disabled ? s.textStone400 : s.textWhite, textStylesBySize[size], s.px12],
            activityIndicator: { color: COLORS.white }
        },
        secondary: {
            container: [
                disabled ? s.bgStone50 : s.bgGray200,
                rounded ? s.radiusFull : s.radius12,
                sizedStyles[size],
                s.flexRow,
                s.itemsCenter,
                s.justifyCenter,
            ],
            text: [disabled ? s.textStone300 : s.textBlack, textStylesBySize[size], s.px12],
            activityIndicator: { color: COLORS.black }
        },
        ghost: {
            container: [
                sizedStyles[size],
                s.itemsCenter,
                s.justifyCenter,
                s.flexRow,
            ],
            text: [textStylesBySize[size], s.px12, disabled ? s.textStone300 : s.textBlack],
            activityIndicator: { color: COLORS.black }
        }
    }

    if (asLink) return (
        <Link href={asLink}
            asChild
            style={[
                variantStyles[variant].container,
                style
            ]}>
            <TouchableOpacity
                {...props}
                ref={ref}
                disabled={isLoading || props.disabled}
                activeOpacity={0.8}
            >
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
            </TouchableOpacity>
        </Link>

    )

    return (
        <TouchableOpacity
            {...props}
            ref={ref}
            disabled={isLoading || props.disabled}
            activeOpacity={0.8}
            style={[
                variantStyles[variant].container,
                style
            ]}>
            {text &&
                isLoading
                ? <ActivityIndicator
                    color={variantStyles[variant].activityIndicator.color}
                    size={activityIndicatorSizes[size]} />
                : <>
                    {props.children}
                    <Text style={[variantStyles[variant].text, textStyles]}>{text}</Text>
                </>}
        </TouchableOpacity >
    )

}

export default forwardRef(Button)