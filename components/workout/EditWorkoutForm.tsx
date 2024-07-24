import { WorkoutApi } from '@/api/workout-api'
import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'
import { z } from 'zod'
import { ControlledInput } from '../controllers/ControlledInput'
import Button from '../ui/Button'
import WorkoutExercisesList from './WorkoutExercisesList'


const NewWorkoutSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Dê um nome ao seu novo treino!'),
    description: z.string()
})


type NewWorkoutValues = z.infer<typeof NewWorkoutSchema>

interface EditWorkoutFormProps {
    workoutId: string,
    name?: string;
    description?: string;
}

export default function EditWorkoutForm({ workoutId, name, description }: EditWorkoutFormProps) {


    const { control, handleSubmit, formState: { dirtyFields } } = useForm<NewWorkoutValues>({
        resolver: zodResolver(NewWorkoutSchema),
        defaultValues: {
            id: workoutId,
            name,
            description
        }
    })


    const { mutate, isPending, } = useMutation({
        mutationKey: ['edit-workout', workoutId],
        mutationFn: WorkoutApi.edit,
        onError: console.error,
        onSuccess: ({id, name, description}) => {          
            router.back();
            router.setParams({name, description})
        }
    })

    const handleSubmitForm = (data: NewWorkoutValues) => {
        mutate(data)
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={[s.gap12]}
                style={[s.flex1]}>
                {/* <Text
                style={[s.textGray600, s.textLG, s.medium]}>Dê um nome e descrição ao seu novo treino!</Text> */}

                <View style={[s.p12, s.gap24]}>
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

                </View>
                <Text style={[s.p12, s.mt12, s.semibold, s.textXL]}>Exercícios</Text>

                <WorkoutExercisesList workoutId={workoutId} />
               
            </ScrollView>

            <LinearGradient
                locations={[0, 0.4]}
                dither={false}
                colors={['transparent', COLORS.white]}
                style={[s.p12, s.absolute, s.flexRow, s.gap12,
                { bottom: 0, left: 0, right: 0, paddingTop: 24 }]}
            >

                <Button
                    text='Salvar'
                    size='small'
                    style={[s.flex1]}
                    variant='secondary'
                    isLoading={isPending}
                    disabled={!(dirtyFields.name || dirtyFields.description)}

                    onPress={handleSubmit(handleSubmitForm)}

                />
            </LinearGradient>
        </>


    )
}