import Button from '@/components/ui/Button'
import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton'
import { s } from '@/styles/global'
import { router, Stack } from 'expo-router'
import React from 'react'
import { ImageBackground } from 'react-native'

export default function AuthIndexScreen() {

    return (
        <>

            <Stack.Screen
                options={{
                    title: '',
                    headerTransparent: true
                }}
            />

            <ImageBackground
                source={require('@/assets/images/splash-black-logo.png')}
                style={[s.flex1, s.p12, s.gap12, s.justifyEnd]}
                resizeMode='contain'
            >

                <Button
                    text="Acessar minha conta"
                    // variant=''
                    asLink={'/auth/login'}
                />


                <Button
                    text="Criar conta"
                    variant='ghost'
                    asLink={'/auth/signUp'}
                />





            </ImageBackground>

        </>
    )
}