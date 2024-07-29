import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import React from 'react'
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native'

interface LoadingViewProps {
    loadingColor?: string; 
    style?: StyleProp<ViewStyle>
}

export default function LoadingView({loadingColor = COLORS.black, style}:LoadingViewProps) {
    return (
        <View style={[s.itemsCenter, s.flex1, s.justifyCenter, s.bgWhite, s.p24, style]}>
            <ActivityIndicator color={loadingColor} size={32} />
        </View>
    )
}