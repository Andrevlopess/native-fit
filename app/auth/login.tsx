import CredentialsLoginForm from '@/components/forms/CredentialsLoginForm'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import { s } from '@/styles/global'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'



export default function LoginScreen() {


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Login',
                    // headerLeft: props => <HeaderBackButton {...props}/>
                    headerTitleAlign: 'center',
                    headerTitle: ({ children }) => <AnimatedHeaderTitle title={children} />
                }}
            />

            <View style={[s.flex1, s.bgWhite, s.p12]}>

                <CredentialsLoginForm />

            </View>


        </>
    )
}