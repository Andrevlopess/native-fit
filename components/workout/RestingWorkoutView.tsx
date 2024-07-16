import { View, Text } from 'react-native'
import React from 'react'
import { IExercise } from '@/types/exercise'
import { s } from '@/styles/global'
import ExerciseListCard from '../exercise/ExerciseListCard'
import Timer from '../ui/Timer'
import ExerciseDetailedCard from '../exercise/ExerciseDetailedCard'
import Animated from 'react-native-reanimated'
import { SCREEN_WIDTH } from '@/constants/Dimensions'

const IMAGE_SIZE = SCREEN_WIDTH * 0.3


interface RestingWorkoutViewProps {
    nextExercise: IExercise;
    onTimerEnd: () => void;
}

export default function RestingWorkoutView({ nextExercise, onTimerEnd }: RestingWorkoutViewProps) {
    return (

        <View style={[s.flex1, s.p12, s.gap24, { paddingBottom: 96 }]}>

            <View style={[s.flex1, s.itemsCenter, s.justifyCenter, s.gap12, s.bgGray50, s.radius12]}>
                <Text style={[s.text2XL, s.semibold]}>Respire um pouco</Text>
                <Timer timer={3} onTimerEnd={onTimerEnd} />

            </View>

            <View style={[s.gap12]}>
                <Text style={[s.semibold, s.textXL, s.textGray600]}>
                    Próximo exercício
                </Text>

                <ExerciseListCard
                    exercise={nextExercise}
                    showsAddButton={false} />
            </View>


        </View>
    )
}