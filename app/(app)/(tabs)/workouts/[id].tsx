import { WorkoutApi } from '@/api/workout-api';
import NotFoundScreen from '@/app/+not-found';
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import Button from '@/components/ui/Button';
import LoadingView from '@/components/views/LoadingView';
import MessageView from '@/components/views/MessageView';
import WorkoutExercisesList from '@/components/workout/WorkoutExercisesList';
import COLORS from '@/constants/Colors';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { IWorkout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


type SearchParams = { id: string }

export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<SearchParams>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }
    const { offset, scrollHandler } = useScrollValue('y');


    const { data: workout, isPending } = useQuery({
        queryKey: ["workouts", id],
        queryFn: () => WorkoutApi.findOne({ id }),
        // retry: false,    
    });

    return (
        <>
            <Stack.Screen options={{
                title: workout?.name || "",
                // headerLargeTitle: true,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerTitle: ({ children }) =>
                    <AnimatedHeaderTitle offset={offset} title={children} />,
                headerRight: () => workout &&
                    <Link href={{
                        pathname: `/edit-workout/${id}`,
                        params: { name: workout.name, description: workout.description }
                    }} style={[s.bold, s.textBlack, s.textBase, s.p12]}>
                        Editar
                    </Link>
            }} />

            {isPending
                ? <LoadingView />
                : !workout
                    ? <Text>Treino nao encontrado</Text>
                    : <Animated.ScrollView
                        entering={FadeIn}
                        automaticallyAdjustContentInsets
                        contentInsetAdjustmentBehavior='automatic'
                        onScroll={scrollHandler}
                        style={[s.flex1, s.bgWhite]}
                        contentContainerStyle={[s.pb12]}
                    >

                        <View style={[s.px12]}>
                            <AnimatedLargeTitle title={workout.name} offset={offset} />
                            {workout.description &&
                                <Text style={[s.medium, s.textBase, s.textGray600]}>{workout.description?.trim()}</Text>
                            }
                        </View>


                        <View>
                            <View style={[s.flexRow, s.gap4, s.p12]}>



                               
                                    <Button
                                        text='Iniciar treino'
                                        asLink={{ pathname: `/working-out/${id}` }}
                                        size='small'
                                        // rounded
                                    />
                                
                            </View>
                            <WorkoutExercisesList workoutId={id} />
                        </View>


                    </Animated.ScrollView>
            }

        </>
    )
}
{/* <View style={[s.flexRow, s.p12]}>
    {workout?.exercises?.map((exercise, i) =>
        <View style={[s.shadow6, s.radius8, {
            marginLeft: -20, zIndex: 10 - i,
            transform: [
                {
                    rotateY: '-20deg'

                },
                {
                    rotateY: '3deg'

                },
                {
                    rotateZ: '-10deg'
                    // translateY: i * 5
                }
            ]
        }]}>
            <Image
                source={exercise.gifurl}
                style={[{
                    height: 100, width: 100,
                }
                ]} />
        </View>
    )}
</View> */}
