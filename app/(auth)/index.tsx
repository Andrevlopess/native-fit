import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Link, Stack, router } from 'expo-router'

export default function AuthIndexScreen() {
    return (


        <>

            <Stack.Screen
                options={{
                    title: ''
                }}

            />

            <View style={[s.bgWhite, s.flex1, s.p12, s.justifyEnd]}>

                <Button
                    text="Acessar meus treinos"
                    onPress={() => router.push('(auth)/login')} />

                <Button
                    text="Criar minha conta"
                    variant='ghost'
                    onPress={() => router.push('/(auth)/(sign-up-form)/datas-step')} />


            </View>
        </>
    )
}