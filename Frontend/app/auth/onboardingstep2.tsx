import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function OnboardingStep2() {
  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Step indicator */}
      <Text className="text-text-muted text-xs mb-2 tracking-widest uppercase">Step 2 of 3</Text>
      <Text className="text-2xl font-bold text-text mb-1">Your Creator World</Text>
      <Text className="text-text-muted text-sm mb-10">
        What niche are you in? Where do you create? Link up to 4 platforms.
      </Text>

      {/* TODO: niche selector, platform checkboxes, up to 4 social link inputs */}

      <Link
        href="/auth/onboardingstep3"
        className="bg-primary text-white p-4 rounded-xl w-full text-center font-semibold mt-auto"
      >
        Continue
      </Link>
    </View>
  )
}