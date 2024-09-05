import Divisor from '@/components/ui/Divisors';
import { s } from '@/styles/global';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// horizontal padding of 12 * 2
const IMAGE_SIZE = SCREEN_WIDTH - 24;

const BackButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Voltar</Text>
    </TouchableOpacity>
)


export default function ExerciseDetailsModal() {

    const params = useLocalSearchParams
        <{
            id: string,
            name: string;
            bodypart: string;
            gifurl: string;
            equipment: string;
            target: string;
        }>();

    return (
        <>

            <Stack.Screen options={{
                title: '',
                presentation: 'modal',
                // animation: 'fade_from_bottom',
                headerTitleAlign: 'center',
                // headerBackVisible: false,
                // headerBackTitleVisible: false,
                headerLeft: ({ canGoBack }) => <BackButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,
            }} />

            <Animated.ScrollView
                entering={FadeIn}
                // onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={[s.gap12]}>
                <View
                    style={[
                        s.mxAuto,
                        { height: IMAGE_SIZE, width: IMAGE_SIZE }]}>

                    <Animated.Image
                        source={{ uri: params.gifurl }}
                        style={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} />
                </View>
                <Divisor />
                <View style={[s.px12]}>
                    <Text style={[s.bold, s.textXL]}>{params.name}</Text>
                    <Text style={[s.bold, s.text2XL]}>{params.bodypart}</Text>
                    <Text style={[s.bold, s.text2XL]}>{params.equipment}</Text>
                    <Text style={[s.bold, s.text2XL]}>{params.target}</Text>
                </View>

            </Animated.ScrollView >
        </>
    )
}