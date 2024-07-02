import Button from '@/components/ui/Button'
import { bestCardioExercises } from '@/constants/Exercises'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOut, FadingTransition, JumpingTransition, Layout, LayoutAnimationConfig, LinearTransition, SequencedTransition } from 'react-native-reanimated'

export default function ProfileIndexScreen() {

  const [data, setData] = useState(bestCardioExercises)

  const handleRemove = (id: string) => {
    'worklet';
    setData(prev => prev.filter(data => data.id !== id))
  }


  return (
    <View style={[s.flex1, s.bgWhite, s.p12]}>


      <Animated.ScrollView
      >
        {data.map(item => (
          <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} >
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <View style={[s.bgWhite, s.border1, s.borderGray100, s.shadow3, s.p16]}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <Button text='reset' variant='secondary' size='small' onPress={() => setData(bestCardioExercises)} />
    </View>
  )
  }