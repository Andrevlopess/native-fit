import { ExerciseApi } from '@/api/exercise-api';
import FeaturedExercices from '@/components/exercise/FeaturedExercices';
import Button from '@/components/ui/Button';
import { LineDivisor } from '@/components/ui/Divisors';
import LoadingView from '@/components/views/LoadingView';
import { WorkoutListCard } from '@/components/workout/WorkoutListCard';
import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { s } from '@/styles/global';
import { useQuery } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BicepsFlexed, ChevronUp, Dumbbell, Target } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// horizontal padding of 12 * 2
const IMAGE_SIZE = SCREEN_WIDTH - 24;



export default function ExerciseDetailsModal() {

    const { top } = useSafeAreaInsets()
    const params = useLocalSearchParams
        <{
            id: string,
            name: string;
            bodypart: string;
            gifurl: string;
            equipment: string;
            target: string;
        }>();


    const { data: similarExercises, isPending } = useQuery({
        queryKey: ['similiar-exercises', params.id],
        queryFn: () => ExerciseApi.fecthSimilarExercises({ id: params.id })
    })

    const { data: workoutsWithThisExercise, isPending: isWorkoutsPending } = useQuery({
        queryKey: ['workouts-with-this-ex', params.id],
        queryFn: () => ExerciseApi.findWorkoutsWith({ id: params.id })
    })

    const imageHeight = SCREEN_WIDTH
    // animations
    const sv = useSharedValue<number>(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            "worklet";
            sv.value = event.contentOffset.y;
            // console.log(sv.value);
        },
    });

    const imageAnimation = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(sv.value,
                [-imageHeight, 0, imageHeight],
                [-imageHeight / 2, 0, imageHeight * 0.7])
        }, {
            scale: interpolate(sv.value, [-imageHeight, 0, imageHeight], [2, 1, 1])
        }],
        opacity: interpolate(sv.value, [-imageHeight, 0, imageHeight], [1, 1, 0])
    }));

    const handlerAnimation = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(sv.value,
                [-imageHeight, 0, imageHeight],
                [0, 0, imageHeight * 0.1])
        }]
    }));

    const headerBackground = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            sv.value,
            [imageHeight / 2, imageHeight * 0.7],
            ['#FFFFFF00', '#FFFFFF']
        ),
        // borderColor: interpolateColor(
        //     sv.value,
        //     [imageHeight / 2, imageHeight * 0.7],
        //     ['#CCCCCC00', "#CCCCCC50"]
        // ),
    }));

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

    return (
        <>
            <Stack.Screen options={{
                title: '',
                presentation: 'modal',
                // animation: 'fade_from_bottom',
                headerTitleAlign: 'center',
                // headerBackVisible: false,
                headerTransparent: true,
                // headerBackTitleVisible: false,
                // headerLeft: ({ canGoBack }) => <BackButton />,
                headerLeft: ({ }) =>
                    <AnimatedTouchable
                        activeOpacity={0.8}
                        style={[
                            s.radiusFull,
                            s.shadow6,
                            s.p8,
                            s.bgWhite,
                            headerBackground,
                            s.mt12
                        ]}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color={COLORS.black} />
                    </AnimatedTouchable>

                // header: ({ back, navigation }) =>
                //     <Animated.View
                //         style={[
                //             s.bgRed200,
                //             s.p16,
                //             s.flexRow,
                //             s.gap12,
                //             s.itemsCenter,
                //             // s.shadow6,
                //             s.borderBottom1,
                //             { paddingTop: top },
                //             ]}>
                //         <TouchableOpacity
                //             activeOpacity={0.8}
                //             style={[
                //                 s.radiusFull,
                //                 s.p8,
                //                 s.bgWhite,
                //                 headerBackground
                //             ]}
                //             onPress={() => navigation.goBack()}>
                //             <ArrowLeft color={COLORS.black} />
                //         </TouchableOpacity>
                //     </Animated.View>

            }}
            />

            <Animated.ScrollView
                entering={FadeIn}
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={{ paddingBottom: 24 }}>
                <View style={{ paddingTop: 56 }}>

                    <Animated.Image
                        defaultSource={require('@/assets/images/white-waves-bg.svg')}
                        source={{ uri: params.gifurl }}
                        style={[{ height: imageHeight, width: SCREEN_WIDTH }, imageAnimation]} />
                </View>
                <Animated.View style={[
                    s.mxAuto,
                    s.bgGray200,
                    s.itemsCenter,
                    handlerAnimation,
                    {
                        height: 24,
                        width: 120,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }]}>
                    <ChevronUp color={COLORS.gray900} size={24} />
                </Animated.View>
                <LineDivisor />
                <View style={[s.px12, s.py24, s.gap24, s.bgWhite]}>

                    <View>
                        <Text style={[s.medium, s.textGray400, s.textBase]}>Exercício</Text>
                        <Text style={[s.bold, s.text3XL]}>{params.name}</Text>
                    </View>

                    {/* <View style={[s.flexRow, s.gap12]}> */}
                    <View style={[s.itemsCenter, s.flexRow, s.gap12]}>
                        <BicepsFlexed color={COLORS.gray} size={48} />
                        <View style={{ width: "50%" }}>
                            <Text style={[s.medium, s.textGray400, s.textBase]}>Parte do corpo</Text>
                            <Text style={[s.bold, s.text2XL]}>{params.bodypart}</Text>
                        </View>
                    </View>

                    <View style={[s.itemsCenter, s.flexRow, s.gap12]}>
                        <Target color={COLORS.gray} size={48} />
                        <View style={{ width: "50%" }}>
                            <Text style={[s.medium, s.textGray400, s.textBase]}>Músculo alvo</Text>
                            <Text style={[s.bold, s.text2XL]}>{params.target}</Text>
                        </View>
                    </View>
                    {/* </View> */}

                    <View style={[s.itemsCenter, s.flexRow, s.gap12]}>
                        <Dumbbell color={COLORS.gray} size={48} />
                        <View style={{ width: "50%" }}>
                            <Text style={[s.medium, s.textGray400, s.textBase]}>Equipamento</Text>
                            <Text style={[s.bold, s.text2XL]}>{params.equipment}</Text>
                        </View>
                    </View>
                </View>

                <LineDivisor />

                <View style={[s.gap12, s.p12, s.my24]}>

                    <Text style={[s.textXL, s.semibold]}>Esse exercício está nesses treinos</Text>

                    {
                        isWorkoutsPending
                            ? <LoadingView />
                            : workoutsWithThisExercise?.length
                                ? workoutsWithThisExercise.map(workout =>
                                    <WorkoutListCard workout={workout} key={workout.id} />)
                                : <View style={[s.itemsCenter, s.gap12, s.justifyCenter, s.mt24]}>
                                    <Text style={[s.textGray600, s.medium]}>Você ainda não adicionou a nenhum treino</Text>
                                    <Button
                                        text="Adicionar a um treino"
                                        size='small'
                                        asLink={`/add-to-workout/${params.id}`} />
                                </View>

                    }
                </View>
                <LineDivisor />
                <View style={[s.mt24]}>
                    {
                        isPending
                            ? <LoadingView />
                            :
                            similarExercises?.length && <FeaturedExercices
                                title='Veja algumas opções similares'
                                exercises={similarExercises}
                                itemsPerSection={3} />



                    }
                </View>



            </Animated.ScrollView >
        </>
    )
}