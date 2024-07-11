import COLORS from "@/constants/Colors";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { s } from "@/styles/global";
import { IDetailedExercise } from "@/types/exercise";
import { Link } from "expo-router";
import { Inbox, Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { FadeIn, interpolate, LinearTransition, SharedValue, useAnimatedRef, useAnimatedStyle } from "react-native-reanimated";

import { useScrollValue } from "@/hooks/useScrollValue";
import { Image } from "expo-image";
import { useState } from "react";
import MessageView from "../views/MessageView";
import Button from "../ui/Button";

const MARGIN_HORIZONTAL = 12;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2;

const ACTIVE_ITEM_WIDTH = SCREEN_WIDTH * 0.95;
const ACTIVE_MARGIN_HORIZONTAL = 4;
const ACTIVE_ITEM_FULL_WIDTH = ACTIVE_ITEM_WIDTH + ACTIVE_MARGIN_HORIZONTAL * 2;
const ACTIVE_SPACER = (SCREEN_WIDTH - ACTIVE_ITEM_FULL_WIDTH) / 2;



interface DoingExerciseCardProps {
    exercise: IDetailedExercise,
    active: boolean,
    index: number;
    scrollX: SharedValue<number>;
}
const DoingExerciseCard = ({ exercise, active, index, scrollX }: DoingExerciseCardProps) => {

    const inputRange = [
        (index - 1) * ITEM_FULL_WIDTH,
        index * ITEM_FULL_WIDTH,
        (index + 1) * ITEM_FULL_WIDTH,
    ]

    const animation = useAnimatedStyle(() => {
        return {
            // transform: [{
            //     scale: interpolate(
            //         scrollX.value,
            //         inputRange, [0.9, 1, 0.9])
            // }],
            opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]),
        }
    })


    return (
        <Animated.View
            layout={LinearTransition}
            style={[s.gap8, s.flex1, animation,
            {
                // maxWidth: ITEM_WIDTH,
                maxWidth: active ? ACTIVE_ITEM_WIDTH : ITEM_WIDTH,
                // marginHorizontal: MARGIN_HORIZONTAL,
                marginHorizontal: active ? ACTIVE_MARGIN_HORIZONTAL : MARGIN_HORIZONTAL,
                opacity: active ? 1 : 0.3
            }
            ]}>
            <View style={[s.bgWhite, s.shadow3]}>
                <Image
                    source={exercise.gifurl}
                    style={[s.radius8, { height: ITEM_WIDTH, width: ITEM_WIDTH, }
                    ]} />
            </View>


            <View style={[s.flexRow, s.justifyBetween, s.itemsCenter, s.mtAuto, s.gap8]}>
                <Text style={[s.textXL, s.bold, s.flex1]}>{exercise.name}</Text>

            </View>

            <View style={[s.py12, s.flexRow, s.justifyBetween, s.mt12]}>
                <Text style={[s.textGray600, s.medium]}>Séries</Text>
                <Text style={[s.semibold]}>{exercise.notes}</Text>
            </View>
            <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween, s.mt12]}>
                <Text style={[s.textGray600, s.medium]}>Músculo alvo</Text>
                <Text style={[s.semibold]}>{exercise.target}</Text>
            </View>
            <View style={[s.py12, s.borderBottom1, s.borderGray200, s.flexRow, s.justifyBetween]}>
                <Text style={[s.textGray600, s.medium]}>Equipamento</Text>
                <Text style={[s.semibold]}>{exercise.equipment}</Text>
            </View>
            <View style={[s.py12, s.flexRow, s.justifyBetween]}>
                <Text style={[s.textGray600, s.medium]}>Parte do corpo</Text>
                <Text style={[s.semibold]}>{exercise.bodypart}</Text>
            </View>
        </Animated.View>
    )
}



interface WorkoutExercisesCarouselProps { exercises: IDetailedExercise[], workoutId: string }

export const WorkoutExercisesCarousel = ({ exercises, workoutId }: WorkoutExercisesCarouselProps) => {


    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const { offset, scrollHandler } = useScrollValue('x')


    const renderItem = ({ item, index }: { item: IDetailedExercise, index: number }) =>
        <DoingExerciseCard
            scrollX={offset}
            index={index}
            exercise={item}
            active={
                activeIndex === -1 ||
                exercises[activeIndex].id === item.id} />



    const ref = useAnimatedRef<Animated.FlatList<IDetailedExercise>>()

    const isLastExercise = activeIndex === exercises.length - 1


    const handleNextExercise = () => {

        if (isLastExercise) return;

        setActiveIndex(prev => prev + 1);

        // console.log(activeIndex, exercises.length, -1 + 1);

        ref.current?.scrollToIndex({
            index:
                activeIndex + 1,
            viewOffset: SPACER
        })
    }

    return (
        <>
            <Animated.View entering={FadeIn} style={[s.flex1, s.mt24, s.gap12]}>

                <View style={[s.itemsCenter, s.flexRow, s.p12, s.gap4]}>
                    <Text style={[s.bold, s.textXL, s.mrAuto]}>Exercícios</Text>
                    {
                        activeIndex === -1 &&
                        <Link asChild href={`/(app)/(modals)/exercises-to-add/${workoutId}`}>
                            <Button variant='tertiary' size='small' rounded>
                                <Plus color={COLORS.gray900} />
                            </Button>
                        </Link>
                    }
                    <Button
                        text={activeIndex === -1
                            ? 'Iniciar treino'
                            : !isLastExercise ? 'Próximo exercício' : 'Finalizar treino'}
                        size='small'
                        rounded
                        onPress={handleNextExercise}
                    />


                </View>

                {
                    exercises.length
                        ?


                        <Animated.FlatList

                            ref={ref}


                            ListHeaderComponent={<View />}
                            ListHeaderComponentStyle={{
                                width:
                                    activeIndex === -1
                                        ? SPACER
                                        : ACTIVE_SPACER
                            }}
                            ListFooterComponent={<View />}
                            ListFooterComponentStyle={{
                                width:
                                    activeIndex === -1
                                        ? SPACER
                                        : ACTIVE_SPACER
                            }}
                            // scrollEnabled={activeIndex === -1}
                            onScroll={scrollHandler}
                            scrollEventThrottle={16}
                            snapToInterval={
                                activeIndex === -1
                                    ? ITEM_FULL_WIDTH
                                    : ACTIVE_ITEM_FULL_WIDTH
                            }
                            decelerationRate={'fast'}
                            showsHorizontalScrollIndicator={false}
                            horizontal

                            data={exercises}
                            renderItem={renderItem}
                        />





                        : <MessageView
                            icon={Inbox}
                            message="Começe adicionando exercícios"
                            description="Busque exercícios para adicionar a este treino"
                            actionButton={
                                <Button
                                    variant="secondary"
                                    size="small"
                                    text="Adicionar exercício"
                                    asLink={`/(app)/(modals)/exercises-to-add/${workoutId}`}
                                />
                            }
                        />

                }

            </Animated.View>
        </>

    )
}