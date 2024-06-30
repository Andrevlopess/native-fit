import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'


interface ExerciseDetailedCardProps {
    exercise: IExercise;
    cardWitdh: number;
}
export default function ExerciseDetailedCard({ exercise, cardWitdh }: ExerciseDetailedCardProps) {
    return (
        <View style={[s.gap8]}>
            <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>

                <Image
                    source={exercise.gifurl}
                    style={[s.radius8,
                    { height: cardWitdh, width: cardWitdh, }
                    ]} />
            </View>


            <Text style={[s.text2XL, s.bold]}>{exercise.name}</Text>

            <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween, s.mt12]}>
                <Text style={[s.textGray600, s.medium]}>Músculo alvo</Text>
                <Text style={[s.semibold]}>{exercise.target}</Text>
            </View>
            <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween]}>
                <Text style={[s.textGray600, s.medium]}>Equipamento</Text>
                <Text style={[s.semibold]}>{exercise.equipment}</Text>
            </View>
            <View style={[s.py12, s.flexRow, s.justifyBetween]}>
                <Text style={[s.textGray600, s.medium]}>Parte do corpo</Text>
                <Text style={[s.semibold]}>{exercise.bodypart}</Text>
            </View>
        </View>
    )
}