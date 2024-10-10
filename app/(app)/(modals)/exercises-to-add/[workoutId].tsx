import { ExerciseApi } from '@/api/exercise-api'
import { WorkoutApi } from '@/api/workout-api'
import SwipeableExerciseListCard from '@/components/exercise/ExerciseListSwipeableCard'
import { BadgesControl } from '@/components/ui/BadgesControl'
import SearchInput from '@/components/ui/SearchInput'
import LoadingView from '@/components/views/LoadingView'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import COLORS from '@/constants/Colors'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercise } from '@/hooks/useSearchExercise'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { CircleX, Search, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const badges = ['Cardio', 'Quadríceps', 'Costas', 'Peito', 'Ombro', 'Panturrilha'];


const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)


export default function ExericesToAddModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
    if (!workoutId) return;

    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();
    const queryClient = useQueryClient();

    const { data: workoutExercises = [] } = useQuery({
        queryKey: ['workout-exercises', workoutId],
        queryFn: () => WorkoutApi.fetchExercises({ id: workoutId })
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-exercise-to', workoutId],
        mutationFn: WorkoutApi.addExercise,
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ["workout-exercises", workoutId] })
        },
        onError: err => console.error(err.message)
    })


    const {
        data: exercises = [],
        error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        fetchNextPage }
        = useSearchExercise({
            search: debouncedSearch,
            filter: filter,
            select(data) {
                const exercises = data.pages.flatMap((page) => page);
                return exercises.filter(exercise => !workoutExercises.map(ex => ex.id).includes(exercise.id))
            }
        })


    function handleAddExerciseToThisWorkout(exerciseId: string) {
        if (!workoutId) return;

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
            <ActivityIndicator color={COLORS.black} style={[s.p12, s.mxAuto]} />
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
                            placeholder: 'Encontrar exercício',
                            onChangeText: ({ nativeEvent }) => setSearch(nativeEvent.text)
                        }
                        : undefined
            }} />


            <View style={[s.flex1, s.bgWhite, s.gap12, { paddingBottom: insets.bottom }]}>

                <View style={[]}>

                    <SearchInput
                        onChangeText={setSearch}
                        placeholder='Encontrar exercício'
                        value={search}
                        autoFocus
                        containerStyles={[s.m12]}
                    />
                    
                    <BadgesControl
                        badges={badges}
                        selectedBadge={filter}
                        onSelect={setFilter}
                        disabled={isFetching} />
                </View>


                {/* {
                    isFetching
                        ? <LoadingView />
                        : !!error
                            ? <MessageView
                                icon={CircleX}
                                message="Ocorreu um erro!"
                                description={error?.message || 'Estamos tentando resolver este problema!'} />
                            : exercises.length
                                ? <MessageView
                                    icon={SearchX}
                                    message='Sem resultados'
                                    description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
                                />
                                : 
} */}
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