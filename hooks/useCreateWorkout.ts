import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const UUID = "84f13dde-923f-4aa7-a706-4d2810f12c3c";

interface CreateWorkoutParamsHookParams {
  onSuccess: (
    data: string,
    variables: CreateWorkoutParams,
    context: unknown
  ) => void;
  onError: (
    data: string,
    variables: CreateWorkoutParams,
    context: unknown
  ) => void;
}

interface CreateWorkoutParams {
  name: string;
  description: string;
}

export const useCreateWorkout = ({
  onError,
  onSuccess,
}: CreateWorkoutParamsHookParams) => {
  async function createWorkout(values: CreateWorkoutParams) {
    try {
      const { data, error } = await supabase
        .from("workouts")
        .insert({
          owner_id: UUID,
          name: values.name,
          description: values.description,
        })
        .select("id");

      if (error) throw error;

      return data[0].id;
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
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};
