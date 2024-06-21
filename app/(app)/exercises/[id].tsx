import { supabase } from '@/lib/supabase';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { IExercise } from '@/types/exercise';
import NotFoundScreen from '@/app/+not-found';
import NotFoundView from '@/components/views/NotFoundView';
import LoadingView from '@/components/views/LoadingView';
import { QueryData } from '@supabase/supabase-js';
import { s } from '@/styles/global';
import ErrorView from '@/components/views/ErrorView';



export default function ExerciseDetailsScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    async function ExerciseDetils(id: string | undefined) {
        try {

            let { data, error } = await supabase
                .rpc('get_exercise_details', { exercise_id: 'sdadsa' })


            if (error) throw error;

            return data as IExercise


        } catch (error) {
            if (!axios.isAxiosError(error)) throw error;
            throw new Error(error.response?.data.error || 'Ocorreu um inesperado');
        }
    }


    const { data: details, isLoading, error, isError } = useQuery({
        queryKey: ['exercise-details', id],
        queryFn: ({ queryKey }) => ExerciseDetils(queryKey[1])
    })


    return (
        <>

            <Stack.Screen options={{ title: id }} />


            {isLoading
                ? <LoadingView />
                : isError
                    ? <ErrorView
                        title='Ocorreu um erro!'
                        description={error.message}
                    />
                    : details
                        ? <View style={[s.flex1, s.bgWhite]}>
                            {details.equipment}
                        </View>
                        : <NotFoundView
                            title='Exercício não encontrado'
                            description='Não encontramos o exercício que você queria!' />
            }


        </>

    )
}