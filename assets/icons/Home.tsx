import COLORS from '@/constants/Colors'
import { Image } from 'expo-image'
import { HomeIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Home({ focused }: { focused: boolean }) {
    return focused
        ? <Image source={require('@/assets/icons/svg/Home.svg')} 
        style={{height: 30, width: 30}}  />
        : <HomeIcon size={30} color={COLORS.black} />
}