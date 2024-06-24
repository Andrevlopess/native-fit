// import { supabase } from "@/lib/supabase";
// import { SupabaseClient } from "@supabase/supabase-js";
// import axios from "axios";

// interface IUseSupabaseFetchFunction {
//   supabaseFunction: SupabaseClient<any, "public", any>;
// }

// async function useSupabaseFetchFunction<T>({supabaseFunction}: IUseSupabaseFetchFunction) {
//   try {
//     let { data, error } = await supabaseFunction

//     if (error) throw error;

//     return data as T;
//   } catch (error) {
//     if (!axios.isAxiosError(error)) throw error;
//     throw new Error(
//       error.response?.data.error || "Ocorreu um erro inesperado!"
//     );
//   }
// }
