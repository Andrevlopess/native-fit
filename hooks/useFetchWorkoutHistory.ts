import { supabase } from "@/lib/supabase";
import { IWorkout } from "@/types/workout";
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UUID = "84f13dde-923f-4aa7-a706-4d2810f12c3c";

interface IWorkoutHistory {
  id: string;
  done_at: string;
  workouts: IWorkout;
}

export const useFetchWorkoutsHistory = (workoutId: string = "") => {
  async function fetchWorkoutDetails(userId: string, workoutId: string) {
    try {
      const { data: workouts, error } = await supabase
        .from("workouts_history")
        .select("id, done_at, workouts (*)")
        .eq("user_id", userId)
        .eq("workout_id", workoutId)
        .order("done_at", { ascending: false })
        .returns<IWorkoutHistory[]>();

      if (error) throw error;

      return workouts;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const query = useQuery({
    queryKey: ["workouts-history", UUID, workoutId],
    queryFn: ({ queryKey }) => fetchWorkoutDetails(queryKey[1], workoutId[2]),
    // retry: false,
    // enabled: false
  });
  return query;
};
