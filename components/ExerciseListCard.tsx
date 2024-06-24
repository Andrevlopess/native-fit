import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IExercise } from '@/types/exercise'
import { s } from '@/styles/global'
import { Image } from 'expo-image'
import Button from './ui/Button'
import { Plus, PlusCircle } from 'lucide-react-native'
import COLORS from '@/constants/Colors'
import { Link } from 'expo-router'
import { SCREEN_WIDTH } from '@/constants/Dimensions'

interface ExerciseListCardProps {
    width?: number;
    exercise: IExercise
}

export default function ExerciseListCard({ exercise, width }: ExerciseListCardProps) {
    return (
        <Link
            href={`/(app)/exercises/${exercise.id}`}
            asChild
            style={[
                s.flexRow,
                s.gap20,
                s.flex1,
                s.itemsCenter,
                s.borderBottom1,
                s.borderGray100,
                { width, paddingBottom: 12 }]}>


            <TouchableOpacity activeOpacity={0.8}>
                <Image source={exercise.gifurl} style={[
                    s.bgGray50,
                    s.border1, s.borderGray100,
                    s.p12, s.radius14,
                    { height: 70, width: 70 }
                ]} />

                <View style={[s.gap4, s.flex1]}>
                    <Text
                        style={[s.bold, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {exercise.name}
                    </Text>
                    <Text style={[s.medium, s.textGray400]}>{exercise.bodypart}</Text>
                </View>


                <Link style={[s.mrAuto, s.myAuto]} asChild href={`/(app)/(modals)/add-to-workout/${exercise.id}`}>
                    <Button variant='tertiary' size='small' rounded>
                        <PlusCircle color={COLORS.textGray} strokeWidth={2.5} />
                    </Button>
                </Link>

            </TouchableOpacity>


        </Link>
    )
}