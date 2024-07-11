import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import Button from '@/components/ui/Button';
import MessageView from '@/components/views/MessageView';
import PageNotFound from '@/components/views/PageNotFound';
import RequestResultsView from '@/components/views/RequestResultView';
import { WorkoutExercisesCarousel } from '@/components/workout/WorkoutExercisesCarousel';
import { useFetchWorkoutDetails } from '@/hooks/useFetchWorkoutDetails';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


type SearchParams = { id: string, name: string }

export default function DoingWorkoutScreen() {
    const { id, name } = useLocalSearchParams<SearchParams>();
    if (!id) return <PageNotFound />
    

    const { data: details, isPending, isError, error } = useFetchWorkoutDetails(id);

    const handleGiveUp = () => {
        Alert.alert('Quer mesmo desistir do seu treino?', '', [
            {
                text: 'Desisistir',
                style: 'destructive',
                onPress: () => {
                    // Dismiss the modal and return to the previous screen
                    router.back();
                }
            },
            {
                text: 'Cancelar',
                style: 'cancel',
                isPreferred: true,
            }
        ])
    }

    return (
        <>
            <Stack.Screen options={{
                title: name || details?.name || '',
                // headerLargeTitle: true,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerTitle: ({ children }) =>
                    <Text style={[s.semibold, s.textBase, s.textGray800]}>{children}</Text>,
                headerLeft: () =>
                    <Button
                        variant='ghost'
                        onPress={handleGiveUp}
                    >
                        Desistir
                    </Button >
            }} />
        </>
    )
}