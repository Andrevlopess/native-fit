import { useAuth } from '@/contexts/AuthContext';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import React from 'react';


export default function AppRootLayout() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Redirect href={'/auth'} />
    SplashScreen.hideAsync()

    return (
        <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false, headerTransparent: true }}>
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