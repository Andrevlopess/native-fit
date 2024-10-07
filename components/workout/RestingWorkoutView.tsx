import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React from 'react'
import { Text, View } from 'react-native'
import ExerciseListCard from '../exercise/ExerciseListCard'
import Timer from '../ui/Timer'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '@/constants/Colors'
import Button from '../ui/Button'
import { ScrollView } from 'react-native-gesture-handler'

const IMAGE_SIZE = SCREEN_WIDTH * 0.3


interface RestingWorkoutViewProps {
    nextExercise: IExercise;
    onTimerEnd: () => void;
}

export default function RestingWorkoutView({ nextExercise, onTimerEnd }: RestingWorkoutViewProps) {
    return (

        <View style={[s.flex1, s.p12, s.gap24]}>

            <View style={[s.itemsCenter, s.justifyCenter, s.gap12, s.bgGray50, s.radius12,s.py64]}>
                <Text style={[s.text2XL, s.semibold]}>Respire um pouco</Text>
                <Timer timer={60 * 3} onTimerEnd={onTimerEnd} />

            </View>

            <View style={[]}>
                <Text style={[s.semibold, s.textXL, s.textGray600]}>
                    Próximo exercício
                </Text>


                <ExerciseListCard
                    exercise={nextExercise}
                    showsAddButton={false} />

            </View>


            <Button
                text={'Estou pronto'}
                style={[s.mtAuto]}
                onPress={onTimerEnd}
            />

        </View>
    )
}