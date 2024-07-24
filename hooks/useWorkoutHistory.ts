import { DEFAULT_USER_UUID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

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
    

  const mutation = useMutation({
    mutationKey: ["workout-history"],
    mutationFn: createWorkout,
    ...options,
  });

  return mutation;
};
