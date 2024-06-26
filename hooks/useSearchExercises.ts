import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const ITEMS_PER_PAGE = 20;

export const useSearchExercises = (search: string) => {
  async function fetchSearchedExercises({
    queryKey,
    pageParam,
  }: {
    queryKey: unknown[];
    pageParam: unknown;
  }) {
    try {
      let { data, error } = await supabase.rpc("search-exercises", {
        page_num: pageParam,
        page_size: ITEMS_PER_PAGE,
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
    queryKey: ["searched-exercises", search],
    queryFn: fetchSearchedExercises,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    // enabled: !!search,
  });

  const exercises = results?.pages.map((page) => page).flat();

  return { exercises, ...rest };
};
