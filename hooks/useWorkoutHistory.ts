import { supabase } from "@/lib/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

const UUID = "84f13dde-923f-4aa7-a706-4d2810f12c3c";

interface WorkoutHistoryParams {
  workout_id: string;
}
interface WorkoutHistoryResponse {
  id: string;
}

export const useWorkoutHistory = ({
  ...options
}: UseMutationOptions<
  WorkoutHistoryResponse,
  Error,
  WorkoutHistoryParams
> = {}) => {
  async function createWorkout(values: WorkoutHistoryParams) {
    try {
      const { data, error } = await supabase
        .from("workouts_history")
        .insert({
          user_id: UUID,
          workout_id: values.workout_id,
        })
        .select("id")
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const mutation = useMutation({
    mutationKey: ["workout-history"],
    mutationFn: createWorkout,
    ...options,
  });

  return mutation;
};
