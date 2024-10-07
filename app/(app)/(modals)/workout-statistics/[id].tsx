import { WorkoutApi } from '@/api/workout-api';
import ExerciseStatisticCard from '@/components/exercise/ExerciseStatisticCard';
import Button from '@/components/ui/Button';
import SkeletonList from '@/components/ui/SkeletonList';
import LoadingView from '@/components/views/LoadingView';
import MessageView from '@/components/views/MessageView';
import PageNotFound from '@/components/views/PageNotFound';
import { s } from '@/styles/global';
import { IExercise } from '@/types/exercise';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Inbox } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Nenhuma estatística encontrada'
        description='Adicione exercícios ao seu treino!' />


type SearchParams = { id: string }

export default function DoingWorkoutScreen() {
    const { id } = useLocalSearchParams<SearchParams>();
    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    if (!id) return <PageNotFound />

    const { data: workout, isPending } = useQuery({
        queryKey: ["workouts", id],
        queryFn: () => WorkoutApi.findOne({ id })
    });


    const { data: exercises, isPending: isExercisesPending } = useQuery({
        queryKey: ['workout-exercises', id],
        queryFn: () => WorkoutApi.fetchExercises({ id })
    })

    const { data: statistics, isPending: isStatisticPending, refetch } = useQuery({
        queryKey: ["workout-statistics", id],
        queryFn: () => WorkoutApi.fetchStatistics({ id }),
        retry: false,
    });

    if (isPending)
        return <LoadingView />

    if (!workout)
        return <Text>Workout not found</Text>

    if (!statistics || !exercises)
        return <Text>Statistics not found</Text>


    const statisticCards = statistics.map(sts =>
        ({ ...sts, ...exercises.find(ex => ex.id === sts.exercise_id) }));

    return (
        <>
            <Stack.Screen
                options={{
                    title: workout.name,
                    headerTitleAlign: 'center',
                    presentation: 'fullScreenModal',
                    headerBackVisible: false,
                    header: () => (
                        <View style={[
                            s.justifyBetween,
                            s.itemsCenter,
                            s.bgWhite,
                            s.flexRow,
                            s.borderBottom1,
                            s.borderGray200,
                            { paddingTop: top, paddingLeft: 12 }]}>

                            <Text style={[s.semibold, s.textLG, s.textGray800, s.flex1]} numberOfLines={1}>
                                {workout.name}
                            </Text>

                            <Button
                                variant='ghost'
                                asLink={'/workouts'}
                                text='Continuar'
                            // size='small'
                            />
                        </View>
                    ),

                }} />


            <ScrollView style={[s.flex1, s.bgWhite]} contentContainerStyle={[s.py12]} >
                {isPending
                    ? <SkeletonList length={5} skeletonHeight={80} contentContainerStyles={[s.p12]} />
                    : !statisticCards?.length || !exercises?.length
                        ? <EmptyComponent />
                        : <>
                            <View style={[s.flexRow, s.gap6, s.itemsCenter, s.p12]}>
                                <Text style={[s.semibold, s.textXL]}>Exercícios do treino</Text>
                                {
                                    !!statisticCards.length &&
                                    <>
                                        <View style={[
                                            s.bgGray800,
                                            s.radiusFull,
                                            { height: 8, width: 8 }]} />

                                        <Text style={[s.semibold, s.textXL]}>
                                            {statisticCards.length}
                                        </Text>
                                    </>
                                }
                            </View>

                            {statistics.map((statistic, i) => {

                                const exercise =
                                    exercises.find(ex => ex.id === statistic.exercise_id)
                                    ?? {} as IExercise

                                return (
                                    <Animated.View
                                        key={statistic.id}
                                        entering={FadeIn.springify().stiffness(500).damping(60)}
                                        layout={LinearTransition.springify().stiffness(500).damping(60)}
                                    >
                                        <ExerciseStatisticCard
                                            statistic={statistic} exercise={exercise} />
                                    </Animated.View >

                                )
                            })}

                            <Button text='Ok' asLink={'/workouts'} style={[s.m12]} />
                        </>
                }
            </ScrollView>
        </>
    )
}
