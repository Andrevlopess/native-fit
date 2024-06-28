import SwipeableExerciseListCard from '@/components/ExerciseListSwipeableCard'
import LibraryFeed from '@/components/LibraryFeed'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { BadgesControl } from '@/components/ui/BadgesControl'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercises } from '@/hooks/useSearchExercises'
import { s } from '@/styles/global'
import { device } from '@/utils/device'
import { Stack } from 'expo-router'
import { CircleX, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'

const badges = ['Cardio', 'Quadríceps', 'Costas', 'Peito', 'Ombro', 'Panturrilha'];

export default function LibraryIndexScreen() {

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useScrollViewOffset(scrollRef);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const debouncedSearch = useDebounce(search, 500).trim();

  const {
    exercises,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
    isError,
    isFetching,
    fetchStatus,
    fetchNextPage }
    = useSearchExercises(debouncedSearch, filter);

  const NotFoundComponent = () =>
    <MessageView
      icon={SearchX}
      message='Sem resultados'
      description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
    />

  const ErrorComponent = () =>
    <MessageView
      icon={CircleX}
      message="Ocorreu um erro!"
      description={error?.message || 'Estamos tentando resolver este problema!'} />


      console.log(isPending);
      
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
        // stickyHeaderIndices={[2]}
        >
          <View style={[s.px12, s.gap8]}>
            <AnimatedLargeTitle title='Biblioteca' offset={offset} />
            <SearchInput
              onChangeText={setSearch}
              placeholder='Busque por um exercício'
              value={search}
            // onFocus={() => scrollRef.current?.scrollTo({ y: 60 })}
            // onBlur={() => scrollRef.current?.scrollTo({ y: 0 })}
            />
            <BadgesControl
              badges={badges}
              selectedBadge={filter}
              onSelect={setFilter}
              disabled={isFetching} />
          </View>

          <RequestResultsView
            isError={isError}
            isPending={isFetching && fetchStatus === 'fetching'}
            hasData={!!exercises?.length}
            hasSearch={!!debouncedSearch}
            EmptyComponent={<LibraryFeed />}
            NotFoundComponent={<NotFoundComponent />}
            ErrorComponent={<ErrorComponent />}
          >
            <View style={[s.flex1, s.gap12]}>
              <Text style={[s.semibold, s.text2XL, s.px12]}>Resultados</Text>


              {exercises?.map((exercise, index) => (
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
          </RequestResultsView>
        </Animated.ScrollView>
      </View>


    </>
  )
}