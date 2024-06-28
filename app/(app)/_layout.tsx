import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AppRootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' options={{ headerShadowVisible: false }} />
            <Stack.Screen name='(modals)'
                options={{
                    headerShadowVisible: false,
                    presentation: 'modal',
                    animation: 'fade_from_bottom'
                }} />
        </Stack>
    )
}