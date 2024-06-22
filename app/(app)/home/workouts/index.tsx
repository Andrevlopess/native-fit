import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import Button from '@/components/ui/Button'
import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { Stack } from 'expo-router'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'



const WorkoutListCard = () => {
    return (
        <View style={[s.flex1, s.flexRow, s.gap12]}>
            <View style={[s.bgGray200, s.radius14, { height: 80, width: 80 }]} />
            <View style={[s.gap8]}>
                <Text
                    style={[s.bold, s.textBase, { lineHeight: 18 }]}
                    numberOfLines={2}>
                    treino de frango
                </Text>
                <Text style={[s.medium, s.textGray400]}>Alguma descrição mt pica</Text>
            </View>
        </View>
    )
}

const BadgesControl = () => {

    const badges = ['Musculação', 'Cardio', 'Alongamentos']
    const renderItem = ({ item }: { item: string }) => <Button
        text={item}
        variant='tertiary'
        size='small'
        style={[s.px12]}
        rounded />


    return (
        <FlatList
            data={badges}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[s.bgWhite, s.py8]}
            contentContainerStyle={[s.gap4]}
            renderItem={renderItem}
            keyExtractor={item => item}
        />
    )
}


export default function MyWorkoutsScreen() {


    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const offset = useScrollViewOffset(scrollRef);


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Meus treinos',
                    // headerLeft: () => <LogoImage />,
                    headerRight: () => <TouchableOpacity>
                        <Plus color={COLORS.indigo} />
                    </TouchableOpacity>,
                    headerTitle: ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />,
                    headerLargeTitle: true,
                    headerTitleAlign: 'center'
                }}
            />

            <Animated.ScrollView
                ref={scrollRef}
                contentInsetAdjustmentBehavior='automatic'
                style={[s.bgWhite, s.flex1]}
                contentContainerStyle={[s.gap12, s.p12]}
                stickyHeaderIndices={[1]}
            >
                <AnimatedLargeTitle offset={offset} title='Meus treinos' />

                <BadgesControl />


                {Array.from({ length: 15 }).map((_, i) => <WorkoutListCard key={i} />)}
            </Animated.ScrollView>
        </>
    )
}