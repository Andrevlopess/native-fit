import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { WorkoutListCard } from '@/components/workout/WorkoutListCard'
import { useFetchWorkoutsHistory } from '@/hooks/useFetchWorkoutHistory'
import { useScrollValue } from '@/hooks/useScrollValue'
import { s } from '@/styles/global'
import { IWorkoutHistory } from '@/types/workout'
import { Stack } from 'expo-router'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { CalendarList, DateData } from 'react-native-calendars';
import { HistoryCalendar } from '@/components/workout/HistoryCalendar'

export default function HistoricalIndex() {


  // const { history, fetchNextPage, isFetchingNextPage, isError } = useFetchWorkoutsHistory()


  // const renderItem = ({ item }: { item: IWorkoutHistory }) =>
  //   <View style={[s.gap12, s.py72]}>
  //     <Text style={[s.medium, s.textGray600]}>

  //       {new Date(item.done_at)
  //         .toLocaleDateString('pt-br', { dateStyle: 'medium' })}
  //     </Text>
  //     <WorkoutListCard workout={item.workouts} />
  //   </View>

  // const { offset, scrollHandler } = useScrollValue()


  return (
    <>
      <Stack.Screen options={{
        title: 'Histórico',
        // headerLargeTitle: true,
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        // headerTitle: ({ children }) =>
        //   <AnimatedHeaderTitle offset={offset} title={children} />,
      }} 
      />

      <View style={[s.flex1, s.bgWhite, s.border1]}>



        <HistoryCalendar />

        {/* <Animated.FlatList
          contentContainerStyle={[s.p12]}
          ListHeaderComponent={<AnimatedLargeTitle offset={offset} title='Histórico' />}
          onScroll={scrollHandler}
          data={history}
          renderItem={renderItem}
          onEndReached={fetchNextPage}
        /> */}
      </View>
    </>
  )
}