import { WorkoutApi } from '@/api/workout-api'
import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { Inbox, Plus } from 'lucide-react-native'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SwipeableExerciseListCard from '../exercise/ExerciseListSwipeableCard'
import Button from '../ui/Button'
import SkeletonList from '../ui/SkeletonList'
import MessageView from '../views/MessageView'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { IExercise } from '@/types/exercise'

const AddExerciseCard = ({ id }: { id: string }) =>
    <Link asChild href={`/exercises-to-add/${id}`} style={[s.flexRow, s.gap16, s.itemsCenter, s.px12, s.mt8, s.bgWhite, s.radius8]}>
        <TouchableOpacity activeOpacity={0.8}>
            <View style={[s.bgGray200, s.itemsCenter, s.justifyCenter,
            { height: 70, width: 70 }]}>
                <Plus color={COLORS.white} />
            </View>
            <Text style={[s.textBase, s.medium]}>Adicionar exercício</Text>
        </TouchableOpacity>
    </Link>


interface WorkoutExercisesListProps {
    workoutId: string
}

export default function WorkoutExercisesList({ workoutId }: WorkoutExercisesListProps) {


    const queryClient = useQueryClient();


    const { data: exercises = [], isPending, isError } = useQuery({
        queryKey: ['workout-exercises', workoutId],
        queryFn: () => WorkoutApi.fetchExercises({ id: workoutId })
    })

    const { mutate, isPending: isRemoving } = useMutation({
        mutationKey: ['remove-exercise-from-workout', workoutId],
        mutationFn: WorkoutApi.removeExercise,
        // onSettled: () => {
        //     queryClient.invalidateQueries({
        //         queryKey: ["workout-exercises", workoutId]
        //     })
        // }
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["workout-exercises", workoutId]
            })
        }

    })

    const handleConfirmRemove = (id: string) => {
        Alert.alert('Deseja remover esse exercício?', 'Você poderá adicioná-lo novamente', [{
            isPreferred: true,
            text: 'Cancelar',
        },
        {
            text: 'Remover',
            style: 'destructive',
            onPress: () => handleRemoveExerciseFromWorkout(id),
        },
        ])
    }

    const handleRemoveExerciseFromWorkout = (id: string) => {

        // const filteredArray = exercises?.filter(exercise => exercise.id !== id);


        // queryClient.setQueryData(
        //     ["workout-exercises", workoutId],
        //     (prev: any) => {
        //         if (!prev) return [];
        //         return filteredArray
        //     }
        // );



        queryClient.setQueryDefaults(
            ["workout-exercises", workoutId],
            { select: exercises => exercises.filter((exercise: IExercise) => exercise.id !== id) })

        mutate({ exerciseId: id, workoutId: workoutId });
    }


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
            <View style={[s.flex1, s.mt12]} >
                {isPending
                    ? <SkeletonList length={5} skeletonHeight={80} contentContainerStyles={[s.p12]} />
                    : !exercises?.length
                        ? <EmptyComponent />
                        : <>

                            <View style={[s.flexRow, s.gap6, s.itemsCenter, s.p12]}>
                                <Text style={[s.semibold, s.textXL]}>Exercícios</Text>
                                {
                                    !!exercises.length &&
                                    <>
                                        <View style={[
                                            s.bgGray800,
                                            s.radiusFull,
                                            { height: 8, width: 8 }]} />

                                        <Text style={[s.semibold, s.textXL]}>
                                            {exercises.length}
                                        </Text>
                                    </>
                                }
                            </View>

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
                                </Animated.View >

                            )}
                            <AddExerciseCard id={workoutId} />
                        </>
                }
            </View >

        </>
    )
}