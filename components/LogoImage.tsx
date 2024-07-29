import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { s } from '@/styles/global'

function LogoImage() {
    return (
        <Image
            style={{ height: 40, width: 80 }}
            source={require('@/assets/images/black-logo.svg')}
            contentFit='contain'
        />
    )
}

export default memo(LogoImage)