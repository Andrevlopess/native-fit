import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchExerciseDetails = (id: string) => {


  async function fetchExerciseDetails(id: string) {
    try {
      let { data, error } = await supabase
        .rpc("get-exercise-details", { exercise_id: id })
        .single();

      if (error) throw error;

      return data as IExercise;
      
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const query = useQuery({
    queryKey: ["exercise-details", id],
    queryFn: ({ queryKey }) => fetchExerciseDetails(queryKey[1]),
  });

  return query;
};
