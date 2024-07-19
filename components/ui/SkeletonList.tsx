import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import Skeleton from './Skeleton';


interface SkeletonListProps {
    length: number;
    skeletonHeight?: number;
}
export default function SkeletonList({
    length,
    skeletonHeight = 60
}: SkeletonListProps) {
    return (
        <View style={[s.gap12]}>
            {new Array(length).fill(0).map((_, i) => <Skeleton height={skeletonHeight} key={i} />)}
        </View>
    )
}
