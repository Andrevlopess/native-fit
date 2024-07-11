import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import MessageView from '@/components/views/MessageView';
import RequestResultsView from '@/components/views/RequestResultView';
import { WorkoutExercisesCarousel } from '@/components/workout/WorkoutExercisesCarousel';
import { useFetchWorkoutDetails } from '@/hooks/useFetchWorkoutDetails';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { IWorkout } from '@/types/workout';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


type SearchParams = { id: string, name: string, description: string }

export default function WorkoutScreen() {

    const { id, name, description } = useLocalSearchParams<SearchParams>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }

    const { data: workout, isPending, isError, error } = useFetchWorkoutDetails(id);

    const ErrorComponent = () =>
        <MessageView
            message="Ocorreu um erro!"
            description={error?.message || 'Estamos tentando resolver este problema!'} />

    const { offset, scrollHandler } = useScrollValue('y')

    return (
        <>
            <Stack.Screen options={{
                title: name || workout?.name || '',
                // headerLargeTitle: true,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerTitle: ({ children }) =>

                    <AnimatedHeaderTitle offset={offset} title={children} />,

                headerRight: () =>
                    <Link href={`/edit/${id}`} style={[s.bold, s.textIndigo600, s.textBase, s.p12]}>
                        Editar
                    </Link>
            }} />

            <Animated.ScrollView
                entering={FadeIn}
                automaticallyAdjustContentInsets
                contentInsetAdjustmentBehavior='automatic'
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                stickyHeaderIndices={[1]}
            >

                <View style={[s.px12]}>

                    <AnimatedLargeTitle title={name || workout?.name || ''} offset={offset} />

                    <Text style={[s.medium, s.textBase, s.textGray600]}>{description?.trim()}</Text>


                    {
                        workout &&
                        <View style={[s.flexRow, s.gap4, s.itemsCenter, s.mt12]}>
                            <Text style={[s.semibold, s.textLG, s.textGray600]}>
                                {workout?.exercises?.length === 0
                                    ? 'Nenhum exercício'
                                    : workout?.exercises?.length === 1
                                        ? `${workout?.exercises?.length} exercício`
                                        : `${workout?.exercises?.length} exercícios`}
                            </Text>
                            <View style={[s.radiusFull, s.bgGray600, { height: 4, width: 4 }]} />
                            <Text style={[s.semibold, s.textLG, s.textGray600]}>
                                {workout?.ownername}
                            </Text>
                        </View>
                    }

                </View>



                <RequestResultsView
                    isError={isError}
                    isPending={isPending}
                    hasData={!!workout}
                    hasSearch={false}
                    // EmptyComponent={<EmptyComponent />}
                    // NotFoundComponent={<NotFoundComponent />}
                    ErrorComponent={<ErrorComponent />}
                >

                    <WorkoutExercisesCarousel
                        workout={workout || {} as IWorkout}
                        exercises={workout?.exercises || []}
                    />
                </RequestResultsView>
            </Animated.ScrollView>
        </>
    )
}