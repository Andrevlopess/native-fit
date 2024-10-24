import { useAuth } from '@/contexts/AuthContext'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { z } from 'zod'
import { ControlledInput } from '../controllers/ControlledInput'
import Button from '../ui/Button'
import { LineDivisor } from '../ui/Divisors'
// import { GoogleAuthButton } from '../ui/GoogleAuthButton'

const signUpSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email('Insira um email válido').min(1, 'Insira um email'),
    password: z.string().min(1, 'Insira a senha').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordConfirm: z.string().min(1, 'Insira a senha'),
}).refine(
    values => values.password === values.passwordConfirm, {
    message: "As senhas não correspondem!",
    path: ["passwordConfirm"],
});

export type SignUpParams = z.infer<typeof signUpSchema>

export default function CredentialsSignUpForm() {


    const { SignUp } = useAuth()

    const { control, handleSubmit } = useForm<SignUpParams>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: 'andrevlopes',
            email: 'andrellopes021@gmail.com',
            password: 'teste123',
            passwordConfirm: 'teste123'
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['signUp'],
        mutationFn: SignUp,
    })

    const handleLogin = (data: SignUpParams) => {
        mutate(data)
    }


    return (
        <ScrollView

            contentContainerStyle={[s.gap24, s.p12]}
            style={[s.flex1]}>
            <ControlledInput
                name='name'
                label='Qual o seu nome?'
                control={control}
                rules={{ required: true }}
            />
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
            <ControlledInput
                name='passwordConfirm'
                label='Confirme sua senha'
                control={control}
                rules={{ required: true }}
                secureTextEntry
            />


            <Button
                text='Criar conta'
                // variant='secondary'
                isLoading={isPending}
                // size="small"
                onPress={handleSubmit(handleLogin)} />

            {/* <LineDivisor text='ou' />

            <GoogleAuthButton /> */}

            <LineDivisor text='Já tem uma conta?' styles={[s.mt24]} />

            <Button
                text='Acessar minha conta'
                variant='secondary'
                asLink={'/auth/signUp'} />

        </ScrollView>
    )
}