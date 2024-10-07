import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import Button from '@/components/ui/Button'
import Divisor from '@/components/ui/Divisors'
import WorkoutsList from '@/components/workout/WorkoutsList'
import COLORS from '@/constants/Colors'
import { useScrollValue } from '@/hooks/useScrollValue'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Link, Stack } from 'expo-router'
import { History, Plus } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'



export default function MyWorkoutsScreen() {

    const { offset, scrollHandler } = useScrollValue();

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Treinos',
                    headerLeft: () => <LogoImage />,
                    headerRight: () =>
                        <View style={[s.flexRow, s.itemsCenter, s.justifyCenter]}>
                            <Link
                                asChild
                                href='/new-workout'>
                                <TouchableOpacity>
                                    <Plus color={COLORS.black} />
                                </TouchableOpacity>
                            </Link>
                            <Button asLink={'/history'} variant='ghost'>
                                <History color={COLORS.black} />
                            </Button>
                        </View>
                    ,
                    headerTitle:
                        device.android
                            ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
                            : undefined,
                    headerLargeTitle: true,
                    headerTitleAlign: 'center'
                }}
            />

            <Animated.ScrollView

                contentInsetAdjustmentBehavior='automatic'
                entering={FadeIn}
                onScroll={scrollHandler}
                style={[s.flex1, s.bgWhite]}
                contentContainerStyle={[s.gap12, s.py12]}>

                {device.android &&
                <AnimatedLargeTitle title='Treinos' offset={offset} style={[s.px12]} />}
                <WorkoutsList />


            </Animated.ScrollView>
        </>
    )
}