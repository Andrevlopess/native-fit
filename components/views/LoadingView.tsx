import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import COLORS from '@/constants/Colors'

export default function LoadingView() {
    return (
        <View style={[s.itemsCenter, s.flex1, s.justifyCenter, s.bgWhite]}>
            <ActivityIndicator color={COLORS.indigo} size={32} />
        </View>
    )
}