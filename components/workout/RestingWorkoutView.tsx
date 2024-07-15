import { View, Text } from 'react-native'
import React from 'react'
import { IExercise } from '@/types/exercise'
import { s } from '@/styles/global'
import ExerciseListCard from '../exercise/ExerciseListCard'
import Timer from '../ui/Timer'
import ExerciseDetailedCard from '../exercise/ExerciseDetailedCard'
import Animated from 'react-native-reanimated'
import { SCREEN_WIDTH } from '@/constants/Dimensions'

const IMAGE_SIZE = SCREEN_WIDTH * 0.6


interface RestingWorkoutViewProps {
    nextExercise: IExercise;
    onTimerEnd: () => void;
}

export default function RestingWorkoutView({ nextExercise, onTimerEnd }: RestingWorkoutViewProps) {
    return (

        <View style={[s.flex1, s.p12, s.gap24, { paddingBottom: 96 }]}>

            <Timer timer={3} onTimerEnd={onTimerEnd} />

            <View style={[s.gap24]}>

                <Text style={[s.semibold, s.textLG]}>Próximo exercício</Text>
                {/* <ExerciseListCard exercise={nextExercise} /> */}

                <Animated.Image
                    source={{ uri: nextExercise.gifurl }}
                    style={[s.radius8, s.mxAuto, s.bgGray100, s.border1, s.borderGray200, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

                <View style={[s.flexRow, s.gap12, s.itemsCenter]}>
                    <Text style={[s.semibold, s.textXL, s.px12, s.flex1]}>{nextExercise.name}</Text>
                    <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                    <Text style={[s.bold, s.textXL, s.textCenter, s.px12]}>4 x 12</Text>
                </View>
            </View>


        </View>
    )
}