import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import React, { useCallback } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import ExerciseListCard from './ExerciseListCard'

const padding = 12;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4;

// const FeaturedExercisesSection = React.memo(({ exercises }: { exercises: IExercise[] }) => {
//     return (
//         <View style={[s.flex1]}>
//             {exercises.map((exercise, index) => (

//             ))}
//         </View>
//     );
// });

interface IFeaturedExercicesProps {
    title: string;
    exercises: IExercise[];
    itemsPerSection?: number;
}

export default function FeaturedExercices({ exercises, title, itemsPerSection = 3 }: IFeaturedExercicesProps) {

    const renderItem = useCallback(({ item, index }: { item: IExercise, index: number }) => {
        return <ExerciseListCard
            key={`${item.id}_${index}`}
            exercise={item}
            width={CARD_WIDTH}
            showsAddButton
            enableExpandImage={false}
        />
    }, []);

    const numColumns = Math.ceil(exercises.length / itemsPerSection);

    return (
        <View style={[s.gap4]}>
            <Text style={[s.semibold, s.textXL, s.px12]}>{title}</Text>

            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
                snapToInterval={CARD_WIDTH}
                decelerationRate={'fast'}
                >
                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{
                        alignSelf: 'flex-start',
                    }}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={exercises}
                    renderItem={renderItem}
                />
            </ScrollView>
        </View>
    );
}
