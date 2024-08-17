import { WorkoutApi } from '@/api/workout-api'
import Button from '@/components/ui/Button'
import { LineDivisor } from '@/components/ui/Divisors'
import { AuthContext, useAuth } from '@/contexts/AuthContext'
import { s } from '@/styles/global'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import React, { useContext, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function ProfileIndexScreen() {


  // const handleMoveTouch = useCallback(() => { }, [])
  const { Logout } = useContext(AuthContext)

  const { user } = useAuth()

  return (

    <>
      <Stack.Screen
        options={{
          title: '',
          // headerLeft: () => <LogoImage />,
          // headerTitle:
          //   device.android
          //     ? ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
          //     : undefined,
          // headerLargeTitle: true,
          headerTitleAlign: 'center'
        }}
      />


      <ScrollView
        contentContainerStyle={[s.gap4, s.p12]}
        style={[s.flex1, s.bgWhite]}>

        <Text style={[s.text2XL, s.textBlack]}>{user?.id}</Text>
        <Text style={[s.text2XL, s.textBlack]}>{user?.user_metadata.username}</Text>
        <Text style={[s.text2XL, s.textBlack]}>{user?.email}</Text>
        <Text style={[s.text2XL, s.textBlack]}>{user?.role}</Text>
        <Button text='Exit' onPress={Logout} />
      </ScrollView>
    </>

  )
}