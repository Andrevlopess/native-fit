import { LoginParams } from "@/components/forms/CredentialsLoginForm";
import { supabase } from "@/lib/supabase";

export interface ISignUpParams {
  name: string;
  email: string;
  password: string;
}

export class AuthApi {
  private constructor() {}

  static async signUp(params: ISignUpParams) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            username: params.name,
          },
        },
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async login(params: LoginParams) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }

  static async retrieveSession() {
    try {
      // const { data, error } = await supabase.auth.getSession();

      console.log("retrieving, api");

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
