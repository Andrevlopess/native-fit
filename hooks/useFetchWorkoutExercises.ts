import { supabase } from "@/lib/supabase";
import { IDetailedExercise, IExercise } from "@/types/exercise";
import { IWorkout } from "@/types/workout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchWorkoutExercises(id: string) {
  try {
    let { data: exercises, error } = await supabase
      .rpc("workout_exercises", { workoutid: id })
      .returns<IDetailedExercise[]>();

    if (error) throw error;

    return exercises;
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    throw new Error(
      error.response?.data.error || "Ocorreu um erro inesperado!"
    );
  }
}

export const useFetchWorkoutExercises = (id: string) => {
  const query = useQuery({
    queryKey: ["workout-exercises", id],
    queryFn: ({ queryKey }) => fetchWorkoutExercises(queryKey[1]),
    // retry: false,
    // enabled: false
  });
  return query;
};
