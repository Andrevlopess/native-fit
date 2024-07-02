import Button from '@/components/ui/Button'
import { bestCardioExercises } from '@/constants/Exercises'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOut, FadingTransition, JumpingTransition, Layout, LayoutAnimationConfig, LinearTransition, SequencedTransition } from 'react-native-reanimated'

export default function ProfileIndexScreen() {

  // const [data, setData] = useState(bestCardioExercises)

  // const handleRemove = (id: string) => {
  //   'worklet';
  //   setData(prev => prev.filter(data => data.id !== id))
  // }

  console.log('render');
  
  const handleMoveTouch = useCallback(() => {},[])

  return (
    <View style={[s.flex1, s.bgWhite, s.p12, s.itemsCenter, s.justifyCenter]}>

      <Pressable
        onTouchMove={({ nativeEvent }) => console.log(nativeEvent.locationX)}
        style={[s.p12, s.bgGray100, s.itemsCenter, s.justifyCenter, s.flexRow, s.radiusFull, s.gap12]}>
        {new Array(10).fill(0).map(item => <View style={[s.bgGray300, { height: 24, width: 24 }]} />)}
      </Pressable>

      {/* <Button text='reset' variant='secondary' size='small' onPress={() => setData(bestCardioExercises)} /> */}
    </View>
  )
}