import LogoImage from '@/components/LogoImage'
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
import { Link, Stack } from 'expo-router'
import { CircleX, Inbox, Plus, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Você ainda não criou nenhum treino!'
        description='Começe criando um treino para se exercitar' />

const WorkoutListCard = ({ workout: { id, name, description } }: { workout: IWorkout }) => {
    return (
        <Link href={`/(app)/workouts/${id}`} asChild style={[s.flex1, s.flexRow, s.gap12]}>
            <TouchableOpacity activeOpacity={.8}>
                <View style={[s.bgGray200, s.radius14, { height: 60, width: 60 }]} />
                <View style={[s.gap4]}>
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {name}
                    </Text>
                    <Text style={[s.regular, s.textGray400]}>{description}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}


const badges = ['Musculação', 'Cardio', 'Alongamentos', 'Perna', 'Costas']

export default function MyWorkoutsScreen() {


    const { offset, scrollHandler } = useScrollValue();
    const [filter, setFilter] = useState('Cardio')
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();

    const { data: workouts, isPending, isError, error } = useFetchWorkouts(debouncedSearch, filter);


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
                    headerTitle: ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />,
                    headerLargeTitle: true,
                    headerTitleAlign: 'center'
                }}
            />

            <Animated.ScrollView
                contentInsetAdjustmentBehavior='automatic'
                entering={FadeIn}
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={[s.gap12]}>

                <View style={[s.p12, s.gap8]}>
                    <AnimatedLargeTitle title='Meus treinos' offset={offset} />
                    <SearchInput
                        onChangeText={setSearch}
                        placeholder='Encontrar treino'
                        value={search}
                    // onFocus={() => scrollRef.current?.scrollTo({ y: 60 })}
                    // onBlur={() => scrollRef.current?.scrollTo({ y: 0 })}
                    />
                    <BadgesControl badges={badges} onSelect={console.log} selectedBadge='none' />
                    <Button
                        variant='secondary'
                        size={'small'}
                        text="Novo treino"
                        asLink='/new-workout' />

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
                    <View style={[s.px12, s.gap8]}>
                        {workouts?.map((workout, i) => (
                            <WorkoutListCard workout={workout} key={`${i},${workout.id}`} />
                        ))}
                    </View>
                </RequestResultsView>
            </Animated.ScrollView>
        </>
    )
}