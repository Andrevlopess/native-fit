import { WorkoutApi } from '@/api/workout-api'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import WorkoutSelectableList from '@/components/workout/WorkoutSelectableList'
import { useAuth } from '@/contexts/AuthContext'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { useQuery } from '@tanstack/react-query'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { CircleX, Inbox, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)

const EmptyComponent = () =>
    <MessageView
        icon={Inbox}
        message='Você ainda não criou nenhum treino!'
        description='Começe criando um treino para se exercitar' />


export default function AddToWorkoutScreen() {
    const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();


    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();

    const { user } = useAuth()

    const { data: workouts = [], isPending, error } = useQuery({
        queryKey: ['workouts', debouncedSearch],
        queryFn: () => WorkoutApi.findAll({ userId: user?.id, search: debouncedSearch })
    })



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

    if (!exerciseId) return <ErrorComponent />

    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar ao treino',
                presentation: 'modal',
                // animation: 'fade_from_bottom',
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

            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={[s.p12, s.gap12]}

            >


                <Button text='Novo treino' size='small' variant='secondary' asLink='/new-workout' />
                <SearchInput
                    onChangeText={setSearch}
                    placeholder='Encontrar treino'
                    value={search}
                />


                <RequestResultsView
                    isError={!!error}
                    isPending={isPending}
                    hasData={!!workouts?.length}
                    hasSearch={!!debouncedSearch}
                    EmptyComponent={<EmptyComponent />}
                    NotFoundComponent={<NotFoundComponent />}
                    ErrorComponent={<ErrorComponent />}
                >
                    <WorkoutSelectableList workouts={workouts || []} exerciseId={exerciseId} />
                </RequestResultsView>

            </ScrollView>

        </>
    )
}