import { WorkoutApi } from '@/api/workout-api'
import SwipeableExerciseListCard from '@/components/exercise/ExerciseListSwipeableCard'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import COLORS from '@/constants/Colors'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercise } from '@/hooks/useSearchExercise'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { CircleX, Search, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)


export default function ExericesToAddModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('perna');
    const [filter, setFilter] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();
    const queryClient = useQueryClient();

    const {
        data: exercises = [],
        error,
        isFetching,
        isFetchingNextPage,
        isError,
        fetchNextPage }
        = useSearchExercise({
            search: debouncedSearch,
            filter: filter
        })

    const { mutate, isPending, variables } = useMutation({
        mutationKey: ['add-exercise-to', workoutId],
        mutationFn: WorkoutApi.addExercise,
        onMutate: () =>
            queryClient.invalidateQueries({ queryKey: ["workout-exercises", workoutId] }),
        onError: err => console.error(err.message)
    })


    function handleAddExerciseToThisWorkout(exerciseId: string) {
        if (!workoutId) return;

        //todo: fix this 'cannot read 'length' of undefined'
        // queryClient.setQueryData(
        //     ["search-exercises"],
        //     (prev: any) => {
        //         const exercises = prev.pages.flatMap((page: any) => page)
        //         const filtered = exercises.filter((exercise: IExercise) => exercise.id !== exerciseId);

        //         return filtered
        //     }
        // )

        mutate({
            exercise: exerciseId,
            workouts: [workoutId]
        });
    }

    // render components
    const renderItem = ({ item }: { item: IExercise }) =>
        <SwipeableExerciseListCard
            exercise={item}
            disableSwipeToRemove
            onSwipeToAdd={id => handleAddExerciseToThisWorkout(id)}
        />

    const renderFooter = () => {
        if (!isFetchingNextPage) return null;
        return (
            <ActivityIndicator color={COLORS.indigo} style={[s.p12, s.mxAuto]} />
        );
    };


    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar exercícios',
                presentation: 'modal',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => <CancelButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,
                headerSearchBarOptions:
                    device.ios
                        ? {
                            hideNavigationBar: false,
                            hideWhenScrolling: false,
                            // placement: `automatic`,
                            placeholder: 'Encontrar treino',
                            onChangeText: ({ nativeEvent }) => setSearch(nativeEvent.text)
                        }
                        : undefined
            }} />


            <View style={[s.flex1, s.bgWhite, s.gap12, { paddingBottom: insets.bottom }]}>

                <SearchInput
                    onChangeText={setSearch}
                    placeholder='Encontrar exercício'
                    value={search}
                    autoFocus
                    containerStyles={[s.m12]}
                />

                <RequestResultsView
                    isError={isError}
                    isPending={isFetching && !isFetchingNextPage}
                    hasData={true}
                    hasSearch={!!debouncedSearch}
                    EmptyComponent={
                        <MessageView icon={Search} message='Busque por um exercício' description='Procure entre as mais de 1300 atividades' />
                    }
                    NotFoundComponent={
                        <MessageView
                            icon={SearchX}
                            message='Sem resultados'
                            description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
                        />}
                    ErrorComponent={<MessageView
                        icon={CircleX}
                        message="Ocorreu um erro!"
                        description={error?.message || 'Estamos tentando resolver este problema!'} />}
                >

                    <Animated.FlatList
                        entering={FadeIn}
                        itemLayoutAnimation={LinearTransition.springify().stiffness(500).damping(60)}
                        contentInsetAdjustmentBehavior='automatic'
                        data={exercises}
                        renderItem={renderItem}
                        onEndReached={() => fetchNextPage()}
                        ListFooterComponent={renderFooter}
                    />
                </RequestResultsView>
            </View>
        </>
    )
}