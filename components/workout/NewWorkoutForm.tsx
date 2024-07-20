import { useCreateWorkout } from '@/hooks/useCreateWorkout'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'
import { ControlledInput } from '../controllers/ControlledInput'
import Button from '../ui/Button'


const NewWorkoutSchema = z.object({
    name: z.string().min(1, 'Dê um nome ao seu novo treino!'),
    description: z.string()
})


type NewWorkoutValues = z.infer<typeof NewWorkoutSchema>

export default function NewWorkoutForm() {


    const { control, handleSubmit } = useForm<NewWorkoutValues>({
        resolver: zodResolver(NewWorkoutSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })


    const { mutate, isPending, } = useCreateWorkout({
        onError: console.error,
        onSuccess: ({ id, description, name }) => {



            router.replace(`/workouts`),



                router.push({
                    pathname: `/workouts/${id}`,
                    params: {
                        name: name,
                        description: description,
                    }
                })
        },
    })

    const handleSubmitForm = (data: NewWorkoutValues) => {
        mutate(data)
    }

    return (
        <View style={[s.gap12, s.mt12, s.flex1]}>
            <Text
                style={[s.textGray600, s.textLG, s.medium]}>Dê um nome e descrição ao seu novo treino!</Text>

            <ControlledInput
                control={control}
                name='name'
                rules={{ required: true }}
                label='Nome'
                placeholder='Como quer chamar seu treino?'
            />

            <ControlledInput
                control={control}
                name='description'
                rules={{ required: true }}
                label='Descrição'
                placeholder='Para que serve seu treino?'

            />

            <Button
                style={[s.mtAuto]}
                text='Criar'
                isLoading={isPending}
                onPress={handleSubmit(handleSubmitForm)}
            />
        </View>
    )
}