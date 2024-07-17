import { supabase } from "@/lib/supabase";
import { IWorkoutHistory } from "@/types/workout";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { DEFAULT_USER_UUID } from "../constants/user";

interface InfiniteQueryParams {
  queryKey: unknown[];
  pageParam: unknown;
}

const PAGE_SIZE = 5; // Define a constant for the page size

export const useFetchWorkoutsHistory = (workoutId: string = "") => {
  async function fetchWorkoutDetails({
    pageParam,
    queryKey,
  }: InfiniteQueryParams) {
    try {
      const page = pageParam as number; // Ensure pageParam is treated as a number
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      let query = supabase
        .from("workouts_history")
        .select("id, done_at, workouts (*)")
        .eq("user_id", queryKey[1])
        .order("done_at", { ascending: false })
        .range(start, end);

      if (workoutId) {
        query = query.eq("workout_id", workoutId);
      }

      const { data: workouts, error } = await query.returns<IWorkoutHistory[]>();

      if (error) throw error;

      return workouts;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const { data: results, ...rest } = useInfiniteQuery({
    queryKey: ["workouts-history", DEFAULT_USER_UUID, workoutId],
    queryFn: fetchWorkoutDetails,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    retry: false,
  });

  const history = results?.pages.map((page) => page).flat();

  return { history, ...rest };
};
