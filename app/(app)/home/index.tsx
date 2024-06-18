import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'

export default function HomeIndexScreen() {
  return (
    <View style={[s.flex1, s.itemsCenter, s.justifyCenter]}>
      <Text>HomeIndexScreen</Text>
    </View>
  )
}