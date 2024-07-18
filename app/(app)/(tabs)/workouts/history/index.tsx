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


  return (
    <>
      <Stack.Screen options={{
        title: 'Histórico de treinos',
        // headerLargeTitle: true,
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerTitle: ({ children }) =>
          <Text style={[s.bold, s.textLG]}>{children}</Text>
      }}
      />

      <View style={[s.flex1, s.bgWhite]}>

        <HistoryCalendar />

      </View>
    </>
  )
}