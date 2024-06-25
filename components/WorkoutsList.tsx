import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Button from './ui/Button'


const padding = 16;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4

interface WorkoutCardProps {

}
const WorkoutCard = ({ name, id }: IWorkout) => {
    return (

        <Link href={`/(app)/home/workouts/${id}`} asChild>
            <Pressable>
                <Animated.View style={[
                    s.radius18,
                    s.itemsEnd,
                    s.p12,
                    s.bgGray200,
                    { width: CARD_WIDTH, height: CARD_WIDTH }]}>
                    <Text>{name}</Text>
                </Animated.View>
            </Pressable>
        </Link>
    )
}


const SectionIndicatorComponent = ({ index, scrollX }: { index: number, scrollX: SharedValue<number>; }) => {

    const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
    ];


    const stepsIndicatorsAnimation = useAnimatedStyle(() => {
        return {
            width: interpolate(scrollX.value, inputRange, [6, 24, 6], Extrapolation.CLAMP),
            // height: interpolate(scrollX.value, inputRange, [6, 8, 6], Extrapolation.CLAMP),
            backgroundColor: interpolateColor(scrollX.value, inputRange, [
                `${COLORS.indigo}50`, `${COLORS.indigo}`, `${COLORS.indigo}50`
            ])
        };
    });


    return <Animated.View style={[
        s.bgIndigo500,
        s.radiusFull,
        stepsIndicatorsAnimation, { height: 6 }]} />

}



export default function WorkoutsList() {

    const workouts: IWorkout[] = [
        {
            id: '1',
            created_at: 'as',
            description: 'teste',
            name: 'teste',
            owner_id: 'teste'
        },
        {
            id: '2',
            created_at: 'as',
            description: 'teste',
            name: 'teste',
            owner_id: 'teste'
        },
        {
            id: '3',
            created_at: 'as',
            description: 'teste',
            name: 'teste',
            owner_id: 'teste'
        },
        {
            id: '4',
            created_at: 'as',
            description: 'teste',
            name: 'teste',
            owner_id: 'teste'
        },
    ]


    const renderItem = ({ item }: { item: IWorkout }) => <WorkoutCard {...item} />

    const offset = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            "worklet";
            offset.value = event.contentOffset.x;
        },
    });

    // const animatedRef = useAnimatedRef<Animated.ScrollView>();
    // const offset = useScrollViewOffset(animatedRef);

    return (
        <View style={[s.gap4]}>
            <View style={[s.justifyBetween, s.itemsCenter, s.flexRow, s.px12]}>
                <Text style={[s.bold, s.text2XL]}>Treino de hoje</Text>
                <Link asChild href={'/(app)/home/workouts'}>
                    <Button text='Ver todos' variant='tertiary' size='small' rounded />
                </Link>
            </View>

            <Animated.FlatList
                onScroll={scrollHandler}
                // ref={animatedRef}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH + padding}
                decelerationRate={'fast'}
                contentContainerStyle={[s.gap12, s.p12, { paddingHorizontal: padding * 2 }]}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={workouts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />



            <View style={[s.mxAuto, s.flexRow, s.gap4, s.itemsCenter]}>
                {workouts.map((_, i) => <SectionIndicatorComponent index={i} scrollX={offset} key={i} />)}
            </View>
        </View>
    )
}