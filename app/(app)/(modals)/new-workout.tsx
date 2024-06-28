import NewWorkoutForm from '@/components/NewWorkoutForm'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Stack, router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)

export default function NewWorkoutScreen() {
    return (
        <>
            <Stack.Screen options={{
                title: 'Novo Treino',
                presentation: 'modal',
                // animation: 'fade_from_bottom',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => <CancelButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,
            }} />

            <View style={[s.flex1, s.bgWhite, s.p12]}>
                <NewWorkoutForm />
            </View>
        </>
    )
}