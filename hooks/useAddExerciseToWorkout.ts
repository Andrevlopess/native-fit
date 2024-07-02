import { supabase } from "@/lib/supabase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface AddExerciseToWorkoutParams {
  exercises: string[];
  workouts: string[];
}

export const useAddExerciseToWorkout = ({
  ...options
}: UseMutationOptions<
  AddExerciseToWorkoutParams,
  Error,
  AddExerciseToWorkoutParams
> = {}) => {
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
        .insert(insertArray)
        .select();

      if (error) throw error;

      console.log(data[0]);

      return data[0];
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const { mutate: addExercise, ...rest } = useMutation({
    mutationKey: ["insert-exercise"],
    mutationFn: (values: AddExerciseToWorkoutParams) =>
      addExerciseToWorkout(values),
    ...options,
  });

  return { addExercise, ...rest };
};
