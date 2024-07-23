import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseSearchExercisesProps {
  search: string;
  filter?: string;
  limit?: number;
}

export const useSearchExercises = ({
  limit = 20,
  search = '',
  filter = '',
}: UseSearchExercisesProps) => {
  async function fetchSearchedExercises({
    queryKey,
    pageParam,
  }: {
    queryKey: unknown[];
    pageParam: unknown;
  }) {
    try {
      const { data, error } = await supabase.rpc("search_exercises", {
        filter: queryKey[2],
        page_num: pageParam,
        page_size: limit,
        query: queryKey[1],
      });

      if (error) throw error;

      return data as IExercise[];
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const { data: results, ...rest } = useInfiniteQuery({
    queryKey: ["search-exercises", search, filter],
    queryFn: fetchSearchedExercises,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: !!search || !!filter,
    retry: false,
    // select: data => return
  });

  const exercises = results?.pages.map((page) => page).flat();

  return { exercises, ...rest };
};
