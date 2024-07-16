import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function index() {
  return <Redirect href={'/(app)/(tabs)/home'}/>
  // return <Redirect href={'/(app)/(modals)/working-out/39254871-cdaf-4a2c-8836-fe9a3dad4107'}/>
}