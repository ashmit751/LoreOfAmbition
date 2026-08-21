import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function OnboardingStep1() {
  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Step indicator */}
      <Text className="text-text-muted text-xs mb-2 tracking-widest uppercase">Step 1 of 3</Text>
      <Text className="text-2xl font-bold text-text mb-1">About You</Text>
      <Text className="text-text-muted text-sm mb-10">
        Tell us who you are and what you're building.
      </Text>

      {/* TODO: name, username, profile picture, bio fields */}

      <Link
        href="/auth/onboardingstep2"
        className="bg-primary text-white p-4 rounded-xl w-full text-center font-semibold mt-auto"
      >
        Continue
      </Link>
    </View>
  )
}