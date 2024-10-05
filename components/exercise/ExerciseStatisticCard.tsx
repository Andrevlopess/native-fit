import { ExerciseStatistics } from '@/api/workout-api'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'
import ExerciseListCard from './ExerciseListCard'


const DEFAULT_IMAGE_SIZE = 70;
const EXPANDED_IMAGE_SIZE = SCREEN_WIDTH - 24;

const PRMedal = ({ pr }: { pr: number }) =>
    <View style={[s.itemsCenter]}>
        <Image source={require('@/assets/icons/svg/PrMedal.svg')} style={[s.shadow3, { width: 150, height: 150 }]} />
        <Text style={[s.textBlack, s.black, s.text4XL, s.mt12]}>{pr} kg</Text>
        <Text style={[s.semibold, s.textLG, s.textGray600]}>Recorde pessoal</Text>
    </View>


const BestSerieMedal = ({ reps, weight }: { reps: number, weight: number }) =>
    <View style={[s.itemsCenter]}>
        <Image source={require('@/assets/icons/svg/BestSerieMedal.svg')} style={[s.shadow3, { width: 150, height: 150 }]} />
        <Text style={[s.textBlack, s.black, s.text4XL, s.mt12]}> {weight} kg</Text>
        <Text style={[s.bold, s.text2XL,s.textGray600]}>{reps} reps.</Text>

    </View>



export default function ExerciseStatisticCard({ statistic, exercise }: { statistic: ExerciseStatistics, exercise: IExercise }) {


    return (
        <View style={[s.mt12, s.borderBottom1, s.borderGray200, s.pb12]}>

            <ExerciseListCard exercise={exercise} showsAddButton={false} />
            <View style={[s.p12, s.gap12, s.flexRow, { justifyContent: 'space-around' }]}>
                <PRMedal pr={statistic.pr} />
                <BestSerieMedal reps={statistic.best_serie_reps} weight={statistic.best_serie_weight} />
            </View>
            <Text style={[s.p12, s.semibold, s.textLG, s.textCenter]}>Você já fez esse exercício {statistic.times_done} vezes</Text>

        </View>
    )

}