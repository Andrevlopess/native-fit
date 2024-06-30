import ExerciseDetailedCard from '@/components/ExerciseDetailedCard';
import Button from '@/components/ui/Button';
import { CarouselList } from '@/components/ui/CarouselList';
import MessageView from '@/components/views/MessageView';
import RequestResultsView from '@/components/views/RequestResultView';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useFetchWorkoutDetails } from '@/hooks/useFetchWorkoutDetails';
import { s } from '@/styles/global';
import { IExercise } from '@/types/exercise';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { CircleX } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const WorkoutExercisesCarousel = ({ exercises }: { exercises: IExercise[] }) => {

    const PADDING = 16;
    const CARD_WIDTH = SCREEN_WIDTH - PADDING * 4

    const renderItem = ({ item }: { item: IExercise }) =>
        <ExerciseDetailedCard exercise={item} cardWitdh={CARD_WIDTH} />

    return (
        <>

            <CarouselList
                gapBetweenItems={PADDING}
                itemWidth={CARD_WIDTH}
                data={exercises}
                renderItem={renderItem} />
        </>
    )
}

export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }

    const { data: details, isPending, isError, error } = useFetchWorkoutDetails(id);

    const ErrorComponent = () =>
        <MessageView
            icon={CircleX}
            message="Ocorreu um erro!"
            description={error?.message || 'Estamos tentando resolver este problema!'} />

    return (
        <>
            <Stack.Screen options={{
                title: '',
                headerRight: () =>
                    <Link href={`/edit/${id}`} style={[s.bold, s.textIndigo600, s.textBase, s.p12]}>
                        Editar
                    </Link>
            }} />

            <ScrollView style={[s.flex1, s.bgWhite]}>

                <RequestResultsView
                    isError={isError}
                    isPending={isPending}
                    hasData={!!details}
                    hasSearch={false}
                    // EmptyComponent={<EmptyComponent />}
                    // NotFoundComponent={<NotFoundComponent />}
                    ErrorComponent={<ErrorComponent />}
                >
                    <View style={[s.px12]}>
                        <Text style={[s.bold, s.text2XL]}>{details?.name}</Text>
                        <Text style={[s.medium, s.textBase, s.textGray600]}>
                            {details?.description}
                        </Text>

                        <View style={[s.flexRow, s.gap4, s.itemsCenter, s.mt12]}>
                            <Text style={[s.semibold, s.textLG, s.textGray600]}>
                                {details?.exercises.length === 0
                                    ? 'Nenhum exercício'
                                    : details?.exercises.length === 1
                                        ? `${details?.exercises.length} exercício`
                                        : `${details?.exercises.length} exercícios`}
                            </Text>
                            <View style={[s.radiusFull, s.bgGray600, { height: 4, width: 4 }]} />
                            <Text style={[s.semibold, s.textLG, s.textGray600]}>
                                {details?.ownername}
                            </Text>
                        </View>
                    </View>

                    <View style={[]}>

                        <View style={[s.justifyBetween, s.itemsCenter, s.flexRow, s.p12]}>
                            <Text style={[s.bold, s.textXL]}>Exercícios</Text>
                            <Link asChild href={`/(app)/(modals)/exercises-to-add/${id}`}>
                                <Button text='Adicionar' variant='tertiary' size='small' rounded />
                            </Link>
                        </View>


                        <WorkoutExercisesCarousel exercises={details?.exercises || []} />
                    </View>
                </RequestResultsView>
            </ScrollView>
        </>
    )
}