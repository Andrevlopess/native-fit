import { AuthApi } from '@/api/auth-api'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'
import { ControlledInput } from '../controllers/ControlledInput'
import Button from '../ui/Button'
import Divisor, { LineDivisor } from '../ui/Divisors'
import { useAuth } from '@/contexts/AuthContext'

const loginShema = z.object({
    email: z.string().email('Insira um email válido').min(1, 'Insira um email'),
    password: z.string().min(1, 'Insira a senha')
})

export type LoginParams = z.infer<typeof loginShema>

export default function CredentialsLoginForm() {


    const { Login } = useAuth()

    const { control, handleSubmit } = useForm<LoginParams>({
        resolver: zodResolver(loginShema),
        defaultValues: {
            email: 'andrellopes021@gmail.com',
            password: 'teste123'
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: Login,
    })

    const handleLogin = (data: LoginParams) => {
        mutate(data)
    }


    return (
        <View style={[s.flex1, s.gap24]}>
            <ControlledInput
                name='email'
                label='Email'
                control={control}
                rules={{ required: true }}
                keyboardType='email-address'
            />
            <ControlledInput
                name='password'
                label='Senha'
                control={control}
                rules={{ required: true }}
                secureTextEntry
            />


            <Button
                text='Entrar'
                variant='secondary'
                isLoading={isPending}
                size="small"
                onPress={handleSubmit(handleLogin)} />

            <LineDivisor text='Ainda não tem uma conta?' styles={[s.mtAuto]} />

            <Button
                text='Criar uma conta'
                variant='ghost'
                size="small"
                asLink={'/auth/signUp'} />


        </View>
    )
}