import LoadingView from '@/components/views/LoadingView';
import COLORS from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { s } from '@/styles/global';
import { Redirect, SplashScreen } from 'expo-router';
import React from 'react';



export default function Index() {

    SplashScreen.hideAsync()
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <LoadingView style={[s.bgBlack]} loadingColor={COLORS.white} />;

    return isAuthenticated
        ? <Redirect href={'/(app)/workouts/8001d6b0-4356-493d-8b29-16721225afb2'} />
        : <Redirect href={'/auth'} />
}