import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


export const useSearchExercises = (
  search: string, 
  filter: string,
  itemsPerPage:number = 20
  ) => {
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
        page_size: itemsPerPage,
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
  });

  const exercises = results?.pages.map((page) => page).flat();

  return { exercises, ...rest };
};
