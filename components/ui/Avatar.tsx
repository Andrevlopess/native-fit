import { useAuth } from '@/contexts/AuthContext'
import { s } from '@/styles/global'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Avatar({ size }: { size: number }) {

    const { user } = useAuth()

    if (!user?.user_metadata.picture || user?.user_metadata.avatar_url) return;

    return (
        <Link href={'/(app)/(tabs)/profile'} asChild>
            <TouchableOpacity activeOpacity={0.8}>
                <Image
                    source={user?.user_metadata.picture || user?.user_metadata.avatar_url}
                    style={[s.radiusFull, { width: size, height: size }]} />
            </TouchableOpacity>
        </Link>
    )
}