import { supabase } from "@/lib/supabase";
import { IWorkoutDetails } from "@/types/workout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useFetchWorkoutDetails = (id: string) => {

  async function fetchWorkoutDetails(id:string) {
    try {
      let { data: workouts, error } = await supabase
        .rpc('workout_details', {workoutid: id})

      if (error) throw error;

      return workouts as IWorkoutDetails;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const query = useQuery({
    queryKey: ["workout", id],
    queryFn: ({ queryKey }) => fetchWorkoutDetails(queryKey[1]),
    retry: false,
    // enabled: false
  });
  return query;
};
