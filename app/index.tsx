import LoadingView from '@/components/views/LoadingView'
import { AuthContext, useAuth } from '@/contexts/AuthContext'
import { Redirect, SplashScreen } from 'expo-router'
import React, { useContext } from 'react'

export default function Index() {

    SplashScreen.hideAsync();
    // const { isAuthenticated, isLoading } = useAuth();

    const {isAuthenticated, isLoading } = useContext(AuthContext);



    console.log('render loadinggggggggg', isAuthenticated, isLoading);


    if (isLoading) return <LoadingView />;

    return isAuthenticated
        ? <Redirect href={'/home'} />
        : <Redirect href={'/auth'} />
    // return !!user
    //     ? <Redirect href={'/home'} />
    //     : <Stack><Stack.Screen name='auth' /></Stack>
}

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Redirect } from 'expo-router'

// export default function Index() {
//     return <Redirect href={'/home'} />
// }