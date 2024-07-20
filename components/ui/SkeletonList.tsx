import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import Skeleton from './Skeleton';


interface SkeletonListProps {
    length: number;
    skeletonHeight?: number;
    contentContainerStyles?: StyleProp<ViewStyle>
}
export default function SkeletonList({
    length,
    skeletonHeight = 60,
    contentContainerStyles
}: SkeletonListProps) {
    return (
        <View style={[s.gap12, contentContainerStyles]}>
            {new Array(length).fill(0).map((_, i) => <Skeleton height={skeletonHeight} key={i} />)}
        </View>
    )
}
