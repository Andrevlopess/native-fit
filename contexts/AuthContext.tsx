import { AuthApi } from "@/api/auth-api";
import { LoginParams } from "@/components/forms/CredentialsLoginForm";
import { SignUpParams } from "@/components/forms/CredentialsSignUpForm";
import LoadingView from "@/components/views/LoadingView";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { router, SplashScreen } from "expo-router";
import * as Splash from 'expo-splash-screen';
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    Login: (data: LoginParams) => Promise<void>;
    SignUp: (data: SignUpParams) => Promise<void>;
    Logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const retrieveSession = async () => {
        try {
            const user = await AuthApi.retrieveSession()
            setUser(user);
            SplashScreen.hideAsync();

        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        retrieveSession();
    }, []);

    const SignUp = async (params: SignUpParams) => {
        const data = await AuthApi.signUp(params);
        setUser(data.user)
    }

    const Login = async (params: LoginParams) => {
        const data = await AuthApi.login(params);
    
        setUser(data.user)
    }

    const Logout = () => {
        setUser(null);
        AuthApi.logout();
    }



    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user,
            user,
            isLoading,
            setUser,
            Login,
            SignUp,
            Logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)