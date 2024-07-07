import COLORS from '@/constants/Colors'
import { useModal } from '@/hooks/useModal'
import { s } from '@/styles/global'
import { IDetailedExercise, IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Ellipsis, MinusCircle, PlusCircle } from 'lucide-react-native'
import React, { useRef } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native'
import Button from './ui/Button'
import Modal from './ui/Modal'
import { supabase } from '@/lib/supabase'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'


interface ExerciseDetailedCardProps {
    exercise: IDetailedExercise;
    cardWitdh: number;
    inWorkoutId?: string;
    marginHorizontal: number;
}
export default function ExerciseDetailedCard({
    exercise,
    cardWitdh,
    inWorkoutId = '',
    marginHorizontal,
}: ExerciseDetailedCardProps) {

    const modalRef = useRef<BottomSheetModal>(null)

    const queryClient = useQueryClient();

    async function removeExerciseFromWorkout(workoutExerciseId: string) {
        try {
            const { error } = await supabase
                .from('workout_exercises')
                .delete()
                .eq('id', workoutExerciseId)

            if (error) throw error;
        } catch (error) {
            if (!axios.isAxiosError(error)) throw error;
            throw new Error(
                error.response?.data.error || "Ocorreu um erro inesperado!"
            );
        }
    }


    const { mutate, isPending } = useMutation({
        mutationKey: ["remove-exercise-from-workout", exercise.workoutExerciseId],
        mutationFn: removeExerciseFromWorkout,
        onSuccess: () => {
            // Refresh the workout exercises
            queryClient.invalidateQueries({ queryKey: ["workout", inWorkoutId] });
        },
        onError: () => {
            Alert.alert("Erro", "Não foi possível remover o exercício do treino")
        }
    })


    const workoutExerciseId = exercise.workoutExerciseId;

    return (
        <>
            <Animated.View
                entering={FadeIn}
                layout={LinearTransition.springify().stiffness(500).damping(60)}
                style={[s.gap8, s.flex1, { maxWidth: cardWitdh, marginHorizontal }]}>
                <View style={[s.bgWhite, s.shadow3]}>
                    <Image
                        source={exercise.gifurl}
                        style={[s.radius8, { height: cardWitdh, width: cardWitdh, }
                        ]} />
                </View>


                <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, s.mtAuto, s.gap8]}>
                    <Text style={[s.textXL, s.bold, s.flex1]}>{exercise.name}</Text>

                    <Button rounded size='small' variant='ghost'
                        onPress={() => modalRef.current?.present()}>
                        <Ellipsis color={COLORS.gray900} />
                    </Button>

                </View>

                <View style={[s.py12, s.flexRow, s.justifyBetween, s.mt12]}>
                    <Text style={[s.textGray600, s.medium]}>Séries</Text>
                    <Text style={[s.semibold]}>{exercise.notes}</Text>
                </View>
                <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween, s.mt12]}>
                    <Text style={[s.textGray600, s.medium]}>Músculo alvo</Text>
                    <Text style={[s.semibold]}>{exercise.target}</Text>
                </View>
                <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween]}>
                    <Text style={[s.textGray600, s.medium]}>Equipamento</Text>
                    <Text style={[s.semibold]}>{exercise.equipment}</Text>
                </View>
                <View style={[s.py12, s.flexRow, s.justifyBetween]}>
                    <Text style={[s.textGray600, s.medium]}>Parte do corpo</Text>
                    <Text style={[s.semibold]}>{exercise.bodypart}</Text>
                </View>
            </Animated.View >

            {workoutExerciseId &&
                <Modal ref={modalRef} snapPoints={['50%']} >
                    <View style={[s.p12, s.borderBottom1, s.borderGray100, s.flexRow, s.gap12]}>
                        <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>
                            <Image source={exercise.gifurl} style={[s.radius8,
                            { height: 70, width: 70, }
                            ]} />
                        </View>

                        <View style={[s.gap4, s.flex1, s.py4]}>
                            <Text
                                style={[s.medium, s.textBase, { lineHeight: 18 }]}
                                numberOfLines={2}>
                                {exercise.name}
                            </Text>
                            <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
                            <Text style={[s.regular, s.textGray400]}>{exercise.equipment}</Text>
                        </View>
                    </View>
                    {/* <ExerciseListCard exercise={exercise} showsAddButton={false}/> */}
                    <TouchableOpacity style={[s.flexRow, s.p12, s.itemsCenter, s.gap12, s.mt12]}>
                        {isPending
                            ? <ActivityIndicator color={COLORS.gray900} />
                            : <PlusCircle color={COLORS.gray900} />
                        }

                        <Text style={[s.medium, s.textBase, s.textGray800]}>Adicionar a outro treino</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            modalRef.current?.close()
                            setTimeout(() => {

                                mutate(workoutExerciseId)

                            }, 300)

                        }
                        }
                        style={[s.flexRow, s.p12, s.itemsCenter, s.gap12, s.mt12]}>

                        {isPending
                            ? <ActivityIndicator color={COLORS.gray900} />
                            : <MinusCircle color={COLORS.gray900} />
                        }


                        <Text style={[s.medium, s.textBase, s.textGray800]}>Remover deste treino</Text>
                    </TouchableOpacity>
                </Modal>
            }


        </>


    )
}
