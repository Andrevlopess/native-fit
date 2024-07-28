import LoadingView from '@/components/views/LoadingView';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect, SplashScreen } from 'expo-router';
import React from 'react';

export default function Index() {

    SplashScreen.hideAsync()
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <LoadingView />;

    return isAuthenticated
        ? <Redirect href={'/home'} />
        : <Redirect href={'/auth'} />
}