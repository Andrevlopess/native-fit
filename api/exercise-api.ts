import { SerieValues } from "@/components/exercise/working-out/SeriesManager";
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
  series: SerieValues[]
}
export class ExerciseApi {
  private constructor() { }

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
      const { data: exercises, error } = await supabase.rpc("search_exercises", {
        filter: params.filter,
        page_num: params.pageParam,
        page_size: params.limit,
        query: params.search,
      });

      if (error) throw error;

      return exercises as IExercise[];
    } catch (error) {
      throw error;
    }
  }

  static async addSerie(params: AddSerieParams) {
    try {
  
    console.log(params.series);

      // params.series.map(exercise_serie => ({ 
      //   series: exercise_serie.serie.length,
      //   max_weight: exercise_serie.series.sort((a, b) => b.weight - a.weight)[0],
      //   total_reps: exercise_serie.series.reduce((acc, cur) => acc + cur.reps, 0)
      // }))

      // best_serie: exercise_serie.series.sort((a, b) => (b.weight / b.reps) - (a.weight / a.reps))[0]

      // const { data, error } = await supabase
      //   .from('exercises_series')
      // .insert()



      console.log(params.series);

    } catch (error) {
      throw error
    }
  }
}

