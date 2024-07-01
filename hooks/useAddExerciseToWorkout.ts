import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddExerciseToWorkoutHookParams {
  onSuccess: (
    data: string,
    variables: AddExerciseToWorkoutParams,
    context: unknown
  ) => void;
  onError: (
    data: string,
    variables: AddExerciseToWorkoutParams,
    context: unknown
  ) => void;
}

interface AddExerciseToWorkoutParams {
  exerciseId: string[];
  workoutId: string[];
}

export const useAddExerciseToWorkout = ({
  onSuccess,
  onError,
}: AddExerciseToWorkoutHookParams) => {

  async function insertExerciseToWorkout(values: AddExerciseToWorkoutParams) {
    try {
      const { data, error } = await supabase
        .from("workout_exercises")
        .upsert({
          exercise_id: values.exerciseId,
          workout_id: values.workoutId,
        })
        .select();

      if (error) throw error;

      return data[0];
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const { mutate: insertExercise, ...rest } = useMutation({
    mutationKey: ["insert-exercise"],
    mutationFn: insertExerciseToWorkout,
    onSuccess: onSuccess,
    onError: onError,
  });

  return { insertExercise, ...rest };
};
