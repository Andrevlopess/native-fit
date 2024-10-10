import { WorkoutApi } from '@/api/workout-api'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import React from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import Button from '../ui/Button'
import { CarouselList } from '../ui/CarouselList'
import LoadingView from '../views/LoadingView'


const MARGIN_X = 0;
const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.7)
const WorkoutCard = ({ name, id }: IWorkout) => {
    return (
        <Link href={`/(app)/workouts/${id}`} asChild>
            <Pressable>
                <ImageBackground
                    source={require('@/assets/images/waves-bg.png')}
                    resizeMode='contain'
                    borderRadius={14}
                    borderBottomLeftRadius={14}
                    style={[
                        s.radius14,
                        s.shadow6,
                        s.p12,
                        // s.flex1,
                        s.itemsCenter,
                        s.justifyCenter,
                        s.bgBlack,
                        { height: ITEM_WIDTH, width: ITEM_WIDTH }]}

                >
                    <Text style={[s.text6XL,s.textWhite, s.bold, s.textCapitalize]}>{name.charAt(0)}</Text>
                    <Text style={[s.text2XL,s.textWhite, s.semibold, s.textCapitalize, s.textCenter]}>{name}</Text>
                </ImageBackground>
            </Pressable>
        </Link>
    )
}




export default function WorkoutsCarouselList() {


    const { data: workouts = [], isFetching, isError, isRefetching, refetch } = useQuery({
        queryKey: ['workouts'],
        queryFn: () => WorkoutApi.findAll({ search: '' })
    })


    // const mainWorkouts = workouts.splice(0, 3)


    const renderItem = ({ item }: { item: IWorkout }) => <WorkoutCard {...item} />
    // WorkoutCard

    return (
        <View style={[s.gap4, s.mt12]}>
            <View style={[s.justifyBetween, s.itemsCenter, s.flexRow, s.px12, s.gap24]}>
                <Text style={[s.semibold, s.textXL, s.flex1]}>Veja seus principais treinos</Text>
                <Link asChild href={`/(app)/workouts`}>
                    <Button text='Ver todos' variant='secondary' size='small' rounded style={{ marginRight: 12 }} />
                </Link>
            </View>

            {isFetching

                ? <LoadingView />
                : <CarouselList
                    data={workouts}
                    renderItem={renderItem}
                    itemWidth={ITEM_WIDTH}
                    marginHorizontal={MARGIN_X}
                />

            }

        </View>
    )
}


// 50 =>
// 125 => 75
// 275 => 100
// 450 => 125
// 600 => 150