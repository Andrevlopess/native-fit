import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import CircleDivisor from '../ui/Divisors'


const DEFAULT_IMAGE_SIZE = 70;
const EXPANDED_IMAGE_SIZE = SCREEN_WIDTH - 24;

interface ExerciseListCardProps {
    width?: number;
    exercise: IExercise;
    showsAddButton?: boolean;
    readOnly?: boolean;
    enableExpandImage?: boolean;
}

export default function ExerciseListCard({ exercise, width, showsAddButton = true, readOnly = false, enableExpandImage = true }: ExerciseListCardProps) {


    const AnimatedLink = Animated.createAnimatedComponent(Link)


    const isExpanded = useSharedValue<boolean>(false);
    const imageAnimation = useAnimatedStyle(() => {
        return {
            height: withSpring(
                isExpanded.value ? EXPANDED_IMAGE_SIZE : DEFAULT_IMAGE_SIZE, {
                stiffness: 500,
                damping: 60
            }),
            width: withSpring(
                isExpanded.value ? EXPANDED_IMAGE_SIZE : DEFAULT_IMAGE_SIZE, {
                stiffness: 500,
                damping: 60
            }),
            // width: isExpanded.value ? DEFAULT_IMAGE_SIZE : SCREEN_WIDTH
        }
    })
    const cardAnimation = useAnimatedStyle(() => {
        return {
            flexDirection: isExpanded.value ? 'column' : 'row'
            //  withSpring(
            //     , {
            //     stiffness: 500,
            //     damping: 60
            // }),
        }
    })

    const handleToggleExpand = () => {
        if (!enableExpandImage) return;
        isExpanded.value = !isExpanded.value;
    }


    return (
        <AnimatedLink
            disabled={readOnly}
            href={{
                pathname: `/exercise-details/[id]`,
                params: { ...exercise }
            }}
            asChild
            style={[
                // s.flex1,
                // s.border1,
                cardAnimation,
                s.gap16,
                s.bgWhite,
                s.px12,
                s.py8,
                { width }]}>
            <Pressable>
                {enableExpandImage
                    ? <Pressable
                        onPress={handleToggleExpand}
                        style={[s.bgWhite, s.shadow3, s.radius12, s.border1, s.borderGray100,
                        { marginVertical: 'auto', overflow: 'hidden' }]}>
                        <Animated.Image
                            src={exercise.gifurl}
                            style={[imageAnimation]}
                            fadeDuration={100}
                            defaultSource={require('@/assets/images/white-waves-bg.svg')}
                        />
                    </Pressable>
                    : <View style={[s.bgWhite, s.shadow3, s.radius12, s.border1, s.borderGray100, {marginVertical: 'auto', overflow: 'hidden' }]}>
                        <Image
                            placeholder={
                                require('@/assets/images/white-waves-bg.svg')
                            }
                            source={exercise.gifurl}
                            style={[{ height: DEFAULT_IMAGE_SIZE, width: DEFAULT_IMAGE_SIZE }]} />
                    </View>
                }



                <View style={[s.gap4, s.flex1, s.justifyCenter]}>
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {exercise.name}
                    </Text>
                    <View style={[s.flexRow, s.gap6, s.itemsCenter, { flexWrap: 'wrap' }]}>
                        <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
                        <CircleDivisor />
                        <Text style={[s.regular, s.textGray400]}>{exercise.target}</Text>
                    </View>

                </View>

                {showsAddButton &&
                    <Link
                        style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p8]}
                        asChild
                        href={{
                            pathname: '/add-to-workout/[exerciseId]',
                            params: { exerciseId: exercise.id }
                        }}
                    // href={`/(app)/teste`}
                    >
                        <TouchableOpacity activeOpacity={0.8}>
                            <PlusCircle color={COLORS.textGray} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </Link>
                }
            </Pressable>
        </AnimatedLink>

    )
}