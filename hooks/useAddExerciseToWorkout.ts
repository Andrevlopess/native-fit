import { supabase } from "@/lib/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface AddExerciseToWorkoutParams {
  exercises: string[];
  workouts: string[];
}

export type AddExerciseToWorkoutResponse = {
  workout_id: string;
  exercise_id: string;
}[]

export const useAddExerciseToWorkout = ({
  ...options
}: UseMutationOptions<AddExerciseToWorkoutResponse, Error, AddExerciseToWorkoutParams> = {}) => {
  
  async function addExerciseToWorkout({
    workouts,
    exercises,
  }: AddExerciseToWorkoutParams) {
    const insertArray = workouts.flatMap((workout) =>
      exercises.map((exercise) => ({
        exercise_id: exercise,
        workout_id: workout,
      }))
    );

    try {
      const { data, error } = await supabase
        .from("workout_exercises")
        .upsert(insertArray)
        .select("exercise_id, workout_id");

      if (error) throw error;

      return data as AddExerciseToWorkoutResponse;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const { mutate: addExercise, ...rest } = useMutation({
    mutationKey: ["insert-exercise"],
    mutationFn: addExerciseToWorkout,
    ...options,
  });

  return { addExercise, ...rest };
};

