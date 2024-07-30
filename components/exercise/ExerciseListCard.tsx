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

    const rest = (({ id, ...rest }) => rest)(exercise);

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
                pathname: `/exercise-details/${exercise.id}`,
                params: rest
            }}
            // href={`/(app)/exercises/${exercise.id}`}
            asChild
            push
            style={[
                s.flex1,
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
                        style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>
                        <Animated.Image
                            src={exercise.gifurl}
                            style={[s.radius8, imageAnimation]}
                            fadeDuration={0}
                            // defaultSource={require('@/assets/images/icon.png')}                 
                        />
                    </Pressable>
                    : <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>
                        <Image
                            // placeholder={
                            //     require('@/assets/images/icon.png')
                            // }
                            source={exercise.gifurl}
                            style={[s.radius8, { height: DEFAULT_IMAGE_SIZE, width: DEFAULT_IMAGE_SIZE }]} />
                    </View>
                }



                <View style={[s.gap4, s.flex1]}>
                    <Text
                        style={[s.medium, s.textBase, { lineHeight: 18 }]}
                        numberOfLines={2}>
                        {exercise.name}
                    </Text>
                    <View style={[s.flexRow, s.gap6, s.itemsCenter]}>

                        <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
                        <CircleDivisor/>
                        <Text style={[s.regular, s.textGray400]}>{exercise.target}</Text>
                    </View>

                </View>

                {showsAddButton &&
                    <Link
                        style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p8]}
                        asChild
                        href={`/(app)/(modals)/add-to-workout/${exercise.id}`}
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