import { LineDivisor } from '@/components/ui/Divisors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import SeriesManager from './SeriesManager'

const IMAGE_SIZE = SCREEN_WIDTH * 0.9

interface WorkingOutExerciseCardProps {
    exercise: IExercise
}

export function WorkingOutExerciseCard({ exercise }: WorkingOutExerciseCardProps) {




    return (
        <View style={[s.gap24, s.py24]}>

            <Animated.Image
                source={{ uri: exercise.gifurl }}
                style={[s.radius8, s.mxAuto, s.bgGray50, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

            <Animated.Text
                entering={FadeInDown}
                style={[s.bold, s.text2XL, s.textCenter, s.px12]}>{exercise.name}</Animated.Text>

            <Animated.Text
                entering={FadeInDown.delay(50)}
                style={[s.bold, s.text4XL, s.textCenter, s.px12]}>4 x 12</Animated.Text>

            <Animated.View
                entering={FadeInDown.delay(80)}
                style={[s.gap12, s.justifyCenter, s.flexRow, s.itemsCenter, s.px4]}>

                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.target}</Text>
                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.bodypart}</Text>
                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.equipment}</Text>

            </Animated.View>

            <LineDivisor />
            <SeriesManager />


        </View>
    )
}