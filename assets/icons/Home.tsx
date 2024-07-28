import COLORS from '@/constants/Colors'
import { HomeIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Home({ focused }: { focused: boolean }) {
    return focused
        ? <Svg width="21" height="22" viewBox="0 0 21 22" fill="none">
            <Path d="M1.125 8L10.125 1L19.125 8V19C19.125 19.5304 18.9143 20.0391 18.5392 20.4142C18.1641 20.7893 17.6554 21 17.125 21H13.625V11.5H9.5H8H6.125V21H3.125C2.59457 21 2.08586 20.7893 1.71079 20.4142C1.33571 20.0391 1.125 19.5304 1.125 19V8Z" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        : <HomeIcon size={24} color={COLORS.black} />
}