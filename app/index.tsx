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
        // ? <Redirect href={'/(app)/home'} />
        ? <Redirect href={'/(app)/workouts/ec119a07-b631-45b5-ac7b-c959a8341fc3'} />
        : <Redirect href={'/auth'} />
}
