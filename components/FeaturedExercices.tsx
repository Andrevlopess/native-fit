import { View, Text } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { IExercise } from '@/types/exercise'
import Animated from 'react-native-reanimated'
import { s } from '@/styles/global'
import { Image } from 'expo-image'
import ExerciseListCard from './ExerciseListCard'
import { SCREEN_WIDTH } from '@/constants/Dimensions'

const padding = 12;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4

const FeaturedExercisesSection = ({ exercises }: { exercises: IExercise[] }) => {

    return (
        <View style={[s.flex1]}>
            {exercises.map((exercise, index) => (
                <ExerciseListCard
                    key={`${index}${exercise.id}`}
                    exercise={exercise}
                    width={CARD_WIDTH}
                    showsAddButton
                />
            ))}
        </View>
    )
}


interface IFeaturedExercicesProps {
    title: string;
    exercises: IExercise[];
}
export default function FeaturedExercices({ exercises, title }: IFeaturedExercicesProps) {

    const splitIntoGroupsOfThree = useCallback((arr: IExercise[]): IExercise[][] => {
        return arr.reduce<IExercise[][]>((acc, curr, index) => {
            if (index % 3 === 0) acc.push([]);
            acc[acc.length - 1].push(curr);
            return acc;
        }, []);
    }, []);

    const sections = useMemo(() => splitIntoGroupsOfThree(exercises), [exercises, splitIntoGroupsOfThree]);


    const renderItem = ({ item }: { item: IExercise[] }) => <FeaturedExercisesSection exercises={item} />

    return (
        <View style={[s.gap4, s.mt12]}>

            <Text style={[s.semibold, s.textXL, s.px12]}>{title}</Text>

            <Animated.FlatList
                // ref={animatedRef}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH}
                decelerationRate={'fast'}
                // contentContainerStyle={[s.p12]}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sections}
                // keyExtractor={item => item.id}
                renderItem={renderItem}
            />

        </View>
    )
}

