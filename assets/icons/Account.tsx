import COLORS from '@/constants/Colors'
import { Image } from 'expo-image'
import { UserCircle, UserCircle2 } from 'lucide-react-native'
import React from 'react'

export default function Account({ focused }: { focused: boolean }) {
    return focused
        ? <Image source={require('@/assets/icons/svg/Account.svg')}
            style={{
                height: 30, width: 30
            }} />

        : <UserCircle2 size={30} color={COLORS.black} />
}