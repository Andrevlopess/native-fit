import { LoginParams } from "@/components/forms/CredentialsLoginForm";
import { supabase } from "@/lib/supabase";
// import {
//   GoogleSignin,
//   isErrorWithCode,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

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

      if (error) {
        let message;

        switch (error.message) {
          case "Invalid login credentials":
            message = "Email ou senha incorretos.";
            break;
          default:
            message = "Não foi possível entrar na sua conta.";
            break;
        }
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // static async loginWithGoogle() {
  //   try {
  //     GoogleSignin.configure({
  //       scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  //       webClientId:
  //         "27128953283-bvbb902bgbhd6n4e2mvnup7o5fi47q6a.apps.googleusercontent.com",
  //     });

  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // setState({ userInfo, error: undefined });

  //     if (!userInfo.idToken) throw new Error("No id token provided");

  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: "google",
  //       token: userInfo.idToken,
  //     });

  //     if (error) throw error;

  //     return data.user;
  //   } catch (error: any) {
  //     if (isErrorWithCode(error)) {
  //       switch (error.code) {
  //         case statusCodes.SIGN_IN_CANCELLED:
  //           break;
  //         case statusCodes.IN_PROGRESS:
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           break;
  //         default:
  //       }
  //     } else {
  //     }
  //   }
  // }

  static async logout() {
    try {
      // GoogleSignin.configure({
      //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      //   webClientId:
      //     "27128953283-bvbb902bgbhd6n4e2mvnup7o5fi47q6a.apps.googleusercontent.com",
      // });

      // await GoogleSignin.hasPlayServices();
      // await GoogleSignin.signOut();

      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }

  static async retrieveSession() {
    try {
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
