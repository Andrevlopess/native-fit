import LogoImage from '@/components/LogoImage'
import { WorkoutListCard } from '@/components/workout/WorkoutListCard'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { BadgesControl } from '@/components/ui/BadgesControl'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import COLORS from '@/constants/Colors'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useFetchWorkouts } from '@/hooks/useFetchWorkouts'
import { useScrollValue } from '@/hooks/useScrollValue'
import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { device } from '@/utils/device'
import { Link, Stack } from 'expo-router'
import { CircleX, Inbox, Plus, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import LoadingView from '@/components/views/LoadingView'
import Divisor from '@/components/ui/Divisor'
import WorkoutWeekHistory from '@/components/workout/WorkoutWeekHistory'

const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Você ainda não criou nenhum treino!'
        description='Começe criando um treino para se exercitar' />



const badges = ['Musculação', 'Cardio', 'Alongamentos', 'Perna', 'Costas']

export default function MyWorkoutsScreen() {


    const { offset, scrollHandler } = useScrollValue('y');
    const [filter, setFilter] = useState('Cardio');
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();

    const { data: workouts, isPending, isError, error } = useFetchWorkouts(debouncedSearch, filter);
    // const { data: history, isPending: isHistoryPending } = useFetchWorkoutsHistory();

    const NotFoundComponent = () =>
        <MessageView
            icon={SearchX}
            message='Sem resultados'
            description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`} 
        />
    const ErrorComponent = () =>
        <MessageView
            icon={CircleX}
            message="Ocorreu um erro!"
            description={error?.message || 'Estamos tentando resolver este problema!'} />


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Meus treinos',
                    headerLeft: () => <LogoImage />,
                    headerRight: () =>
                        <Link
                            asChild
                            href={'/workouts/new-workout'}>
                            <TouchableOpacity>
                                <Plus color={COLORS.indigo} />
                            </TouchableOpacity>
                        </Link>,
                    headerTitle:
                        device.android
                            ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
                            : undefined,
                    headerLargeTitle: true,
                    headerTitleAlign: 'center'
                }}
            />

            <Animated.ScrollView

                contentInsetAdjustmentBehavior='automatic'
                entering={FadeIn}
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={[]}>

                <View style={[s.p12, s.gap8]}>
                    <AnimatedLargeTitle title='Meus treinos' offset={offset} />


                    {/* <SearchInput
                        onChangeText={setSearch}
                        placeholder='Encontrar treino'
                        value={search}
                   
                    /> */}
                    {/* <BadgesControl badges={badges} onSelect={console.log} selectedBadge='none' /> */}
                    {/* <Button
                        variant='secondary'
                        size={'small'}
                        text="Novo treino"
                        asLink='/new-workout' /> */}

                </View>

                <View>
                    {/* <Text>Falta pouco para completar a semana!</Text> */}
                    <WorkoutWeekHistory />
                </View>



                <RequestResultsView
                    isError={isError}
                    isPending={isPending}
                    hasData={!!workouts?.length}
                    hasSearch={!!debouncedSearch}
                    EmptyComponent={<EmptyComponent />}
                    NotFoundComponent={<NotFoundComponent />}
                    ErrorComponent={<ErrorComponent />}
                >
                    <View style={[]}>
                        <View style={[s.px12, s.py24, s.gap12]}>
                            {workouts?.map((workout, i) => (
                                <WorkoutListCard workout={workout} key={`${i},${workout.id}`} />
                            ))}

                        </View>
                        <Divisor />

                        {/* <View style={[s.p12]}>
                            <Text style={[s.semibold, s.textLG, s.textGray800]}>Ultimos treinos que eu fiz</Text>

                            {history?.map(history =>
                                <View style={[s.gap12, s.py12]}>
                                    <Text style={[s.medium, s.textGray600]}>

                                        {new Date(history.done_at)
                                            .toLocaleDateString('pt-br', { dateStyle: 'medium' })}


                                    </Text>
                                    <WorkoutListCard workout={history.workouts} />
                                </View>
                            )}

                        </View> */}
                    </View>


                </RequestResultsView>
            </Animated.ScrollView>
        </>
    )
}