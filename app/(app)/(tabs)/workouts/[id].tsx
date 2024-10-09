import { WorkoutApi } from '@/api/workout-api';
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import Button from '@/components/ui/Button';
import LoadingView from '@/components/views/LoadingView';
import MessageView from '@/components/views/MessageView';
import WorkoutExercisesList from '@/components/workout/WorkoutExercisesList';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


type SearchParams = { id: string }

export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<SearchParams>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }
    const { offset, scrollHandler } = useScrollValue('y');

    const { data: workout, isPending } = useQuery({
        queryKey: ["workouts", id],
        queryFn: () => WorkoutApi.findOne({ id })
        // retry: false,    
    });

    return (
        <>
            <Stack.Screen
                options={{
                    title: workout?.name || "",
                    // headerLargeTitle: true,
                    headerTitleAlign: 'left',
                    headerBackTitleVisible: true,
                    headerTitle: ({ children }) =>
                        <AnimatedHeaderTitle offset={offset} title={children} />,
                    headerRight: () => workout &&
                        <Link href={{
                            pathname: `/edit-workout/[id]`,
                            params: { id: workout.id, name: workout.name, description: workout.description }
                        }} style={[s.bold, s.textBlack, s.textBase, s.p12]}>
                            Editar
                        </Link>
                }} />

            {isPending
                ? <LoadingView />
                : !workout
                    ? <Text>Treino nao encontrado</Text>
                    : <Animated.ScrollView
                        entering={FadeIn}
                        automaticallyAdjustContentInsets
                        contentInsetAdjustmentBehavior='automatic'
                        onScroll={scrollHandler}
                        style={[s.flex1, s.bgWhite]}
                        contentContainerStyle={[s.pb12]}
                        stickyHeaderIndices={[1]}
                        stickyHeaderHiddenOnScroll
                    >

                        <View style={[s.px12]}>
                            <AnimatedLargeTitle title={workout.name} offset={offset} />
                            {workout.description &&
                                <Text style={[s.medium, s.textBase, s.textGray600]}>
                                    {workout.description?.trim()}</Text>
                            }
                        </View>

                        {<Button
                            text='Iniciar treino'
                            asLink={{ pathname: `/working-out/${id}` }}
                            style={[s.px12, s.py6, s.bgWhite,s.mt12,]}
                        />}

                        <WorkoutExercisesList workoutId={id} />
                    </Animated.ScrollView>
            }

        </>
    )
}