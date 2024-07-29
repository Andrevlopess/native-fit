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
        ? <Redirect href={'/home'} />
        : <Redirect href={'/auth'} />
}