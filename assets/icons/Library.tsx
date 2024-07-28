import COLORS from '@/constants/Colors'
import { SquareLibraryIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Library({ focused }: { focused: boolean }) {
    return focused
        ? <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" >
            <Path d="M17.5 1H3.5C2.39543 1 1.5 1.89543 1.5 3V17C1.5 18.1046 2.39543 19 3.5 19H17.5C18.6046 19 19.5 18.1046 19.5 17V3C19.5 1.89543 18.6046 1 17.5 1Z" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M5.5 5V15M9.5 5V15M13.5 5L15.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>

        : <SquareLibraryIcon size={24} color={COLORS.black} />
}