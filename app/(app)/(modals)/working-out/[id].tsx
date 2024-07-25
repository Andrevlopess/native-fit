import { WorkoutApi } from '@/api/workout-api';
import Button from '@/components/ui/Button';
import LoadingView from '@/components/views/LoadingView';
import MessageView from '@/components/views/MessageView';
import PageNotFound from '@/components/views/PageNotFound';
import RequestResultsView from '@/components/views/RequestResultView';
import WorkingOutFlow from '@/components/workout/WorkingOutFlow';
import { DEFAULT_USER_UUID } from '@/constants/user';
import { s } from '@/styles/global';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type SearchParams = { id: string }

export default function DoingWorkoutScreen() {
    const { id } = useLocalSearchParams<SearchParams>();
    if (!id) return <PageNotFound />

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    const { data: workout, isPending } = useQuery({
        queryKey: ["workouts", id],
        queryFn: () => WorkoutApi.findOne({ id })  
    });

    if (isPending)
        return <LoadingView />

    if (!workout)
        return <Text>Workout not found</Text>


    const { mutate, isPending: isSaving } = useMutation({
        mutationKey: ['save-on-history', id],
        mutationFn: WorkoutApi.saveOnHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workout-history'] })
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

    function handleCompletedWorkout(id: string) {
        mutate({ id })
    }

    return (
        <>
            <Stack.Screen options={{
                title: workout.name,
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
                            {workout.name}
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


            {/* <RequestResultsView
                isError={isError}
                hasSearch={false}
                isPending={isPending}
                hasData={!!exercises}
                ErrorComponent={<MessageView
                    message='Não conseguimos carregar o seu treino!'
                    description='Verifique sua conexão e tente novamente!'
                />}

            >
              
            </RequestResultsView> */}

            <WorkingOutFlow
                workoutId={id}
                onWorkoutCompleted={() => handleCompletedWorkout}
            />

        </>
    )
}