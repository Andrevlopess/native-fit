import Button from '@/components/ui/Button'
import { useFetchWorkouts } from '@/hooks/useFetchWorkouts'
import { s } from '@/styles/global'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)

export default function AddToWorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();


    const { data: workouts, isPending, isError, error } = useFetchWorkouts();




    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar ao treino',
                headerTitleAlign: 'center',
                presentation: 'modal',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => <CancelButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>
            }} />


            <View style={[s.flex1, s.bgWhite, s.p12]}>
                <Button text='Novo treino' variant='secondary' size='small' />
                {/* <View style={[s.px12, s.gap8]}>
                    {workouts.map((workout, i) =>
                        <WorkoutListCard
                            workout={workout}
                            key={`${i}, ${workout.id}`} />)}
                </View> */}
            </View>

        </>
    )
}