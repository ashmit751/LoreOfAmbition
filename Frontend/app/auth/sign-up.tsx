import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function SignUp() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-2xl font-bold text-text mb-2">Create account</Text>
      <Text className="text-text-muted text-sm mb-8">Start building your lore.</Text>

      {/* TODO: email + password fields + Supabase sign-up call */}

      {/* On successful sign-up → navigate to onboarding */}
      <Link
        href="/auth/onboardingstep1"
        className="bg-primary text-white p-4 rounded-xl w-full text-center font-semibold mb-4"
      >
        Continue
      </Link>

      <Link href="/auth/sign-in" className="text-text-muted text-sm">
        Already have an account? Sign in
      </Link>
    </View>
  )
}
