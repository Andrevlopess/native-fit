import { DEFAULT_USER_UUID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { IExercise } from "@/types/exercise";
import { IWorkout } from "@/types/workout";

export interface FindAllWorkoutParams {
  search?: string;
}
export interface FindOneWorkoutParams {
  id: string;
}

export interface FetchExercisesParams {
  id: string;
}
export interface SaveOnHistoryParams {
  id: string;
}

export interface CreateWorkoutResponse {
  id: string;
  name: string;
  description: string;
}

interface RemoveExerciseParams {
  exerciseId: string;
  workoutId: string;
}

interface CreateWorkoutParams {
  name: string;
  description: string;
}

interface EditWorkoutParams {
  id: string;
  name: string;
  description: string;
}

// todo: exercises array doenst exists, the relation will be always one exercise to many workouts or one to one
interface AddExerciseParams {
  exercises: string[];
  workouts: string[];
}

export type AddExerciseResponse = {
  workout_id: string;
  exercise_id: string;
}[];

// end todo

export class WorkoutApi {
  private constructor() {}

  static async findAll(params: FindAllWorkoutParams = {}): Promise<IWorkout[]> {
    try {
      let query = supabase
        .from("workouts")
        .select()
        .eq("owner_id", DEFAULT_USER_UUID)
        .ilike("name", `%${params.search}%`)
        .returns<IWorkout[]>();

      const { data: workouts, error } = await query;

      if (error) throw error;

      return workouts;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(params: FindOneWorkoutParams) {
    try {
      const { data: workout, error } = await supabase
        .from("workouts")
        .select()
        .eq("id", params.id)
        .returns<IWorkout>()
        .single();

      if (error) throw error;

      console.log('resultsssss', workout);
      
      return workout;
    } catch (error) {
      throw error;
    }
  }

  static async create(params: CreateWorkoutParams): Promise<IWorkout> {
    try {
      const { data: workout, error } = await supabase
        .from("workouts")
        .insert({
          owner_id: DEFAULT_USER_UUID,
          name: params.name,
          description: params.description,
        })
        .select("*")
        .returns<CreateWorkoutResponse>()
        .single();

      if (error) throw error;

      return workout;
    } catch (error) {
      throw error;
    }
  }

  static async edit(params: EditWorkoutParams): Promise<IWorkout> {
    try {
      const { data: workout, error } = await supabase
        .from("workouts")
        .update({ name: params.name, description: params.description })
        .eq("id", params.id)
        .select("id, name, description")
        .returns<IWorkout>()
        .single();

      if (error) throw error;

      return workout;
    } catch (error) {
      throw error;
    }
  }

  static async fetchExercises(
    params: FetchExercisesParams
  ): Promise<IExercise[]> {
    try {
      let { data: exercises, error } = await supabase
        .rpc("workout_exercises", { workoutid: params.id })
        .returns<IExercise[]>();

      if (error || !exercises) throw error;

      console.log(exercises);

      return exercises;
    } catch (error) {
      throw error;
    }
  }

  static async fetchHistory(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .rpc("workedout_dates")
        .returns<{ done_at: string }[]>();

      if (error) throw error;

      const dates = data.map((date) => date.done_at);

      return dates;
    } catch (error) {
      throw error;
    }
  }

  static async saveOnHistory(params: SaveOnHistoryParams) {
    try {
      const { data, error } = await supabase
        .from("workouts_history")
        .insert({
          user_id: DEFAULT_USER_UUID,
          workout_id: params.id,
        })
        .select("id")
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      throw error;
    }
  }

  static async findDaySchedule(date: string) {
    try {
      const { data, error } = await supabase
        .rpc("workedout_date_workouts", { date })
        .returns<IWorkout[]>();

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async removeExercise(params: RemoveExerciseParams) {
    try {
      let { data: deletedExercise, error } = await supabase
        .from("workout_exercises")
        .delete()
        .eq("workout_id", params.workoutId)
        .eq("exercise_id", params.exerciseId)
        .select("exercise_id")
        .single();

      if (error) throw error;

      return deletedExercise;
    } catch (error) {
      throw error;
    }
  }

  static async addExercise(
    params: AddExerciseParams
  ): Promise<AddExerciseResponse> {
    const insertArray = params.workouts.flatMap((workout) =>
      params.exercises.map((exercise) => ({
        exercise_id: exercise,
        workout_id: workout,
      }))
    );

    try {
      const { data, error } = await supabase
        .from("workout_exercises")
        .upsert(insertArray)
        .select("exercise_id, workout_id");

      if (error?.code === "23505")
        throw new Error("Esse exercício já foi adicionado!");
      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }
}
