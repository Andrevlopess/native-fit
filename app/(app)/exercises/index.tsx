import ExerciseListCard from '@/components/ExerciseListCard'
import LogoImage from '@/components/LogoImage'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import SearchInput from '@/components/ui/SearchInput'
import ErrorView from '@/components/views/ErrorView'
import LoadingView from '@/components/views/LoadingView'
import NotFoundView from '@/components/views/NotFoundView'
import COLORS from '@/constants/Colors'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { supabase } from '@/lib/supabase'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'


const ITEMS_PER_PAGE = 10;

async function fetchSearchedExercises({
  queryKey,
  pageParam,
}: {
  queryKey: unknown[];
  pageParam: unknown;
}) {
  try {

    let { data, error } = await supabase
      .rpc('search-exercises', {
        page_num: pageParam,
        page_size: ITEMS_PER_PAGE,
        query: queryKey[1]
      })


    if (error) throw error;

    return data as IExercise[];
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    throw new Error(error.response?.data.error || 'Ocorreu um erro inesperado!');
  }
}



export default function LibraryIndexScreen() {

  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet";
      offset.value = event.contentOffset.y;
    },
  });


  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500);


  const { data: results, fetchNextPage, isFetchingNextPage, isPending, isError } =
    useInfiniteQuery({
      queryKey: ["searched-exercises", debouncedSearch.trim()],
      queryFn: fetchSearchedExercises,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length + 1 : undefined,
    });

  const exercises = results?.pages.map((page) => page).flat();


  const renderItem = ({ item }: { item: IExercise }) => <ExerciseListCard exercise={item} />


  const renderLoadingFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <ActivityIndicator
        color={COLORS.indigo}
        style={[s.py12]}
        size={36}
      />
    );
  };



  return (
    <>
      <Stack.Screen
        options={{
          title: 'Biblioteca',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoImage />,
          headerTitle: ({ children }) => <AnimatedHeaderTitle offset={offset} title={children} />
        }}
      />


      {/* <Animated.ScrollView
        ref={scrollRef}
        style={[s.flex1, s.bgWhite]}
        contentContainerStyle={[s.gap12, s.p12]}
      >
        <AnimatedLargeTitle title='Biblioteca' offset={offset} />
        {device.android && <SearchInput />}

      </Animated.ScrollView> */}

      <View style={[s.flex1, s.bgWhite, s.gap12, s.p12]}>
        {isError &&
          <ErrorView
            title='Ocorreu um erro'
            description={`Não conseguimos buscar por: ${search}`} />}

        <AnimatedLargeTitle title='Biblioteca' offset={offset} />


        <Animated.FlatList
          onScroll={scrollHandler}
          contentInsetAdjustmentBehavior='automatic'
          ListHeaderComponent={device.android ?
            <View style={[s.gap4]}>
              <SearchInput
                onChangeText={setSearch}
                placeholder='Busque por um exercício'
                value={search}
              />
            </View> : null
          }
          // stickyHeaderIndices={[1]}
          stickyHeaderHiddenOnScroll={true}
          contentContainerStyle={[s.bgWhite, s.gap12]}
          showsHorizontalScrollIndicator={false}
          data={exercises}
          ListEmptyComponent={
            isPending
              ? <LoadingView />
              : <NotFoundView
                title='Sem resultados'
                description={`Não encontramos nada para '${search}'`}
              />
          }
          keyExtractor={(item, index) => `${item.id}${index}`}
          renderItem={renderItem}
          onEndReachedThreshold={2}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={renderLoadingFooter}
        />
      </View>


    </>
  )
}