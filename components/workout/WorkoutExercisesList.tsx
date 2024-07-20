import COLORS from '@/constants/Colors'
import { useFetchWorkoutExercises } from '@/hooks/useFetchWorkoutExercises'
import { supabase } from '@/lib/supabase'
import { s } from '@/styles/global'
import { Link } from 'expo-router'
import { Inbox, Plus } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import SwipeableExerciseListCard from '../exercise/ExerciseListSwipeableCard'
import Button from '../ui/Button'
import SkeletonList from '../ui/SkeletonList'
import MessageView from '../views/MessageView'
import { IDetailedExercise, IExercise } from '@/types/exercise'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import ExerciseListCard from '../exercise/ExerciseListCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AddExerciseCard = ({ id }: { id: string }) =>
    <Link asChild href={`/exercises-to-add/${id}`} style={[s.flexRow, s.gap16, s.itemsCenter, s.px12, s.mt8]}>
        <TouchableOpacity activeOpacity={0.8}>
            <View style={[s.radius12, s.bgGray200, s.itemsCenter, s.justifyCenter,
            { height: 70, width: 70 }]}>
                <Plus color={COLORS.white} />
            </View>
            <Text style={[s.textBase, s.medium]}>Adicionar exercício</Text>
        </TouchableOpacity>
    </Link>

interface RemoveExerciseParams {
    exerciseId: string,
    workoutId: string
}

const removeExerciseFromWorkout = async ({ exerciseId, workoutId }: RemoveExerciseParams) => {
    try {
        let { data: deletedExercise, error } = await supabase
            .from('workout_exercises')
            .delete()
            .eq('workout_id', workoutId)
            .eq('exercise_id', exerciseId)
            .select('exercise_id')
            .single();

        if (error) throw error;

        return deletedExercise;
    } catch (error) {
        if (!axios.isAxiosError(error)) throw error;
        throw new Error(
            error.response?.data.error || "Ocorreu um erro inesperado!"
        );
    }
}



interface WorkoutExercisesListProps {
    workoutId: string
}

export default function WorkoutExercisesList({ workoutId }: WorkoutExercisesListProps) {

    const { data: exercises, isPending } = useFetchWorkoutExercises(workoutId)

    const queryClient = useQueryClient();

    const { mutate, isPending: isRemoving } = useMutation({
        mutationKey: ['remove-exercise-from-workout', workoutId],
        mutationFn: removeExerciseFromWorkout,
        onSuccess: (res) => {

            console.log('just completed now');

            // const filteredArray = exercises?.filter(exercise => exercise.id !== res?.exercise_id);

            // console.log(filteredArray);


            // queryClient.setQueryData(
            //     ["workout-exercises", workoutId],
            //     (prev: any) => {
            //         if (!prev) return [];
            //         return filteredArray
            //     }
            // );

            queryClient.invalidateQueries({
                queryKey: ["workout-exercises", workoutId]
            })

        }

    })

    const handleRemoveExerciseFromWorkout = (id: string) => {
        console.log('swipeeeeed');
        mutate({ exerciseId: id, workoutId: workoutId })
        const filteredArray = exercises?.filter(exercise => exercise.id !== id);

        console.log(filteredArray);


        queryClient.setQueryData(
            ["workout-exercises", workoutId],
            (prev: any) => {
                if (!prev) return [];
                return filteredArray
            }
        );
    }

    const renderItem = ({ item }: { item: IExercise }) =>
        <SwipeableExerciseListCard
            exercise={item}
            onSwipeToRemove={handleRemoveExerciseFromWorkout}
        />

    const EmptyComponent = () =>
        <MessageView
            icon={Inbox}
            message='Nenhum exercício'
            description='Adicione exercícios ao seu treino!'>
            <Button
                text='Adicionar exercício'
                size='small'
                variant='secondary'
                asLink={`/exercises-to-add/${workoutId}`} />
        </MessageView>


    return (
        <>

            <View style={[s.itemsCenter, s.flexRow, s.gap12, s.mt36, s.p12]}>
                <Text style={[s.bold, s.textXL]}>Exercícios</Text>

                {
                    !!exercises?.length &&
                    <>
                        <View style={[
                            s.bgGray800,
                            s.radiusFull,
                            { height: 8, width: 8 }]} />

                        <Text style={[s.bold, s.textXL]}>
                            {exercises?.length}
                        </Text>
                    </>

                }



                <Link asChild href={`/(app)/(modals)/exercises-to-add/${workoutId}`} style={[s.mlAuto]}>
                    <Button variant='tertiary' size='small' rounded>
                        <Plus color={COLORS.gray900} />
                    </Button>
                </Link>

                {!!exercises?.length &&
                    <Button
                        text='Iniciar treino'
                        asLink={{ pathname: `/working-out/${workoutId}` }}
                        size='small'
                        rounded
                    />
                }

            </View>


            <View style={[s.mt12, s.flex1]} >
                {isPending
                    ? <SkeletonList length={5} skeletonHeight={80} contentContainerStyles={[s.p12]} />
                    : !exercises?.length
                        ? <EmptyComponent />
                        : <>
                            {exercises.map((exercise, i) =>
                                <Animated.View
                                    key={exercise.id}
                                    entering={FadeIn.springify().stiffness(500).damping(60)}
                                    layout={LinearTransition.springify().stiffness(500).damping(60)}
                                >
                                    <SwipeableExerciseListCard
                                        exercise={exercise}
                                        onSwipeToRemove={handleRemoveExerciseFromWorkout}
                                    />
                                    {/* <ExerciseListCard exercise={exercise}/> */}
                                </Animated.View>
                            )}
                            <AddExerciseCard id={workoutId} />
                        </>


                }
            </View>

        </>
    )
}