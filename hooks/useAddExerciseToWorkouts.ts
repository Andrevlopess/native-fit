import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddExerciseToWorkout = (exerciseId: string) => {
  async function insertExerciseToWorkouts(workoutsId: string[]) {
    const arrayToInsert = workoutsId.map((workout) => ({
      exercise_id: exerciseId,
      workout_id: workout,
    }));

    try {
      const { data, error } = await supabase
        .from("workout_exercises")
        .insert(arrayToInsert)
        .select();

      if (error) throw error;

    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const mutation = useMutation({
    mutationKey: ["insert-exercise", exerciseId],
    mutationFn: insertExerciseToWorkouts
  });

  return mutation;
};
