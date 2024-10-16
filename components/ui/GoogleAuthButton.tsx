import { AuthApi } from '@/api/auth-api';
import { useAuth } from '@/contexts/AuthContext';
import { Image } from 'expo-image';
import Button from './Button';





export const GoogleAuthButton = () => {


    const { setUser } = useAuth()


    const handleLoginWithGoogle = async () => {
        const user = await AuthApi.loginWithGoogle();

        if (!user) return
        setUser(user)
    }


    return <Button onPress={handleLoginWithGoogle} text='Entrar com google'>
        <Image source={require('@/assets/icons/svg/Google.svg')} style={{ height: 24, width: 24 }} />
    </Button>

}