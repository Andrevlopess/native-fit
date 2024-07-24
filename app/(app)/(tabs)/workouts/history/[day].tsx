import { WorkoutApi } from '@/api/workout-api';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import SkeletonList from '@/components/ui/SkeletonList';
import LoadingView from '@/components/views/LoadingView';
import { WorkoutListCard } from '@/components/workout/WorkoutListCard';
import { supabase } from '@/lib/supabase';
import { s } from '@/styles/global';
import { IWorkout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';




export default function DayWorkoutsHistory() {

    const { day } = useLocalSearchParams<{ day: string }>();
    if (!day) return;

    const { data: workouts, isPending } = useQuery({
        queryKey: ['workout-day-history', day],
        queryFn: () =>  WorkoutApi.findDaySchedule(day)
    })


    const renderItem = ({ item }: { item: IWorkout }) => <WorkoutListCard workout={item} />
    const formatedDay = new Date(day).toLocaleDateString('pt-br', {
        dateStyle: 'long',
        timeZone: 'UTC'
    })

    return (
        <>
            <Stack.Screen options={{
                title: formatedDay,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTitle: ({ children }) =>
                    <Text style={[s.bold, s.textLG, s.bgWhite]}>{children}</Text>
            }}
            />
            <View style={[s.flex1, s.bgWhite, s.p12]}>
                <FlatList
                    contentContainerStyle={[s.gap12]}
                    ListHeaderComponent={
                        workouts &&
                        <Text style={[s.semibold, s.textXL, s.bgWhite, { marginBottom: 12 }]}>
                            Você fez {workouts?.length} {workouts?.length > 1 ? 'treinos' : 'treino'} esse dia
                        </Text>
                    }
                    ListEmptyComponent={<SkeletonList length={1} />}
                    data={workouts}
                    renderItem={renderItem}
                    keyExtractor={({ id }, index) => `${id}-${index}`}
                />
            </View>

        </>
    )
}