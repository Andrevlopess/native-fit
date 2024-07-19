import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle';
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle';
import MessageView from '@/components/views/MessageView';
import WorkoutExercisesList from '@/components/workout/WorkoutExercisesList';
import { useScrollValue } from '@/hooks/useScrollValue';
import { s } from '@/styles/global';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';


type SearchParams = { id: string, name: string, description: string }

export default function WorkoutScreen() {

    const { id, name, description } = useLocalSearchParams<SearchParams>();

    if (!id) {
        return <MessageView
            message='Este treino não existe'
            description='Não sabemos como conseguiu chegar até aqui!' />
    }
    const { offset, scrollHandler } = useScrollValue('y')


    return (
        <>
            <Stack.Screen options={{
                title: name || '',
                // headerLargeTitle: true,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerTitle: ({ children }) =>
                    <AnimatedHeaderTitle offset={offset} title={children} />,
                headerRight: () =>
                    <Link href={`/edit/${id}`} style={[s.bold, s.textIndigo600, s.textBase, s.p12]}>
                        Editar
                    </Link>
            }} />

            <Animated.ScrollView
                entering={FadeIn}
                automaticallyAdjustContentInsets
                contentInsetAdjustmentBehavior='automatic'
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                // stickyHeaderIndices={[1]}
            >


                <View style={[s.px12]}>
                    <AnimatedLargeTitle title={name || ''} offset={offset} />

                    <Text style={[s.medium, s.textBase, s.textGray600]}>{description?.trim()}</Text>
                </View>


                <WorkoutExercisesList workoutId={id} />

            </Animated.ScrollView>
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
