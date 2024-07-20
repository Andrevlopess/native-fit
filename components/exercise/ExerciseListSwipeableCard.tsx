import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { CheckCircle, CheckCircle2, MinusCircle, PlusCircle } from 'lucide-react-native'
import React, { useRef } from 'react'
import { Animated, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import ExerciseListCard from './ExerciseListCard';
import * as Haptics from 'expo-haptics'

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
    const opacityAdd = dragX.interpolate({
        inputRange: [-100, -50, 0],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp',
    });
    const opacityCheck = dragX.interpolate({
        inputRange: [-100, -50, 0],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp',
    });

    const color = dragX.interpolate({
        inputRange: [-SCREEN_WIDTH, -105, -100, 0],
        outputRange: [COLORS.green400, COLORS.green400, COLORS.gray, COLORS.gray],
        extrapolate: 'clamp',
    });


    return (
        <Animated.View
            style={[
                // s.flex1,
                s.itemsCenter,
                s.justifyCenter,
                s.px24,
                // s.bgGreen400,
                { width: 100, backgroundColor: color },
            ]}
        >
            <Animated.View
                style={[
                    s.radiusFull,
                    s.p8,
                    s.absolute,
                    { opacity: opacityAdd },
                    { transform: [{ translateX }] }

                ]}>
                <PlusCircle color={COLORS.white} size={ICON_SIZE} />

            </Animated.View>
            <Animated.View
                style={[
                    s.radiusFull,
                    s.p8, s.absolute,
                    { opacity: opacityCheck },
                    { transform: [{ translateX }] }

                ]}>
                <CheckCircle2 color={COLORS.white} size={ICON_SIZE} />
            </Animated.View>
        </Animated.View>
    );
};

const renderRemoveAction = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
) => {

    const translateX = dragX.interpolate({
        inputRange: [0, SCREEN_WIDTH / 4],
        outputRange: [0, ICON_SIZE / 2],
        extrapolate: 'clamp',
    });

    const color = dragX.interpolate({
        inputRange: [0, 100, 105, SCREEN_WIDTH],
        outputRange: [COLORS.gray, COLORS.gray, COLORS.red, COLORS.red],
        extrapolate: 'clamp',
    });


    return (
        <Animated.View
            style={[
                s.flex1,
                // s.itemsCenter,
                s.justifyCenter,
                // s.px24,
                s.bgRed500,
                { backgroundColor: color },
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

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

        switch (direction) {
            case 'left':
                // console.log('swiped');
                // ref.current?.close();

                onSwipeToRemove && onSwipeToRemove(exercise.id)
                break;
            case 'right':
                // or onSwipeToRemove()
                router.navigate(`/(app)/(modals)/add-to-workout/${exercise.id}`)
                ref.current?.close();
                break;
            default:
                break;
        }
    }


    return (
        <Swipeable
            ref={ref}
            friction={1}
            // enableTrackpadTwoFingerGesture
            // activeOffsetX={10}
            // dragOffsetFromLeftEdge={40}
            onSwipeableWillOpen={handleSwipe}
            rightThreshold={100}
            leftThreshold={100}
            containerStyle={[s.bgWhite]}
            renderLeftActions={disableSwipeToRemove ? undefined : renderRemoveAction}
            renderRightActions={disableSwipeToAdd ? undefined : renderAddAction}
            // onSwipeableOpen={handleSwipe}
            enabled={!disableSwipeToAdd && !disableSwipeToRemove}
        >
            <ExerciseListCard exercise={exercise} showsAddButton={false} />
        </Swipeable>


    )
}