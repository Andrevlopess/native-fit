import { View, Text } from 'react-native'
import React from 'react'
import { s } from '@/styles/global'
import Input from '@/components/ui/Input'
import SearchInput from '@/components/ui/SearchInput'

export default function ProfileIndexScreen() {
  return (
    <View style={[s.flex1, s.bgWhite, s.p12]}>
     <SearchInput/>
    </View>
  )
}