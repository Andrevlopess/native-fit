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
  series: SerieValues
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

      const max_weight = params.series.serie.sort((a, b) => a.weight - b.weight);
      const min_weight = params.series.serie.sort((a, b) => b.weight - a.weight);
      const max_reps = params.series.serie.sort((a, b) => a.reps - b.reps);
      const min_reps = params.series.serie.sort((a, b) => b.reps - a.reps);


      // const { data, error } = await supabase
      //   .from('exercises_series')
        // .insert()



      console.log(params.series);

    } catch (error) {
      throw error
    }
  }
}

const exercises_series = [
  {
  exercise_id: 'tal',
  series: [
    {
      weight: 10,
      reps: 5
    },
    {
      weight: 12,
      reps: 4
    },
    {
      weight: 10,
      reps: 8
    },
    {
      weight: 14,
      reps: 5
    },
  ]
},
  {
  exercise_id: 'tal2',
  series: [
    {
      weight: 150,
      reps: 15
    },
    {
      weight: 200,
      reps: 10
    },
    {
      weight: 240,
      reps: 8
    },
    {
      weight: 300,
      reps: 6
    },
  ]
},
]
exercises_series.map(exercise_serie => ({
    execise_id: exercise_serie.exercise_id,
    max_weight_serie: exercise_serie.series.sort((a,b) => b.weight - a.weight)[0],
    min_weight_serie: exercise_serie.series.sort((a,b) => a.weight - b.weight)[0],
    best_serie: exercise_serie.series.sort((a,b) => (b.weight / b.reps) - (a.weight / a.reps))[0]
}))