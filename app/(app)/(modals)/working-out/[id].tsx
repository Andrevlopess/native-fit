import Button from '@/components/ui/Button';
import MessageView from '@/components/views/MessageView';
import PageNotFound from '@/components/views/PageNotFound';
import RequestResultsView from '@/components/views/RequestResultView';
import WorkingOutFlow from '@/components/workout/WorkingOutFlow';
import { DEFAULT_USER_UUID } from '@/constants/user';
import { useFetchWorkoutDetails } from '@/hooks/useFetchWorkoutDetails';
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory';
import { s } from '@/styles/global';
import { useQueryClient } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type SearchParams = { id: string, name: string }

export default function DoingWorkoutScreen() {
    const { id, name } = useLocalSearchParams<SearchParams>();
    if (!id) return <PageNotFound />

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    const { data: workout, isPending, isError, error } = useFetchWorkoutDetails(id);
    const { mutate, isPending: isSaving } = useWorkoutHistory({
        onSuccess: () => {            
            queryClient.invalidateQueries({queryKey: ["workouts-history"]})
        }
    });


    const handleGiveUp = () => {
        Alert.alert('Quer mesmo desistir do seu treino?', '', [
            {
                text: 'Cancelar',
                style: 'cancel',
                isPreferred: true,
            },
            {
                text: 'Desisistir',
                style: 'destructive',
                onPress: () => {
                    // Dismiss the modal and return to the previous screen
                    router.back();
                }
            }
        ])
    }



    function handleCompletedWorkout() {
        if (!id) return;
        mutate({ workout_id: id })
    }

    return (
        <>
            <Stack.Screen options={{
                title: name || workout?.name || '',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                header: () => (
                    <View style={[
                        s.justifyBetween,
                        s.itemsCenter,
                        s.bgWhite,
                        s.flexRow,
                        { paddingTop: top, paddingLeft: 12 }]}>

                        <Text style={[s.semibold, s.textLG, s.textGray800, s.flex1]} numberOfLines={1}>
                            {name || workout?.name || ''}
                        </Text>

                        <Button
                            variant='ghost'
                            onPress={handleGiveUp}
                            text='Desistir'
                            size='small'
                        />

                        {/* <Button
                            variant='ghost'
                            onPress={handleGiveUp}
                            text='Finalizar'
                            size='small'
                        /> */}
                    </View>
                ),

            }} />


            <RequestResultsView
                isError={isError}
                hasSearch={false}
                isPending={isPending}
                hasData={!!workout?.exercises}
                ErrorComponent={<MessageView
                    message='Não conseguimos carregar o seu treino!'
                    description='Verifique sua conexão e tente novamente!'
                />}

            >
                <WorkingOutFlow
                    exercises={workout?.exercises || []}
                    onWorkoutCompleted={handleCompletedWorkout}
                />
            </RequestResultsView>
        </>
    )
}