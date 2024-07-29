import COLORS from '@/constants/Colors'
import { Image } from 'expo-image'
import { SquareLibraryIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Library({ focused }: { focused: boolean }) {
    return focused
        ? <Image source={require('@/assets/icons/svg/Library.svg')}
            style={{
                height: 24, width: 24
            }} />

        : <SquareLibraryIcon size={30} color={COLORS.black} />
}