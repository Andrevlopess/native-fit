import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


async function fetchWorkedOutDays() {
    try {

        const { data, error } = await supabase.rpc('workedout_dates')

        if (error) throw error;

        return data as { done_at: string }[];

    } catch (error) {
        if (!axios.isAxiosError(error)) throw error;
        throw new Error(
            error.response?.data.error || "Ocorreu um erro inesperado!"
        );
    }
}

export const useFetchWorkedOutDays = () => {

    const query = useQuery({
        queryKey: ['workout-history'],
        queryFn: fetchWorkedOutDays
    })

    return query;
};
