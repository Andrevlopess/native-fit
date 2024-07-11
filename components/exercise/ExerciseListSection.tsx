import COLORS from '@/constants/Colors';
import { SCREEN_WIDTH } from '@/constants/Dimensions';
import { useSearchExercises } from '@/hooks/useSearchExercises';
import { s } from '@/styles/global';
import { Filter, IExercise } from '@/types/exercise';
import { CircleX, SearchX } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MessageView from '../views/MessageView';
import RequestResultsView from '../views/RequestResultView';
import ExerciseListCard from './ExerciseListCard';


const padding = 12;
const CARD_WIDTH = SCREEN_WIDTH - padding * 4

interface ExerciseListSectionProps {
  title: string;
  filter: Filter
}

export default function ExerciseListSection({ title, filter }: ExerciseListSectionProps) {

  const {
    exercises,
    isFetchingNextPage,
    isPending,
    error,
    isError,
    fetchNextPage }
    = useSearchExercises('', filter, 15);

  const NotFoundComponent = () =>
    <MessageView
      icon={SearchX}
      message='Sem resultados'
      description={`Não econtramos nada para ${filter}`}
    />

  const ErrorComponent = () =>
    <MessageView
      icon={CircleX}
      message="Ocorreu um erro!"
      description={error?.message || 'Estamos tentando resolver este problema!'} />

  const renderItem = ({ item }: { item: IExercise }) =>
    <ExerciseListCard
      exercise={item}
      width={CARD_WIDTH}
      showsAddButton />

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <ActivityIndicator color={COLORS.indigo} style={[s.p12, s.mxAuto]} />
    );
  };

  return (
    <RequestResultsView
      isError={isError}
      isPending={isPending}
      hasData={!!exercises?.length}
      EmptyComponent={<NotFoundComponent />}
      NotFoundComponent={<NotFoundComponent />}
      ErrorComponent={<ErrorComponent />}
    >
      <View style={[s.gap12]}>

        <Text style={[s.textXL, s.semibold]}>{title}</Text>

        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // showsVerticalScrollIndicator={false}
          // onEndReachedThreshold={2}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={renderFooter}
        />
      </View>
    </RequestResultsView>

  )
}