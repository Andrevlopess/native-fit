import ExerciseListSection from '@/components/ExerciseListSection'
import WorkoutSelectableList from '@/components/WorkoutSelectableList'
import Button from '@/components/ui/Button'
import { CarouselList } from '@/components/ui/CarouselList'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useFetchWorkouts } from '@/hooks/useFetchWorkouts'
import { s } from '@/styles/global'
import { Filter } from '@/types/exercise'
import { device } from '@/utils/device'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { CircleX, Inbox, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'


const PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - PADDING * 4

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)

type Section = { title: string, filter: Filter }
const Sections: Section[] = [
    {
        title: 'Os melhores da musculação',
        filter: 'peitoral'
    },
    // {
    //     title: 'Aumente seu fôlego!',
    //     filter: 'cardio'
    // },
    // {
    //     title: 'Para fazer em casa',
    //     filter: 'peso do corpo'
    // }
]

export default function ExericesToAddModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();

    if (!workoutId) return <MessageView
        message='Esta página não existe'
        description="Como q tu chegou até aqui?" />


    const renderItem = ({ item }: { item: Section }) =>
        <ExerciseListSection
            title={item.title}
            filter={item.filter} />


    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar exercícios',
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


            <View style={[s.flex1, s.bgWhite, s.gap8]}>

                <SearchInput
                    onChangeText={setSearch}
                    placeholder='Encontrar treino'
                    value={search}
                    containerStyles={[s.m12]}
                />

                <CarouselList data={Sections} renderItem={renderItem} />
            </View>
        </>
    )
}