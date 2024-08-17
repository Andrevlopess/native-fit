import { SerieValues } from "@/components/exercise/working-out/WorkingOutExerciseCard";
import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";

export interface SearchExercisesParams {
  search: string;
  filter?: string;
  limit?: number;
  pageParam: unknown;
}

interface FindOneParams {
  id: string;
}

export interface AddSerieParams {
  workout_id: string;
  exercise_id: string;
  series: SerieValues;
}
export class ExerciseApi {
  private constructor() {}

  static async findOne(params: FindOneParams) {
    try {
      let { data: exercise, error } = await supabase
        .rpc("get-exercise-details", { exercise_id: params.id })
        .single();

      if (error) throw error;

      return exercise as IExercise;
    } catch (error) {
      throw error;
    }
  }

  static async search(params: SearchExercisesParams) {
    try {
      const { data: exercises, error } = await supabase.rpc(
        "search_exercises",
        {
          filter: params.filter,
          page_num: params.pageParam,
          page_size: params.limit,
          query: params.search,
        }
      );

      if (error) throw error;

      return exercises as IExercise[];
    } catch (error) {
      throw error;
    }
  }

  static async addSerie({ series, workout_id, exercise_id }: AddSerieParams) {
    try {
      
      const bestSerie = series.serie.sort((a, b) => (+b.weight / +b.reps) - (+a.weight / +a.reps))[0]


      const serie = {
        workout_id: workout_id,
        exercise_id: exercise_id,
        series: series.serie.length,
        max_weight: series.serie.sort((a, b) => +b.weight - +a.weight)[0].weight,
        best_serie_weight: bestSerie.weight,
        best_serie_reps: bestSerie.reps
      };
     

      const { data, error } = await supabase
        .from("exercises_series")
        .insert(serie)
        .select("id");

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }
}