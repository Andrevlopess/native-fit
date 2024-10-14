import { s } from '@/styles/global';
import { IWorkout } from '@/types/workout';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { SelectableWorkoutListCard } from './WorkoutSelectableCard';
import Button from '../ui/Button';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react-native';
import COLORS from '@/constants/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FadeInTransition } from '@/constants/Transitions';
import { WorkoutApi } from '@/api/workout-api';
import { Snackbar } from '../ui/Snackbar';



const AddToWorkoutSchema = z.object({
    exerciseId: z.string(),
    addTo: z.array(z.string()).min(1, 'Selecione pelo menos um treino')
})


type AddToWorkoutsValues = z.infer<typeof AddToWorkoutSchema>


interface WorkoutSelectableListProps {
    exerciseId: string;
    workouts: IWorkout[]
}


export default function WorkoutSelectableList({ workouts, exerciseId }: WorkoutSelectableListProps) {


    const queryClient = useQueryClient()

    const { control, handleSubmit } = useForm<AddToWorkoutsValues>({
        resolver: zodResolver(AddToWorkoutSchema),
        mode: 'onSubmit',
        defaultValues: {
            exerciseId,
            addTo: []
        }
    });

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationKey: ['add-exercise-to'],
        mutationFn: WorkoutApi.addExercise,
        onSuccess: (data) => {

            data.map(inserted =>
                queryClient.invalidateQueries({ queryKey: ["workout-exercises", inserted.workout_id] }))


            queryClient.invalidateQueries({ queryKey: ['workouts-with-this-ex', exerciseId] })



            router.back();
        },
    })

    function handleSubmitSelectedWorkouts({ addTo, exerciseId }: AddToWorkoutsValues) {
        mutate({
            exercise: exerciseId,
            workouts: addTo
        });
    }

    return (
        <>
            <View style={[s.gap24, s.flex1, s.mt24]}>

                <Text style={[s.semibold, s.textXL]}>Treinos disponíveis</Text>
                <View style={[s.gap8]}>

                    {workouts.map((workout, index) => {
                        return (
                            <Controller
                                key={workout.id}
                                control={control}
                                name='addTo'
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => {

                                    const handleSelectWorkout = (id: string) => {

                                        value.includes(id)
                                            ? onChange(value.filter(ids => ids !== id))
                                            : onChange([...value, id])
                                    }


                                    return (
                                        <SelectableWorkoutListCard
                                            key={workout.id}
                                            workout={workout}
                                            isSelected={value.includes(workout.id)}
                                            onSelect={handleSelectWorkout} />
                                    )
                                }
                                }
                            />


                        )
                    })}
                    {error &&
                        <Snackbar message={error.message} variant='error' />
                    }
                </View>

                <Button
                    style={[s.mt24]}
                    text='Feito'
                    isLoading={isPending}
                    onPress={handleSubmit(handleSubmitSelectedWorkouts)} />
            </View>
        </>

    )
}