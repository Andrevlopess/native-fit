import { View, Text } from 'react-native'
import React from 'react'
import { IExercise } from '@/types/exercise'
import { s } from '@/styles/global'
import ExerciseListCard from '../exercise/ExerciseListCard'
import Timer from '../ui/Timer'



interface RestingWorkoutViewProps {
    nextExercise: IExercise;
    onTimerEnd: () => void;
}

export default function RestingWorkoutView({ nextExercise }: RestingWorkoutViewProps) {
    return (
        <View style={[s.flex1, s.p12]}>
            <Text style={[s.semibold, s.textLG]}>Próximo exercício</Text>
            <ExerciseListCard exercise={nextExercise} />


            <Text>Descanse</Text>
            <Timer />
        </View>
    )
}