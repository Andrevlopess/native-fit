import FeaturedExercices from '@/components/FeaturedExercices'
import LogoImage from '@/components/LogoImage'
import WorkoutsList from '@/components/WorkoutsList'
import { s } from '@/styles/global'
import { Stack } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

export default function HomeIndexScreen() {


  return (

    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => <LogoImage />,
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