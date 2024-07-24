import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Animated, { FadeInDown, useAnimatedRef, useSharedValue, withSpring } from 'react-native-reanimated'
import ExerciseListCard from '../exercise/ExerciseListCard'
import Button from '../ui/Button'
import Divisor from '../ui/Divisor'
import HeaderStepBar from '../ui/HeaderStepBar'
import RestingWorkoutView from './RestingWorkoutView'
import { WorkoutApi } from '@/api/workout-api'
import { useQuery } from '@tanstack/react-query'
const IMAGE_SIZE = SCREEN_WIDTH * 0.9


interface IWorkingOutFlowProps {
    // exercises: IExercise[];
    workoutId: string;
    onWorkoutCompleted: (id: string) => void;
}

export default function WorkingOutFlow({ workoutId, onWorkoutCompleted }: IWorkingOutFlowProps) {

    const { data: exercises = [], isPending, isError } = useQuery({
        queryKey: ['workout-exercises', workoutId],
        queryFn: () => WorkoutApi.fetchExercises({ id: workoutId })
    })


    const [activeIndex, setActiveIndex] = useState(exercises.length - 1);
    const [isResting, setIsResting] = useState(false)

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const progress = useSharedValue(0);

    const isLastExercise = activeIndex === exercises.length - 1;

    const handleNext = () => {

        if (isLastExercise && !isResting) {
            onWorkoutCompleted(workoutId);
            router.back();
            return;
        }

        if (!isResting) {
            setActiveIndex((prev) => (prev + 1) % exercises.length);

            progress.value = withSpring(100 / (exercises.length - 1) * (activeIndex + 1), {
                stiffness: 500,
                damping: 60
            })
        }

        setIsResting(isResting ? false : true);
        // setIsResting(isResting ? false : true);
        // scrollRef.current?.scrollTo({ y: activeIndex * 200 })


    };

    const handlePrev = () => {

        if (!isResting) {
            setActiveIndex((prev) => (prev - 1) % exercises.length);
        }

        setIsResting(isResting ? false : true);

        progress.value = withSpring(100 / (exercises.length - 1) * (activeIndex - 1), {
            stiffness: 500,
            damping: 60
        })
    };

    // layout={LinearTransition.springify().stiffness(500).damping(60)}

    const doing = exercises[activeIndex];


    return (
        <>
            <HeaderStepBar progress={progress} />

            <View
                style={[s.flex1, s.bgWhite, s.gap4]}
            // stickyHeaderIndices={[0]}
            >

                {
                    isResting
                        ? <RestingWorkoutView
                            nextExercise={exercises[activeIndex]}
                            // onTimerEnd={() => {}}
                            onTimerEnd={handleNext}
                        />
                        :
                        <ScrollView
                            style={[s.flex1]}
                            contentContainerStyle={[s.py12, s.gap12, { paddingBottom: 96 }]}
                        >
                            {/* <Button text='reset' onPress={() => {
                                setIsResting(false)
                                setActiveIndex(0),
                                    progress.value = 0
                            }} variant='secondary' size='small' /> */}

                            <View style={[s.gap24, s.py24]}>

                                <Animated.Image
                                    source={{ uri: doing.gifurl }}
                                    style={[s.radius8, s.mxAuto, s.bgGray50, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

                                <Animated.Text
                                    entering={FadeInDown}
                                    style={[s.bold, s.text2XL, s.textCenter, s.px12]}>{doing.name}</Animated.Text>

                                <Animated.Text
                                    entering={FadeInDown.delay(50)}
                                    style={[s.bold, s.text4XL, s.textCenter, s.px12]}>4 x 12</Animated.Text>

                                <Animated.View
                                    entering={FadeInDown.delay(80)}
                                    style={[s.gap12, s.justifyCenter, s.flexRow, s.itemsCenter, s.px4]}>

                                    <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.target}</Text>
                                    <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                                    <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.bodypart}</Text>
                                    <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                                    <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.equipment}</Text>
                                </Animated.View>

                            </View>


                            <Divisor text={
                                isLastExercise ? 'Você chegou ao fim' : 'Descanse 1 minuto'
                            } />

                            {!isLastExercise &&
                                <View style={[s.p12, s.gap12]}>
                                    <Text style={[s.semibold, s.textXL, s.textGray600]}>
                                        Próximo exercício
                                    </Text>

                                    <ExerciseListCard
                                        exercise={exercises[activeIndex + 1]}
                                        showsAddButton={false} />
                                </View>
                            }
                        </ScrollView>
                }


                <LinearGradient
                    locations={[0, 0.4]}
                    dither={false}
                    colors={['transparent', COLORS.white]}
                    style={[s.p12, s.absolute, s.flexRow, s.gap12,
                    { bottom: 0, left: 0, right: 0, paddingTop: 24 }]}
                >

                    {activeIndex !== 0 &&
                        <Button
                            text={'Voltar'}
                            onPress={handlePrev}
                            variant='secondary'
                        />
                    }
                    <Button
                        text={isLastExercise
                            ? 'Finalizar'
                            : isResting
                                ? 'Estou pronto'
                                : 'Próximo'
                        }
                        style={[s.flex1]}
                        onPress={handleNext}
                    />
                </LinearGradient>



            </View >
        </>


    )
}