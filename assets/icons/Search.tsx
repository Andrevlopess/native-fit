import COLORS from '@/constants/Colors'
import { Image } from 'expo-image'
import { SearchIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Search({ focused }: { focused: boolean }) {
    return focused
        ? <Image source={require('@/assets/icons/svg/Search.svg')}
            style={{ height: 30, width: 30 }} />
        : <SearchIcon size={30} color={COLORS.black} />
}