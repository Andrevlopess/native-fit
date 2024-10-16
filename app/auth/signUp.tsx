import CredentialsSignUpForm from '@/components/forms/CredentialsSignUpForm'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import { s } from '@/styles/global'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'



export default function SignUpScreen() {

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Criar conta',
                    // headerLeft: props => <HeaderBackButton {...props}/>
                    headerTitleAlign: 'center',
                    headerTitle: ({ children }) => <AnimatedHeaderTitle title={children} />
                }}
            />

            <View style={[s.flex1, s.bgWhite]}>

                <CredentialsSignUpForm />

            </View>


        </>
    )
}