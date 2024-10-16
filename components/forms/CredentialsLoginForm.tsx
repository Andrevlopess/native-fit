import { useAuth } from '@/contexts/AuthContext'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { z } from 'zod'
import { ControlledInput } from '../controllers/ControlledInput'
import Button from '../ui/Button'
import { LineDivisor } from '../ui/Divisors'
import { GoogleAuthButton } from '../ui/GoogleAuthButton'
import { Snackbar } from '../ui/Snackbar'

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

    const { mutate, isPending, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: Login,
    })

    const handleLogin = (data: LoginParams) => {
        mutate(data)
    }


    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={-24}
            behavior='height'
            style={[s.flex1, s.gap24]}>
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
                isLoading={isPending}
                onPress={handleSubmit(handleLogin)} />


            <LineDivisor text='ou' />

            <GoogleAuthButton />

            {error &&
                <>
                    <Snackbar
                        icon={X}
                        position='top'
                        variant='error'
                        message={error.message}
                    />
                </>

            }

            <LineDivisor text='Ainda não tem uma conta?' styles={[s.mtAuto]} />

            <Button
                text='Criar uma conta'

                variant='secondary'
                asLink={'/auth/signUp'}
            />


        </KeyboardAvoidingView>
    )
}