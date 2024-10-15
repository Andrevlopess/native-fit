import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { GoogleSignin, GoogleSigninButton, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import Button from './Button';





export const GoogleAuthButton = () => {


    const { setUser } = useAuth()

    GoogleSignin.configure(
        {
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '27128953283-bvbb902bgbhd6n4e2mvnup7o5fi47q6a.apps.googleusercontent.com',
        }
    );

    // Somewhere in your code
    const signIn = async () => {

        try {

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // setState({ userInfo, error: undefined });

            if (!userInfo.idToken) throw new Error('No id token provided')

            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: userInfo.idToken
            })

            setUser(data.user)


        } catch (error: any) {

            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:

                        break;
                    case statusCodes.IN_PROGRESS:

                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:

                        break;
                    default:

                }
            } else {

            }
        }
    };


    return <Button onPress={ onPress={signIn}}/>

}