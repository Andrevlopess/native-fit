import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'
import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Pressable, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Button from './ui/Button'
import * as Haptics from 'expo-haptics';
interface ExerciseListAddCardProps extends TouchableOpacityProps {
    width?: number;
    exercise: IExercise;
}

export default function ExerciseListAddCard({ exercise, width, onPress, ...props }: ExerciseListAddCardProps) {


    return (
        <TouchableOpacity
            {...props}
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                props.disabled && { opacity: 0.6 },
                s.flexRow,
                s.gap16,
                // s.itemsCenter,
                s.bgWhite,
                s.px12,
                s.py8,
                { width }]} >

            <TouchableOpacity
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    router.navigate({
                        pathname: `/(modals)/exercise-details/${exercise.id}`,
                        params: {
                            name: exercise.name,
                            bodypart: exercise.bodypart,
                            gifurl: exercise.gifurl,
                            equipment: exercise.equipment,
                            target: exercise.target
                        }
                    })
                }}

                style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>

                <Image
                    source={exercise.gifurl}
                    style={[s.radius8,
                    { height: 70, width: 70, },
                    // props.disabled && { opacity: 0.5 }
                 ]} 
                    />
            </TouchableOpacity>


            <View style={[s.gap4, s.flex1]}>
                <Text
                    style={[s.medium, s.textBase, { lineHeight: 18 }]}
                    numberOfLines={2}>
                    {exercise.name}
                </Text>
                <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>


                {/* <Button text='Adicionar' size='small' variant='secondary'rounded/> */}
            </View>


            <View
                style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p6]}
            >
                <PlusCircle color={COLORS.gray900} strokeWidth={2} size={28} />
            </View>


        </ TouchableOpacity>

    )
}