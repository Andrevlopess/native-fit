import { ExerciseApi } from '@/api/exercise-api'
import Button from '@/components/ui/Button'
import { LineDivisor } from '@/components/ui/Divisors'
import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated'
import { z } from 'zod'
import ExerciseListCard from '../ExerciseListCard'
import SeriesManager from './SeriesManager'

const IMAGE_SIZE = SCREEN_WIDTH * 0.9

const ExerciseDetailsCard = ({ exercise }: { exercise: IExercise }) => <View style={[s.gap12]}>
    <Animated.Image
        source={{ uri: exercise.gifurl }}
        style={[s.radius8, s.mxAuto, s.bgGray50, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

    <Animated.Text
        entering={FadeInDown}
        style={[s.bold, s.text2XL, s.textCenter, s.px12]}>{exercise.name}</Animated.Text>


    <Animated.View
        entering={FadeInDown.delay(80)}
        style={[s.gap12, s.justifyCenter, s.flexRow, s.itemsCenter, s.px4]}>

        <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.target}</Text>
        <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
        <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.bodypart}</Text>
        <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
        <Text style={[s.medium, s.textGray600, s.textLG]}>{exercise.equipment}</Text>

    </Animated.View>
</View>
interface WorkingOutExerciseCardProps {
    workoutId: string
    exercise: IExercise;
    nextExercise: IExercise;
    isLastExercise: boolean;
    onCompletedExercise: () => void;
}


const SerieSchema = z.object({
    serie: z.object({
        weight: z.string().min(1, 'Obrigatório'),
        reps: z.string().min(1, 'Obrigatório')
    }).array()
})

export type SerieValues = z.infer<typeof SerieSchema>

export function WorkingOutExerciseCard({
    exercise,
    isLastExercise,
    nextExercise,
    workoutId,
    onCompletedExercise,
}: WorkingOutExerciseCardProps) {

    const ref = useRef<ScrollView>(null)

    const { control, handleSubmit, formState: { isDirty }, getValues } = useForm<SerieValues>({
        resolver: zodResolver(SerieSchema),
        defaultValues: {
            serie: [{
                reps: '',
                weight: ''
            }]
        }
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "serie",
    });


    const { mutate, isPending } = useMutation({
        mutationFn: ExerciseApi.addSerie,
        onError: console.log
    })

    const handleCompleteExercise = (data: SerieValues) => {
        onCompletedExercise()
        mutate({
            exercise_id: exercise.id,
            workout_id: workoutId,
            series: data
        })
    }


    const handleRemoveSerie = (index: number) => {
        if (fields.length === 1) return;
        remove(index)
    }


    // const isLastSerieEmpty = fields[fields.length - 1].reps === '' || fields[fields.length - 1].weight === ''

    const handleInsertSerie = () => {
        append({ reps: '', weight: '' })
    }

    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                automaticallyAdjustKeyboardInsets
                style={[s.flex1]}
                contentContainerStyle={[s.gap24, s.py24, { paddingBottom: 96 }]}
                ref={ref}
            // onScroll={({nativeEvent}) => console.log(nativeEvent.contentOffset)}
            >

                <ExerciseDetailsCard exercise={exercise} />

                <LineDivisor />

                <View
                    style={[s.flex1, s.gap12, s.p12]}>
                    <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, { marginBottom: 12 }]}>
                        <Text style={[s.bold, s.textXL]}>Séries</Text>
                    </View>

                    {
                        fields.map((field, index) =>
                            <SeriesManager
                                onFocus={() => ref.current?.scrollTo({ 'y': 545, 'animated': true })}
                                // onBlur={() => ref.current?.scrollTo({ 'y': 0 })}
                                key={field.id}
                                control={control}
                                field={field}
                                index={index}
                                handleRemove={handleRemoveSerie} />)
                    }

                    <Animated.View layout={LinearTransition.springify().stiffness(500).damping(60)}>
                        <Button
                            disabled={fields.length < 1}
                            variant='secondary'
                            text='Nova série'
                            size='small'
                            onPress={handleInsertSerie} />
                    </Animated.View>

                </View>




                <LineDivisor text={
                    isLastExercise ? 'Você chegou ao fim' : 'Descanse 3 minutos'
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

            </ScrollView>

            <LinearGradient
                locations={[0, 0.4]}
                // dither={false}
                colors={['#FFFFFF00', COLORS.white]}
                style={[s.p12, s.absolute, s.flexRow, s.gap12,
                { bottom: 0, left: 0, right: 0, paddingTop: 24 }]}
            >

                <Button
                    isLoading={isPending}
                    disabled={!isDirty}
                    text={'Próximo'}
                    style={[s.flex1]}
                    onPress={handleSubmit(handleCompleteExercise)}
                />
            </LinearGradient>
        </>
    )
} 