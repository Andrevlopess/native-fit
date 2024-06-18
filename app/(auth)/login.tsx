import { ControlledInput } from '@/components/controllers/ControlledInput'
import Button from '@/components/ui/Button'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'


const loginSchema = z.object({
    email: z.string().min(1, 'Insira seu email').email('Insira um email válido'),
    password: z.string().min(1, 'Insira a senha'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginScreen() {


    const { control, handleSubmit } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function handleLogin(data: LoginValues) {
        // todo
    }



    return (
        <>
            <Stack.Screen
                options={{
                    title: ''

                }}
            />

            <View style={[s.flex1, s.p12, s.bgWhite, s.px16]}>
                <Text style={[s.bold, s.text2XL]}>Acesse seus treinos</Text>
                <Text style={[s.medium, s.textLG, s.textGray600]}>Insira seu email e senha para entrar na sua conta</Text>

                <View style={[s.mt24, s.gap12]}>
                    <ControlledInput
                        name='email'
                        keyboardType='email-address'
                        control={control}
                        rules={{ required: true }}
                        placeholder='Email'
                    />
                    <ControlledInput
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        placeholder='Senha'
                    />
                </View>

                <View style={[s.mtAuto]}>
                    <Button
                        text="Entrar"
                        onPress={handleSubmit(handleLogin)} />

                    <Button
                        text="Ainda não tenho uma conta"
                        variant='ghost'
                        onPress={() => router.push('/(auth)/(sign-up-form)/datas-step')} />
                </View>
            </View>
        </>
    )
}