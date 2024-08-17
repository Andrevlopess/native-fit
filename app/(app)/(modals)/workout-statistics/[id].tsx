import { WorkoutApi } from '@/api/workout-api';
import Button from '@/components/ui/Button';
import LoadingView from '@/components/views/LoadingView';
import PageNotFound from '@/components/views/PageNotFound';
import WorkingOutFlow from '@/components/workout/WorkingOutFlow';
import { s } from '@/styles/global';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// todo: workout done exercises with each pr;
// todo: total de vezes que eu fiz esse treino;
// todo: 

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


    const { data: statistics, isPending: isStatisticPending, refetch } = useQuery({
        queryKey: ["workout-statistics", id],
        queryFn: () => WorkoutApi.fetchStatistics({ id })
    });


    if (isPending)
        return <LoadingView />

    if (!workout)
        return <Text>Workout not found</Text>


    console.log(statistics);

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
                            { paddingTop: top, paddingLeft: 12 }]}>

                            <Text style={[s.semibold, s.textLG, s.textGray800, s.flex1]} numberOfLines={1}>
                                {workout.name}
                            </Text>

                        </View>
                    ),

                }} />




            <Button text='fetch' onPress={() => refetch()} />
        </>
    )
}