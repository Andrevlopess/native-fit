import MessageView from '@/components/views/MessageView';
import RequestResultsView from '@/components/views/RequestResultView';
import { useFetchWorkoutDetails } from '@/hooks/useFetchWorkoutDetails';
import { s } from '@/styles/global';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { CircleX } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';


export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }

    const {data: details, isPending, isError, error} = useFetchWorkoutDetails(id);

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

            <View style={[s.flex1, s.bgWhite, s.gap12, s.p12]}>
                <View>
                    <Text style={[s.bold, s.text2XL]}>Treino de Frango</Text>
                    <Text style={[s.medium, s.textBase, s.textGray600]}>descrição brabissima</Text>
                    <Text style={[s.semibold, s.textLG, s.textGray600, s.mt24]}>0 exercícios</Text>
                </View>


                <RequestResultsView
                    isError={isError}
                    isPending={isPending}
                    hasData={!!details}
                    hasSearch={false}
                    // EmptyComponent={<EmptyComponent />}
                    // NotFoundComponent={<NotFoundComponent />}
                    ErrorComponent={<ErrorComponent />}
                >
                    <View style={[s.px12, s.gap8]}>
                        <Text>{details?.name}</Text>
                    </View>
                </RequestResultsView>
            </View>
        </>
    )
}