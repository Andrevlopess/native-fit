import { WorkoutApi } from '@/api/workout-api'
import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Animated, { useAnimatedRef, useSharedValue, withSpring } from 'react-native-reanimated'
import ExerciseListCard from '../exercise/ExerciseListCard'
import { WorkingOutExerciseCard } from '../exercise/working-out/WorkingOutExerciseCard'
import Button from '../ui/Button'
import { LineDivisor } from '../ui/Divisors'
import HeaderStepBar from '../ui/HeaderStepBar'
import LoadingView from '../views/LoadingView'
import RestingWorkoutView from './RestingWorkoutView'



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


    const [activeIndex, setActiveIndex] = useState(0);
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

        setIsResting(!isResting);
    };

    const handlePrev = () => {

        if (!isResting) {
            setActiveIndex((prev) => (prev - 1) % exercises.length);
        }

        setIsResting(!isResting);

        progress.value = withSpring(100 / (exercises.length - 1) * (activeIndex - 1), {
            stiffness: 500,
            damping: 60
        })
    };

    // layout={LinearTransition.springify().stiffness(500).damping(60)}

    const doing = exercises[activeIndex];

    return (
        <>
            {
                isPending
                    ? <LoadingView />
                    : !exercises.length
                        ? <Text>todo: create not found screen</Text>
                        : <>
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
                                            contentInsetAdjustmentBehavior='automatic'
                                            automaticallyAdjustKeyboardInsets
                                            style={[s.flex1]}
                                            contentContainerStyle={[s.py12, s.gap12, { paddingBottom: 96 }]}
                                        >

                                            <WorkingOutExerciseCard
                                                isLastExercise={isLastExercise}
                                                nextExercise={exercises[activeIndex + 1]}
                                                onCompletedExercise={handleNext}
                                                exercise={doing} />

                                        </ScrollView>
                                }
                            </View >

                        </>
            }

        </>


    )
}