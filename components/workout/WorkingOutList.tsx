import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React, { useState } from 'react'
import ExerciseDoingCard from '../exercise/ExerciseDoingCard'
import Button from '../ui/Button'
import Animated, { LinearTransition, useAnimatedRef, scrollTo, withSpring, useSharedValue, withTiming } from 'react-native-reanimated'
import Timer from '../ui/Timer'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Dimensions'
import { Text, useAnimatedValue, View } from 'react-native'
import HeaderStepBar from '../ui/HeaderStepBar'
import RestingWorkoutView from './RestingWorkoutView'


interface IWorkingOutListProps {
    exercises: IExercise[]
}

export default function WorkingOutList({ exercises }: IWorkingOutListProps) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [isResting, setIsResting] = useState(false)

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const progress = useSharedValue(0);

    const IMAGE_SIZE = SCREEN_WIDTH * 0.9

    // const [doneExercises, setDoneExercises] = useState<IExercise[]>([])

    // const renderItem = ({ item }: { item: IExercise }) => <ExerciseDoingCard
    //     active={item.id === exercises[activeIndex].id}
    //     exercise={item} />

    const handleNext = () => {
        // setDoneExercises(prev => [...prev, exercises[activeIndex]])
        setActiveIndex((prev) => (prev + 1) % exercises.length);
        setIsResting(true);
        // scrollRef.current?.scrollTo({ y: activeIndex * 200 })

        progress.value = withSpring(100 / (exercises.length - 1) * (activeIndex + 1), {
            stiffness: 500,
            damping: 60
        })

    };

    // layout={LinearTransition.springify().stiffness(500).damping(60)}

    const doing = exercises[activeIndex];


    return (
        <>
            <HeaderStepBar progress={progress} />

            <View
                style={[s.flex1, s.bgWhite, s.p12, s.gap36]}
            // stickyHeaderIndices={[0]}
            >

                {
                    isResting
                        ? <RestingWorkoutView

                            nextExercise={exercises[activeIndex]}
                            onTimerEnd={handleNext}
                        />
                        : <View style={[s.radius8, s.gap24, s.mt12]}>

                            <Animated.Image
                                source={{ uri: doing.gifurl }}
                                style={[s.radius8, s.mxAuto, s.bgGray100, { height: IMAGE_SIZE, width: IMAGE_SIZE }]} />

                            <Text style={[s.bold, s.text2XL, s.textCenter, s.px12]}>{doing.name}</Text>

                            <Text style={[s.bold, s.text4XL, s.textCenter, s.px12]}>4 x 12</Text>

                            <View style={[s.gap12, s.justifyCenter, s.flexRow, s.itemsCenter, s.px4]}>
                                {/* <Text style={[s.regular, s.textGray400]}>Músculo alvo</Text> */}
                                <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.target}</Text>
                                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                                <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.bodypart}</Text>
                                <View style={[s.bgGray800, s.radiusFull, { height: 8, width: 8 }]} />
                                <Text style={[s.medium, s.textGray600, s.textLG]}>{doing.equipment}</Text>
                            </View>

                        </View>}


                <Button text='Concluído' style={[s.mtAuto]} onPress={handleNext} />
                {/* <View style={[s.gap12, s.mt24]}>
                <Text style={[s.semibold, s.textGray800, s.textXL]}>Próximo exercício</Text>

                <ExerciseDoingCard
                    onConclude={handleNext}
                    // active={exercise.id === doing.id}
                    done={true}
                    exercise={exercises[activeIndex + 1]} />
            </View> */}
                {/* {
                exercises
                    .filter(exercise => exercise.id !== doing.id)
                    ?.map((exercise, index) =>
                        <ExerciseDoingCard
                            onConclude={handleNext}
                            key={exercise.id}
                            active={exercise.id === doing.id}
                            done={activeIndex > index}
                            exercise={exercise} />
                    )
            } */}


            </View>
        </>


    )
}