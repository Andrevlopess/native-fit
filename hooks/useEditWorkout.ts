import { DEFAULT_USER_UUID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { IWorkout } from "@/types/workout";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

export type EditWorkoutResponse = {
  id: string;
  name: string;
  description: string;
};

interface EditWorkoutParams {
  id: string;
  name: string;
  description: string;
}

export const useEditWorkout = ({
  ...options
}: UseMutationOptions<EditWorkoutResponse, Error, EditWorkoutParams> = {}) => {
  async function editWorkout({ name, description, id }: EditWorkoutParams) {
    try {
      const { data: workout, error } = await supabase
        .from("workouts")
        .update({ name, description })
        .eq("id", id)
        .select('id, name, description')
        .returns<EditWorkoutResponse>()
        .single();

      if (error) throw error;

      return workout;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const mutation = useMutation({
    mutationKey: ["edit-workout"],
    mutationFn: editWorkout,
    ...options,
  });

  return mutation;
};
