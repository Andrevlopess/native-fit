import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { MinusCircle, PlusCircle } from 'lucide-react-native'
import React, { useRef } from 'react'
import { Animated, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import ExerciseListCard from './ExerciseListCard'
const ICON_SIZE = 40

interface ExerciseListCardProps {
    exercise: IExercise;
    onSwipeToRemove?: (id: string) => void;
    onSwipeToAdd?: (id: string) => void;
    disableSwipeToRemove?: boolean
    disableSwipeToAdd?: boolean
}

const renderAddAction = (
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

const renderRemoveAction = (
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

export default function SwipeableExerciseListCard({
    exercise,
    onSwipeToAdd,
    onSwipeToRemove,
    disableSwipeToAdd,
    disableSwipeToRemove
}: ExerciseListCardProps) {

    const ref = useRef<Swipeable>(null);

    const handleSwipe = (direction: "left" | "right") => {

        switch (direction) {
            case 'left':
                onSwipeToRemove && onSwipeToRemove(exercise.id)
                break;
            case 'right':
                ref.current?.close();
                // or onSwipeToRemove()
                router.navigate(`/(app)/(modals)/add-to-workout/${exercise.id}`)
                break;
            default:
                break;
        }
    }


    return (
        <Swipeable
            ref={ref}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            leftThreshold={40}
            containerStyle={[s.bgWhite]}
            renderLeftActions={disableSwipeToRemove ? undefined : renderRemoveAction}
            renderRightActions={disableSwipeToAdd ? undefined : renderAddAction}
            onSwipeableOpen={handleSwipe}
            enabled={!disableSwipeToAdd && !disableSwipeToRemove}
        >
            <ExerciseListCard exercise={exercise} showsAddButton={false} />
        </Swipeable>


    )
}