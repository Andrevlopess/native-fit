import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React, { useState } from 'react'
import ExerciseDoingCard from '../exercise/ExerciseDoingCard'
import Button from '../ui/Button'
import Animated, { LinearTransition, useAnimatedRef, scrollTo } from 'react-native-reanimated'
import { View } from 'lucide-react-native'
import Timer from '../ui/Timer'


interface IWorkingOutListProps {
    exercises: IExercise[]
}

export default function WorkingOutList({ exercises }: IWorkingOutListProps) {

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollRef = useAnimatedRef<Animated.ScrollView>()

    // const [doneExercises, setDoneExercises] = useState<IExercise[]>([])

    // const renderItem = ({ item }: { item: IExercise }) => <ExerciseDoingCard
    //     active={item.id === exercises[activeIndex].id}
    //     exercise={item} />


    const handleNext = () => {
        // setDoneExercises(prev => [...prev, exercises[activeIndex]])
        setActiveIndex((prev) => (prev + 1) % exercises.length);
        // scrollTo(scrollRef, 0,  100, true)
        scrollRef.current?.scrollTo({ y: activeIndex * 200 })
    };


    return (
        <Animated.ScrollView
            ref={scrollRef}
            contentContainerStyle={[s.p12,s.gap12]}
            style={[s.flex1, s.bgWhite]}
            // stickyHeaderIndices={[0]}
        >

            {/* <View style={[s.flexRow, s.gap12]}>
                <Timer />
            </View> */}

            {
                exercises?.map((exercise, index) =>
                    <ExerciseDoingCard
                        onConclude={handleNext}
                        key={exercise.id}
                        active={exercise.id === exercises[activeIndex].id}
                        done={activeIndex > index}
                        exercise={exercise} />
                )
            }


        </Animated.ScrollView>
    )
}