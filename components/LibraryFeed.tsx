import { bestCardioExercises, bestQuadExercises } from '@/constants/Exercises'
import { s } from '@/styles/global'
import React from 'react'
import { View } from 'react-native'
import FeaturedExercices from './exercise/FeaturedExercices'
import LoadingView from './views/LoadingView'
import MessageView from './views/MessageView'

export default function LibraryFeed() {
    // async function featuredExercises() {
    //     try {

    //         let { data, error } = await supabase
    //             .rpc('search-exercises', {
    //                 page_num: '1',
    //                 page_size: '9',
    //                 query: 'agachamento'
    //             })

    //         if (error) throw error;

    //         return data as IExercise[];
    //     } catch (error) {
    //         if (!axios.isAxiosError(error)) throw error;
    //         throw new Error(error.response?.data.error || 'Ocorreu um erro inesperado!');
    //     }
    // }


    // const { data: exercises, isPending, error, isError } = useQuery({
    //     queryKey: ['featured-exercises'],
    //     queryFn: ({ queryKey }) => featuredExercises()
    // });



    return (
        <View style={[s.gap12, s.flex1, s.mt12]}>
            {/* <Text suppressHighlighting style={[s.text2XL, s.semibold]}>Sugerido</Text> */}


            {false //isPending
                ? <LoadingView />
                : false // isError
                    ? <MessageView
                        message='Ocorreu um erro!'
                        description={'error.message'}
                    />
                    : true
                        ? <>
                            <FeaturedExercices
                                title='O melhor para seus quadríceps'
                                exercises={bestQuadExercises} />
                            <FeaturedExercices
                                title='Para queimar gordura'
                                exercises={bestCardioExercises} />
                            {/* <View
                                style={[s.flex1]}
                            >
                                {CardioExercises.map(exercise =>
                                    <ExerciseListCard exercise={exercise} key={exercise.id} />)}
                            </View> */}

                        </>
                        : <MessageView
                            message='Exercício não encontrado'
                            description='Não encontramos o exercício que você queria!' />
            }


        </View>
    )
}