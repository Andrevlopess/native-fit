import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { s } from '@/styles/global'

function LogoImage() {
    return (
        <Image
            style={{ height: 30, width: 60 }}
            // source={require('@/assets/images/yafit.svg')}
            contentFit='contain'
        />
    )
}

export default memo(LogoImage)