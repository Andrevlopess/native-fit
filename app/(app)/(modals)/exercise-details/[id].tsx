import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Text, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

// horizontal padding of 12 * 2
const IMAGE_SIZE = SCREEN_WIDTH - 24;



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
                title: params.name,
                presentation: 'modal',
                // animation: 'fade_from_bottom',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,
            }} />
            
        <Animated.ScrollView
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
                    source={{ uri: params.gifurl }}
                    style={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} />
            </View>

            <Text style={[s.bold, s.text2XL]}>{params.name}</Text>
            <Text style={[s.bold, s.text2XL]}>{params.bodypart}</Text>
            <Text style={[s.bold, s.text2XL]}>{params.equipment}</Text>
            <Text style={[s.bold, s.text2XL]}>{params.target}</Text>

        </Animated.ScrollView>
        </>

    )
}