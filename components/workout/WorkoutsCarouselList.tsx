import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Button from '../ui/Button'
import { CarouselList } from '../ui/CarouselList'


const MARGIN_X = 6;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8

const WorkoutCard = ({ name, id }: IWorkout) => {
    return (
        <Link href={`/(app)/home/workouts/${id}`} asChild>
            <Pressable>
                <Animated.View style={[
                    s.radius18,
                    s.itemsEnd,
                    s.bgGray200,
                    { height: ITEM_WIDTH, width: ITEM_WIDTH, marginHorizontal: MARGIN_X }]}>
                </Animated.View>
            </Pressable>
        </Link>
    )
}




export default function WorkoutsCarouselList() {

    const workouts: IWorkout[] = [
        {
            id: '1',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '2',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '3',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '4',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '24',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '43',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '42',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '41',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
        {
            id: '45',
            createdat: 'as',
            description: 'teste',
            name: 'teste',
            ownerid: 'teste'
        },
    ]


    const renderItem = ({ item }: { item: IWorkout }) => <WorkoutCard {...item} />


    return (
        <View style={[s.gap4]}>
            <View style={[s.justifyBetween, s.itemsCenter, s.flexRow, s.px12]}>
                <Text style={[s.bold, s.text2XL]}>Treino de hoje</Text>
                <Link asChild href={`/(app)/(modals)/exercises-to-add/48f2846e-7f8e-495d-afda-f2ff607c339a`}>
                    <Button text='Ver todos' variant='tertiary' size='small' rounded />
                </Link>
            </View>

            <CarouselList
                data={workouts}
                renderItem={renderItem}
                itemWidth={ITEM_WIDTH}
                marginHorizontal={MARGIN_X}
            />
        </View>
    )
}