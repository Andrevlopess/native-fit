type BodyPart = 'costas' | 'cardio' | 'peito' | 'antebraço' | "panturrilha" | 'pescoço' | 'ombro' | 'bíceps/tríceps' | "quadriceps/posterior" | 'core';


export interface IExercise {
  id: string;
  name: string;
  bodypart: String;
  target: string;
  equipment: string;
  gifurl: string;
}
