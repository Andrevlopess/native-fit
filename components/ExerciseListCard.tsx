import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { MinusCircle, PlusCircle } from 'lucide-react-native'
import React, { useRef } from 'react'
import { Animated, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
const ICON_SIZE = 40

type Swipe = 'none' | 'left' | 'right' | 'both'

interface ExerciseListCardProps {
    width?: number;
    exercise: IExercise;
    enabledSwipe?: Swipe
}

const renderRightAction = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
) => {


    const translateX = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [0, 30],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View
            style={[
                // s.flex1,
                s.itemsCenter,
                s.justifyCenter,
                s.px24,
                s.bgGreen400
            ]}
        >
            <Animated.View
                style={[
                    s.radiusFull,
                    s.p8,
                    { transform: [{ translateX }] }

                ]}>
                <PlusCircle color={COLORS.white} size={ICON_SIZE} />

            </Animated.View>
        </Animated.View>
    );
};

const renderLeftAction = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
) => {



    const translateX = dragX.interpolate({
        inputRange: [0, SCREEN_WIDTH],
        outputRange: [0, SCREEN_WIDTH / 2 - ICON_SIZE / 2],
        extrapolate: 'clamp',
    });


    return (
        <Animated.View
            style={[
                s.flex1,
                // s.itemsCenter,
                s.justifyCenter,
                // s.px24,
                s.bgRed500
            ]}
        >
            <Animated.View
                style={[
                    s.radiusFull,
                    s.p8,
                    { transform: [{ translateX }] }

                ]}>
                <MinusCircle color={COLORS.white} size={ICON_SIZE} />
            </Animated.View>
        </Animated.View>
    );
};

export default function ExerciseListCard({ exercise, width, enabledSwipe = 'none' }: ExerciseListCardProps) {

    const ref = useRef<Swipeable>(null);

    const handleSwipe = (direction: "left" | "right") => {
        ref.current?.close()
        console.log('swiped to', direction);
    }


    return (

        <Swipeable
            ref={ref}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            leftThreshold={40}
            containerStyle={[s.bgWhite]}
            renderLeftActions={enabledSwipe === 'left' ? renderLeftAction : undefined}
            renderRightActions={enabledSwipe === 'right' ? renderLeftAction : undefined}
            onSwipeableOpen={handleSwipe}
            enabled={enabledSwipe === 'none'}
        // renderLeftActions ={renderLeftActions}
        >


            <Link
                href={`/(app)/exercises/${exercise.id}`}
                asChild
                push
                style={[
                    s.flexRow,
                    s.gap20,
                    s.itemsCenter,
                    s.bgWhite,
                    s.px12,
                    s.py8,
                    { width }]}>
                <Pressable>
                    <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>

                        <Image source={exercise.gifurl} style={[s.radius8,
                        { height: 70, width: 70, }
                        ]} />
                    </View>


                    <View style={[s.gap4, s.flex1]}>
                        <Text
                            style={[s.medium, s.textBase, { lineHeight: 18 }]}
                            numberOfLines={2}>
                            {exercise.name}
                        </Text>
                        <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
                    </View>


                    {enabledSwipe === 'none' &&
                        <Link
                            style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p8]}
                            asChild
                            href={`/(app)/(modals)/add-to-workout/${exercise.id}`}>
                            <TouchableOpacity>
                                <PlusCircle color={COLORS.textGray} strokeWidth={2.5} />
                            </TouchableOpacity>
                        </Link>
                    }

                </Pressable>


            </Link>
        </Swipeable>


    )
}