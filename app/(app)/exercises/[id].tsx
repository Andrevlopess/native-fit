import ErrorView from '@/components/views/ErrorView';
import LoadingView from '@/components/views/LoadingView';
import NotFoundView from '@/components/views/NotFoundView';
import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { supabase } from '@/lib/supabase';
import { s } from '@/styles/global';
import { IExercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function ExerciseDetailsScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const { top } = useSafeAreaInsets();

    async function ExerciseDetils(id: string | undefined) {
        try {

            let { data, error } = await supabase
                .rpc('get-exercise-details', { exercise_id: id })
                .single()


            if (error) throw error;

            return data as IExercise;
        } catch (error) {
            if (!axios.isAxiosError(error)) throw error;
            throw new Error(error.response?.data.error || 'Ocorreu um erro inesperado!');
        }
    }


    const { data: details, isPending, error, isError } = useQuery({
        queryKey: ['exercise-details', id],
        queryFn: ({ queryKey }) => ExerciseDetils(queryKey[1])
    })


    const imageHeight = SCREEN_WIDTH / 1.2
    // animations
    const sv = useSharedValue<number>(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            "worklet";
            sv.value = event.contentOffset.y;
            // console.log(sv.value);
        },
    });
    const headerTitleAnimation = useAnimatedStyle(() => ({
        opacity: interpolate(sv.value, [imageHeight / 2, imageHeight * 0.7], [0, 1]),
    }))

    const imageAnimation = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(sv.value,
                [-imageHeight, 0, imageHeight],
                [-imageHeight / 2, 0, imageHeight * 0.7])
        }, {
            scale: interpolate(sv.value, [-imageHeight, 0, imageHeight], [2, 1, 1])
        }]
    }));
    const parallaxTextAnim = useAnimatedStyle(() => ({
        opacity: interpolate(sv.value, [-imageHeight / 2, 0, imageHeight], [0, 1, 1])
    }));
    const headerBackground = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            sv.value,
            [imageHeight / 2, imageHeight * 0.7],
            ['#FFFFFF00', '#FFFFFF']
        ),
        borderColor: interpolateColor(
            sv.value,
            [imageHeight / 2, imageHeight * 0.7],
            ['#CCCCCC00', "#CCCCCC50"]
        ),
    }));


    // console.log(details?.gif_url);
    

    return (
        <>

            <Stack.Screen options={{
                title: '',
                header: ({ back, navigation }) => {
                    return (
                        <Animated.View
                            style={[
                                s.bgWhite,
                                s.p16,
                                s.flexRow,
                                s.gap12,
                                s.itemsCenter,
                                s.borderBottom1,
                                { paddingTop: top },
                                headerBackground]}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    s.radiusFull,
                                    s.p8,
                                    s.bgWhite]}
                                onPress={() => navigation.goBack()}>
                                <ArrowLeft color={COLORS.black} />
                            </TouchableOpacity>
                            <Animated.Text numberOfLines={1} style={[s.bold, s.flex1, s.textLG, headerTitleAnimation]}>
                                {details?.name}
                            </Animated.Text>
                        </Animated.View>

                    )
                },
                // headerTransparent: true,
            }} />


            {isPending
                ? <LoadingView />
                : isError
                    ? <ErrorView
                        title='Ocorreu um erro!'
                        description={error.message}
                    />
                    : details
                        ? <Animated.ScrollView
                            entering={FadeIn}
                            // contentInsetAdjustmentBehavior='automatic'
                            onScroll={scrollHandler}
                            style={[s.flex1, s.bgWhite]}

                            contentContainerStyle={[s.gap12]}>
                            {/* <Image
                                style={[{
                                    height: SCREEN_WIDTH, width: SCREEN_WIDTH
                                }]}
                                source={details.gif_url}
                            /> */}

                            <Animated.Image
                                style={[{ height: SCREEN_WIDTH, width: SCREEN_WIDTH }, imageAnimation]}
                                source={{
                                    uri: details.gifurl
                                }}
                            />

                            <Text>teste</Text>
                            <Text style={[s.bold, s.textCenter, s.textGray400]}>teste{details.name}</Text>
                        </Animated.ScrollView>
                        : <NotFoundView
                            title='Exercício não encontrado'
                            description='Não encontramos o exercício que você queria!' />
            }


        </>

    )
}