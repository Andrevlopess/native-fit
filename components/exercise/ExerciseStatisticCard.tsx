import { ExerciseStatistics } from '@/api/workout-api'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'


const DEFAULT_IMAGE_SIZE = 70;
const EXPANDED_IMAGE_SIZE = SCREEN_WIDTH - 24;


interface IStatisticCard {
    exercise: IExercise,
    statistic: ExerciseStatistics
}



export default function ExerciseStatisticCard({ statistic }: { statistic: IExercise & ExerciseStatistics }) {


    return (
        <View>

            <Image
                // placeholder={
                //     require('@/assets/images/icon.png')
                // }
                source={statistic.gifurl}
                style={[s.radius8, { height: DEFAULT_IMAGE_SIZE, width: DEFAULT_IMAGE_SIZE }]} />
            <Text>{statistic.name}</Text>
            <Text>{statistic.best_serie_reps}</Text>
            <Text>{statistic.best_serie_weight}</Text>
            <Text>{statistic.target}</Text>
            <Text>{statistic.times_done}</Text>
            <Text>{statistic.name}</Text>
            <Text>{statistic.name}</Text>
        </View>
    )
}