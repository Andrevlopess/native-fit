import COLORS from "@/constants/Colors";
import { LayoutTransition } from "@/constants/Transitions";
import { s } from "@/styles/global";
import { Portal } from "@gorhom/portal";
import { padding } from "aes-js";
import React, { ElementType, useEffect, useState } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Variant = 'error' | "success" | "default";
type Position = 'bottom' | 'top';

const ContainerStyles: Record<Variant, StyleProp<ViewStyle>> = {
    default: [s.bgStone800],
    error: [s.bgRed500],
    success: [s.bgGreen500],
}
const TextStyles: Record<Variant, StyleProp<TextStyle>> = {
    default: [s.textWhite],
    error: [s.textWhite],
    success: [s.textWhite],
}

interface SnackbarProps {
    message: string
    icon?: ElementType
    actionText?: string
    variant?: Variant
    onActionPress?: () => void;
    duration?: number
    position?: Position;
    containerStyle?: StyleProp<ViewStyle>
    isLoading?: boolean;
}



export const Snackbar = ({
    message,
    actionText,
    variant = 'default',
    duration = 1500, // Default duration in milliseconds
    position = "bottom",
    containerStyle,
    icon: Icon,
    isLoading = false,
    onActionPress
}: SnackbarProps) => {

    const insets = useSafeAreaInsets()

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [isVisible, duration]);

    if (!isVisible) return null;

    return (
        <Portal>
            <Animated.View
                entering={
                    position === "top"
                        ? FadeInUp.stiffness(500).damping(60)
                        : FadeInDown.stiffness(500).damping(60)}
                exiting={
                    position === "top"
                        ? FadeOutUp.stiffness(500).damping(60)
                        : FadeOutDown.stiffness(500).damping(60)}
                layout={LayoutTransition}
                style={[
                    s.mx12,
                    s.absolute,
                    s.radius12,
                    s.shadow6,
                    s.flexRow,
                    s.justifyBetween,
                    s.itemsCenter,
                    s.py12,
                    s.px16,
                    s.gap12,
                    { zIndex: 999 },
                    position === "top" ? { top: insets.top + 15 } : { bottom: 15 },
                    ContainerStyles[variant],
                    containerStyle,
                ]}
            >
                {isLoading
                    ? <ActivityIndicator color={COLORS.white} size={24} />
                    : Icon && <Icon size={24} color={COLORS.white} />
                }

                <Text style={[
                    s.flex1,
                    s.medium,
                    s.textBase,
                    TextStyles[variant]]}>
                    {message}
                </Text>
                {actionText && (
                    <TouchableOpacity onPress={onActionPress} activeOpacity={0.8}>
                        <Text
                            style={[
                                s.semibold,
                                s.textBase,
                                s.mlAuto,
                                TextStyles[variant]
                            ]}
                        >
                            {actionText}
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </Portal>
    )


};
