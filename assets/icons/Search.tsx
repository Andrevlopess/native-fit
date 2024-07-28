import COLORS from '@/constants/Colors'
import { SearchIcon } from 'lucide-react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function Search({ focused }: { focused: boolean }) {
    return focused
        ? <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <Path d="M11.375 19C15.7933 19 19.375 15.4183 19.375 11C19.375 6.58172 15.7933 3 11.375 3C6.95672 3 3.375 6.58172 3.375 11C3.375 15.4183 6.95672 19 11.375 19Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M21.375 21.0002L17.075 16.7002" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        : <SearchIcon size={24} color={COLORS.black} />
}