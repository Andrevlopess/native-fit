import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function index() {
  return <Redirect href={'/(auth)'}/>
  // return <Redirect href={'/workouts/history'}/>
  // return <Redirect href={'/(app)/(modals)/working-out/c073070e-0d72-4f53-9b3e-a5434626d048'}/>
  // return <Redirect href={'/workouts/c073070e-0d72-4f53-9b3e-a5434626d048'}/>
  // return <Redirect href={'/exercises-to-add/c073070e-0d72-4f53-9b3e-a5434626d048'}/>
}