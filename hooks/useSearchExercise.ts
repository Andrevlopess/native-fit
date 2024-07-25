import { ExerciseApi, SearchExercisesParams } from "@/api/exercise-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchExercise = ({
  search = "",
  filter = "",
  limit = 15,
}: Omit<SearchExercisesParams, "pageParam">) => {
  return useInfiniteQuery({
    queryKey: ["search-exercises"],
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
    select: (data) => data.pages.flatMap((page) => page),
  });
};
