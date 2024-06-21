import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import { Stack, router } from 'expo-router'
import WorkoutsList from '@/components/WorkoutsList'
import Button from '@/components/ui/Button'
import FeaturedExercices from '@/components/FeaturedExercices'
import Animated from 'react-native-reanimated'

export default function HomeIndexScreen() {


  return (

    <>
      <Stack.Screen
        options={{
          title: ''
        }}
      />

      <Animated.ScrollView
        style={[s.flex1, s.bgWhite]}
        contentContainerStyle={[s.gap24]}
      >
        <WorkoutsList />
        <FeaturedExercices />
      </Animated.ScrollView>
    </>
  )
}