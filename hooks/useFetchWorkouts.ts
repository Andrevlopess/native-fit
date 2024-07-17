import { Search } from "lucide-react-native";
import { supabase } from "@/lib/supabase";
import { IWorkout } from "@/types/workout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { DEFAULT_USER_UUID } from "@/constants/user";

interface useFetchWorkoutsParams {
  search?: string;
  filter?: string;
}

export const useFetchWorkouts = (search?: string, filter?: string) => {
  async function fetchWorkouts(search: string) {
    try {
      const { data: workouts, error } = await supabase
        .from("workouts")
        .select()
        .eq("owner_id", DEFAULT_USER_UUID)
        .ilike("name", `%${search}%` || "");
      // .textSearch("name", `${search}`);
      // .or(`name.ilike.${search}`)
      // .ilike("description", `%${search}%` || "");
      // .eq('name', 'teste')

      if (error) throw error;

      return workouts as IWorkout[];
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error;
      throw new Error(
        error.response?.data.error || "Ocorreu um erro inesperado!"
      );
    }
  }

  const query = useQuery({
    queryKey: ["workouts", search],
    queryFn: ({ queryKey }) => fetchWorkouts(queryKey[1] || ""),
    retry: false,
    // enabled: false
  });
  return query;
};
