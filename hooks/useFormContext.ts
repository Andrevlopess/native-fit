import { FormContext, IFormContext } from "@/contexts/FormContext";
import { useContext } from "react";

export const useFormContext = <T>(): IFormContext<T> =>
  useContext(FormContext) as IFormContext<T>;
