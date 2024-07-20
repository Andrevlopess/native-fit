import { useWorkout } from '@/contexts/WorkoutContext'
import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { Link, router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'


interface WorkoutListCardProps {
    workout: IWorkout
    index?: number;
}

export const WorkoutListCard = ({ workout: { id, name, description }, index = 0 }: WorkoutListCardProps) => {

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    return (
        <Link
            href={{ pathname: `/(app)/workouts/${id}`, params: { name, description } }}
            asChild
            style={[s.flex1, s.flexRow, s.gap12]}
        // onLayout={({nativeEvent}) => console.log(nativeEvent.layout)}
        >
            <AnimatedPressable>

                <View style={[s.bgGray200, s.radius14, { height: 60, width: 60 }]} />
                <View style={[s.gap4]} >
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {name}
                    </Text>
                    <Text style={[s.regular, s.textGray400]}>{description}</Text>
                </View>
            </AnimatedPressable>

        </Link>
    )
}
