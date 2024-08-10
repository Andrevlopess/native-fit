import Button from '@/components/ui/Button'
import { LineDivisor } from '@/components/ui/Divisors'
import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
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
    exercise: IExercise;
    nextExercise: IExercise;
    isLastExercise: boolean;
    onCompletedExercise: () => void;
}


const SerieSchema = z.object({
    serie: z.object({
        weight: z.string().min(1, 'Adicione uma carga'),
        reps: z.string().min(1, 'Adicione repetições')
    }).array()
})

export type SerieValues = z.infer<typeof SerieSchema>


export function WorkingOutExerciseCard({ exercise, isLastExercise, nextExercise, onCompletedExercise }: WorkingOutExerciseCardProps) {



    const { control, handleSubmit, formState: { isDirty }, getValues } = useForm<SerieValues>({
        // resolver: zodResolver(SerieSchema),
        defaultValues: {
            serie: [{
                reps: '10',
                weight: ' 50.2'
            }]
        }
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "serie",
    });




    const handleCompleteExercise = (data: SerieValues) => {
        console.log('sefoder');

        console.log(data);
    }


    const handleRemoveSerie = (index: number) => {
        console.log(fields.length);

        if (fields.length === 1) return;
        remove(index)
    }

    const isLastSerieEmpty = fields[fields.length - 1].reps === '' || fields[fields.length - 1].weight === ''

    const handleInsertSerie = () => {

        if (isLastSerieEmpty) {
            console.log(' deu red');
            return;
        }

        append({ reps: '', weight: '' })
    }


    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                automaticallyAdjustKeyboardInsets
                style={[s.flex1]}
                contentContainerStyle={[s.gap24, s.py24, { paddingBottom: 96 }]}
            >


                <ExerciseDetailsCard exercise={exercise} />

                <LineDivisor />



                <View
                    style={[s.flex1, s.gap12, s.p12]}>
                    <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, { marginBottom: 12 }]}>
                        <Text style={[s.bold, s.textXL]}>Séries</Text>
                    </View>

                    {
                        fields.map((field, index) => <SeriesManager
                            key={field.id}
                            control={control}
                            field={field}
                            index={index}
                            handleRemove={handleRemoveSerie} />)
                    }

                    <Animated.View layout={LinearTransition.springify().stiffness(500).damping(60)}>
                        <Button
                            disabled={fields.length < 1 || isLastSerieEmpty}
                            variant='secondary'
                            text='Nova série'
                            size='small'
                            onPress={handleInsertSerie} />
                    </Animated.View>

                </View>






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

            </ScrollView>

            <LinearGradient
                locations={[0, 0.4]}
                // dither={false}
                colors={['transparent', COLORS.white]}
                style={[s.p12, s.absolute, s.flexRow, s.gap12,
                { bottom: 0, left: 0, right: 0, paddingTop: 24 }]}
            >

                <Button
                    disabled={!isDirty}
                    text={'Próximo'}
                    style={[s.flex1]}
                    onPress={handleSubmit(handleCompleteExercise)}
                />
            </LinearGradient>
        </>
    )
}