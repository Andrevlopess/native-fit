import { IExercise } from "./exercise";

export interface IWorkout {
  id: string;
  name: string;
  description: string;
  exercises_count: number;
  createdat: string;
  ownerid: string;
  ownername?: string;
  exercises?: IExercise[];
}

export interface IWorkoutHistory {
  id: string;
  done_at: string;
  workouts: IWorkout;
}

