import { s } from '@/styles/global'
import { IWorkout } from '@/types/workout'
import { Link } from 'expo-router'
import React from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'


interface WorkoutListCardProps {
    workout: IWorkout
    index?: number;
}

export const WorkoutListCard = ({ workout: { id, name, description, exercises_count }, index = 0 }: WorkoutListCardProps) => {

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    return (
        <Link
            href={{ pathname: `/(app)/workouts/[id]`, params: { id, name, description } }}
            asChild
            style={[s.flex1, s.flexRow, s.gap12, s.itemsCenter]}
        // onLayout={({nativeEvent}) => console.log(nativeEvent.layout)}
        >
            <AnimatedPressable>

                {/* <View style={[s.bgBlack, s.radius12, s.itemsCenter,s.shadow6, s.justifyCenter, { height: 60, width: 60 }]}>
                    <Text style={[s.textXL, s.semibold,s.textWhite, s.textCapitalize]}>{name.charAt(0)}</Text>
                </View> */}

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
                        { height: 60, width: 60 }]}

                >
                    <Text style={[s.textXL, s.semibold, s.textWhite, s.textCapitalize]}>{name.charAt(0)}</Text>
                </ImageBackground>

                <View style={[s.gap4, s.justifyCenter, s.flex1]} >
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {name}
                    </Text>
                    <View style={[s.flexRow, s.itemsCenter, s.gap4, { flexWrap: 'wrap' }]}>
                        {description &&
                            <>
                                <Text style={[s.regular, s.textGray400]}>{description}</Text>
                                <View style={[s.bgGray400, s.radiusFull, { height: 4, width: 4 }]} />
                            </>
                        }
                        <Text style={[s.regular, s.textGray400]}>
                            {exercises_count
                                ? `${exercises_count} exercícios`
                                : 'Nenhum exercício'}
                        </Text>
                    </View>


                </View>
            </AnimatedPressable>

        </Link>
    )
}
