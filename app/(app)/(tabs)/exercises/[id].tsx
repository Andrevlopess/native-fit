
import LoadingView from '@/components/views/LoadingView';
import MessageView from '@/components/views/MessageView';

import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useFetchExerciseDetails } from '@/hooks/useFetchExerciseDetails';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const IMAGE_SIZE = SCREEN_WIDTH - 24;

export default function ExerciseDetailsScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        return <MessageView
            message='Este exercício não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }

    const { data: details, isError, isPending, error } = useFetchExerciseDetails(id)


    const imageHeight = SCREEN_WIDTH / 1.2
    // animations

    // const { offset, scrollHandler } = useScrollValue();


    // const imageAnimation = useAnimatedStyle(() => ({
    //     transform: [{
    //         translateY: interpolate(sv.value,
    //             [-imageHeight, 0, imageHeight],
    //             [-imageHeight / 2, 0, imageHeight * 0.7])
    //     }, {
    //         scale: interpolate(sv.value, [-imageHeight, 0, imageHeight], [2, 1, 1])
    //     }]
    // }));
    // const parallaxTextAnim = useAnimatedStyle(() => ({
    //     opacity: interpolate(sv.value, [-imageHeight / 2, 0, imageHeight], [0, 1, 1])
    // }));
    // const headerBackground = useAnimatedStyle(() => ({
    //     backgroundColor: interpolateColor(
    //         sv.value,
    //         [imageHeight / 2, imageHeight * 0.7],
    //         ['#FFFFFF00', '#FFFFFF']
    //     ),
    //     borderColor: interpolateColor(
    //         sv.value,
    //         [imageHeight / 2, imageHeight * 0.7],
    //         ['#CCCCCC00', "#CCCCCC50"]
    //     ),
    // }));


    return (
        <>

            <Stack.Screen options={{
                title: '',
                // header: ({ back, navigation }) => {
                //     return (
                //         <Animated.View
                //             style={[
                //                 s.bgWhite,
                //                 s.p16,
                //                 s.flexRow,
                //                 s.gap12,
                //                 s.itemsCenter,
                //                 s.borderBottom1,
                //                 { paddingTop: top },
                //                 headerBackground]}>
                //             <TouchableOpacity
                //                 activeOpacity={0.8}
                //                 style={[
                //                     s.radiusFull,
                //                     s.p8,
                //                     s.bgWhite]}
                //                 onPress={() => navigation.goBack()}>
                //                 <ArrowLeft color={COLORS.black} />
                //             </TouchableOpacity>
                //             <Animated.Text numberOfLines={1} style={[s.bold, s.flex1, s.textLG, headerTitleAnimation]}>
                //                 {details?.name}
                //             </Animated.Text>
                //         </Animated.View>

                //     )
                // },

                // headerTransparent: true,
            }} />


            {isPending
                ? <LoadingView />
                : isError
                    ? <MessageView
                        message='Ocorreu um erro!'
                        description={error.message}
                    />
                    : details
                        ? <Animated.ScrollView
                            entering={FadeIn}
                            // onScroll={scrollHandler}
                            style={[s.flex1, s.bgWhite]}
                            contentContainerStyle={[s.gap12, s.p12]}>

                            <View
                                style={[s.bgWhite,
                                // s.shadow3,
                                s.border1,
                                s.borderGray100,
                                s.mxAuto,
                                { height: IMAGE_SIZE, width: IMAGE_SIZE }]}>

                                <Animated.Image
                                    source={{ uri: details.gifurl }}
                                    style={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} />
                            </View>

                            <Text style={[s.bold, s.text2XL]}>{details.name}</Text>
                            <Text style={[s.bold, s.text2XL]}>{details.bodypart}</Text>
                            <Text style={[s.bold, s.text2XL]}>{details.equipment}</Text>
                            <Text style={[s.bold, s.text2XL]}>{details.target}</Text>

                        </Animated.ScrollView>
                        : <MessageView
                            message='Exercício não encontrado'
                            description='Não encontramos o exercício que você queria!' />
            }


        </>

    )
}