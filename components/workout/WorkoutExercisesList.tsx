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
        onSuccess: (res) => {
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

    const handleConfirmRemove = (id: string) => {
        Alert.alert('Deseja remover esse exercício?', 'Você poderá adicioná-lo novamente', [{
            isPreferred: true,
            text: 'Cancelar',
            // onPress: () =>(id),
        },
        {
            text: 'Remover',
            style: 'destructive',
            onPress: () => handleRemoveExerciseFromWorkout(id),
        },
        ])
    }

    const handleRemoveExerciseFromWorkout = (id: string) => {
        mutate({ exerciseId: id, workoutId: workoutId })
        const filteredArray = exercises?.filter(exercise => exercise.id !== id);


        queryClient.setQueryData(
            ["workout-exercises", workoutId],
            (prev: any) => {
                if (!prev) return [];
                return filteredArray
            }
        );
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

            {
                !!exercises?.length &&
                <>
                    <Text>Exercícios</Text>
                    <View style={[
                        s.bgGray800,
                        s.radiusFull,
                        { height: 8, width: 8 }]} />

                    <Text style={[s.bold, s.textXL]}>
                        {exercises?.length}
                    </Text>
                </>

            }

            <View style={[s.flex1]} >
                {isPending
                    ? <SkeletonList length={5} skeletonHeight={80} contentContainerStyles={[s.p12]} />
                    : !exercises?.length
                        ? <EmptyComponent />
                        : <>
                            {exercises.map((exercise, i) =>
                                // <Animated.View
                                //     entering={FadeIn.springify().stiffness(500).damping(60)}
                                //     layout={LinearTransition.springify().stiffness(500).damping(60)}
                                // >
                                <SwipeableExerciseListCard
                                    key={exercise.id}
                                    exercise={exercise}
                                    onSwipeToRemove={handleRemoveExerciseFromWorkout}
                                />
                                // </Animated.View >

                            )}
                            <AddExerciseCard id={workoutId} />
                        </>
                }
            </View >

        </>
    )
}