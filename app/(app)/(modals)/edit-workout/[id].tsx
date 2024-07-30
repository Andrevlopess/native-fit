import { WorkoutApi } from '@/api/workout-api';
import EditWorkoutForm from '@/components/forms/EditWorkoutForm';
import { s } from '@/styles/global';
import { useQuery } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)


type SearchParams = {
    id: string, name: string, description: string
}

export default function EditWorkoutModal() {

    const { id } = useLocalSearchParams<SearchParams>();
    if (!id) return;

    return (
        <>
            <Stack.Screen options={{
                title: 'Editar treino',
                presentation: 'modal',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => <CancelButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,

            }} />

            <View style={[s.flex1, s.bgWhite]}>
                <EditWorkoutForm
                    workoutId={id}

                />
            </View>
        </>
    )
}