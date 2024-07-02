import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'
import Button from './ui/Button'
import { Ellipsis } from 'lucide-react-native'
import COLORS from '@/constants/Colors'


interface ExerciseDetailedCardProps {
    exercise: IExercise;
    cardWitdh: number;
    marginHorizontal: number
}
export default function ExerciseDetailedCard({
    exercise,
    cardWitdh,
    marginHorizontal }: ExerciseDetailedCardProps) {
    return (
        <View style={[s.gap8, s.flex1, { maxWidth: cardWitdh, marginHorizontal }]}>
            <View style={[s.bgWhite, s.shadow3]}>
                <Image
                    source={{}}
                    style={[s.radius8, { height: cardWitdh, width: cardWitdh, }
                    ]} />
            </View>


            <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, s.mtAuto, s.gap8]}>
                <Text style={[s.textXL, s.bold,s.flex1]}>{exercise.name}</Text>

                <Button rounded size='small' variant='ghost'>
                    <Ellipsis color={COLORS.gray900} />
                </Button>

            </View>

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