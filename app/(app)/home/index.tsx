import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import { Stack, router } from 'expo-router'
import WorkoutsList from '@/components/WorkoutsList'
import Button from '@/components/ui/Button'

export default function HomeIndexScreen() {


  return (

    <>
      <Stack.Screen
        options={{
          title: ''
        }}
      />

      <View style={[s.flex1, s.bgWhite]}>
        <WorkoutsList />
      </View>
    </>
  )
}