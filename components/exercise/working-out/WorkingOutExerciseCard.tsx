import { LineDivisor } from '@/components/ui/Divisors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import SeriesManager from './SeriesManager'
import ExerciseListCard from '../ExerciseListCard'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '@/constants/Colors'
import Button from '@/components/ui/Button'

const IMAGE_SIZE = SCREEN_WIDTH * 0.9

interface WorkingOutExerciseCardProps {
    exercise: IExercise;
    nextExercise: IExercise;
    isLastExercise: boolean;
    onCompletedExercise: () => void;
}

export function WorkingOutExerciseCard({ exercise, isLastExercise, nextExercise, onCompletedExercise }: WorkingOutExerciseCardProps) {

    return (
        <View style={[s.gap24, s.py24]}>

            <Animated.Image
                source={{ uri: exercise.gifurl }}
                style={[s.radius8, s.mxAuto, s.bgGray50, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

            <Animated.Text
                entering={FadeInDown}
                style={[s.bold, s.text2XL, s.textCenter, s.px12]}>{exercise.name}</Animated.Text>

            <Animated.Text
                entering={FadeInDown.delay(50)}
                style={[s.bold, s.text4XL, s.textCenter, s.px12]}>4 x 12</Animated.Text>

            <Animated.View
                entering={FadeInDown.delay(80)}
                style={[s.gap12, s.justifyCenter, s.flexRow, s.itemsCenter, s.px4]}>

                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.target}</Text>
                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.bodypart}</Text>
                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.equipment}</Text>

            </Animated.View>

            <LineDivisor />

            <SeriesManager />

            <LineDivisor text={
                isLastExercise ? 'Você chegou ao fim' : 'Descanse 1 minuto'
            } />

            {!isLastExercise &&
                <View style={[s.p12, s.gap12]}>
                    <Text style={[s.semibold, s.textXL, s.textGray600]}>
                        Próximo exercício
                    </Text>

                    <ExerciseListCard
                        exercise={nextExercise}
                        showsAddButton={false} />
                </View>
            }


            <LinearGradient
                locations={[0, 0.4]}
                // dither={false}
                colors={['transparent', COLORS.white]}
                style={[s.p12, s.absolute, s.flexRow, s.gap12,
                { bottom: 0, left: 0, right: 0, paddingTop: 24 }]}
            >
                {/* {activeIndex !== 0 &&
                    <Button
                        text={'Voltar'}
                        onPress={handlePrev}
                        variant='secondary'
                    />
                } */}
                <Button
                    text={'Próximo'}
                    style={[s.flex1]}
                    onPress={onCompletedExercise}
                />
            </LinearGradient>
        </View>
    )
}