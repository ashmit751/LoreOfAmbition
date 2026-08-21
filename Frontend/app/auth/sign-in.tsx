import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-bold text-text mb-2">Welcome back</Text>
      <Text className="text-text-muted text-sm mb-8">Build your lore.</Text>

      {/* TODO: email + password fields + Supabase sign-in call */}

      {/* On successful sign-in → go to main app */}
      <Link
        href="/tabs"
        className="bg-primary text-white p-4 rounded-xl w-full text-center font-semibold mb-4"
      >
        Sign In
      </Link>

      <Link href="/auth/sign-up" className="text-text-muted text-sm">
        Don't have an account? Sign up
      </Link>
    </View>
  )
}
