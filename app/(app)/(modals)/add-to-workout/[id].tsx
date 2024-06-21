import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { s } from '@/styles/global'

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase]}>Cancelar</Text>
    </TouchableOpacity>
)

export default function AddToWorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>()


    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar ao treino',
                headerTitleAlign: 'center',
                presentation: 'modal',
                headerLeft: ({ canGoBack }) => <CancelButton />
            }} />


            <View style={[s.flex1, s.itemsCenter, s.justifyCenter]}>
                <Text>{id}</Text>
            </View>

        </>
    )
}