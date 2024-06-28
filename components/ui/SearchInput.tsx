import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Search } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeInLeft, FadeInRight, LinearTransition } from 'react-native-reanimated'

export default function SearchInput(props: TextInputProps) {


    if (device.ios) return null

    return (

        <View style={[s.flexRow, s.bgGray100, s.radius12, s.px12, s.py8, s.gap8]}>
            <Search color={COLORS.textGray} />
            <TextInput
                {...props}
                returnKeyType='search'
                autoCapitalize='none'
                enablesReturnKeyAutomatically
                style={[s.textBase, s.medium, s.flex1, { lineHeight: 20 }]}
                cursorColor={COLORS.textGray}
                placeholderTextColor={COLORS.textGray}
            />
        </View>

    )
}