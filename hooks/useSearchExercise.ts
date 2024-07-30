import { ExerciseApi, SearchExercisesParams } from "@/api/exercise-api";
import { IExercise } from "@/types/exercise";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

// type teste = {id:string}
// type testee2 = {name:string}
// interface slk extendsteste {teste}

interface SearchExerciseProps extends Omit<SearchExercisesParams, "pageParam"> {
  select?: (data: InfiniteData<IExercise[], number>) => IExercise[]
}

export const useSearchExercise = ({
  search = "",
  filter = "",
  limit = 15,
  select,
}: SearchExerciseProps) => {
  return useInfiniteQuery({
    queryKey: ["search-exercises", { search, filter }],
    queryFn: ({ pageParam }) =>
      ExerciseApi.search({
        search,
        filter,
        pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: !!search || !!filter,
    retry: false,
    select
  });
};
