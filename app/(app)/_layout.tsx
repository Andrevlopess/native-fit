import { View, Text } from 'react-native'
import React from 'react'
import { SplashScreen, Stack } from 'expo-router'


export default function AppRootLayout() {

    SplashScreen.hideAsync()
    console.log('render app');


    return (
        <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false }}>
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