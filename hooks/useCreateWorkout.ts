import { DEFAULT_USER_UUID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

export type CreateWorkoutResponse = {
  id: string;
};

interface CreateWorkoutParams {
  name: string;
  description: string;
}

export const useCreateWorkout = ({
  ...options
}: UseMutationOptions<
  CreateWorkoutResponse,
  Error,
  CreateWorkoutParams
> = {}) => {
  async function createWorkout(values: CreateWorkoutParams) {
    try {
      const { data, error } = await supabase
        .from("workouts")
        .insert({
          owner_id: DEFAULT_USER_UUID,
          name: values.name,
          description: values.description,
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
    mutationKey: ["create-workout"],
    mutationFn: createWorkout,
    ...options,
  });

  return mutation;
};
