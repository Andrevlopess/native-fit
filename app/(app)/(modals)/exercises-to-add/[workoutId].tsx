import ExerciseListAddCard from '@/components/exercise/ExerciseListAddCard'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { useAddExerciseToWorkout } from '@/hooks/useAddExerciseToWorkout'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercises } from '@/hooks/useSearchExercises'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { useQueryClient } from '@tanstack/react-query'
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

const PADDING = 12;
const CARD_WIDTH = SCREEN_WIDTH - PADDING * 4


export default function ExericesToAddModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('costas');
    const debouncedSearch = useDebounce(search, 500).trim();
    const queryClient = useQueryClient();

    const {
        exercises,
        isFetching,
        isError,
        error,
        fetchNextPage,
        isFetchingNextPage } =
        useSearchExercises({
            search: debouncedSearch,
        });


    const { addExercise, isPending } = useAddExerciseToWorkout({
        onSuccess: (data) => {



            queryClient.invalidateQueries({ queryKey: ["workout-exercises", workoutId] });
        },
        onError: console.log
    })




    function handleAddExerciseToThisWorkout(exerciseId: string) {
        if (!workoutId) return;

        const filteredArray = exercises?.filter(exercise => exercise.id !== exerciseId);

        queryClient.setQueryData(
            ["search-exercises", debouncedSearch, ''],
            (prev: any) => {
                if (!prev) return [];
                return {
                    pageParams: prev.pageParams,
                    pages: [filteredArray]
                }
            }
        );

        addExercise({
            exercises: [exerciseId],
            workouts: [workoutId]
        });
    }

    // render components
    const renderItem = ({ item }: { item: IExercise }) =>
        <ExerciseListAddCard
            // disabled={isPending}
            onPress={() => handleAddExerciseToThisWorkout(item.id)}
            exercise={item}
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
                    containerStyles={[s.m12]}
                />

                <RequestResultsView
                    isError={isError}
                    isPending={isFetching && !isFetchingNextPage}
                    hasData={!!exercises?.length}
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
                        keyExtractor={item => item.id}
                        // showsVerticalScrollIndicator={false}
                        // onEndReachedThreshold={2}
                        onEndReached={() => fetchNextPage()}
                        ListFooterComponent={renderFooter}
                    />

                    {/* {exercises?.map((exercise, i) => {
                        return (
                            <Animated.View
                                key={exercise.id}
                                entering={FadeIn.duration(100).delay(i * 50)}
                                layout={LinearTransition.springify().stiffness(500).damping(60)}
                            >

                                <ExerciseListAddCard
                                    disabled={isPending}
                                    onPress={() => handleAddExerciseToThisWorkout(exercise.id)}
                                    exercise={exercise}
                                />
                            </Animated.View>


                        )
                    })} */}

                </RequestResultsView>
            </View>
        </>
    )
}