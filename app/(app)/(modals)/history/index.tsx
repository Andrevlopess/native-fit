import Button from '@/components/ui/Button'
import { HistoryCalendar } from '@/components/workout/HistoryCalendar'
import { s } from '@/styles/global'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function HistoricalIndex() {


  return (
    <>
      <Stack.Screen options={{
        title: 'Histórico de treinos',
        // headerLargeTitle: true,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitle: ({ children }) =>
          <Text style={[s.bold, s.textLG]}>{children}</Text>, 
        headerShadowVisible: true
      }}
      />

      <View style={[s.flex1, s.bgWhite]}>

        <HistoryCalendar period='all-time'  />

      </View>
    </>
  )
}