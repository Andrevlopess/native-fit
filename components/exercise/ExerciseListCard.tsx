import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

interface ExerciseListCardProps {
    width?: number;
    exercise: IExercise;
    showsAddButton?: boolean;
    readOnly?: boolean;
}

export default function ExerciseListCard({ exercise, width, showsAddButton = true, readOnly = false }: ExerciseListCardProps) {

    return (
        <Link
            disabled={readOnly}
            href={`/(app)/(modals)/exercise-details/${exercise.id}`}
            // href={`/(app)/exercises/${exercise.id}`}
            asChild
            push
            style={[
                s.flexRow,
                s.gap16,
                // s.itemsCenter,
                s.bgWhite,
                s.px12,
                s.py8,
                { width }]}>
            <Pressable>
                <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>

                    <Image source={exercise.gifurl} style={[s.radius8,
                    { height: 70, width: 70, }
                    ]} />
                </View>


                <View style={[s.gap4, s.flex1]}>
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {exercise.name}
                    </Text>
                    <View style={[s.flexRow, s.gap6, s.itemsCenter]}>

                        <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
                        <View style={[s.bgGray400, s.radiusFull, { height: 4, width: 4 }]} />
                        <Text style={[s.regular, s.textGray400]}>{exercise.target}</Text>
                    </View>

                </View>

                {showsAddButton &&
                    <Link
                        style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p8]}
                        asChild
                        href={`/(app)/(modals)/add-to-workout/${exercise.id}`}
                    // href={`/(app)/teste`}
                    >
                        <TouchableOpacity activeOpacity={0.8}>
                            <PlusCircle color={COLORS.textGray} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </Link>
                }
            </Pressable>
        </Link>

    )
}