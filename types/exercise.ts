type BodyPart = 'costas' | 'cardio' | 'peito' | 'antebraço' | "panturrilha" | 'pescoço' | 'ombro' | 'bíceps/tríceps' | "quadriceps/posterior" | 'core';


export interface IExercise {
  id: string;
  name: string;
  body_part: String;
  target_muscle: string;
  equipment: string;
  gif_url: string;
}
