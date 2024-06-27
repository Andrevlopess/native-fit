import { s } from '@/styles/global';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';


export interface BagdeProps extends TouchableOpacityProps {
    text: string;
    isSelected: boolean;
}

type Styles = {
    container: StyleProp<ViewStyle>[],
    text: StyleProp<TextStyle>[],
}

export function Badge({ text, isSelected, ...props }: BagdeProps) {


    const DefaultStyles: Styles = {
        container: [s.radius12, s.px16, s.py4, s.flexRow, s.gap4],
        text: [s.medium, s.textBase]
    }

    const SelectedStyles: Styles = {
        container: [s.bgIndigo100],
        text: [s.textIndigo700]
    }
    const UnselectedStyles: Styles = {
        container: [s.bgGray100],
        text: [s.textGray600]
    }

    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.8}
            style={[
                DefaultStyles.container,
                isSelected ? SelectedStyles.container : UnselectedStyles.container
            ]}>
            {/* <Animated.View
            entering={FadeIn}
            layout={LinearTransition.springify().stiffness(500).damping(60)}> */}

            {/* {isSelected && <Check color={COLORS.indigo} />} */}
            <Text style={[
                DefaultStyles.text,
                isSelected ? SelectedStyles.text : UnselectedStyles.text
            ]}>{text}</Text>
            {/* </Animated.View> */}
        </TouchableOpacity>
    )
}