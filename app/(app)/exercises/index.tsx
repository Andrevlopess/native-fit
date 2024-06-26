import SwipeableExerciseListCard from '@/components/ExerciseListSwipeableCard'
import LibraryFeed from '@/components/LibraryFeed'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import LoadingView from '@/components/views/LoadingView'
import MessageView from '@/components/views/MessageView'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercises } from '@/hooks/useSearchExercises'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'




export default function LibraryIndexScreen() {


  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useScrollViewOffset(scrollRef);

  const [search, setSearch] = useState('tes')

  const debouncedSearch = useDebounce(search, 500);

  const { exercises, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, fetchStatus }
    = useSearchExercises(debouncedSearch)


  return (
    <>
      <Stack.Screen
        options={{
          title: 'Biblioteca',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoImage />,
          headerTitle: ({ children }) => device.ios ? undefined : <AnimatedHeaderTitle offset={offset} title={children} />,
          headerLargeTitle: true,
          headerSearchBarOptions:
            device.ios
              ? {
                hideNavigationBar: false,
                hideWhenScrolling: false,
                placement: `automatic`,
                placeholder: 'Busque por um exercício',
                onChangeText: ({ nativeEvent }) => setSearch(nativeEvent.text)
              }
              : undefined
        }}
      />

      <View style={[s.flex1, s.bgWhite, s.gap12]}>

        <Animated.ScrollView
          ref={scrollRef}
          style={[s.flex1]}
          keyboardDismissMode='on-drag'
          contentContainerStyle={[s.gap8]}
          contentInsetAdjustmentBehavior='automatic'
        // stickyHeaderIndices={[0]}
        >
          <View style={[s.p12, s.gap8]}>
            <AnimatedLargeTitle title='Biblioteca' offset={offset} />
            <SearchInput
              onChangeText={setSearch}
              placeholder='Busque por um exercício'
              value={search}
              onFocus={() => scrollRef.current?.scrollTo({ y: 60 })}
              onBlur={() => scrollRef.current?.scrollTo({ y: 0 })}
            />
          </View>

          {isPending && fetchStatus === 'fetching' ? (
            <LoadingView />
          ) : (
            exercises && search ?
              exercises.length ?
                <View style={[s.flex1, s.gap12]}>
                  <Text style={[s.semibold, s.text2XL, s.px12]}>Resultados</Text>


                  {exercises.map((exercise, index) => (
                    <SwipeableExerciseListCard
                      exercise={exercise}
                      key={`${exercise.id}${index}`}
                      action={['add']}
                    />
                  ))}

                  {hasNextPage &&
                    <Button
                      style={[s.m12]}
                      variant='tertiary'
                      text='Buscar mais'
                      onPress={() => fetchNextPage()}
                      isLoading={isFetchingNextPage}
                    />
                  }
                </View>
                : <MessageView
                  message='Sem resultados'
                  description={`Não encontramos nada para '${search}'`}
                />
              : <LibraryFeed />
          )}

        </Animated.ScrollView>






      </View>


    </>
  )
}