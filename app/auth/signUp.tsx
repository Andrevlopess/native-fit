import { ControlledInput } from '@/components/controllers/ControlledInput'
import CredentialsLoginForm from '@/components/forms/CredentialsLoginForm'
import CredentialsSignUpForm from '@/components/forms/CredentialsSignUpForm'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import Button from '@/components/ui/Button'
import { HeaderBackButton } from '@/components/ui/HeaderBackButton'
import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'



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

            <ScrollView style={[s.flex1, s.bgWhite, s.p12]}>

                <CredentialsSignUpForm />

            </ScrollView>


        </>
    )
}