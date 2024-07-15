import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global';
import COLORS from '@/constants/Colors';

interface DivisorProps {
    text?: string;
    color?: string
    lineHeight?: number
}

export default function Divisor({ color = COLORS.gray, text, lineHeight = 1 }: DivisorProps) {
    return (
        <View style={[s.itemsCenter, s.justifyBetween, s.gap12, s.flexRow]}>
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