import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { s } from '@/styles/global';
import COLORS from '@/constants/Colors';


interface LineDivisorProps {
    text?: string;
    color?: string
    lineHeight?: number
    styles?: StyleProp<ViewStyle>;
}

export const LineDivisor = ({
    styles,
    color = COLORS.gray,
    text,
    lineHeight = 1,
}: LineDivisorProps) => {

    return (
        <View style={[s.itemsCenter, s.justifyBetween, s.gap12, s.flexRow, styles]}>
            <View style={[s.bgGray100, s.flex1, { height: lineHeight, backgroundColor: color }]} />
            {text &&
                <>
                    <Text style={[s.textBase, s.textGray600, s.semibold]}>{text}</Text>
                    <View style={[s.bgGray100, s.flex1, { height: lineHeight, backgroundColor: color }]} />
                </>

            }
        </View>
    )
}

interface CircleDivisorProps {
    color?: string
    size?: number
    styles?: StyleProp<ViewStyle>;
}

export default function CircleDivisor({
    styles,
    color = COLORS.gray,
    size = 4
}: CircleDivisorProps) {

    return (

        <View style={[
            s.bgGray400,
            s.radiusFull,
            styles,
            { height: size, width: size, backgroundColor: color }]} />
    )
}