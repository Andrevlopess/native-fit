import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddExerciseToWorkoutHookParams {
  onSuccess?: (
    data: string,
    variables: AddExerciseToWorkoutParams,
    context: unknown
  ) => void;
  onError?: (
    data: string,
    variables: AddExerciseToWorkoutParams,
    context: unknown
  ) => void;
}

interface AddExerciseToWorkoutParams {
  exercises: string[];
  workouts: string[];
}

export const useAddExerciseToWorkout = ({
  onSuccess = () => {} ,
  onError = () => {},
}: AddExerciseToWorkoutHookParams = {}) => {

  async function addExerciseToWorkout({workouts, exercises}:AddExerciseToWorkoutParams) {

    const insertArray = workouts.flatMap(workout => 
      exercises.map(exercise => ({ exercise_id: exercise, workout_id: workout }))
    )

    try {
      const { data, error } = await supabase
        .from("workout_exercises")
        .insert(insertArray)
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

  const { mutate: addExercise, ...rest } = useMutation({
    mutationKey: ["insert-exercise"],
    mutationFn: (values) => addExerciseToWorkout(values),
    onSuccess: onSuccess,
    onError: onError,
  });

  return { addExercise, ...rest };
};
