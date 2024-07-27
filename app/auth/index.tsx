import ExerciseListCard from '@/components/exercise/ExerciseListCard'
import CredentialsLoginForm from '@/components/forms/CredentialsLoginForm'
import Button from '@/components/ui/Button'
import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton'
import { s } from '@/styles/global'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SplashScreen, Stack, router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'

export default function AuthIndexScreen() {

    return (
        <>

            <Stack.Screen
                options={{
                    title: ''
                }}
            />

            <Animated.View
                style={[s.bgWhite, s.flex1, s.p12, s.justifyEnd]}>

                {/* <GoogleAuthButton /> */}

                <Button
                    text="Acessar minha conta"
                    // variant=''
                    asLink={'/auth/login'}
                />

                <Button
                    text="Criar minha conta"
                    variant='ghost'
                    onPress={() => router.push('/(auth)/(sign-up-form)/datas-step')} />


            </Animated.View>

        </>
    )
}